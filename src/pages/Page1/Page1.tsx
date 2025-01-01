import styled from "styled-components";
import Navigation from "../../components/layout/navigation/Navigation";
import MypageNavigation from "../../components/layout/navigation/MypageNavigation";

const Layout = styled.div`
  display: flex;
  margin: 5.25rem 5rem 0rem;
  align-items: center;

  @media (max-width: 781px) {
    margin: 5.25rem 3.125rem;
  }

  @media (max-width: 390px) {
    margin: 1.875rem 1.25rem;
  }
`;

export default function Page1() {
  return (
    <>
      <Navigation />
      <Layout>
        <MypageNavigation />
      </Layout>
    </>
  );
}
