import styled, { css } from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
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
import happy from "@/assets/mood/happy.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
    height: 16rem;
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

const POINTS_PER_PAGE = 12; // 한 페이지에 보여줄 항목 수

export default function FeedPage() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const [activeTab, setActiveTab] = useState("Latest");
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [currentPage, setCurrentPage] = useState(1);

  const TabItems = [
    { key: "Latest", label: "최신" },
    { key: "Popular", label: "인기" },
  ];

  // 게시글 데이터 가져오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get<Post[]>(
          `https://api.meet-da.site/board/all-posts?page={page}&sort={sort}`
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 데 실패했습니다:", error);
      }
    }
    fetchPosts();
  }, []);

  console.log(posts);

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

  const [filteredData, setFilteredData] = useState<Post[]>([]); // 필터된 데이터
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [debouncedKeyword, setDebouncedKeyword] = useState(""); // 디바운싱된 검색어

  // 디바운싱을 위한 useEffect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword); // 디바운싱된 검색어 업데이트
    }, 500); // 0.5초 딜레이

    return () => clearTimeout(handler); // 이전 타이머 클리어
  }, [searchKeyword]);

  // 디바운싱된 검색어가 변경될 때 데이터 필터링
  useEffect(() => {
    const keyword = debouncedKeyword.trim().toLowerCase();
    if (keyword === "") {
      setFilteredData(posts); // 검색어가 비어 있으면 전체 데이터
    } else {
      const filtered = posts.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.content.toLowerCase().includes(keyword) ||
          item.author.username.toLowerCase().includes(keyword)
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 초기화
  }, [debouncedKeyword, posts]);

  // 검색어 입력 핸들러
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value); // 검색어 상태 업데이트
  };

  // 초기 상태에서 게시글 데이터 설정
  useEffect(() => {
    if (posts.length > 0) {
      setFilteredData(posts); // posts 로드 시 초기 데이터 설정
    }
  }, [posts]);

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * POINTS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - POINTS_PER_PAGE;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
          흥미로운 이야기를 발견해 보세요!
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder="기억에 남는 질문이 있나요?"
              value={searchKeyword}
              onChange={handleSearchInput}
            />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBarContainer>
        </SearchBarWrap>
        <PostWrap>
          <ButtonWrap>
            {TabItems.map((menu) => (
              <FeedButton
                key={menu.key}
                isClicked={activeTab !== menu.key}
                onClick={() => setActiveTab(menu.key)}
              >
                {menu.label}
              </FeedButton>
            ))}
          </ButtonWrap>
          <PostContainer>
            {currentData.map((post) => (
              <PostItem
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                noImage={!post.images || post.images.length === 0}
              >
                {post.images && post.images.length > 0 && (
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
                            src={image}
                            alt={`post-image-${index}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </SwiperWrap>
                )}
                <PostTitle>
                  {post.title.length > 15
                    ? `${post.title.slice(0, 15)}...`
                    : post.title || "제목 로드에 문제 발생"}
                  <MoodImage src={happy} alt="happy" />
                </PostTitle>
                <PostText>
                  {removeHTMLTags(post.content).length > 150
                    ? `${removeHTMLTags(post.content).slice(0, 150)}...`
                    : removeHTMLTags(post.content) || "내용 로드에 문제 발생"}
                </PostText>
                <BottomWrap>
                  <PostInfoWrap>
                    <PostInfo>
                      {new Date(post.createdAt).toLocaleDateString() ||
                        "날짜 로드에 문제 발생"}
                    </PostInfo>
                    <PostInfo>·</PostInfo>
                    <PostInfo>0개의 댓글</PostInfo>
                  </PostInfoWrap>
                  <InfoWrap>
                    <UserInfo>
                      {post.author.profileImage ? (
                        <UserImage
                          src={post.author.profileImage}
                          alt="Profile"
                        />
                      ) : (
                        <ProfileImagePlaceholder />
                      )}
                      {post.author?.username?.length > 18
                        ? `${post.author.username.slice(0, 18)}...`
                        : post.author?.username || "사용자 없음"}
                    </UserInfo>
                    <LikeContainer>
                      <LikeIcon />
                      {post.likesCount || 0}
                    </LikeContainer>
                  </InfoWrap>
                </BottomWrap>
              </PostItem>
            ))}
          </PostContainer>
        </PostWrap>
      </Layout>
    </>
  );
}
