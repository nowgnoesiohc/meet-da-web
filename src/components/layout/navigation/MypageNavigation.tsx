import styled from "styled-components";
import { ProfileButton } from "../../ui/Button";
import { useEffect, useRef, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useIsModalStore } from "@/store/ModalStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5.25rem 5rem 0rem;
  align-items: center;

  @media (max-width: 781px) {
    margin: 5.25rem 1.8rem 0rem;
  }

  @media (max-width: 390px) {
    margin: 1.875rem 1.25rem 0rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  border-left: 1px solid var(--line-basic);

  @media (max-width: 390px) {
    border-top: 1px solid var(--line-basic);
    border-left: none;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 1.875rem;
  padding-bottom: 3.125rem;
  border-bottom: 1px solid var(--line-basic);

  @media (max-width: 781px) {
    width: 100%;
    padding-bottom: 3.25rem;
  }

  @media (max-width: 390px) {
    gap: 0.75rem;
    padding-bottom: 2.25rem;
  }
`;

const SideMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.375rem;
  height: 100vh;
  gap: 1.5rem;
  padding: 3.75rem 3rem 0rem 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 781px) {
    width: 13rem;
    padding: 3.75rem 1.5rem 0rem;
  }

  @media (max-width: 390px) {
    width: calc(100vw - 1.25rem); // (100vw - 20px)
    flex-direction: row;
    align-items: center;
    height: auto;
    padding: 1.5rem 0rem;
    border-right: none;
  }
`;

const SideMenu = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 12.5rem;

  @media (max-width: 390px) {
    width: 7rem;
    gap: 0.5rem;
  }
`;

const SideMenuTextStyle = {
  unclicked: {
    color: "var(--text-03)",
  },
  clicked: {
    color: "var(--black)",
  },
};

const SideMenuText = styled.button<{
  $variant: "clicked" | "unclicked";
  $isClicked: boolean;
}>`
  display: flex;
  color: ${(props) =>
    props.$isClicked
      ? SideMenuTextStyle.clicked.color
      : SideMenuTextStyle.unclicked.color};
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    font-size: 1rem; /* 중간 화면에서 크기 축소 */
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const SideMenuPointStyle = {
  unclicked: {
    backgroundColor: "var(--text-03)",
  },
  clicked: {
    backgroundColor: "var(--main-orange)",
  },
};

const SideMenuPoint = styled.button<{
  $variant: "clicked" | "unclicked";
  $isClicked: boolean;
}>`
  display: flex;
  align-self: center;
  aspect-ratio: 1 / 1; /* 정비례 원 */
  width: 0.75rem;
  border-radius: 50%; /* 완벽한 원 */
  background-color: ${(props) =>
    props.$isClicked
      ? SideMenuPointStyle.clicked.backgroundColor
      : SideMenuPointStyle.unclicked.backgroundColor};
`;

const ProfileContainer = styled.div`
  position: relative; /* 자식 요소의 위치를 기준으로 설정 */
  width: 11.25rem; /* 이미지 크기 */
  height: 11.25rem;

  @media (max-width: 781px) {
    width: 10rem;
    height: 10rem;
  }

  @media (max-width: 390px) {
    width: 5.25rem;
    height: 5.25rem;
  }
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 0.625rem;
  object-fit: cover;

  @media (max-width: 781px) {
    width: 8.75rem;
    height: 8.75rem;
  }

  @media (max-width: 390px) {
    width: 4.625rem;
    height: 4.625rem;
  }
`;

const ProfileImagePlaceholder = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 0.625rem;
  background-color: var(--line-basic);

  @media (max-width: 781px) {
    width: 8.75rem;
    height: 8.75rem;
  }

  @media (max-width: 390px) {
    width: 4.625rem;
    height: 4.625rem;
  }
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 3.125rem;
  height: 3.125rem;
  border: none;
  background-color: var(--orange-button);
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 390px) {
    width: 1.625rem;
    height: 1.625rem;
  }
`;

const IconStyle = styled(HiPencil)`
  color: var(--white);
  font-size: 1.5625rem;

  @media (max-width: 390px) {
    font-size: 0.8125rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.25rem;

  @media (max-width: 781px) {
    gap: 2rem;
  }

  @media (max-width: 390px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 390px) {
    gap: 0.375rem;
  }
`;

const UserTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 390px) {
    gap: 0.375rem;
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  color: var(--main-text);
  font-size: 1.5rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const UserState = styled.div`
  display: flex;
  align-items: center;
  color: var(--search-placeholder);
  font-size: 1.125rem;
  font-weight: var(--font-regular);

  @media (max-width: 390px) {
    font-size: 0.75rem;
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

export default function MypageNavigation() {
  // 메뉴 상태를 배열로 관리
  const [activeMenu, setActiveMenu] = useState("MoodReport");

  const [userData, setUserData] = useState({
    username: "",
    profileImage: "",
    description: "",
  });

  const getUserId = async (): Promise<string | null> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return null; // 토큰이 없을 경우 null 반환
    }
    const userId = jwtDecode(token).sub;
    if (!userId) return null;
    else return userId;
  };

  // fetchUserData를 컴포넌트 내부에서 정의 (useEffect 바깥으로 이동)
  useEffect(() => {
    fetchUserData(); // 어디서든 호출 가능하도록 useEffect와 fetchUserDate를 분리
  }, []);

  // 로그인된 유저 정보
  const fetchUserData = async () => {
    const userId = await getUserId();
    if (!userId) return;

    try {
      const response = await axios.get(
        `https://api.meet-da.site/user/${userId}/`
      );
      const { username, profileImage, description } = response.data;
      setUserData({ username, profileImage, description });
    } catch (error) {
      console.error("유저 정보를 불러오는 데 실패했습니다:", error);
    }
  };

  const location = useLocation(); // 현재 경로를 가져옴
  const navigate = useNavigate();

  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const isModalOpen = (type?: string) => {
    console.log(type);

    if (type) {
      setIsModalClick(type);
    } else {
      setIsModalClick();
    }
  };

  // 메뉴 상태를 URL 경로에 맞게 설정
  useEffect(() => {
    // 경로에서 마지막 부분을 가져와서 activeMenu에 설정
    const path = location.pathname.split("/").pop();
    const matchedMenu = menuItems.find((menu) => menu.path === path);
    if (matchedMenu) {
      setActiveMenu(matchedMenu.key);
    }
  }, [location]);

  // 메뉴 데이터 정의
  const menuItems = [
    { key: "MoodReport", path: "mood-report", label: "무드 리포트" },
    { key: "Diary", path: "diary-management", label: "다이어리 관리" },
    { key: "Point", path: "point-management", label: "포인트 관리" },
    { key: "Theme", path: "theme", label: "테마" },
    { key: "Setting", path: "settings", label: "설정" },
  ];

  const linkCalendar = () => {
    navigate("/calendar");
  };

  const handleDiaryClick = () => {
    setActiveMenu("Diary"); // 다이어리 메뉴 활성화
    navigate("diary-management"); // 다이어리 관리 페이지로 이동
  };

  const [posts, setPosts] = useState<Post[]>([]);

  // 내 게시글 데이터 가져오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get<Post[]>(
          `https://api.meet-da.site/board/my-posts`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 데 실패했습니다:", error);
      }
    }
    fetchPosts();
  }, []);

  const token = localStorage.getItem("accessToken");
  console.log("Token:", token);
  console.log("Posts state:", posts);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // EditButton 클릭 시 파일 선택창 열기
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 핸들러 (업로드 후 setUserData 업데이트)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // 확장자 변환
      let newFile = file;
      if (file.type === "image/jpg") {
        newFile = new File([file], file.name.replace(".jpg", ".jpeg"), {
          type: "image/jpeg",
        });
      }

      // 불필요한 S3 업로드 제거 후 updateProfile만 호출
      await updateProfile(newFile);
    }
  };

  // 백엔드에 프로필 이미지 업데이트 요청
  const updateProfile = async (file: File) => {
    const userId = await getUserId();
    if (!userId) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("username", userData.username);
    formData.append("description", userData.description);

    try {
      const response = await axios.patch(
        `https://api.meet-da.site/user/${userId}/profile`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("프로필 업데이트 성공:", response.data);

      // 백엔드 응답에서 새로운 이미지 URL을 가져옴
      const updatedImageUrl = response.data.profileImage;

      // 상태 업데이트
      setUserData((prev) => ({ ...prev, profileImage: updatedImageUrl }));

      // localStorage 업데이트 및 이벤트 발생
      localStorage.setItem("profileImage", updatedImageUrl);
      window.dispatchEvent(new Event("storage")); // 다른 컴포넌트에서 감지할 수 있도록 이벤트 발생

      // 최신 데이터 반영
      fetchUserData();
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };

  const [moodCount, setMoodCount] = useState<number>(0); // 무드 개수 상태 추가

  const fetchUserMoods = async () => {
    const userId = await getUserId();
    if (!userId) return;

    // 현재 연도와 월 가져오기
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JS의 getMonth()는 0부터 시작

    try {
      const response = await axios.get(
        `https://api.meet-da.site/user/${userId}/moods?year=${year}&month=${month}`
      );

      // 무드 개수 상태 업데이트
      setMoodCount(response.data.length);
    } catch (error) {
      console.error("무드 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchUserMoods();
  }, []);

  return (
    <Layout>
      <NavigationWrapper>
        <ProfileContainer>
          {/* 프로필 이미지 */}
          {userData.profileImage ? (
            <ProfileImage src={userData.profileImage} alt="Profile" />
          ) : (
            <ProfileImagePlaceholder>
              {/* 이미지를 등록하지 않은 경우의 스타일 */}
            </ProfileImagePlaceholder>
          )}
          {/* 숨겨진 파일 선택 input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <EditButton onClick={handleButtonClick}>
            <IconStyle />
          </EditButton>
        </ProfileContainer>
        <UserInfo>
          <UserTextWrapper>
            <UserName>{userData.username}</UserName>
            <UserState>
              {userData.description || "MEET·DA에서 서로를 믿어봐요!"}
            </UserState>
          </UserTextWrapper>
          <ButtonWrapper>
            <ProfileButton
              $variant="friend"
              onClick={() => isModalOpen("friendModal")}
            >
              17명의 친구
            </ProfileButton>
            <ProfileButton $variant="diary" onClick={handleDiaryClick}>
              {posts.length}개의 다이어리
            </ProfileButton>
            <ProfileButton $variant="mood" onClick={linkCalendar}>
              {moodCount}개의 무드
            </ProfileButton>
          </ButtonWrapper>
        </UserInfo>
      </NavigationWrapper>
      <ContentWrapper>
        <SideMenuWrapper>
          {menuItems.map((menu) => (
            <SideMenu key={menu.key}>
              <SideMenuPoint
                $isClicked={activeMenu === menu.key}
                $variant="clicked"
              />
              <Link to={menu.path}>
                <SideMenuText
                  $isClicked={activeMenu === menu.key}
                  $variant="clicked"
                  onClick={() => setActiveMenu(menu.key)}
                >
                  {menu.label}
                </SideMenuText>
              </Link>
            </SideMenu>
          ))}
        </SideMenuWrapper>
        {/* Outlet으로 동적 콘텐츠 삽입 */}
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </Layout>
  );
}
