import styled from "styled-components";
import logo from "/src/assets/images/logo.png";
import home from "/src/assets/icon/homeIcon.png";
import calendar from "/src/assets/icon/calendarIcon.png";
import post from "/src/assets/icon/postIcon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: clamp(3rem, 4vw, 3.5rem);
  margin: clamp(1rem, 3vw, 1.875rem) clamp(1rem, 4vw, 5rem) 0;
  background-color: var(--white);
`;

const LogoButton = styled(Link)`
  display: block;
  width: clamp(5rem, 15vw, 11.375rem);
  height: clamp(3rem, 4vw, 3.5rem);
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-decoration: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: clamp(0.5rem, 2vw, 1.25rem);
  align-items: center;
`;

const ImageButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.5rem, 2vw, 1.25rem);
`;

const TextButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.25rem, 1vw, 0.75rem);
`;

const ImageButton = styled(Link)<{ $variant: "home" | "post" | "calendar" }>`
  display: block;
  width: ${(props) =>
    props.$variant === "home"
      ? "clamp(1rem, 5vw, 2.5rem)"
      : props.$variant === "post"
        ? "clamp(0.75rem, 4.5vw, 2.5rem)"
        : "clamp(0.75rem, 4.5vw, 2.5rem)"};
  height: ${(props) =>
    props.$variant === "home"
      ? "clamp(0.8rem, 4vw, 2.25rem)"
      : props.$variant === "post"
        ? "clamp(0.6rem, 4vw, 2rem)"
        : "clamp(0.6rem, 4vw, 2rem)"};
  background-image: ${(props) =>
    props.$variant === "home"
      ? `url(${home})`
      : props.$variant === "post"
        ? `url(${post})`
        : `url(${calendar})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextButton = styled.button<{ $variant: "before" | "after" }>`
  color: ${(props) =>
    props.$variant === "before"
      ? "var(--main-text)"
      : "var(--search-placeholder)"};
  font-size: clamp(0.75rem, 1.5vw, 1rem);
  font-weight: ${(props) =>
    props.$variant === "before" ? "var(--font-medium)" : "var(--font-regular)"};
  cursor: pointer;
`;

const MyProfileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(1.25rem, 4vw, 2.5rem);
  height: clamp(1.25rem, 4vw, 2.5rem);
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  background-color: var(--line-basic);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileImagePlaceholder = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--line-basic);

  @media (max-width: 781px) {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 390px) {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

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
    return userId;
  };

  const fetchUserData = async () => {
    const userId = await getUserId();
    if (!userId) return; // 유저 ID가 없으면 중단
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

  useEffect(() => {
    checkLoginStatus();
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [location.pathname, isLoggedIn]); // location.pathname과 isLoggedIn 상태에 의존

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // 페이지 로드 및 경로 변경시 로그인 상태 확인
    checkLoginStatus();
  }, [location.pathname]); // location.pathname만 의존성으로 추가

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSignUp = () => {
    navigate("/auth/join");
  };

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userId = jwtDecode(token).sub;
      sessionStorage.removeItem(`appliedFont_${userId}`);
      sessionStorage.removeItem(`appliedTheme_${userId}`);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("appliedFont");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  const handleMypage = () => {
    navigate("/mypage");
  };

  const handleHomeClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (location.pathname === "/") {
      event.preventDefault(); // 기본 이동 방지
      navigate(0); // 현재 페이지를 새로고침
    }
  };

  useEffect(() => {
    const updateProfileImage = () => {
      const newImage = localStorage.getItem("profileImage");
      if (newImage)
        setUserData((prev) => ({ ...prev, profileImage: newImage }));
    };

    window.addEventListener("storage", updateProfileImage);
    return () => window.removeEventListener("storage", updateProfileImage);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <NavigationBar>
          <LogoButton to="/" onClick={handleHomeClick} />
          <ButtonWrapper>
            <ImageButtonGroup>
              <ImageButton $variant="home" to="/" onClick={handleHomeClick} />
              <ImageButton $variant="post" to="/board/new" />
              <ImageButton $variant="calendar" to="/calendar" />
            </ImageButtonGroup>
            <TextButtonGroup>
              <TextButton $variant="after" onClick={handleMypage}>
                마이 페이지
              </TextButton>
              <TextButton $variant="after" onClick={handleLogout}>
                로그아웃
              </TextButton>
            </TextButtonGroup>
            {userData.profileImage ? (
              <MyProfileButton onClick={handleMypage}>
                <img src={userData.profileImage} alt="User Profile" />
              </MyProfileButton>
            ) : (
              <ProfileImagePlaceholder>
                {/* 이미지를 등록하지 않은 경우의 스타일 */}
              </ProfileImagePlaceholder>
            )}
          </ButtonWrapper>
        </NavigationBar>
      ) : (
        <NavigationBar>
          <LogoButton to="/" onClick={handleHomeClick} />
          <ButtonWrapper>
            <TextButtonGroup>
              <TextButton $variant="before" onClick={handleLogin}>
                Login
              </TextButton>
              <TextButton $variant="before" onClick={handleSignUp}>
                Signup
              </TextButton>
            </TextButtonGroup>
          </ButtonWrapper>
        </NavigationBar>
      )}
    </>
  );
}
