import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import { OrangeButton, OrangeLineButton } from "../ui/Button";
import ReactDOM from "react-dom";
import { CommonModalProps } from "@/store/ModalTypes";

// 모달 오버레이 추가 (배경)
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

const Wrap = styled.div`
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
    text-align: center;
  }

  > p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: var(--font-medium);
    color: var(--main-text);
    text-align: center;
  }
  > p:last-child {
    font-size: 1.125rem;
    font-weight: var(--font-regular);
    color: var(--text-03);
    padding-top: 0.5rem;
    padding-bottom: 2.375rem;
    text-align: center;
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

export default function DeleteModal({
  title,
  content = "",
  subContent,
  onConfirm,
}: CommonModalProps) {
  console.log("DeleteModal Props:", { title, content, subContent });

  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const onClickCancel = () => {
    setIsModalClick(null);
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={() => setIsModalClick(null)}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <Title>
          <h2>{title}</h2>
          <p>{content}</p>
          {subContent && <p>{subContent}</p>} {/* 회원탈퇴 모달에선 제거 */}
        </Title>
        <Button>
          <OrangeLineButton $variant="modal" onClick={onClickCancel}>
            취소
          </OrangeLineButton>
          <OrangeButton $variant="confirm" onClick={onConfirm}>
            확인
          </OrangeButton>
        </Button>
      </Wrap>
    </ModalOverlay>,
    document.body // 모달을 body에 추가하여 부모의 영향을 받지 않도록 함
  );
}
