import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import { OrangeButton } from "../ui/Button";

const DeleteIdWrap = styled.div`
  width: 30.25rem;
  background-color: var(--white);
  border-radius: 1.875rem;
  padding-top: 4rem;
  padding-bottom: 2.875rem;

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
    padding-top: 2.5rem;
    padding-bottom: 1.875rem;
  }
`;

const Title = styled.div`
  > h2 {
    font-size: 1.625rem;
    font-weight: var(--font-semibold);
    color: var(--main-orange);
    margin: 0;
    padding-bottom: 1.5rem;
  }

  > p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: var(--font-medium);
    color: var(--main-text);
    padding-bottom: 3.75rem;
  }

  @media (max-width: 390px) {
    > h2 {
      font-size: 1.5rem;
    }
    > p {
      font-size: 1.125rem;
      padding-bottom: 3rem;
    }
  }
`;

const Button = styled.div`
  width: 16.75rem;
  height: 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  > button {
    width: 7.625rem;
    height: 3rem;
    border-radius: 0.625rem;
    font-size: 1.25rem;
    font-weight: var(--font-semibold);
  }

  > button {
    background-color: var(--main-orange);
    color: var(--main-text);
    color: var(--white);
  }
`;

export default function DeleteIdCompleteModal() {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const onClickCheck = () => {
    setIsModalClick();
  };

  return (
    <>
      <DeleteIdWrap>
        <Title>
          <h2>회원 탈퇴 완료</h2>
          <p>회원 탈퇴가 정상적으로 처리되었습니다.</p>
        </Title>
        <Button>
          <OrangeButton variant="confirm" onClick={onClickCheck}>
            확인
          </OrangeButton>
        </Button>
      </DeleteIdWrap>
    </>
  );
}
