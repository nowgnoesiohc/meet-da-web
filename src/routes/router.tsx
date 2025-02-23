import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import FeedPage from "@/pages/Feed/FeedPage";
import MypageNavigation from "@/components/layout/navigation/MypageNavigation";
import MoodReport from "@/pages/Mypage/MoodReport";
import DiaryManagement from "@/pages/Mypage/Diary/DiaryManagement";
import PointManagement from "@/pages/Mypage/PointManagement";
import Theme from "@/pages/Mypage/Theme/Theme";
import Settings from "@/pages/Mypage/Settings";
import Emoji from "@/pages/Mypage/Theme/TabMenu/Emoji";
import Font from "@/pages/Mypage/Theme/TabMenu/Font";
import Own from "@/pages/Mypage/Theme/TabMenu/Own";
import Join from "@/pages/auth/Join";
import Login from "@/pages/auth/Login";
import PrivateRoute from "@/components/PrivateRoute/Private";
import App from "@/App";
import CalendarPage from "@/pages/Calendar/CalendarPage";
import BoardWrite from "@/pages/board/new/BoardWrite";
import BoardDetail from "@/pages/board/[boardId]/Detail";
import MyDiary from "@/pages/Mypage/Diary/TabMenu/MyDiary";
import BookMark from "@/pages/Mypage/Diary/TabMenu/Bookmark";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/calendar",
        element: <PrivateRoute element={<CalendarPage />} />,
      },
      {
        path: "/board/new",
        element: <PrivateRoute element={<BoardWrite isEdit={false} />} />,
      },
      {
        path: "/board/edit/:boardId",
        element: <PrivateRoute element={<BoardWrite isEdit={true} />} />,
      },
      {
        path: "board/:boardId",
        element: <PrivateRoute element={<BoardDetail />} />,
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
        element: <PrivateRoute element={<MypageNavigation />} />,
        children: [
          { index: true, element: <MoodReport /> },
          {
            path: "mood-report",
            element: <PrivateRoute element={<MoodReport />} />,
          },
          {
            path: "diary-management",
            element: <DiaryManagement />,
            children: [
              { index: true, element: <MyDiary /> },
              { path: "mydiary", element: <MyDiary /> },
              { path: "bookmark", element: <BookMark /> },
            ],
          },
          {
            path: "point-management",
            element: <PrivateRoute element={<PointManagement />} />,
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
            element: <PrivateRoute element={<Settings />} />,
          },
        ],
      },
    ],
  },
]);
