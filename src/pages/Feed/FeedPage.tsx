import styled, { css } from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { FeedButton } from "@/components/ui/Button";
import { IoHeart } from "react-icons/io5";
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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6.875rem auto;
  padding: 0rem 1.25rem;
  gap: 4.125rem;
  align-items: center;
  height: 100vh;
`;

const SearchBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--main-text);
  font-size: 1.5rem;
  font-weight: var(--font-medium);
  gap: 2.25rem;
  width: 100%;

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--line-green);
  border-radius: 2.5rem;
  background-color: var(--feed-searchbar);
  padding: 1.375rem 1.875rem;
  width: 100%; /* 기본적으로 부모 컨테이너를 채우도록 설정 */
  max-width: 35.5rem; /* 최대 너비 */
  min-width: 17.5rem; /* 최소 너비 */
  height: 4.25rem; /* 기본 높이 */
  gap: 0.5rem;
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);

  @media (max-width: 390px) {
    padding: 0.75rem 1.125rem;
    height: 2.625rem; /* 더 작은 화면에서 높이 조정 */
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 1.25rem;
  font-weight: var(--font-regular);

  &::placeholder {
    color: var(--search-placeholder);
    font-size: 1.25rem;
    font-weight: var(--font-regular);
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;

    &::placeholder {
      font-size: 0.875rem;
    }
  }
`;

const SearchButton = styled.button`
  display: flex;
`;

const SearchIcon = styled(IoSearch)`
  color: var(--search-placeholder);
  font-size: 1.5rem;

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  max-width: 75rem;
  align-items: center;
  width: 100%;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 390px) {
    gap: 0.75rem;
  }
`;

const PostContainer = styled.div`
  display: grid;
  margin-bottom: 2.5rem;
  grid-template-columns: repeat(4, 1fr); /* 기본 1줄에 4개 */
  gap: 2rem;
  width: 100%;

  @media (max-width: 781px) {
    grid-template-columns: repeat(2, 1fr); /* 1줄에 2개 */
  }

  @media (max-width: 390px) {
    grid-template-columns: repeat(2, 1fr); /* 1줄에 2개 */
    row-gap: 1.5rem;
    column-gap: 1rem;
  }
`;

const PostItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "noImage", // `noImage`를 DOM으로 전달하지 않음
})<{ noImage?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 17.25rem;
  height: auto;
  background-color: var(--white);
  padding-bottom: 0.75rem;
  border: 1px solid var(--line-diary);
  border-radius: 0.625rem;
  text-align: center;
  gap: 0.75rem;
  box-shadow: 0.125rem 0.125rem 0.5rem 0rem rgba(0, 0, 0, 0.25);

  ${({ noImage }) =>
    noImage &&
    css`
      ${PostTitle} {
        margin-top: 1.25rem;
      }
      ${PostText} {
        height: 13.75rem;
      }
    `}

  @media (max-width: 781px) {
    margin: auto;
    height: 22rem;
  }

  @media (max-width: 390px) {
    width: 11rem;
    height: 18rem;
    padding-bottom: 0.5rem;
  }
`;

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--black);
  font-size: 1.125rem;
  font-weight: var(--font-medium);
  text-align: start;
  padding: 0 1rem;

  @media (max-width: 390px) {
    font-size: 0.875rem;
    padding: 0 0.75rem;
  }
`;

const MoodImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: cover;

  @media (max-width: 390px) {
    width: 1rem; /* 작은 화면에 적응 */
    height: 1rem;
  }
`;

const PostText = styled.div`
  color: var(--diary-text);
  text-overflow: ellipsis;
  font-size: 1rem; /* 화면 크기에 따라 폰트 크기 조정 */
  font-weight: var(--font-regular);
  text-align: start;
  line-height: 1.5;
  padding: 0 1rem;

  @media (max-width: 390px) {
    font-size: 0.75rem;
    padding: 0 0.75rem;
  }
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 0.5rem;
`;

const PostInfoWrap = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0 1rem;

  @media (max-width: 390px) {
    padding: 0 0.75rem;
  }
`;

const PostInfo = styled.div`
  color: var(--text-03);
  font-size: 0.875rem;
  font-weight: var(--font-regular);

  @media (max-width: 390px) {
    font-size: 0.625rem;
  }
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: 390px) {
    padding: 0 0.75rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  color: var(--black);
  font-size: 0.875rem;
  font-weight: var(--font-medium);
  align-items: center;

  @media (max-width: 390px) {
    font-size: 0.625rem;
  }
`;

const UserImage = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 390px) {
    width: 1rem;
    height: 1rem;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  color: var(--diary-text);
  font-size: 0.875rem;
  font-weight: var(--font-regular);
  align-items: center;

  @media (max-width: 390px) {
    font-size: 0.625rem;
  }
`;

const LikeIcon = styled(IoHeart)`
  color: var(--diary-text);
  font-size: 0.875rem;

  @media (max-width: 390px) {
    font-size: 0.625rem;
  }
`;

const SwiperWrap = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9; /* 비율 유지 */
  border-radius: 0.625rem 0.625rem 0 0;
`;

const SwiperImage = styled.img`
  width: 100%;
  height: 10.375rem;
  object-fit: cover;
  border-radius: 0.5625rem 0.5625rem 0 0;

  @media (max-width: 390px) {
    height: 6.5rem;
  }
`;

const ProfileImagePlaceholder = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--line-basic);

  @media (max-width: 390px) {
    width: 1rem;
    height: 1rem;
  }
`;

const Sentinel = styled.div`
  height: 1px;
`;

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

  const [moodIcons, setMoodIcons] = useState(themeImages);

  useEffect(() => {
    const loadAppliedTheme = () => {
      const userId = localStorage.getItem("userId");
      const appliedTheme = userId
        ? JSON.parse(localStorage.getItem(`appliedTheme_${userId}`) || "{}")
        : JSON.parse(localStorage.getItem("appliedTheme") || "{}");

      if (appliedTheme.name && appliedTheme.moodImages) {
        console.log(`적용된 테마 (사용자 ${userId}):`, appliedTheme.name);
        setMoodIcons(appliedTheme.moodImages);
      }
    };

    loadAppliedTheme(); // 초기 실행
    window.addEventListener("storage", loadAppliedTheme); // 스토리지 변경 감지

    return () => {
      window.removeEventListener("storage", loadAppliedTheme);
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
        const userId = await getUserId(); // userId 가져오기
        console.log(`현재 사용자 ID: ${userId || "로그인 안됨"}`);

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

        // 비공개 게시글 필터링: 로그아웃 상태에서도 공개 게시글은 보이도록 수정
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

  // 페이지네이션: currentPage가 변경될 때 실행 (단, 1페이지는 중복 요청 방지)
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
      setIsSearching(false); // 검색이 종료되었을 때만 전체 데이터 로드
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
            console.log(`페이지 증가: ${prev + 1}`); // 디버깅용
            return prev + 1;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  // Observer 설정 useEffect (Sentinel 요소 관찰)
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

      console.log("검색 API 응답 데이터:", response.data);

      if (
        !response.data ||
        !Array.isArray(response.data.boards) ||
        response.data.boards.length === 0
      ) {
        console.log("검색 결과 없음");
        setPosts([]); // 기존 데이터 삭제
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

      console.log("검색 필터링 후 데이터:", filteredPosts);

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
    const diffMs = now.getTime() - commentDate.getTime(); // 시간 차이 (밀리초)
    const diffSec = Math.floor(diffMs / 1000); // 초 단위 변환
    const diffMin = Math.floor(diffSec / 60); // 분 단위 변환
    const diffHour = Math.floor(diffMin / 60); // 시간 단위 변환
    const diffDay = Math.floor(diffHour / 12); // 일 단위 변환

    if (diffDay >= 1) {
      // 12시간 이상 지난 경우 YYYY.MM.DD 형식 표시
      return `${commentDate.getFullYear()}.${String(commentDate.getMonth() + 1).padStart(2, "0")}.${String(commentDate.getDate()).padStart(2, "0")}`;
    } else if (diffHour >= 1) {
      // 1시간 이상 경과한 경우
      return `${diffHour}시간 전`;
    } else if (diffMin >= 1) {
      // 1분 이상 경과한 경우
      return `${diffMin}분 전`;
    } else {
      // 1분 이내
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
