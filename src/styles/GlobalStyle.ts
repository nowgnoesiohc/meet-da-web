import { fontFiles, themeFonts } from "@/assets/common/themeFonts";
import { createGlobalStyle } from "styled-components";

// 기본 폰트
const defaultFont = "'Pretendard', sans-serif";

// 구매한 폰트 가져오기
const appliedFont = localStorage.getItem("appliedFont") || defaultFont;
const appliedFontFile = fontFiles[appliedFont];

const GlobalStyles = createGlobalStyle`

  :root {
    /* Basic Colors */
    --black: #000000; /* 강조 및 내용 작성 텍스트 색상 */
    --white: #FFFFFF;

    /* Background Colors */
    --bg-01: #FFFCF5; /* 캘린더 및 모달 배경색 */
    --bg-02: #F5F1E7; /* 버튼 및 답글창 배경색 */
    --bg-mood: #E2EBC1; /* 무드 클릭 시 배경색 */
  
    /* Line Colors */
    --line-green: #99C1B9; /* 피드 검색창 라인 색상 */
    --line-diary: #968786; /* 피드 게시글 라인 색 */
    --line-basic: #B1AB99; /* 일부 버튼 및 기본선 등 색상 */

    /* Button & Hover Colors */
    --submit-button: #FFC99C; /* 등록 버튼 색 */
    --comment-button: #A1AB82; /* 댓글 및 답글 버튼 색 */
    --disable-button: #E6E6E6; /* 비활성 버튼 색 */
    --orange-button: #F69250; /* 일부 버튼 및 라인 색 */
    --hover-orange: #FFF2E2; /* 헤어지기 버튼 호버 배경색 */
    --hover-green: #DCF2E2; /* 만나기 버튼 호버 색 */
    
    /* Green Colors */
    --feed-searchbar: #D3E9E4; /* 피드 검색창 색 */
    --past-track: #B8D7D1; /* 지난 날짜 무드 기록 화면 색 */
    
    /* Orange Colors */
    --main-orange: #F3752E; /* 메인 테마 색상 */
    
    /* Red Colors */
    --error-01: #F1474A; /* 비밀번호 변경 입력 오류 인풋 라인 및 안내 문구 색상 */
    --error-02: #EB1D20; /* 회원가입 입력 오류 인풋 라인 및 안내 문구 색상 */

    /* Text Colors */
    --main-text: #54433A; /* 메인 텍스트 색상 */
    --sub-text: #635E4E; /* 서브 텍스트 색상 */
    --diary-text: #4B4B4B; /* 피드 내용, 댓글 등 텍스트 색상 */
    --unfollow-text: #C66224; /* 헤어지기 버튼 텍스트 색상 */
    --search-placeholder: #645E4E; /* 마이페이지 검색창 placeholder 색 */
    --text-01: #868686; /* 비활성 버튼 텍스트 색상 */
    --text-02: #958B85; /* 로그인 및 회원가입, 일부 모달 텍스트 색상 */
    --text-03: #C9C9C9; /* 작성 전 및 보조 텍스트 색상 */

    /* Point Colors */
    --point-blue: #1F88FF; /* 마이페이지 적립 포인트 표시 색 */
    --point-red: #F43333; /* 마이페이지 사용 포인트 표시 색 */

    /* Font Weight */
    --font-regular: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;

  }
  *{
    box-sizing: border-box;
  }

  /* 기본 폰트 설정 */
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  ${
    appliedFont !== defaultFont && appliedFontFile
      ? `
      @font-face {
        font-family: '${appliedFont}';
        src: url('${appliedFontFile}') format('truetype');
      }
    `
      : ""
  }

  * {
    font-family: ${themeFonts[appliedFont] || defaultFont} !important;
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
    background-color: var(--white);
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
    font-family: 'Pretendard', sans-serif;
    font-weight: var(--font-regular);
  }

  input {
    background: none;
    border: none;
    outline: none;
  }

  swiper-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    transition-property: transform;
    transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
    box-sizing: content-box;
  }

  /* Responsive styles */
  @media (max-width: 390px) {
    html {
      font-size: 0.875rem;

    }
    body {
      background-color: var(--white);
    }
  }


  @media (max-width: 781px) and (min-width: 390px) {
    html {
      font-size: 1rem;

    }
    body {
      background-color: var(--white);
    }
  }

  @media (min-width: 1920px) {
    html {
      font-size: 1.125rem;

    }
    body {
      background-color: var(--white);
    }
  }
`;

export default GlobalStyles;
