import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  :root {
    /* Basic Colors */
    --black: #000000; /* 강조 및 내용 작성 텍스트 색상 */
    --white: #FFFFFF;

    /* Background Colors */
    --bg-01: #FFF9F5; /* 캘린더 및 모달 배경색 */
    --bg-02: #F8F4E7; /* 버튼 및 답글창 배경색 */
    --bg-mood: #E2EBC1; /* 무드 클릭 시 배경색 */
  
    /* Line Colors */
    --line-green: #99C1C9; /* 피드 검색창 라인 색상 */
    --line-diary: #968786; /* 피드 게시글 라인 색 */
    --line-basic: #B1AB99; /* 일부 버튼 및 기본선 등 색상 */

    /* Button & Hover Colors */
    --submit-button: #FFC096; /* 등록 버튼 색 */
    --comment-button: #A1B982; /* 댓글 및 답글 버튼 색 */
    --disable-button: #E6E6E6; /* 비활성 버튼 색 */
    --orange-button: #F9A950; /* 일부 버튼 및 라인 색 */
    --hover-orange: #F4F2E3; /* 헤어지기 버튼 호버 배경색 */
    --hover-green: #D0EAE4; /* 만나기 버튼 호버 색 */
    
    /* Green Colors */
    --feed-searchbar: #C2E2A2; /* 피드 검색창 색 */
    --past-track: #B8D7D1; /* 지난 날짜 무드 기록 화면 색 */
    
    /* Orange Colors */
    --main-orange: #F37352; /* 메인 테마 색상 */
    
    /* Red Colors */
    --error-01: #F174A4; /* 비밀번호 변경 입력 오류 인풋 라인 및 안내 문구 색상 */
    --error-02: #E01B00; /* 회원가입 입력 오류 인풋 라인 및 안내 문구 색상 */

    /* Text Colors */
    --main-text: #54533A; /* 메인 텍스트 색상 */
    --sub-text: #635E4E; /* 서브 텍스트 색상 */
    --diary-text: #4B4B4B; /* 피드 내용, 댓글 등 텍스트 색상 */
    --unfollow-text: #C46242; /* 헤어지기 버튼 텍스트 색상 */
    --search-placeholder: #645E4E; /* 마이페이지 검색창 placeholder 색 */
    --text-01: #868686; /* 비활성 버튼 텍스트 색상 */
    --text-02: #B5B5B5; /* 로그인 및 회원가입, 일부 모달 텍스트 색상 */
    --text-03: #C9C9C9; /* 작성 전 및 보조 텍스트 색상 */

    /* Point Colors */
    --point-blue: #1F87FF; /* 마이페이지 적립 포인트 표시 색 */
    --point-red: #F43333; /* 마이페이지 사용 포인트 표시 색 */
  }
  *{
    box-sizing: border-box;
  }
  
 html {
    font-family: 'Pretendard', sans-serif;
    font-weight: var(--font-regular);
  }

  /* Font weight utility classes */
  .font-regular {
    font-weight: var(--font-regular);
  }
  .font-medium {
    font-weight: var(--font-medium);
  }
  .font-semibold {
    font-weight: var(--font-semibold);
  }
  .font-bold {
    font-weight: var(--font-bold);
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--bg-01);
    color: var(--main-text);
    height: 100%;
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  input {
    background: none;
    border: none;
    outline: none;
  }

  /* Responsive styles */
  @media (max-width: var(--mobile)) {
    html {
      font-size: 14px;
    }
    body {
      background-color: var(--white);
    }
  }

  @media (max-width: var(--tablet)) and (min-width: var(--mobile)) {
    html {
      font-size: 16px;
    }
    body {
      background-color: var(--white);
    }
  }

  @media (min-width: var(--desktop)) {
    html {
      font-size: 18px;
    }
  }
`;

export default GlobalStyles;
