import { DiarySettingButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import styled from "styled-components";
// import checkIcon from "../../assets/checkImg.png";

const Layout = styled.div`
  padding: 2.5rem 5rem;
  h2 {
    margin: 0;
  }

  @media (max-width: 781px) {
    padding: 2.5rem 3.75rem;
  }
  @media (max-width: 390px) {
    padding: 3.5rem 1.25rem;
    display: flex;
    justify-content: center;
  }
`;

const SettingWrap = styled.div`
  @media (max-width: 390px) {
    width: 20rem;
  }
`;

const TabWrap = styled.div`
  width: 68.625rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 781px) {
    width: 25.875rem;
  }
  @media (max-width: 390px) {
    width: 20rem;
  }
`;
const Tab = styled.div`
  width: 12.75rem;
  display: flex;
  justify-content: space-between;
`;
const TabButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: var(--font-semibold);
  position: relative;

  &:focus {
    outline: none;
  }
  &::after {
    content: "";
    display: ${(props) => (props.isActive ? "block" : "none")};
    position: absolute;
    left: 0;
    bottom: -0.125rem;
    width: 100%;
    height: 0.125rem;
    background-color: var(--orange-button);
  }
`;

const SearchWrap = styled.div`
  margin-top: 2rem;

  > div > input {
    font-size: 1.25rem;
    padding-left: 2.5rem;
    padding-right: 1.125rem;
  }

  @media (max-width: 781px) {
    width: 25.875rem;
  }
  @media (max-width: 390px) {
    width: 20rem;
    margin-top: 1.5rem;
  }
`;

const ContentWrap = styled.div`
  width: 68.625rem;
  height: 49.75rem;
  border-radius: 0.625rem;
  padding: 3rem 3.25rem;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: 1.25rem;
  overflow-y: auto;

  @media (max-width: 781px) {
    width: 25.875rem;
    padding: 0.5rem 1.5rem 4.25rem;
  }
  @media (max-width: 390px) {
    width: 20rem;
    margin-top: 1.625rem;
    padding-top: 2.375rem;
  }
`;
const ContentBox = styled.div`
  width: 62.125rem;

  @media (max-width: 781px) {
    width: 22.875rem;
  }
  @media (max-width: 390px) {
    width: 17rem;
  }
`;
const Content = styled.div`
  width: 62.125rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.875rem;

  @media (max-width: 781px) {
    flex-direction: column;
    width: 22.875rem;
    gap: 1.25rem;
    display: none;
  }
  @media (max-width: 390px) {
    width: 17rem;
  }
`;
const Responsive = styled.div`
  display: none;
  margin: 1.25rem 0;

  @media (max-width: 781px) {
    width: 22.875rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin: 1.875rem 0;

    span {
      font-size: 1.125rem;
      color: var(--text-03);
    }
  }
  @media (max-width: 390px) {
    width: 17rem;
  }
`;
const CheckBox = styled.div<{ checked: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.0625rem solid var(--line-basic);
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? "var(--bg-02)" : "#fff")};

  @media (max-width: 781px) {
    width: 1.875rem;
    height: 1.875rem;
  }
`;
const LineWrap = styled.div`
  width: 57.75rem;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid var(--line-basic);
  border-bottom: 1px solid var(--line-basic);
  padding: 1.375rem 0;

  @media (max-width: 781px) {
    width: 19.75rem;
    flex-direction: column;
    padding-top: 1.25rem;
    padding-bottom: 1.875rem;
    h2 {
      padding-top: 0.75rem;
    }
  }
  @media (max-width: 390px) {
    width: 13.875rem;
    padding-bottom: 1.25rem;
    span {
      font-size: 0.875rem;
    }
  }
`;
const Wrap = styled.div`
  width: 42.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImageWrap = styled.div`
  display: flex;
  width: 19.75rem;

  h2 {
    white-space: normal;
    overflow-wrap: break-word;
  }
  Image {
    width: 6.375rem;
    height: 5rem;
  }

  @media (max-width: 781px) {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  @media (max-width: 390px) {
    width: 13.875rem;
  }
`;
const Image = styled.div`
  width: 6.375rem;
  height: 5rem;
  background-color: green;
  border-radius: 0.375rem;
`;
const Question = styled.div`
  width: 35rem;
  height: 5rem;

  > h2 {
    font-size: 1.25rem;
    font-weight: var(--font-medium);
  }
  > span {
    padding-top: 0.625rem;
    font-size: 1.125rem;
    color: var(--text-03);
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (max-width: 781px) {
    width: 12.125rem;
  }
  @media (max-width: 390px) {
    width: 6.25rem;
    height: auto;
    h2 {
      width: 6.25rem;
      padding: 0;
      font-size: 1rem;
    }
  }
`;
const CreateDate = styled.div`
  color: var(--text-03);
  height: 5rem;
  font-size: 1.125rem;
  margin-top: 1.375rem;
  border-left: 0.0625rem solid var(--line-basic);

  @media (max-width: 781px) {
    height: auto;
    border: none;
  }
  @media (max-width: 390px) {
    margin-top: 1.25rem;
  }
`;
const Text = styled.div<{ isActive: boolean }>`
  width: 9.625rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span {
    padding: 0.5rem 0;
    font-size: 1.125rem;
  }
  > span:first-child {
    height: 5rem;
    padding: 0;
  }
  > span:last-child {
    width: 100%;
    text-align: center;
    display: ${(props) => (props.isActive ? "none" : "block")};
    color: #000;
    font-weight: var(--font-regular);
    border-top: 0.0625rem solid var(--line-basic);
  }

  @media (max-width: 781px) {
    height: auto;
    width: 100%;
    align-items: center;
    justify-content: ${(props) =>
      props.isActive ? "space-between" : "space-around"};
    flex-direction: row-reverse;
    border-top: ${(props) =>
      props.isActive ? "none" : "0.0625rem solid var(--line-basic)"};
    border-bottom: ${(props) =>
      props.isActive ? "none" : "0.0625rem solid var(--line-basic)"};

    > span {
      padding: 0.5rem 0;
      width: 9.875rem;
      font-size: 1.125rem;
      text-align: ${(props) => (props.isActive ? "right" : "center")};
    }
    > span:first-child {
      height: ${(props) => (props.isActive ? "1.5rem" : "3.125rem")};
      line-height: ${(props) => (props.isActive ? "1.5rem" : "3.125rem")};
      padding: 0;
      border-left: ${(props) =>
        props.isActive ? "none" : "1px solid var(--line-basic)"};
    }
    > span:last-child {
      width: 9.875rem;
      text-align: center;
      display: ${(props) => (props.isActive ? "none" : "block")};
      color: #000;
      font-weight: var(--font-regular);
      border: none;
    }
  }
  @media (max-width: 390px) {
    > span {
      font-size: 0.875rem;
    }
  }
`;

export default function DiaryManagement() {
  const [checked, setChecked] = useState<boolean>(false); // 체크 상태 관리
  const [active, setActive] = useState("diary");

  const toggleCheck = () => {
    setChecked((prev) => !prev); // 체크 상태 토글
  };

  return (
    <>
      <Layout>
        <SettingWrap>
          <TabWrap>
            <Tab>
              <TabButton
                isActive={active === "diary"}
                onClick={() => setActive("diary")}
              >
                내 다이어리
              </TabButton>
              <TabButton
                isActive={active === "bookmark"}
                onClick={() => setActive("bookmark")}
              >
                북마크
              </TabButton>
            </Tab>
            {active === "diary" && (
              <DiarySettingButton variant="delete">삭제하기</DiarySettingButton>
            )}
            {active === "bookmark" && (
              <DiarySettingButton variant="bookmark">
                북마크 해제
              </DiarySettingButton>
            )}
          </TabWrap>
          <SearchWrap>
            <Input type="text" placeholder="작성한 다이어리를 검색해 보세요." />
          </SearchWrap>
          <ContentWrap>
            <ContentBox>
              <Content>
                <CheckBox onClick={toggleCheck} checked={checked}></CheckBox>
                <LineWrap>
                  <Wrap>
                    <Image></Image>
                    <Question>
                      <h2>Q. 나의 단점 중 하나를 고칠 수 있다면?</h2>
                      <span>
                        한입 크기로 잘라 먹는 리액트 기초부터 실전까지 데대로
                        파는 자바스크립트 얄코
                      </span>
                    </Question>
                  </Wrap>
                  <CreateDate>
                    <Text isActive={active === "diary"}>
                      <span>2024.12.16</span>
                      <span>코딩하는포뇨</span>
                    </Text>
                  </CreateDate>
                </LineWrap>
              </Content>
              <Responsive>
                <CheckBox onClick={toggleCheck} checked={checked}></CheckBox>
                <LineWrap>
                  <ImageWrap>
                    <Image></Image>
                    <Question>
                      <h2>Q. 나의 단점 중 하나를 고칠 수 있다면?</h2>
                    </Question>
                  </ImageWrap>
                  <span>
                    한입 크기로 잘라 먹는 리액트 기초부터 실전까지 데대로 파는
                    자바스크립트 얄코
                  </span>
                  <CreateDate>
                    <Text isActive={active === "diary"}>
                      <span>2024.12.16</span>
                      <span>코딩하는포뇨</span>
                    </Text>
                  </CreateDate>
                </LineWrap>
              </Responsive>
            </ContentBox>
          </ContentWrap>
        </SettingWrap>
      </Layout>
    </>
  );
}
