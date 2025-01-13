import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import GlobalStyles from "./styles/GlobalStyle";
import ModalPortal from "./components/modal/ModalPortal";
import ModalTemplate from "./components/modal/ModalTemplate";
import { useIsModalStore } from "./store/ModalStore";
// import Navigation from "./components/layout/navigation/Navigation";
// import MypageNavigation from "./components/layout/navigation/MypageNavigation";

function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      {/* <Navigation />
      <MypageNavigation /> */}
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}
    </>
  );
}

export default App;
