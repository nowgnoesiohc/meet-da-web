import GlobalStyle from "/Users/noey/Desktop/meet-so-sa/meet-da-web/src/styles/GlobalStyle.ts";
import {
  FriendButton,
  PointConfirmButton,
  RecordButton,
  OrangeButton,
  DiaryButton,
  CommentButton,
  ReplyButton,
  DiarySettingButton,
  ProfileButton,
  MypageButton,
  OrangeLineButton,
  FriendTabButton,
} from "/Users/noey/Desktop/meet-so-sa/meet-da-web/src/components/ui/Button";
import { useState } from "react";

export function Page1() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked); // 클릭 상태 토글
  };

  return (
    <>
      <GlobalStyle />
      <div style={{ backgroundColor: "var(--white)" }}>
        <h1 style={{ color: "var(--orange-button)" }}>
          Hello Styled Components
        </h1>
        <p style={{ color: "var(--error-02)" }}>This is a sample text</p>
        <FriendButton variant="follow">만나기</FriendButton>
        <FriendButton variant="unfollow">헤어지기</FriendButton>
        <FriendButton variant="modalUnfollow">헤어지기</FriendButton>
        <FriendButton variant="diaryFollow">만나기</FriendButton>
        <PointConfirmButton>확인</PointConfirmButton>
        <RecordButton variant="moodCancel">취소</RecordButton>
        <RecordButton variant="moodSubmit">등록</RecordButton>
        <OrangeButton variant="membership">로그인 하기</OrangeButton>
        <OrangeButton variant="mailSend">메일 전송하기</OrangeButton>
        <OrangeButton variant="confirm">확인</OrangeButton>
        <OrangeButton variant="signupToLogin">로그인</OrangeButton>
        <DiaryButton variant="delete">삭제하기</DiaryButton>
        <DiaryButton variant="modify">수정하기</DiaryButton>
        <CommentButton>댓글 작성</CommentButton>
        <ReplyButton variant="cancel">취소</ReplyButton>
        <ReplyButton variant="comment">댓글 작성</ReplyButton>
        <DiarySettingButton variant="delete">삭제하기</DiarySettingButton>
        <DiarySettingButton variant="bookmark">북마크 하기</DiarySettingButton>
        <ProfileButton variant="friend">17명의 친구</ProfileButton>
        <ProfileButton variant="diary">38개의 다이어리</ProfileButton>
        <ProfileButton variant="mood">97개의 무드</ProfileButton>
        <OrangeLineButton variant="theme">구매하기</OrangeLineButton>
        <OrangeLineButton variant="moveToHome">🏠</OrangeLineButton>
        <OrangeLineButton variant="modal">취소</OrangeLineButton>
        <FriendTabButton
          isClicked={isClicked}
          onClick={handleClick}
          variant="unclicked"
        >
          믿으미
        </FriendTabButton>
        <FriendTabButton
          isClicked={isClicked}
          onClick={handleClick}
          variant="unclicked"
        >
          서로 믿음
        </FriendTabButton>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter something..."
          />
          <MypageButton variant="active" disabled={!inputValue.trim()}>
            저장
          </MypageButton>
        </div>
        <MypageButton variant="cancel">취소</MypageButton>
        <MypageButton variant="active">저장</MypageButton>
      </div>
    </>
  );
}

export default Page1;
