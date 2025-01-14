// import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navigation from "./navigation/Navigation";

export default function Header() {
  const location = useLocation();

  // Navigation을 숨기고 싶은 경로를 정의합니다.
  const hideNavigationPaths = ["/auth/login"];

  // 현재 경로가 Navigation을 숨겨야 하는지 확인합니다.
  const shouldHideNavigation = hideNavigationPaths.includes(location.pathname);

  return <>{!shouldHideNavigation && <Navigation />}</>;
}
