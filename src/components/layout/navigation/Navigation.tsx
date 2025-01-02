import styled from "styled-components";
import logo from "/src/assets/logo.png";
import home from "/src/assets/homeIcon.png";
import calendar from "/src/assets/calendarIcon.png";
import post from "/src/assets/postIcon.png";
import { Link } from "react-router-dom";

// 반응형 작업하기!!

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  margin: 1.875rem 5rem 0rem;
  background-color: var(--white);

  @media (max-width: 781px) {
    height: 3.125rem;
    margin: 1.875rem 0.5rem 0rem;
  }

  @media (max-width: 390px) {
    height: 3.125rem;
    margin: 1.875rem 0.5rem 0rem;
  }
`;

const LogoButton = styled(Link)`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 11.375rem;
  height: 3.5rem;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-decoration: none; /* 링크 밑줄 제거 */
  cursor: pointer;

  @media (max-width: 781px) {
    width: 7.5rem;
    height: 3.125rem;
  }

  @media (max-width: 390px) {
    width: 5.125rem;
    height: 3.125rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 781px) {
    gap: 0.75rem;
  }

  @media (max-width: 390px) {
    gap: 0.5rem;
  }
`;

const ImageButtonGroup = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 781px) {
    gap: 1rem;
  }

  @media (max-width: 390px) {
    gap: 0.5rem;
  }
`;

const TextButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 781px) {
    gap: 0.1rem;
  }

  @media (max-width: 390px) {
    gap: 0.1rem;
  }
`;

const ImageStyle = {
  home: {
    default: {
      width: "2.5rem",
      height: "2.25rem",
      backgroundImage: `url(${home})`,
    },
    tablet: {
      width: "1.75rem",
      height: "1.5rem",
      backgroundImage: `url(${home})`,
    },
    mobile: {
      width: "1.125rem",
      height: "1rem",
      backgroundImage: `url(${home})`,
    },
  },
  post: {
    default: {
      width: "2.5rem",
      height: "2rem",
      backgroundImage: `url(${post})`,
    },
    tablet: {
      width: "1.625rem",
      height: "1.5rem",
      backgroundImage: `url(${post})`,
    },
    mobile: {
      width: "1.125rem",
      height: "0.9375rem",
      backgroundImage: `url(${post})`,
    },
  },
  calendar: {
    default: {
      width: "2.5rem",
      height: "2rem",
      backgroundImage: `url(${calendar})`,
    },
    tablet: {
      width: "1.625rem",
      height: "1.5rem",
      backgroundImage: `url(${calendar})`,
    },
    mobile: {
      width: "1.125rem",
      height: "1rem",
      backgroundImage: `url(${calendar})`,
    },
  },
};

const ImageButton = styled(Link)<{ variant: "home" | "post" | "calendar" }>`
  display: flex;
  align-items: center;
  width: ${(props) => ImageStyle[props.variant].default.width};
  height: ${(props) => ImageStyle[props.variant].default.height};
  background-image: ${(props) =>
    ImageStyle[props.variant].default.backgroundImage};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-decoration: none; /* 링크 밑줄 제거 */
  cursor: pointer;

  @media (max-width: 781px) {
    width: ${(props) => ImageStyle[props.variant].tablet.width};
    height: ${(props) => ImageStyle[props.variant].tablet.height};
    background-image: ${(props) =>
      ImageStyle[props.variant].tablet.backgroundImage};
  }

  @media (max-width: 390px) {
    width: ${(props) => ImageStyle[props.variant].mobile.width};
    height: ${(props) => ImageStyle[props.variant].mobile.height};
    background-image: ${(props) =>
      ImageStyle[props.variant].mobile.backgroundImage};
  }
`;

const TextButton = styled.button<{ variant: "before" | "after" }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.variant === "before"
      ? "var(--main-text)"
      : "var(--search-placeholder)"};
  text-align: center;
  font-size: 1rem;
  font-weight: ${(props) =>
    props.variant === "before" ? "var(--font-medium)" : "var(--font-regular)"};
  cursor: pointer;

  @media (max-width: 781px) {
    font-size: 1rem;
  }

  @media (max-width: 390px) {
    font-size: 0.75rem;
  }
`;

const MyProfileButton = styled.button`
  display: flex;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6.25rem;
  background-color: var(--line-basic);
  cursor: pointer;

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
