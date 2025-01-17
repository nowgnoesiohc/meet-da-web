import styled from "styled-components";
import moodReport from "@/assets/test/moodreport.png";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding: 2.5rem 1.25rem 0rem 5rem;
  align-items: center;

  @media (max-width: 781px) {
    padding: 2.5rem 1.25rem 0rem 3.125rem;
    height: 100%;
  }

  @media (max-width: 390px) {
    gap: 1.625rem;
    height: 100%;
    padding-left: 0rem;
  }
`;

const TestImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default function MoodReport() {
  return (
    <>
      <Layout>
        <TestImg src={moodReport} />
      </Layout>
    </>
  );
}
