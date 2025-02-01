import { DiarySettingButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  gap: 1.875rem;
  padding: 2.5rem 1.25rem 0rem 5rem;
  margin-bottom: 2rem;

  @media (max-width: 781px) {
    flex-direction: column;
    padding: 2.5rem 1.25rem 0rem 3.125rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 390px) {
    gap: 1.25rem;
    padding: 2.5rem 1.25rem 1.25rem 0rem;
    margin: unset;
  }
`;

const TabWrap = styled.div`
  display: flex;
  gap: 1.875rem;
`;

const TabWrapper = styled.button`
  display: flex;
  height: 3rem;
  align-items: flex-start;

  @media (max-width: 781px) {
    height: 2.125rem;
  }
`;

const TabMenu = styled.button<{
  isClicked: boolean;
}>`
  display: flex;
  width: 100%;
  padding-bottom: 1rem;
  color: var(--black);
  font-size: 1.5rem;
  font-weight: var(--font-semibold);
  border-bottom: ${(props) =>
    props.isClicked ? "3px solid var(--orange-button)" : ""};

  @media (max-width: 781px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  width: 7.75rem;

  @media (max-width: 781px) {
    justify-content: center;
    margin: unset;
    width: 100%;
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

export default function DiaryManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  // 메뉴 데이터 정의
  const TabItems = [
    { key: "Mydiary", path: "mydiary", label: "내 다이어리" },
    { key: "Bookmark", path: "bookmark", label: "북마크" },
  ];

  // 현재 활성 탭을 상태로 관리
  const [activeTab, setActiveTab] = useState("Mydiary");

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

  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const isModalOpen = (type?: string) => {
    console.log(type);

    if (type) {
      setIsModalClick(type);
    } else {
      setIsModalClick();
    }
  };

  return (
    <>
      <Layout>
        <TabWrap>
          {TabItems.map((menu) => (
            <TabWrapper key={menu.key}>
              <Link to={menu.path}>
                <TabMenu
                  isClicked={activeTab === menu.key}
                  onClick={() => setActiveTab(menu.key)}
                >
                  {menu.label}
                </TabMenu>
              </Link>
            </TabWrapper>
          ))}
        </TabWrap>
        {activeTab === "Mydiary" && (
          <ButtonWrapper>
            <DiarySettingButton
              variant="delete"
              style={{ width: "100%", fontSize: "1.375rem" }}
              onClick={() => isModalOpen("deleteModal")}
            >
              삭제하기
            </DiarySettingButton>
          </ButtonWrapper>
        )}
        {activeTab === "Bookmark" && (
          <ButtonWrapper>
            <DiarySettingButton
              variant="bookmark"
              style={{ width: "100%", fontSize: "1.25rem" }}
              onClick={() => isModalOpen("deleteModal")}
            >
              북마크 해제
            </DiarySettingButton>
          </ButtonWrapper>
        )}
      </Layout>
      <ContentWrapper>
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </>
  );
}
