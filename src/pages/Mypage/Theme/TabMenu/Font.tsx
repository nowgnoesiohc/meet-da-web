import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import retrosans from "/src/assets/retrosans.svg";
import cabinet from "/src/assets/cabinet.svg";
import { useState } from "react";
import { OrangeLineButton } from "@/components/ui/Button";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0px 20px 0px 80px;
  align-items: center;
  height: 100vh;

  @media (max-width: 781px) {
    padding: 0px 20px 0px 50px;
    height: 100%;
  }

  @media (max-width: 390px) {
    gap: 26px;
    height: 100%;
    padding-left: 0px;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 12px 40px;
  border-radius: 10px;
  border: 1px solid var(--main-text);

  @media (max-width: 781px) {
    padding: 10px 30px;
    height: 50px;
  }

  @media (max-width: 390px) {
    padding: 8px 20px;
    height: 40px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 20px;
  font-weight: var(--font-regular);

  &::placeholder {
    color: var(--sub-text);
    font-weight: var(--font-regular);
  }

  @media (max-width: 781px) {
    font-size: 18px;
  }

  @media (max-width: 390px) {
    font-size: 16px;
  }
`;

const SearchButton = styled.button`
  display: flex;
`;

const SearchIcon = styled(IoSearch)`
  color: var(--search-placeholder);
  font-size: 1.5rem;
`;

const FontContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 60px 68px 40px;
  margin-bottom: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  border-radius: 10px;
  background: var(--white);
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 781px) {
    padding: 40px 50px 30px;
    gap: 40px;
  }

  @media (max-width: 390px) {
    padding: 20px 20px 20px;
    gap: 20px;
  }
`;

const FontWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 기본 1줄에 4개 */
  row-gap: 40px;
  column-gap: 60px;
  width: 100%;

  @media (max-width: 781px) {
    grid-template-columns: 1fr; /* 1줄에 1개 */
    row-gap: 30px;
    width: auto;
  }

  @media (max-width: 390px) {
    row-gap: 20px;
    width: auto;
  }
`;

const FontSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const FontTitle = styled.div`
  display: flex;
  gap: 20px;
  color: var(--black);
  font-size: 20px;
  font-weight: var(--font-medium);
  align-items: center;

  @media (max-width: 781px) {
    font-size: 18px;
  }

  @media (max-width: 390px) {
    font-size: 16px;
  }
`;

const CheckIcon = styled(FaCheck)`
  color: var(--main-orange);
  font-size: 22px;
`;

const CheckBox = styled.button<{ isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: ${(props) =>
    props.isClicked ? "none" : "1px solid var(--main-text)"};
  background-color: ${(props) =>
    props.isClicked ? "var(--hover-orange)" : "transparent"};
  cursor: pointer;

  @media (max-width: 781px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 390px) {
    width: 30px;
    height: 30px;
  }
`;

const FontBox = styled.div`
  display: inline-flex;
  padding: 20px 26px;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--main-text);

  @media (max-width: 781px) {
    padding: 16px 20px;
  }

  @media (max-width: 390px) {
    padding: 12px 16px;
  }
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const FontImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const PurchaseBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceBox = styled.div`
  display: flex;
  gap: 8px;
  color: var(--main-orange);
  text-align: center;
  font-size: 20px;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    font-size: 18px;
  }

  @media (max-width: 390px) {
    font-size: 16px;
  }
`;

const PriceText = styled.div`
  color: var(--black);
  font-size: 20px;
  font-weight: var(--font-regular);

  @media (max-width: 781px) {
    font-size: 18px;
  }

  @media (max-width: 390px) {
    font-size: 16px;
  }
`;

export default function Font() {
  const [isClicked, setIsClicked] = useState(false);

  const checkClick = () => {
    setIsClicked(!isClicked); // 클릭 시 상태 변경
  };

  return (
    <>
      <Layout>
        <SearchBarContainer>
          <SearchInput type="text" placeholder="다양한 테마를 검색해 보세요." />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchBarContainer>
        <FontContainer>
          <FontWrapper>
            <FontSet>
              <FontTitle>
                <CheckBox isClicked={isClicked} onClick={checkClick}>
                  {isClicked && <CheckIcon />} {/* 클릭 시 CheckIcon 표시 */}
                </CheckBox>
                레트로산스
              </FontTitle>
              <FontBox>
                <ImageBox>
                  <FontImage src={retrosans} />
                </ImageBox>
              </FontBox>
              <PurchaseBox>
                <PriceBox>
                  가격
                  <PriceText>300P</PriceText>
                </PriceBox>
                <OrangeLineButton variant="theme">구매하기</OrangeLineButton>
              </PurchaseBox>
            </FontSet>
            <FontSet>
              <FontTitle>
                <CheckBox isClicked={isClicked} onClick={checkClick}>
                  {isClicked && <CheckIcon />} {/* 클릭 시 CheckIcon 표시 */}
                </CheckBox>
                캐비닛 그로테스크
              </FontTitle>
              <FontBox>
                <ImageBox>
                  <FontImage src={cabinet} />
                </ImageBox>
              </FontBox>
              <PurchaseBox>
                <PriceBox>
                  가격
                  <PriceText>300P</PriceText>
                </PriceBox>
                <OrangeLineButton variant="theme">구매하기</OrangeLineButton>
              </PurchaseBox>
            </FontSet>
          </FontWrapper>
        </FontContainer>
      </Layout>
    </>
  );
}
