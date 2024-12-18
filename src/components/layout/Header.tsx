import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/">메인</NavLink>
        </li>
        <li>
          <NavLink to="/page1">페이지1</NavLink>
        </li>
        <li>
          <NavLink to="/page2">페이지2</NavLink>
        </li>
      </ul>
    </>
  );
}
