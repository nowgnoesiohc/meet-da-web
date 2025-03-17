import { useCallback, useEffect, useRef, useState } from "react";
import { FeedButton } from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "/node_modules/swiper/swiper.css";
import { Outlet, useNavigate } from "react-router-dom";
import GlobalStyles from "@/styles/GlobalStyle";
import Header from "@/components/layout/Header";
import ModalPortal from "@/components/modal/ModalPortal";
import ModalTemplate from "@/components/modal/ModalTemplate";
import { useIsModalStore } from "@/store/ModalStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { themeImages } from "@/assets/common/themeImages";
import {
  BottomWrap,
  ButtonWrap,
  InfoWrap,
  Layout,
  LikeContainer,
  LikeIcon,
  MoodImage,
  PostContainer,
  PostInfo,
  PostInfoWrap,
  PostItem,
  PostText,
  PostTitle,
  PostWrap,
  ProfileImagePlaceholder,
  SearchBarContainer,
  SearchBarWrap,
  SearchButton,
  SearchIcon,
  SearchInput,
  Sentinel,
  SwiperImage,
  SwiperWrap,
  UserImage,
  UserInfo,
} from "./Feed.styles";

interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  images: string[];
  likesCount: number;
}

interface Author {
  username: string;
  profileImage: string;
  mood: string;
}

interface MoodEntry {
  date: string;
  mood: string;
}

const POINTS_PER_PAGE = 12; // 한 페이지에 보여줄 항목 수
const BASE_URL = `https://api.meet-da.site`;

// 글자수 초과 시 ... 처리
const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return ""; // text가 undefined이거나 null이면 빈 문자열 반환
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function FeedPage() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const [activeTab, setActiveTab] = useState<"Latest" | "Popular">("Latest");
  const [posts, setPosts] = useState<Post[]>([]); // 기본값을 빈 배열로 설정
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isSearching, setIsSearching] = useState(false); // 검색 여부 상태 추가

  useEffect(() => {
    if (!isSearching && currentPage > 1 && !isFetching) {
      fetchPosts(currentPage, activeTab.toLowerCase()); // 검색이 아닐 때만 실행
    }
  }, [currentPage, isSearching, activeTab]);

  // 정렬 변경 핸들러
  const handleSortChange = (sortKey: "Latest" | "Popular") => {
    setActiveTab(sortKey);
    setCurrentPage(1);
    setPosts([]);
    setHasMore(true);
    fetchPosts(1, sortKey.toLowerCase());
  };

  // const [moodIcons, setMoodIcons] = useState(() => {
  //   try {
  //     const storedIcons = localStorage.getItem("moodIcons");
  //     return storedIcons && storedIcons !== "undefined"
  //       ? JSON.parse(storedIcons)
  //       : themeImages;
  //   } catch (error) {
  //     console.error("moodIcons 파싱 중 오류 발생:", error);
  //     return themeImages; // 에러 발생 시 기본 테마 반환
  //   }
  // });

  const [moodIcons, setMoodIcons] = useState(themeImages); // 초기값을 themeImages로 설정

  useEffect(() => {
    const updateTheme = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMoodIcons(themeImages); // 로그아웃하면 기본 테마로 변경
        return;
      }

      const userId = jwtDecode(token).sub;
      if (!userId) return;

      const storedTheme = localStorage.getItem(`appliedTheme_${userId}`);
      const storedIcons = storedTheme ? JSON.parse(storedTheme) : themeImages;

      setMoodIcons(storedIcons);
    };

    updateTheme();
    window.addEventListener("storage", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  useEffect(() => {
    const updateMoodIcons = () => {
      const storedIcons = localStorage.getItem("moodIcons");
      const updatedIcons =
        storedIcons && storedIcons !== "undefined"
          ? JSON.parse(storedIcons)
          : themeImages;
      setMoodIcons(updatedIcons);
    };

    updateMoodIcons();
    window.addEventListener("storage", updateMoodIcons);

    return () => {
      window.removeEventListener("storage", updateMoodIcons);
    };
  }, []);

  const getMoodImage = (mood: string | null) => {
    if (!moodIcons || Object.keys(moodIcons).length === 0)
      return themeImages["hurt"];
    return moodIcons[mood as keyof typeof moodIcons] || themeImages["hurt"];
  };

  const fetchMoodByDate = async (authorId: string, createdAt: string) => {
    try {
      const postDate = new Date(createdAt);
      const year = postDate.getFullYear();
      const month = postDate.getMonth() + 1;
      const day = postDate.getDate(); // 게시글 작성 날짜

      const response = await axios.get<MoodEntry[]>(
        `https://api.meet-da.site/user/${authorId}/moods?year=${year}&month=${month}`
      );

      if (response.data.length > 0) {
        // 해당 날짜에 맞는 무드 찾기
        const matchedMood = response.data.find((moodEntry: MoodEntry) => {
          const moodDate = new Date(moodEntry.date); // API에서 제공하는 날짜 값
          return (
            moodDate.getFullYear() === year &&
            moodDate.getMonth() + 1 === month &&
            moodDate.getDate() === day
          );
        });

        return matchedMood ? matchedMood.mood : null; // 해당 날짜 무드가 없으면 null 반환
      }
      return null;
    } catch (error) {
      console.error(
        `사용자 ${authorId}의 ${createdAt} 무드 데이터를 불러오는 데 실패했습니다:`,
        error
      );
      return null;
    }
  };

  // 게시글 데이터 요청 함수 (무한스크롤 & 정렬 반영)
  const fetchedPages = new Set<number>(); // 요청된 페이지를 저장하여 중복 요청 방지

  const fetchPosts = useCallback(
    async (page: number, sort: string) => {
      if (isFetching || fetchedPages.has(page)) return;

      fetchedPages.add(page);
      setIsFetching(true);

      try {
        const userId = await getUserId();

        const response = await axios.get<Post[]>(
          `${BASE_URL}/board/all-posts?page=${page}&sort=${sort}`
        );

        const updatedPosts: Post[] = response.data.map((post) => ({
          ...post,
          author: post.author || { id: "unknown" },
        }));

        const postsWithDetails = await Promise.all(
          updatedPosts.map(async (post) => {
            try {
              const postDetailResponse = await axios.get(
                `${BASE_URL}/board/${post.id}`
              );
              const postDetail = postDetailResponse.data;

              const authorMood = await fetchMoodByDate(
                postDetail.author.id,
                postDetail.createdAt
              );

              return {
                ...postDetail,
                author: {
                  ...postDetail.author,
                  mood: authorMood || "hurt",
                },
              };
            } catch (error) {
              console.error(
                `게시글 상세 정보 로딩 실패 (ID: ${post.id})`,
                error
              );
              return post;
            }
          })
        );

        // 비공개 게시글 필터링 (로그아웃 상태에서도 공개 게시글은 보이도록 수정)
        const filteredPosts = postsWithDetails.filter((post) => {
          return (
            post.visibility !== "PRIVATE" ||
            (userId && post.author.id === userId)
          );
        });

        setPosts((prev) =>
          page === 1 ? filteredPosts : [...prev, ...filteredPosts]
        );

        setHasMore(filteredPosts.length > 0);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 데 실패했습니다:", error);
        setHasMore(false); // 실패 시 더 이상 요청 안 하도록 설정
      } finally {
        setIsFetching(false);
      }
    },
    [isFetching, posts]
  );

  // 초기 로딩 전용 useEffect (컴포넌트 마운트 시 한 번만 호출)
  useEffect(() => {
    fetchPosts(1, activeTab.toLowerCase());
  }, [activeTab]);

  // 페이지네이션 (1페이지 요청 중복 방지)
  useEffect(() => {
    if (currentPage > 1 && !isFetching) {
      fetchPosts(currentPage, activeTab.toLowerCase());
    }
  }, [currentPage, activeTab]);

  // 검색어 디바운싱 useEffect (검색어 변경에 따른 호출)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword.trim().toLowerCase());
      setCurrentPage(1); // 검색어 변경 시 페이지 초기화
    }, 500);

    return () => clearTimeout(handler);
  }, [searchKeyword]);

  // currentPage, activeTab에 따른 추가 로딩 (페이지네이션)
  useEffect(() => {
    if (debouncedKeyword) {
      searchPosts(debouncedKeyword, 1); // 검색 시 1페이지부터 실행
    } else {
      setIsSearching(false);
      fetchPosts(currentPage, activeTab.toLowerCase());
    }
  }, [debouncedKeyword, activeTab]);

  // 무한스크롤 감지
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          setCurrentPage((prev) => {
            return prev + 1;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  // Observer 설정
  useEffect(() => {
    if (!sentinelRef.current || isFetching || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [isFetching, hasMore]);

  // 검색 API 요청 함수
  const searchPosts = useCallback(async (keyword: string, page: number) => {
    if (!keyword.trim()) {
      setIsSearching(false); // 검색 종료 상태로 변경
      setCurrentPage(1);
      setHasMore(true);
      setPosts([]);
      fetchPosts(1, activeTab.toLowerCase()); // 검색어 없을 때만 전체 데이터 로드
      return;
    }

    setIsSearching(true); // 검색 중 상태로 설정
    setIsFetching(true);

    try {
      const response = await axios.get<{ boards: Post[]; total: number }>(
        `${BASE_URL}/board/search?query=${encodeURIComponent(keyword)}&page=${page}&sort=latest`
      );

      if (
        !response.data ||
        !Array.isArray(response.data.boards) ||
        response.data.boards.length === 0
      ) {
        setPosts([]);
        setHasMore(false);
        setIsFetching(false);
        return;
      }

      const updatedPosts = response.data.boards.map((post) => ({
        ...post,
        author: post.author || {
          username: "알 수 없음",
          profileImage: "",
        },
        likesCount: post.likesCount || 0,
      }));

      // 검색어 정확도 필터링 추가
      const filteredPosts = updatedPosts.filter(
        (post) => post.title.includes(keyword) || post.content.includes(keyword)
      );

      if (page === 1) {
        setPosts(filteredPosts); // 기존 데이터 삭제 후 검색 결과만 표시
      } else {
        setPosts((prev) => [...prev, ...filteredPosts]);
      }

      setHasMore(filteredPosts.length === POINTS_PER_PAGE);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setPosts([]);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // 유저 ID 가져오기
  const getUserId = async (): Promise<string | null> => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const userId = jwtDecode(token).sub;
      return userId || null;
    } catch {
      return null;
    }
  };

  // 게시글 클릭 핸들러
  const handlePostClick = async (boardId: string) => {
    const userId = await getUserId();
    if (!userId) {
      setIsModalClick("noticeModal"); // 로그인 모달 표시
    } else {
      navigate(`/board/${boardId}`); // 상세 페이지로 이동
    }
  };

  // html 태그 제거하는 정규식
  const removeHTMLTags = (content: string) => {
    return content.replace(/<[^>]*>/g, ""); // HTML 태그 제거
  };

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const commentDate = new Date(createdAt);
    const diffMs = now.getTime() - commentDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 12);

    if (diffDay >= 1) {
      // 12시간 이상 지난 경우 YYYY.MM.DD 형식 표시
      return `${commentDate.getFullYear()}.${String(commentDate.getMonth() + 1).padStart(2, "0")}.${String(commentDate.getDate()).padStart(2, "0")}`;
    } else if (diffHour >= 1) {
      return `${diffHour}시간 전`;
    } else if (diffMin >= 1) {
      return `${diffMin}분 전`;
    } else {
      return "방금 전";
    }
  };

  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}

      <Layout>
        <SearchBarWrap>
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder="흥미로운 이야기를 발견해 보세요!"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBarContainer>
        </SearchBarWrap>

        <PostWrap>
          <ButtonWrap>
            {["Latest", "Popular"].map((key) => (
              <FeedButton
                key={key}
                isClicked={activeTab !== key}
                onClick={() => handleSortChange(key as "Latest" | "Popular")}
              >
                {key === "Latest" ? "최신" : "인기"}
              </FeedButton>
            ))}
          </ButtonWrap>

          <PostContainer>
            {(posts || []).map((post) => (
              <PostItem
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                noImage={!post.images || post.images.length === 0}
              >
                {post.images?.length > 0 && (
                  <SwiperWrap>
                    <Swiper
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination, Autoplay]}
                      autoplay={{
                        delay: 3000, // 3초마다 자동으로 넘김
                        disableOnInteraction: false, // 사용자가 터치하거나 클릭해도 자동 전환이 계속됨
                      }}
                      className="mySwiper"
                    >
                      {post.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <SwiperImage
                            src={`${image}?v=1`}
                            alt={`post-image-${index}`}
                            loading="lazy"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </SwiperWrap>
                )}
                <PostTitle>
                  {truncateText(post.title ?? "", 15)}
                  <MoodImage
                    src={getMoodImage(post.author.mood)}
                    alt="유저 무드"
                  />
                </PostTitle>
                <PostText>
                  {truncateText(removeHTMLTags(post.content) ?? "", 150)}
                </PostText>
                <BottomWrap>
                  <PostInfoWrap>
                    <PostInfo>{formatTimeAgo(post.createdAt)}</PostInfo>
                  </PostInfoWrap>
                  <InfoWrap>
                    <UserInfo>
                      {post.author?.profileImage ? (
                        <UserImage
                          src={post.author.profileImage}
                          alt="Profile"
                        />
                      ) : (
                        <ProfileImagePlaceholder />
                      )}
                      {truncateText(post.author?.username || "알 수 없음", 18)}
                    </UserInfo>
                    <LikeContainer>
                      <LikeIcon />
                      {post.likesCount}
                    </LikeContainer>
                  </InfoWrap>
                </BottomWrap>
              </PostItem>
            ))}
          </PostContainer>
          <Sentinel ref={lastPostRef} />
        </PostWrap>
      </Layout>
    </>
  );
}
