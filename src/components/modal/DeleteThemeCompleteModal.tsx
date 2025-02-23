import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import { OrangeButton } from "../ui/Button";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const DeleteThmeaWrap = styled.div`
  width: 30.25rem;
  background-color: var(--white);
  border-radius: 1.875rem;
  padding-top: 4rem;
  padding-bottom: 2.875rem;

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
    padding-top: 2.625rem;
    padding-bottom: 1.75rem;
  }
`;

const Title = styled.div`
  > h2 {
    font-size: 1.625rem;
    font-weight: var(--font-semibold);
    color: var(--main-orange);
    margin: 0;
    padding-bottom: 1.5rem;
    display: flex;
    justify-content: center;
  }

  > p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: var(--font-medium);
    color: var(--main-text);
    padding-bottom: 3.75rem;
    display: flex;
    justify-content: center;
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
`;

export default function DeleteThemeCompleteModal({
  title,
  content,
}: {
  title: string;
  content: string;
  onConfirm?: () => void;
}) {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  useEffect(() => {
    return () => {
      setIsModalClick(null); // 모달이 사라질 때 상태 초기화
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={() => setIsModalClick(null)}>
      <DeleteThmeaWrap onClick={(e) => e.stopPropagation()}>
        <Title>
          <h2>{title}</h2>
          <p>{content}</p>
        </Title>
        <Button>
          <OrangeButton
            $variant="confirm"
            onClick={() => setIsModalClick(null)}
          >
            확인
          </OrangeButton>
        </Button>
      </DeleteThmeaWrap>
    </ModalOverlay>,
    document.body
  );
}
