import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import FindPasswordModal from "./FindPasswordModal";
import React from "react";
import NoticeModal from "./NoticeModal";
import SignUpModal from "./SignUpModal";
import ChangePasswordModal from "./ChangePasswordModal";
import FriendModal from "./FriendModal";
import MoodTrackerModal from "./MoodTrackerModal";
import PointModal from "./PointModal";
import DeleteCompleteModal from "./DeleteCompleteModal";
import DeleteModal from "./DeleteModal";
import DeleteIdModal from "./DeleteIdModal";
import DeleteThemeCompleteModal from "./DeleteThemeCompleteModal";

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  min-width: 30.25rem;
  // background-color:var(--white);
  text-align: center;
  position: relative;
  z-index: 100;
  border-radius: 1.25rem;
`;

export default function ModalTemplate() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const modalData = useIsModalStore((state) => state.modalData);

  // 모달 배경 클릭 시 종료
  const ModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalClick();
    }
  };

  return (
    <ModalWrap onClick={ModalClose}>
      <ModalContainer>
        {(() => {
          switch (useIsModal) {
            case "findPasswordModal":
              return <FindPasswordModal />;
            case "moodTrackerModal":
              return <MoodTrackerModal />;
            case "noticeModal":
              return <NoticeModal />;
            case "signUpModal":
              return <SignUpModal />;
            case "changePasswordModal":
              return <ChangePasswordModal />;
            case "deleteIdModal":
              return <DeleteIdModal />;
            case "deleteModal":
              return modalData ? (
                <DeleteModal
                  title={modalData.title}
                  content={modalData.content}
                  onConfirm={modalData.onConfirm}
                />
              ) : null;
            case "deleteCompleteModal":
              return <DeleteCompleteModal />;
            case "deleteThemeCompleteModal":
              return modalData ? (
                <DeleteThemeCompleteModal
                  title={modalData.title}
                  content={modalData.content}
                />
              ) : null;
            case "friendModal":
              return <FriendModal />;
            case "pointModal":
              return modalData ? (
                <PointModal
                  title={modalData.title}
                  content={modalData.content}
                  onConfirm={modalData.onConfirm}
                />
              ) : null;
            default:
              return <p>{useIsModal}</p>;
          }
        })()}
      </ModalContainer>
    </ModalWrap>
  );
}
