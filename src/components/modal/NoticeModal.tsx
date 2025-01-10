import styled from "styled-components";
import CloseButton from "./CloseButton";
import { OrangeButton } from "../ui/Button";

const Wrap = styled.div`
  width: 30.25rem;
  background-color: var(--white);
  border-radius: 1.875rem;
  padding-top: 4.125rem;
  padding-bottom: 2.75rem;

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
  }
`;

const NoticeText = styled.div`
  > h2 {
    margin: 0;
    font-size: 1.625rem;
    font-weight: var(--font-semibold);
    color: var(--main-orange);
    margin-bottom: 0.75rem;
  }

  > p {
    margin: 0;
    color: var(--main-text);
    font-weight: var(--font-medium);
    font-size: 1.25rem;
  }

  @media (max-width: 390px) {
    > h2 {
      font-size: 1.5rem;
    }

    > p {
      font-size: 1.125rem;
    }
  }
`;

const Button = styled.button`
  color: var(--white);
  border-radius: 0.625rem;
  font-weight: var(--font-medium);
  padding: 0;
  margin-top: 2.875rem;

  > button {
    width: 7.625rem;
    height: 3rem;
    font-size: 1.25rem;
  }

  @media (max-width: 390px) {
    > button {
      width: 6.25rem;
      font-size: 1.125rem;
    }
  }
`;

export default function NoticeModal() {
  return (
    <>
      <Wrap>
        <CloseButton />
        <NoticeText>
          <h2>알림</h2>
          <p>로그인이 필요한 서비스입니다.</p>
          <p>로그인 하시겠습니까?</p>
        </NoticeText>
        <Button>
          <OrangeButton variant="signupToLogin">로그인</OrangeButton>
        </Button>
      </Wrap>
    </>
  );
}
