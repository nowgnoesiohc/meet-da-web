import styled from "styled-components";
import CloseButton from "./CloseButton";
import Lock from "../../assets/images/lock.svg";
import { OrangeButton } from "../ui/Button";

const Wrap = styled.div`
  width: 36.5625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border-radius: 1.25rem;
  padding-bottom: 2.25rem;

  @media (max-width: 390px) {
    width: 19.5rem;
    margin: 0 auto;
  }
`;

const Image = styled.img`
  margin-top: 3.75rem;
`;

const Title = styled.div`
  margin-top: 2.25rem;

  > h2 {
    font-size: 1.5rem;
    font-weight: var(--font-medium);
    margin: 0;
    padding-bottom: 0.75rem;
  }

  > p {
    margin: 0;
    color: var(--text-02);
    font-size: 1.25rem;
    font-weight: var(--font-regular);
  }

  @media (max-width: 390px) {
    > h2 {
      font-size: 1.25rem;
    }

    > p {
      font-size: 0.875rem;
    }
  }
`;

const Input = styled.input`
  width: 27.625rem;
  height: 4.25rem;
  border: 0.0625rem solid var(--text-02);
  border-radius: 0.625rem;
  margin-top: 2.25rem;
  margin-bottom: 1.625rem;
  font-size: 1.5rem;
  padding-left: 1.125rem;
  color: var(--main-text);

  &:focus {
    border-color: var(--main-orange);
  }

  &::placeholder {
    color: var(--text-02);
  }

  @media (max-width: 390px) {
    width: 16.5rem;

    &::placeholder {
      font-size: 1.125rem;
    }
  }
`;

export default function FindPasswordModal() {
  return (
    <>
      <Wrap>
        <CloseButton />
        <Image src={Lock} alt="자물쇠이미지" />
        <Title>
          <h2>비밀번호 찾기</h2>
          <p>가입 시 등록한 이메일을 입력해주세요.</p>
          <p>이메일을 통해 비밀번호 재설정 링크를 보내드려요.</p>
        </Title>
        <Input type="text" placeholder="example@meetda.com" />
        <OrangeButton variant="mailSend">메일 전송하기</OrangeButton>
      </Wrap>
    </>
  );
}
