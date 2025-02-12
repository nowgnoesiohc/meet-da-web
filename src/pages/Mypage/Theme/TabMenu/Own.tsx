import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import themeSet from "/src/assets/theme/themeset.svg";
import retrosans from "/src/assets/theme/retrosans.svg";
import { useEffect, useState } from "react";
import { OrangeLineButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import { useOutletContext } from "react-router-dom";

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

const ThemeContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3.75rem 4.25rem 2.5rem;
  margin-bottom: 3.75rem;
  flex-direction: column;
  justify-content: center;
  gap: 3.75rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0.25rem 0.25rem 0.75rem 0rem rgba(0, 0, 0, 0.25);

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
  grid-template-columns: repeat(2, 1fr); /* 기본 1줄에 4개 */
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

const ThemeSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
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

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

const ThemeImage = styled.img`
  width: 100%;
  object-fit: cover;
  }
`;

const ButtonBox = styled.div`
  display: inline-flex;
  justify-content: end;
  align-items: center;
`;

const own = [
  { id: 1, name: "파스텔 팝콘 세트", image: themeSet },
  { id: 2, name: "레트로산스", image: retrosans },
];

export default function Own() {
  const [clickedStates, setClickedStates] = useState<{
    [key: number]: boolean;
  }>({});
  const { handleSelectedThemes, selectedThemes } = useOutletContext<{
    handleSelectedThemes: (themes: { name: string }[]) => void;
    selectedThemes: { name: string }[];
  }>();
  const isModal = useIsModalStore((state) => state.isModal);

  // Theme에서 selectedThemes가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      console.log("모달이 닫혔을 때 체크박스 초기화 실행");
      setClickedStates({});
    }
  }, [isModal]);

  // 개별 체크박스 클릭 (Theme 상태 업데이트)
  const checkClick = (id: number, theme: { name: string }) => {
    setClickedStates((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      const isSelected = newState[id];

      const updatedThemes = isSelected
        ? [...selectedThemes, theme] // 체크 시 추가
        : selectedThemes.filter((t) => t.name !== theme.name); // 체크 해제 시 제거

      handleSelectedThemes(updatedThemes);

      return newState;
    });
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
        <ThemeContainer>
          <ThemeWrapper>
            {own.map((own) => (
              <ThemeSet>
                <ThemeTitle>
                  <CheckBox
                    $isClicked={!!clickedStates[own.id]}
                    onClick={() => checkClick(own.id, own)}
                  >
                    {!!clickedStates[own.id] && <CheckIcon />}
                    {/* 클릭 시 CheckIcon 표시 */}
                  </CheckBox>
                  {own.name}
                </ThemeTitle>
                <ThemeBox>
                  <ImageBox>
                    <ThemeImage src={own.image} />
                  </ImageBox>
                </ThemeBox>
                <ButtonBox>
                  <OrangeLineButton $variant="theme">적용하기</OrangeLineButton>
                </ButtonBox>
              </ThemeSet>
            ))}
          </ThemeWrapper>
        </ThemeContainer>
      </Layout>
    </>
  );
}
