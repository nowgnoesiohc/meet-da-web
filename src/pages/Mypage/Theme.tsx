import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  padding: 40px 80px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  gap: 30px;
  padding:;
`;

const TabMenu = styled.div``;

const SideMenu = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 390px) {
    gap: 0.5rem;
  }
`;

const SideMenuTextStyle = {
  unclicked: {
    color: "var(--text-03)",
  },
  clicked: {
    color: "var(--black)",
  },
};

const SideMenuText = styled.button<{
  variant: "clicked" | "unclicked";
  isClicked: boolean;
}>`
  display: flex;
  color: ${(props) =>
    props.isClicked
      ? SideMenuTextStyle.clicked.color
      : SideMenuTextStyle.unclicked.color};
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    font-size: 1rem; /* 중간 화면에서 크기 축소 */
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const SideMenuPointStyle = {
  unclicked: {
    backgroundColor: "var(--text-03)",
  },
  clicked: {
    backgroundColor: "var(--main-orange)",
  },
};

const SideMenuPoint = styled.button<{
  variant: "clicked" | "unclicked";
  isClicked: boolean;
}>`
  display: flex;
  align-self: center;
  aspect-ratio: 1 / 1; /* 정비례 원 */
  width: 0.75rem;
  border-radius: 50%; /* 완벽한 원 */
  background-color: ${(props) =>
    props.isClicked
      ? SideMenuPointStyle.clicked.backgroundColor
      : SideMenuPointStyle.unclicked.backgroundColor};
`;

export default function Theme() {
  return (
    <>
      <Layout>Theme 퍼블리싱 예정</Layout>
    </>
  );
}
