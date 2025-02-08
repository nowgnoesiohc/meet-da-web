import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import GlobalStyles from "./styles/GlobalStyle";
import { useIsModalStore } from "./store/ModalStore";
import ModalPortal from "./components/modal/ModalPortal";
import ModalTemplate from "./components/modal/ModalTemplate";

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
    </>
  );
}

export default App;
