import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import FindPasswordModal from "./FindPasswordModal";
import React from "react";
import NoticeModal from "./NoticeModal";
import SignUpModal from "./SignUpModal";
import ThemaBuyCompleteModal from "./ThemeBuyCompleteModal";
import ChangePasswordModal from "./ChangePasswordModal";
import FriendModal from "./FriendModal";
import MoodTrackerModal from "./MoodTrackerModal";
import PointModal from "./PointModal";
import DeleteCompleteModal from "./DeleteCompleteModal";
import DeleteModal from "./DeleteModal";

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
`;

const ModalContainer = styled.div`
  min-width: 30.25rem;
  // background-color:var(--white);
  text-align: center;
  position: relative;
  z-index: 100;
  border-radius: 1.25rem;
`;
type ModalTemplateProps = {
  modalData: {
    mood: string | null;
    memo: string;
  };
};

export default function ModalTemplate({ modalData }: ModalTemplateProps) {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

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
              return (
                <MoodTrackerModal
                  initialMood={modalData.mood}
                  initialMemo={modalData.memo}
                />
              );
            case "noticeModal":
              return <NoticeModal />;
            case "signUpModal":
              return <SignUpModal />;
            case "themaCompleteModal":
              return <ThemaBuyCompleteModal />;
            case "changePasswordModal":
              return <ChangePasswordModal />;
            case "deleteModal":
              return <DeleteModal />;
            case "deleteCompleteModal":
              return <DeleteCompleteModal />;
            case "friendModal":
              return <FriendModal />;
            case "pointModal":
              return <PointModal />;
            default:
              return <p>{useIsModal}</p>;
          }
        })()}
      </ModalContainer>
    </ModalWrap>
  );
}
