import styled from "styled-components";
import CheckImg from "../../assets/images/signUp.svg";
import { OrangeButton } from "../ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import { CommonModalProps } from "@/store/ModalTypes";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

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

const Point = styled.div`
  width: 36.5rem;
  background-color: var(--bg-01);
  border-radius: 5rem;
  padding-top: 3.375rem;
  padding-bottom: 3.5rem;

  @media (max-width: 781px) {
    width: 29.5rem;
  }

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
    border-radius: 2.5rem;
    padding-top: 2.375rem;
    padding-bottom: 1.875rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    margin: 0;
    font-size: 1.5rem;
    padding-top: 1.25rem;
    text-align: center;
  }
  > p:last-child {
    font-size: 1.125rem;
    color: var(--text-03);
    padding: 0;
    text-align: center;
  }

  > h2 {
    margin: 0;
    font-size: 2.25rem;
    color: var(--main-orange);
    padding: 1.25rem 0;
    text-align: center;
  }

  @media (max-width: 390px) {
    > h2 {
      font-size: 1.75rem;
    }
    > p {
      padding-top: 1.25rem;
    }
    > p:last-child {
      font-size: 1rem;
    }
  }
`;

const Button = styled.div`
  margin-top: 1.75rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;

  > button {
    height: 3.5rem;
  }
`;

const Image = styled.img`
  width: 8.75rem;
  height: 7.125rem;


  @media (max-width: 781px) {
  width: 7.5rem;
  height: 5.125rem;
`;

export default function PointModal({
  title,
  content = "",
  subContent,
  onConfirm,
}: CommonModalProps) {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(
    document.getElementById("point-modal-root") || null
  );

  // 모달 컨테이너가 없으면 생성하는 로직
  useEffect(() => {
    let existingRoot = document.getElementById("point-modal-root");
    if (!existingRoot) {
      existingRoot = document.createElement("div");
      existingRoot.id = "point-modal-root";
      document.body.appendChild(existingRoot);
    }
    setModalRoot(existingRoot);
  }, []);

  if (!modalRoot) return <></>; // modalRoot가 없으면 렌더링하지 않음 (<></>로 렌더링 안전성 확보)

  return ReactDOM.createPortal(
    <ModalOverlay onClick={() => setIsModalClick(null)}>
      <Point onClick={(e) => e.stopPropagation()}>
        <Title>
          <Image src={CheckImg} alt="체크 이미지" />
          <p>{title}</p>
          <h2>{content}</h2>
          {subContent && <p>{subContent}</p>} {/* 회원탈퇴 모달에선 제거 */}
        </Title>
        <Button>
          <OrangeButton $variant="confirm" onClick={onConfirm}>
            확인
          </OrangeButton>
        </Button>
      </Point>
    </ModalOverlay>,
    modalRoot // 동적으로 생성된 컨테이너에 렌더링
  );
}
