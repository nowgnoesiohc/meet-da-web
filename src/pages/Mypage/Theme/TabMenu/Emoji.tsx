import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import themeSet from "/src/assets/themeset.svg";
import { useState } from "react";
import { OrangeLineButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";

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

const ThemeSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
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

const ImageBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PurchaseBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const ThemeContainer = styled.div`
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
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);

  @media (max-width: 781px) {
    padding: 40px 50px 30px;
    gap: 40px;
  }

  @media (max-width: 390px) {
    padding: 20px 20px 20px;
    gap: 20px;
  }
`;

const ThemeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 기본 1줄에 2개 */
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

const ThemeTitle = styled.div`
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

const ThemeBox = styled.div`
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

const ThemeImage = styled.img`
  width: 100%;
  object-fit: cover;
  }
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

export default function Emoji() {
  const [isClicked, setIsClicked] = useState(false);

  const checkClick = () => {
    setIsClicked(!isClicked); // 클릭 시 상태 변경
  };

  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const isModalOpen = (type?: string) => {
    console.log(type);

    if (type) {
      setIsModalClick(type);
    } else {
      setIsModalClick();
    }
  };

  // 백엔드 연결 시 코드 미리 작성
  // const [themes, setThemes] = useState([]); // 테마 데이터를 저장할 상태
  // const [clickedStates, setClickedStates] = useState<boolean[]>([]); // 각 ThemeSet의 클릭 상태
  // const [loading, setLoading] = useState(true); // 로딩 상태

  // 백엔드에서 데이터 fetch
  // useEffect(() => {
  //   const fetchThemes = async () => {
  //     try {
  //       const response = await fetch("/api/themes"); // API 엔드포인트를 적절히 수정
  //       const data = await response.json();
  //       setThemes(data); // 테마 데이터 저장
  //       setClickedStates(new Array(data.length).fill(false)); // 테마 개수만큼 클릭 상태 초기화
  //       setLoading(false); // 로딩 완료
  //     } catch (error) {
  //       console.error("데이터를 가져오는 중 오류 발생:", error);
  //     }
  //   };

  //   fetchThemes();
  // }, []);

  // const toggleClick = (index: number) => {
  //   setClickedStates((prev) =>
  //     prev.map((clicked, i) => (i === index ? !clicked : clicked))
  //   );
  // };

  // if (loading) {
  //   return <div>로딩 중...</div>; // 로딩 상태 표시
  // }

  return (
    <>
      <Layout>
        <SearchBarContainer>
          <SearchInput type="text" placeholder="다양한 테마를 검색해 보세요." />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchBarContainer>
        <ThemeContainer>
          <ThemeWrapper>
            <ThemeSet>
              <ThemeTitle>
                <CheckBox isClicked={isClicked} onClick={checkClick}>
                  {isClicked && <CheckIcon />} {/* 클릭 시 CheckIcon 표시 */}
                </CheckBox>
                파스텔 팝콘 세트
              </ThemeTitle>
              <ThemeBox>
                <ImageBox>
                  <ThemeImage src={themeSet} />
                </ImageBox>
              </ThemeBox>
              <PurchaseBox>
                <PriceBox>
                  가격
                  <PriceText>300P</PriceText>
                </PriceBox>
                <OrangeLineButton
                  variant="theme"
                  onClick={() => isModalOpen("deleteModal")}
                >
                  구매하기
                </OrangeLineButton>
              </PurchaseBox>
            </ThemeSet>
            <ThemeSet>
              <ThemeTitle>
                <CheckBox isClicked={isClicked} onClick={checkClick}>
                  {isClicked && <CheckIcon />} {/* 클릭 시 CheckIcon 표시 */}
                </CheckBox>
                파스텔 팝콘 세트
              </ThemeTitle>
              <ThemeBox>
                <ImageBox>
                  <ThemeImage src={themeSet} />
                </ImageBox>
              </ThemeBox>
              <PurchaseBox>
                <PriceBox>
                  가격
                  <PriceText>300P</PriceText>
                </PriceBox>
                <OrangeLineButton variant="theme">구매하기</OrangeLineButton>
              </PurchaseBox>
            </ThemeSet>
            <ThemeSet>
              <ThemeTitle>
                <CheckBox isClicked={isClicked} onClick={checkClick}>
                  {isClicked && <CheckIcon />} {/* 클릭 시 CheckIcon 표시 */}
                </CheckBox>
                파스텔 팝콘 세트
              </ThemeTitle>
              <ThemeBox>
                <ImageBox>
                  <ThemeImage src={themeSet} />
                </ImageBox>
              </ThemeBox>
              <PurchaseBox>
                <PriceBox>
                  가격
                  <PriceText>300P</PriceText>
                </PriceBox>
                <OrangeLineButton variant="theme">구매하기</OrangeLineButton>
              </PurchaseBox>
            </ThemeSet>
            <ThemeSet>
              <ThemeTitle>
                <CheckBox isClicked={isClicked} onClick={checkClick}>
                  {isClicked && <CheckIcon />} {/* 클릭 시 CheckIcon 표시 */}
                </CheckBox>
                파스텔 팝콘 세트
              </ThemeTitle>
              <ThemeBox>
                <ImageBox>
                  <ThemeImage src={themeSet} />
                </ImageBox>
              </ThemeBox>
              <PurchaseBox>
                <PriceBox>
                  가격
                  <PriceText>300P</PriceText>
                </PriceBox>
                <OrangeLineButton variant="theme">구매하기</OrangeLineButton>
              </PurchaseBox>
            </ThemeSet>
          </ThemeWrapper>
        </ThemeContainer>
      </Layout>
    </>
  );
}
