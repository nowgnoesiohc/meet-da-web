import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <NavLink to="/">메인</NavLink>
      <NavLink to="/page1">페이지1</NavLink>
      <NavLink to="/page2">페이지2</NavLink>
    </div>
  );
}
