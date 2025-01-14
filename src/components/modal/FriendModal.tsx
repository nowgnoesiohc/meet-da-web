import styled from "styled-components";
import CloseButton from "./CloseButton";
import { IoSearch } from "react-icons/io5";
import { FriendButton, FriendTabButton } from "../ui/Button";
import { useState } from "react";

const Wrap = styled.div`
  width: 40.375rem;
  background-color: var(--bg-01);
  border-radius: 1.25rem;
  padding: 5.375rem 2.5rem 2.875rem;

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
    padding: 4.125rem 1.25rem 3.375rem;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35.375rem;
  height: 3.75rem;
  padding: 0.75rem 1.25rem 0.75rem 1.875rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--main-text);
  background-color: var(--white);
  margin: 0 auto;
  box-shadow: 0.125rem 0.125rem 0.5rem 0rem rgba(0, 0, 0, 0.25);

  @media (max-width: 390px) {
    width: 100%;
    padding: 12px 20px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 1.25rem;
  font-weight: var(--font-regular);

  &::placeholder {
    color: var(--sub-text);
    font-weight: var(--font-regular);
  }

  @media (max-width: 390px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  display: flex;
`;

const SearchIcon = styled(IoSearch)`
  color: var(--search-placeholder);
  font-size: 1.5rem;
`;

const Profile = styled.div`
  width: 35.375rem;
  height: 3rem;
  margin: 1.875rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;

  > p {
    font-size: 1.5rem;
    font-weight: var(--font-semibold);

    > span {
      font-size: 1.125rem;
    }
  }

  @media (max-width: 390px) {
    > p {
      margin: 0;
      padding-bottom: 0.75rem;

      > span {
        font-size: 1rem;
        font-weight: var(--font-regular);
      }
    }
  }

  @media (max-width: 390px) {
    width: 17.5rem;
    height: 5.625rem;
    display: block;
    text-align: left;
    margin: 1.25rem auto;
    padding: 0 1rem;
  }
`;

const Button = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const Content = styled.div`
  width: 35.375rem;
  background-color: var(--white);
  margin: 0 auto;
  border-radius: 0.75rem;
  box-shadow: 0.125rem 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
  padding: 2.5rem;

  @media (max-width: 390px) {
    width: 17.5rem;
    padding: 1.75rem 1.25rem;
  }
`;

const FriendList = styled.div`
  width: 30.375rem;
  height: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  &:not(:last-child) {
    margin-bottom: 1.75rem;
  }

  @media (max-width: 390px) {
    width: 15rem;
    height: 10.0625rem;
    display: block;

    > button {
      float: right;
    }
  }
`;

const FriendProfile = styled.div`
  width: 23.125rem;
  height: 3.25rem;
  border-radius: 0.625rem;
  background-color: var(--bg-02);
  display: flex;
  justify-content: space-around;
  padding: 0 1.25rem;

  @media (max-width: 390px) {
    width: 100%;
    height: 6.3125rem;
    display: block;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
  }
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const UserImage = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 6.25rem;
  background-color: var(--black);
`;

const UserName = styled.p`
  font-size: 1.125rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const UserText = styled.p`
  font-size: 1rem;
  color: var(--line-basic);

  @media (max-width: 390px) {
    text-align: left;
    font-size: 1rem;
    margin: 0;
  }
`;

export default function FriendModal() {
  // const [isClicked, setIsClicked] = useState(true);

  // const handleClick = () => {
  //   setIsClicked(!isClicked); // 클릭 상태 토글
  // };

  const [activeTab, setActiveTab] = useState("");

  const TabItems = [
    { key: "following", label: "서로 믿음" },
    { key: "follower", label: "믿으미" },
  ];

  return (
    <>
      <Wrap>
        <CloseButton />
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="믿다에서 새로운 친구를 만나보세요!"
          />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchBarContainer>
        <Profile>
          <p>
            포뇨소스케스키<span>님의</span>
          </p>
          <Button>
            {TabItems.map((menu) => (
              <FriendTabButton
                key={menu.key}
                isClicked={activeTab !== menu.key}
                onClick={() =>
                  setActiveTab(activeTab === menu.key ? "" : menu.key)
                }
                variant={activeTab === menu.key ? "clicked" : "unclicked"}
              >
                {menu.label}
              </FriendTabButton>
            ))}
          </Button>
        </Profile>
        <Content>
          {/* activeTab이 ""일 때는 아무것도 표시되지 않음 */}
          {activeTab && (
            <FriendList>
              <FriendProfile>
                <UserWrap>
                  <UserImage></UserImage>
                  <UserName>믿음소망사과</UserName>
                </UserWrap>
                <UserText>믿음소망사랑 아니고 사과</UserText>
              </FriendProfile>
              <FriendButton
                variant={
                  activeTab === "following" ? "diaryUnfollow" : "diaryFollow"
                }
              >
                {activeTab === "following" ? "헤어지기" : "만나기"}
              </FriendButton>
            </FriendList>
          )}
        </Content>
      </Wrap>
    </>
  );
}
