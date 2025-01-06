import styled from "styled-components";
import test from "/src/assets/testImage.png";
// import { Link } from "react-router-dom";
import { ProfileButton } from "../../ui/Button";
import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { Outlet, Link } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5.25rem 5rem 0rem;
  align-items: center;

  @media (max-width: 781px) {
    margin: 5.25rem auto;
  }

  @media (max-width: 390px) {
    margin: 1.875rem 1.25rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;

  @media (max-width: 390px) {
    border-top: 1px solid var(--line-basic);
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: calc(100vw - 12.1875rem); // (100vw - 195px)
  gap: 1.875rem;
  padding-bottom: 3.125rem;
  border-bottom: 1px solid var(--line-basic);

  @media (max-width: 781px) {
    width: calc(100vw - 3.125rem); // (100vw - 50px)
    padding-bottom: 3.25rem;
  }

  @media (max-width: 390px) {
    width: calc(100vw - 1.25rem); // (100vw - 20px)
    gap: 0.75rem;
    padding-bottom: 2.25rem;
  }
`;

const SideMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.375rem;
  height: 100vh;
  gap: 1.5rem;
  border-right: 1px solid var(--line-basic);
  padding: 3.75rem 4.875rem 0rem 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 781px) {
    width: 13rem;
    padding: 3.75rem 1.5rem 0rem;
  }

  @media (max-width: 390px) {
    width: calc(100vw - 1.25rem); // (100vw - 20px)
    flex-direction: row;
    align-items: center;
    height: auto;
    padding: 1.5rem 0rem;
    border-right: none;
  }
`;

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

const ProfileContainer = styled.div`
  position: relative; /* 자식 요소의 위치를 기준으로 설정 */
  width: 11.25rem; /* 이미지 크기 */
  height: 11.25rem;

  @media (max-width: 781px) {
    width: 10rem;
    height: 10rem;
  }

  @media (max-width: 390px) {
    width: 5.25rem;
    height: 5.25rem;
  }
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 0.625rem; /* 둥근 이미지 */
  object-fit: cover; /* 이미지가 부모 크기에 맞게 조정 */

  @media (max-width: 781px) {
    width: 8.75rem;
    height: 8.75rem;
  }

  @media (max-width: 390px) {
    width: 4.625rem;
    height: 4.625rem;
  }
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 3.125rem;
  height: 3.125rem;
  border: none;
  background-color: var(--orange-button);
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 390px) {
    width: 1.625rem;
    height: 1.625rem;
  }
`;

const IconStyle = styled(HiPencil)`
  color: var(--white);
  font-size: 1.5625rem;

  @media (max-width: 390px) {
    font-size: 0.8125rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.25rem;

  @media (max-width: 781px) {
    gap: 2rem;
  }

  @media (max-width: 390px) {
    gap: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 390px) {
    gap: 0.375rem;
  }
`;

const UserTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 390px) {
    gap: 0.375rem;
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  color: var(--main-text);
  font-size: 1.5rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const UserState = styled.div`
  display: flex;
  align-items: center;
  color: var(--search-placeholder);
  font-size: 1.125rem;
  font-weight: var(--font-regular);

  @media (max-width: 390px) {
    font-size: 0.75rem;
  }
`;

export default function MypageNavigation() {
  // 메뉴 상태를 배열로 관리
  const [activeMenu, setActiveMenu] = useState("MoodReport");

  // 메뉴 데이터 정의
  const menuItems = [
    { key: "MoodReport", path: "mood-report", label: "무드 리포트" },
    { key: "Diary", path: "diary-management", label: "다이어리 관리" },
    { key: "Point", path: "point-management", label: "포인트 관리" },
    { key: "Theme", path: "theme", label: "테마" },
    { key: "Setting", path: "settings", label: "설정" },
  ];

  return (
    <Layout>
      <NavigationWrapper>
        {/* <ProfileImage src={test} alt="test" /> */}
        <ProfileContainer>
          <ProfileImage src={test} alt="Profile" />
          <EditButton>
            <IconStyle />
          </EditButton>
        </ProfileContainer>
        <UserInfo>
          <UserTextWrapper>
            <UserName>믿음소망사과</UserName>
            <UserState>믿음 소망 사랑보다 강력한 사과</UserState>
          </UserTextWrapper>
          <ButtonWrapper>
            <ProfileButton variant="friend">17명의 친구</ProfileButton>
            <ProfileButton variant="diary">38개의 다이어리</ProfileButton>
            <ProfileButton variant="mood">97개의 무드</ProfileButton>
          </ButtonWrapper>
        </UserInfo>
      </NavigationWrapper>
      <ContentWrapper>
        <SideMenuWrapper>
          {menuItems.map((menu) => (
            <SideMenu key={menu.key}>
              <SideMenuPoint
                isClicked={activeMenu === menu.key}
                variant="clicked"
              />
              <Link to={menu.path}>
                <SideMenuText
                  isClicked={activeMenu === menu.key}
                  variant="clicked"
                  onClick={() => setActiveMenu(menu.key)}
                >
                  {menu.label}
                </SideMenuText>
              </Link>
            </SideMenu>
          ))}
        </SideMenuWrapper>
        {/* Outlet으로 동적 콘텐츠 삽입 */}
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </Layout>
  );
}
