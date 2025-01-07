import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Page1 from "../pages/Page1/Page1";
import Page2 from "../pages/Page2/Page2";
import FeedPage from "@/pages/Feed/FeedPage";
import MypageNavigation from "@/components/layout/navigation/MypageNavigation";
import MoodReport from "@/pages/Mypage/MoodReport";
import DiaryManagement from "@/pages/Mypage/DiaryManagement";
import PointManagement from "@/pages/Mypage/PointManagement";
import Theme from "@/pages/Mypage/Theme";
import Settings from "@/pages/Mypage/Settings";
import Join from "@/pages/join/Join";
import Login from "@/pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/page1",
        element: <Page1 />,
      },
      {
        path: "/page2",
        element: <Page2 />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/join",
        element: <Join />
      },
      {
        path: "/mypage",
        element: <MypageNavigation />, // MypageNavigation 컴포넌트 추가
        children: [
          {
            path: "mood-report",
            element: <MoodReport />, // 무드 리포트 페이지
          },
          {
            path: "diary-management",
            element: <DiaryManagement />, // 다이어리 관리 페이지
          },
          {
            path: "point-management",
            element: <PointManagement />, // 포인트 관리 페이지
          },
          {
            path: "theme",
            element: <Theme />, // 테마 페이지
          },
          {
            path: "settings",
            element: <Settings />, // 설정 페이지
          },
        ],
      },
    ],
  },
]);
