import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import { OrangeButton, OrangeLineButton } from "../ui/Button";

const ThemaBuyWrap = styled.div`
  width: 30.25rem;
  background-color: var(--white);
  border-radius: 1.875rem;
  padding-bottom: 2.875rem;

  @media (max-width: 781px) {
    width: 30.25rem;
  }

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
    border-radius: 1.875rem;
    padding-bottom: 1.75rem;
  }
`;

const Title = styled.div`
  padding-top: 3.625rem;

  > h2 {
    font-size: 1.625rem;
    font-weight: var(--font-semibold);
    color: var(--main-orange);
    margin: 0;
    padding-bottom: 1.875rem;
  }

  > p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: var(--font-medium);
    color: var(--main-text);
  }
  > p:last-child {
    font-size: 1.125rem;
    font-weight: var(--font-regular);
    color: var(--text-03);
    padding-top: 0.5rem;
    padding-bottom: 2.375rem;
  }

  @media (max-width: 390px) {
    padding-top: 2.375rem;

    > h2 {
      font-size: 1.5rem;
      padding-bottom: 1.25rem;
    }
    > p {
      font-size: 1.125rem;
    }
    > p:last-child {
      font-size: 1rem;
      padding-top: 0.375rem;
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
`;

export default function ThemeBuyModal() {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const onClickCancel = () => {
    setIsModalClick();
  };

  return (
    <>
      <ThemaBuyWrap>
        <Title>
          <h2>파스텔 팝콘 세트</h2>
          <p>구매 하시겠습니까?</p>
          <p>300 포인트 차감됩니다.</p>
        </Title>
        <Button>
          <OrangeLineButton $variant="modal" onClick={onClickCancel}>
            취소
          </OrangeLineButton>
          <OrangeButton $variant="confirm">확인</OrangeButton>
        </Button>
      </ThemaBuyWrap>
    </>
  );
}
