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
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />, // 루트 경로에서만 MainPage 렌더링
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "page1",
        element: <PrivateRoute element={<Page1 />} isLoggedIn={false} />,
      },
      {
        path: "page2",
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
        path: "mypage",
        element: (
          <PrivateRoute element={<MypageNavigation />} isLoggedIn={false} />
        ),
        children: [
          { index: true, element: <MoodReport /> },
          {
            path: "mood-report",
            element: (
              <PrivateRoute element={<MoodReport />} isLoggedIn={false} />
            ),
          },
          {
            path: "diary-management",
            element: (
              <PrivateRoute element={<DiaryManagement />} isLoggedIn={false} />
            ),
          },
          {
            path: "point-management",
            element: (
              <PrivateRoute element={<PointManagement />} isLoggedIn={false} />
            ),
          },
          {
            path: "theme",
            element: <Theme />,
            children: [
              { index: true, element: <Emoji /> },
              { path: "emoji", element: <Emoji /> },
              { path: "font", element: <Font /> },
              { path: "own", element: <Own /> },
            ],
          },
          {
            path: "settings",
            element: <PrivateRoute element={<Settings />} isLoggedIn={false} />,
          },
        ],
      },
    ],
  },
]);
