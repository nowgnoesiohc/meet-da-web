import styled from "styled-components";
import logo from "/src/assets/logo.png";
import home from "/src/assets/homeIcon.png";
import calendar from "/src/assets/calendarIcon.png";
import post from "/src/assets/postIcon.png";
import { Link } from "react-router-dom";

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
  return (
    <>
      <NavigationBar>
        <LogoButton to="/Page1" />
        <ButtonWrapper>
          <ImageButtonGroup>
            <ImageButton variant="home" to="/Page1" />
            <ImageButton variant="post" to="/Page1" />
            <ImageButton variant="calendar" to="/Page1" />
          </ImageButtonGroup>
          <TextButtonGroup>
            <TextButton variant="after">마이 페이지</TextButton>
            <TextButton variant="after">로그아웃</TextButton>
          </TextButtonGroup>
          <MyProfileButton />
        </ButtonWrapper>
      </NavigationBar>
      <NavigationBar>
        <LogoButton to="/Page1" />
        <ButtonWrapper>
          <TextButtonGroup>
            <TextButton variant="before">Login</TextButton>
            <TextButton variant="before">Signup</TextButton>
          </TextButtonGroup>
        </ButtonWrapper>
      </NavigationBar>
    </>
  );
}
