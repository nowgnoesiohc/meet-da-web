import styled from "styled-components"
import { useIsModalStore } from "../../store/ModalStore"
import FindPasswordModal from "./FindPasswordModal"
import React from "react"
import MoodTrackerModal from "./MoodTrackerModal"
import NoticeModal from "./NoticeModal"
import SignUpModal from "./SignUpModal"
import BoardWriteModal from "./BoardWriteModal"
import CommentWriteModal from "./CommentWriteModal"
import ThemaBuyModal from "./ThemaBuyModal"
import ThemaBuyCompleteModal from "./ThemaBuyCompleteModal"
import ChangePasswordModal from "./ChangePasswordModal"
import DeleteIdModal from "./DeleteIdModal"
import DeleteIdCompleteModal from "./DeleteIdCompleteModal"
import DeleteThemaModal from "./DeleteThemaModal"
import DeleteThemaCompleteModal from "./DeleteThemaCompleteModal"
import FriendModal from "./FriendModal"
import PopularDiaryModal from "./PopularDiaryModal"
import TodayMoodModal from "./TodayMood"



const ModalWrap = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.2);
    display:flex;
    justify-content:center;
    align-items:center;
`

const ModalContainer = styled.div`
    min-width:30.25rem;
    // background-color:#fff;
    text-align:center;
    position:relative;
    z-index:100;
    border-radius:1.25rem;
`

export default function ModalTemplate(){
    const useIsModal = useIsModalStore((state) => state.isModal)
    const setIsModalClick = useIsModalStore((state) => state.setIsModalClick); 

    // 모달 배경 클릭 시 종료
    const ModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget){
            setIsModalClick();
        }
    }

    return(
        <ModalWrap onClick={ModalClose}>
            <ModalContainer>
                {(() => {
                    switch(useIsModal){
                        case 'findPasswordModal':
                            return <FindPasswordModal/>;
                        case 'moodTrackerModal':
                            return <MoodTrackerModal/>;
                        case 'noticeModal':
                            return <NoticeModal/>;
                        case 'signUpModal':
                            return <SignUpModal/>;
                        case 'boardWriteModal':
                            return <BoardWriteModal/>;
                        case 'commentWriteModal':
                            return <CommentWriteModal />;
                        case 'themaBuyModal':
                            return <ThemaBuyModal />;
                        case 'themaCompleteModal':
                            return <ThemaBuyCompleteModal />;
                        case 'changePasswordModal':
                            return <ChangePasswordModal />;
                        case 'deleteIdModal':
                            return <DeleteIdModal />;
                        case 'deleteIdCompleteModal':
                            return <DeleteIdCompleteModal />;
                        case 'deleteThemaModal':
                            return <DeleteThemaModal />;
                        case 'deleteThemaCompleteModal':
                            return <DeleteThemaCompleteModal />;
                        case 'friendModal':
                            return <FriendModal />;
                        case 'popularDiaryModal':
                            return <PopularDiaryModal />;
                        case 'todayMoodModal':
                            return <TodayMoodModal />;
                        default:
                            return <p>{useIsModal}</p>
                    }
                })()}
            </ModalContainer>
        </ModalWrap>
    )
}