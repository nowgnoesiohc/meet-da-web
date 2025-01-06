import GlobalStyle from "@/styles/GlobalStyle";
import { Input, Textarea } from "@/components/ui/Input";
import { useIsModalStore } from "@/store/ModalStore";
import styled from "styled-components";

const Button = styled.div`
  width:300px;
  > button{
    width:100%;
    font-size:30px;
    padding:20px;
    border:10px solid var(--main-orange);
    margin:10px 0;
  }
`

export function Page1() {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
    
  const FindPassword = (type?: string) => {
      console.log(type);

      if(type){
          setIsModalClick(type);
      } else{
          setIsModalClick();
      }

  };

  return (
    <>
      <GlobalStyle />
      <div style={{ backgroundColor: "var(--bg-01)" }}>
        <h1 style={{ color: "var(--orange-button)" }}>
          Hello Styled Components
        </h1>
        <p style={{ color: "var(--error-02)" }}>This is a sample text</p>

        <div style={{ width: "300px", margin: "50px auto" }}>
          <h2>Input 예제</h2>
          <Input placeholder="이름을 입력하세요" maxLength={10} showCount />

          <h2>Textarea 예제</h2>
          <Textarea placeholder="내용을 입력하세요" maxLength={50} showCount />
        </div>
      </div>

      <Button>
          <button onClick={() => FindPassword('popularDiaryModal')}>인기다이어리</button>
          <button onClick={() => FindPassword('findPasswordModal')}>비밀번호 찾기</button>
          <button onClick={() => FindPassword('moodTrackerModal')}> 무드트래커</button>
          <button onClick={() => FindPassword('noticeModal')}>알림모달</button>
          <button onClick={() => FindPassword('signUpModal')}>회원가입</button>          
          <button onClick={() => FindPassword('boardWriteModal')}>게시글작성</button>
          <button onClick={() => FindPassword('commentWriteModal')}>댓글작성</button>
          <button onClick={() => FindPassword('themaBuyModal')}>테마구매</button>
          <button onClick={() => FindPassword('themaCompleteModal')}>테마구매완료</button>
          <button onClick={() => FindPassword('changePasswordModal')}>비밀번호변경</button>
          <button onClick={() => FindPassword('deleteIdModal')}>회원탈퇴</button>
          <button onClick={() => FindPassword('deleteIdCompleteModal')}>회원탈퇴완료모달</button>
          <button onClick={() => FindPassword('deleteThemaModal')}>테마삭제</button>
          <button onClick={() => FindPassword('deleteThemaCompleteModal')}>테마삭제완료</button>
          <button onClick={() => FindPassword('friendModal')}>친구모달</button>
          <button onClick={() => FindPassword('todayMoodModal')}>무드기록 포인트적립</button>
      </Button>
    </>
  );
}

export default Page1;
