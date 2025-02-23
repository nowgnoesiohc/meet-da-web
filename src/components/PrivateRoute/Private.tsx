import React, { useEffect } from "react";
import { useIsModalStore } from "@/store/ModalStore";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setIsModalClick("noticeModal"); // 로그인하지 않은 경우 모달 열기
    }
  }, [accessToken, setIsModalClick]);

  return <>{element}</>;
};

export default PrivateRoute;
