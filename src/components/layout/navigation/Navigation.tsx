import styled from "styled-components";
import logo from "/src/assets/images/logo.png";
import home from "/src/assets/icon/homeIcon.png";
import calendar from "/src/assets/icon/calendarIcon.png";
import post from "/src/assets/icon/postIcon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

const ImageButton = styled(Link)<{ variant: "home" | "post" | "calendar" }>`
  display: block;
  width: ${(props) =>
    props.variant === "home"
      ? "clamp(1rem, 5vw, 2.5rem)"
      : props.variant === "post"
        ? "clamp(0.75rem, 4.5vw, 2.5rem)"
        : "clamp(0.75rem, 4.5vw, 2.5rem)"};
  height: ${(props) =>
    props.variant === "home"
      ? "clamp(0.8rem, 4vw, 2.25rem)"
      : props.variant === "post"
        ? "clamp(0.6rem, 4vw, 2rem)"
        : "clamp(0.6rem, 4vw, 2rem)"};
  background-image: ${(props) =>
    props.variant === "home"
      ? `url(${home})`
      : props.variant === "post"
        ? `url(${post})`
        : `url(${calendar})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextButton = styled.button<{ variant: "before" | "after" }>`
  color: ${(props) =>
    props.variant === "before"
      ? "var(--main-text)"
      : "var(--search-placeholder)"};
  font-size: clamp(0.75rem, 1.5vw, 1rem);
  font-weight: ${(props) =>
    props.variant === "before" ? "var(--font-medium)" : "var(--font-regular)"};
  cursor: pointer;
`;

const MyProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(1.25rem, 4vw, 2.5rem);
  height: clamp(1.25rem, 4vw, 2.5rem);
  border-radius: 50%;
  background-color: var(--line-basic);
  cursor: pointer;
`;

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    // 페이지 로드 및 경로 변경시 로그인 상태 확인
    checkLoginStatus();
  }, [location.pathname]); // location.pathname만 의존성으로 추가

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };
  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSignUp = () => {
    navigate("/auth/join");
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <NavigationBar>
          <LogoButton to="/" />
          <ButtonWrapper>
            <ImageButtonGroup>
              <ImageButton variant="home" to="/feed" />
              <ImageButton variant="post" to="/Page1" />
              <ImageButton variant="calendar" to="/" />
            </ImageButtonGroup>
            <TextButtonGroup>
              <TextButton variant="after">마이 페이지</TextButton>
              <TextButton variant="after" onClick={handleLogout}>
                로그아웃
              </TextButton>
            </TextButtonGroup>
            <MyProfileButton />
          </ButtonWrapper>
        </NavigationBar>
      ) : (
        <NavigationBar>
          <LogoButton to="/" />
          <ButtonWrapper>
            <TextButtonGroup>
              <TextButton variant="before" onClick={handleLogin}>
                Login
              </TextButton>
              <TextButton variant="before" onClick={handleSignUp}>
                Signup
              </TextButton>
            </TextButtonGroup>
          </ButtonWrapper>
        </NavigationBar>
      )}
    </>
  );
}
