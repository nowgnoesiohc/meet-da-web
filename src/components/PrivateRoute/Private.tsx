import React, { useEffect } from "react";
import { useIsModalStore } from "@/store/ModalStore";

interface PrivateRouteProps {
  element: JSX.Element;
  isLoggedIn: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setIsModalClick("noticeModal"); // 로그인하지 않은 경우 모달 열기
    }
  }, [accessToken, setIsModalClick]);
  if (!accessToken) {
    return null; // 다른 요소를 렌더링하지 않음
  }

  return <>{element}</>;
};

export default PrivateRoute;
