import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import GlobalStyles from "./styles/GlobalStyle";
import { useIsModalStore } from "./store/ModalStore";
import ModalPortal from "./components/modal/ModalPortal";
import ModalTemplate from "./components/modal/ModalTemplate";
// import Navigation from "./components/layout/navigation/Navigation";
// import MypageNavigation from "./components/layout/navigation/MypageNavigation";

function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}
      {/* <Navigation />
      <MypageNavigation /> */}
    </>
  );
}

export default App;
