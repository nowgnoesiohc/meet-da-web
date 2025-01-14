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
import Join from "@/pages/auth/Join";
import Login from "@/pages/auth/Login";
import PrivateRoute from "@/components/PrivateRoute/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: <PrivateRoute element={<FeedPage />} isLoggedIn={false} />,
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
            element: <PrivateRoute element={<Theme />} isLoggedIn={false} />, // 테마 페이지
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
