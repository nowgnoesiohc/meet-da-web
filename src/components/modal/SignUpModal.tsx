import styled from "styled-components";
import CloseButton from "./CloseButton";
import signUpImg from "../../assets/images/signUp.svg";
import { OrangeButton, OrangeLineButton } from "../ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  width: 36.5rem;
  // height:38.75rem;
  background-color: var(--white);
  border-radius: 1.875rem;

  @media (max-width: 390px) {
    width: 19.5rem;
    margin: 0 auto;
    border-radius: 0.75rem;
  }
`;

const Title = styled.div`
  padding-top: 6rem;

  > h2 {
    margin: 0;
    color: var(--main-orange);
    font-size: 1.75rem;
    font-weight: var(--font-semibold);
    padding-top: 1.875rem;
    padding-bottom: 2.875rem;
  }

  > p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: var(--font-medium);
  }

  > p:last-child {
    font-size: 1.25rem;
    font-weight: var(--font-regular);
    color: var(--text-03);
    padding-top: 0.375rem;
  }

  @media (max-width: 390px) {
    > h2 {
      font-size: 1.25rem;
      padding-bottom: 1.75rem;
    }
    > p {
      font-size: 1.125rem;
    }
  }
`;

const Button = styled.div`
  padding: 5rem 1.625rem 6rem 1.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;

  @media (max-width: 390px) {
    padding: 3.125rem 1.625rem 3.75rem 1.625rem;
  }
`;

export default function SignUpModal() {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const handleClose = () => {
    setIsModalClick(undefined);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate("/auth/login");
  };

  const handleMoveToHome = () => {
    handleClose();
    navigate("/");
  };

  return (
    <>
      <Wrap>
        <CloseButton />
        <Title>
          <img src={signUpImg} alt="회원가입 이미지" />
          <h2>회원가입 완료</h2>
          <p>회원가입이 완료되었습니다.</p>
          <p>로그인 후 믿다를 이용해보세요!</p>
        </Title>
        <Button>
          <OrangeLineButton $variant="moveToHome" onClick={handleMoveToHome}>
            🏠
          </OrangeLineButton>
          <OrangeButton $variant="signupToLogin" onClick={handleLogin}>
            로그인
          </OrangeButton>
        </Button>
      </Wrap>
    </>
  );
}
