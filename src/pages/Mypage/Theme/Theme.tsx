import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px 80px 32px;

  @media (max-width: 781px) {
    padding: 40px 50px 32px;
  }

  @media (max-width: 390px) {
    gap: 12px;
    padding: 40px 0px 32px;
  }
`;

const TabWrapper = styled.button<{
  isClicked: boolean;
}>`
  display: flex;
  height: 48px;
  border-bottom: ${(props) =>
    props.isClicked ? "2px solid var(--orange-button)" : ""};

  @media (max-width: 781px) {
    height: 34px;
  }
`;

const TabMenu = styled.button`
  display: flex;
  width: 100%;
  height: 26px;
  padding-bottom: 16px;
  color: var(--black);
  font-size: 24px;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    font-size: 16px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
`;

export default function Theme() {
  const navigate = useNavigate();
  const location = useLocation();

  // 메뉴 데이터 정의
  const TabItems = [
    { key: "Emoji", path: "emoji", label: "이모지" },
    { key: "Font", path: "font", label: "폰트" },
    { key: "Own", path: "own", label: "보유 테마" },
  ];

  // 현재 활성 탭을 상태로 관리
  const [activeTab, setActiveTab] = useState("Emoji");

  // 컴포넌트가 처음 로드되었을 때 기본 경로로 리다이렉트
  useEffect(() => {
    if (location.pathname === "/mypage" || location.pathname === "/mypage/") {
      navigate(TabItems[0].path); // 기본 경로로 리다이렉트
    }
  }, [location, navigate]);

  // 현재 경로에 따라 활성 탭 상태 업데이트
  useEffect(() => {
    const currentTab = TabItems.find((tab) =>
      location.pathname.includes(tab.path)
    );
    if (currentTab) {
      setActiveTab(currentTab.key);
    }
  }, [location.pathname]);

  return (
    <>
      <Layout>
        {TabItems.map((menu) => (
          <TabWrapper key={menu.key} isClicked={activeTab === menu.key}>
            <Link to={menu.path}>
              <TabMenu onClick={() => setActiveTab(menu.key)}>
                {menu.label}
              </TabMenu>
            </Link>
          </TabWrapper>
        ))}
      </Layout>
      <ContentWrapper>
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </>
  );
}
