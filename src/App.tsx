import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GlobalStyles from "./styles/GlobalStyle";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Header style={{ height: "86px" }} />
      <Outlet />
      <Footer />
    </AppContainer>
  );
}

export default App;
