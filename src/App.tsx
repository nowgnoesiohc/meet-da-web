import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import GlobalStyles from "./styles/GlobalStyle";
// import Navigation from "./components/layout/navigation/Navigation";
// import MypageNavigation from "./components/layout/navigation/MypageNavigation";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      {/* <Navigation />
      <MypageNavigation /> */}
    </>
  );
}

export default App;
