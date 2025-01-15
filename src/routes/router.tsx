import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Page1 from "../pages/Page1/Page1";
import Page2 from "../pages/Page2/Page2";
import FeedPage from "@/pages/Feed/FeedPage";
import MypageNavigation from "@/components/layout/navigation/MypageNavigation";
import MoodReport from "@/pages/Mypage/MoodReport";
import DiaryManagement from "@/pages/Mypage/DiaryManagement";
import PointManagement from "@/pages/Mypage/PointManagement";
import Theme from "@/pages/Mypage/Theme/Theme";
import Settings from "@/pages/Mypage/Settings";
import Emoji from "@/pages/Mypage/Theme/TabMenu/Emoji";
import Font from "@/pages/Mypage/Theme/TabMenu/Font";
import Own from "@/pages/Mypage/Theme/TabMenu/Own";
import MainPage from "@/pages/Calendar/MainPage";
import Join from "@/pages/auth/Join";
import Login from "@/pages/auth/Login";
import PrivateRoute from "@/components/PrivateRoute/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/page1",
        element: <PrivateRoute element={<Page1 />} isLoggedIn={false} />,
      },
      {
        path: "/page2",
        element: <PrivateRoute element={<Page2 />} isLoggedIn={false} />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/join",
        element: <Join />,
      },
      {
        path: "/mypage",
        element: (
          <PrivateRoute element={<MypageNavigation />} isLoggedIn={false} />
        ), // MypageNavigation 컴포넌트 추가
        children: [
          { index: true, element: <MoodReport /> }, // 기본 라우트 설정
          {
            path: "mood-report",
            element: (
              <PrivateRoute element={<MoodReport />} isLoggedIn={false} />
            ), // 무드 리포트 페이지
          },
          {
            path: "diary-management",
            element: (
              <PrivateRoute element={<DiaryManagement />} isLoggedIn={false} />
            ), // 다이어리 관리 페이지
          },
          {
            path: "point-management",
            element: (
              <PrivateRoute element={<PointManagement />} isLoggedIn={false} />
            ), // 포인트 관리 페이지
          },
          {
            path: "theme",
            element: <Theme />, // 테마 페이지
            children: [
              { index: true, element: <Emoji /> }, // 기본 라우트 설정
              {
                path: "emoji",
                element: <Emoji />,
              },
              {
                path: "font",
                element: <Font />,
              },
              {
                path: "own",
                element: <Own />,
              },
            ],
          },
          {
            path: "settings",
            element: <PrivateRoute element={<Settings />} isLoggedIn={false} />, // 설정 페이지
          },
        ],
      },
    ],
  },
]);
