import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import themeSet from "/src/assets/theme/themeset.svg";
import { useState } from "react";
import { OrangeLineButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding: 0rem 1.25rem 0rem 5rem;
  align-items: center;
  height: 100vh;

  @media (max-width: 781px) {
    padding: 0rem 1.25rem 0rem 3.125rem;
    height: 100%;
  }

  @media (max-width: 390px) {
    gap: 1.625rem;
    height: 100%;
    padding-left: 0rem;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.75rem;
  padding: 0.75rem 2.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--main-text);

  @media (max-width: 781px) {
    padding: 0.625rem 1.875rem;
    height: 3.125rem;
  }

  @media (max-width: 390px) {
    padding: 0.5rem 1.25rem;
    height: 2.5rem;
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

  @media (max-width: 781px) {
    font-size: 1.125rem;
  }

  @media (max-width: 390px) {
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

const ThemeSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
`;

const CheckIcon = styled(FaCheck)`
  color: var(--main-orange);
  font-size: 1.375rem;
`;

const CheckBox = styled.button<{ $isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.375rem;
  border: ${(props) =>
    props.$isClicked ? "none" : "1px solid var(--main-text)"};
  background-color: ${(props) =>
    props.$isClicked ? "var(--hover-orange)" : "transparent"};
  cursor: pointer;

  @media (max-width: 781px) {
    width: 2.25rem;
    height: 2.25rem;
  }

  @media (max-width: 390px) {
    width: 1.875rem;
    height: 1.875rem;
  }
`;

const ImageBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

const PurchaseBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const ThemeContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3.75rem 4.25rem 2.5rem;
  margin-bottom: 3.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.75rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0.25rem 0.25rem 0.75rem rgba(0, 0, 0, 0.25);

  @media (max-width: 781px) {
    padding: 2.5rem 3.125rem 1.875rem;
    gap: 2.5rem;
  }

  @media (max-width: 390px) {
    padding: 1.25rem 1.25rem 1.25rem;
    gap: 1.25rem;
  }
`;

const ThemeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 기본 1줄에 2개 */
  row-gap: 2.5rem;
  column-gap: 3.75rem;
  width: 100%;

  @media (max-width: 781px) {
    grid-template-columns: 1fr; /* 1줄에 1개 */
    row-gap: 1.875rem;
    width: auto;
  }

  @media (max-width: 390px) {
    row-gap: 1.25rem;
    width: auto;
  }
`;

const ThemeTitle = styled.div`
  display: flex;
  gap: 1.25rem;
  color: var(--black);
  font-size: 1.25rem;
  font-weight: var(--font-medium);
  align-items: center;

  @media (max-width: 781px) {
    font-size: 1.125rem;
  }

  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const ThemeBox = styled.div`
  display: inline-flex;
  padding: 1.25rem 1.625rem;
  flex-direction: column;
  align-items: center;
  border-radius: 0.625rem;
  border: 1px solid var(--main-text);

  @media (max-width: 781px) {
    padding: 1rem 1.25rem;
  }

  @media (max-width: 390px) {
    padding: 0.75rem 1rem;
  }
`;

const ThemeImage = styled.img`
  width: 100%;
  object-fit: cover;
  }
`;

const PriceBox = styled.div`
  display: flex;
  gap: 0.5rem;
  color: var(--main-orange);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    font-size: 1.125rem;
  }

  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const PriceText = styled.div`
  color: var(--black);
  font-size: 1.25rem;
  font-weight: var(--font-regular);

  @media (max-width: 781px) {
    font-size: 1.125rem;
  }

  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const themes = [
  { id: 1, name: "파스텔 팝콘 세트", price: "300P", image: themeSet },
  { id: 2, name: "클래식 팝콘 세트", price: "350P", image: themeSet },
  { id: 3, name: "빈티지 팝콘 세트", price: "280P", image: themeSet },
  { id: 4, name: "모던 팝콘 세트", price: "320P", image: themeSet },
];

export default function Emoji() {
  const [clickedStates, setClickedStates] = useState<{
    [key: number]: boolean;
  }>({});

  const checkClick = (id: number) => {
    setClickedStates((prev) => ({
      ...prev,
      [id]: !prev[id], // 해당 id의 상태만 변경
    }));
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
            {themes.map((theme) => (
              <ThemeSet key={theme.id}>
                <ThemeTitle>
                  <CheckBox
                    $isClicked={!!clickedStates[theme.id]}
                    onClick={() => checkClick(theme.id)}
                  >
                    {!!clickedStates[theme.id] && <CheckIcon />}
                    {/* 클릭 시 CheckIcon 표시 */}
                  </CheckBox>
                  {theme.name}
                </ThemeTitle>
                <ThemeBox>
                  <ImageBox>
                    <ThemeImage src={theme.image} />
                  </ImageBox>
                </ThemeBox>
                <PurchaseBox>
                  <PriceBox>
                    가격
                    <PriceText>{theme.price}</PriceText>
                  </PriceBox>
                  <OrangeLineButton
                    $variant="theme"
                    onClick={() => isModalOpen("deleteModal")}
                  >
                    구매하기
                  </OrangeLineButton>
                </PurchaseBox>
              </ThemeSet>
            ))}
          </ThemeWrapper>
        </ThemeContainer>
      </Layout>
    </>
  );
}
