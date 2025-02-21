import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { OrangeLineButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import { useOutletContext } from "react-router-dom";
import { moodIconMap } from "@/assets/common/themeImages";
import DeleteThemeCompleteModal from "@/components/modal/DeleteThemeCompleteModal";

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

const NoTheme = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-text);
  font-size: 1.25rem;
`;

export default function Own() {
  const [ownThemes, setOwnThemes] = useState<
    { id: number; name: string; image: string }[]
  >([]);

  const [clickedStates, setClickedStates] = useState<{
    [key: number]: boolean;
  }>({});

  const { handleSelectedThemes, selectedThemes } = useOutletContext<{
    handleSelectedThemes: (themes: { name: string }[]) => void;
    selectedThemes: { name: string }[];
  }>();

  const isModal = useIsModalStore((state) => state.isModal);
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const { handleAppliedTheme } = useOutletContext<{
    handleAppliedTheme: (theme: {
      name: string;
      moodImages: { [key: string]: string };
    }) => void;
  }>();

  const defaultFont = "'Pretendard', sans-serif";

  const [appliedFont, setAppliedFont] = useState(
    () => localStorage.getItem("appliedFont") || defaultFont
  );

  const [modalData, setModalData] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  const [ownFonts, setOwnFonts] = useState<{ name: string; image: string }[]>(
    []
  );

  // 로컬스토리지에서 보유 상품 불러오기
  useEffect(() => {
    const loadOwnedItems = () => {
      // 테마 로드
      const storedThemes = localStorage.getItem("ownedThemes");
      if (!storedThemes) {
        console.log("로컬스토리지에 저장된 보유 테마 없음");
        setOwnThemes([]);
      } else {
        try {
          const parsedThemes = JSON.parse(storedThemes);
          console.log("보유 테마 불러오기 성공:", parsedThemes);
          setOwnThemes(parsedThemes);
        } catch (error) {
          console.error("로컬스토리지 테마 파싱 오류:", error);
          setOwnThemes([]);
        }
      }

      // 폰트 로드
      const storedFonts = localStorage.getItem("ownedFonts");
      if (!storedFonts) {
        console.log("로컬스토리지에 저장된 보유 폰트 없음");
        setOwnFonts([]);
      } else {
        try {
          const parsedFonts = JSON.parse(storedFonts);
          console.log("보유 폰트 불러오기 성공:", parsedFonts);
          setOwnFonts(parsedFonts);
        } catch (error) {
          console.error("로컬스토리지 폰트 파싱 오류:", error);
          setOwnFonts([]);
        }
      }
    };

    // 초기 로딩
    loadOwnedItems();

    // localStorage 변경 감지 (즉시 반영)
    window.addEventListener("storage", loadOwnedItems);

    return () => {
      window.removeEventListener("storage", loadOwnedItems);
    };
  }, []);

  const applyItem = (item: { name: string; image?: string }) => {
    if (ownThemes.some((theme) => theme.name === item.name)) {
      // 테마 적용
      handleAppliedTheme({
        name: item.name,
        moodImages: moodIconMap[item.name] || {},
      });

      localStorage.setItem(
        "appliedTheme",
        JSON.stringify({
          name: item.name,
          moodImages: moodIconMap[item.name] || {},
        })
      );

      // 적용 완료 모달 표시
      setModalData({
        title: "테마 적용",
        content: "선택한 테마가 정상적으로 적용되었습니다.",
      });
    } else {
      // 폰트 적용
      setAppliedFont(item.name);
      localStorage.setItem("appliedFont", item.name);

      // 적용 완료 모달
      setModalData({
        title: "폰트 적용",
        content: "선택한 폰트가 정상적으로 적용되었습니다.",
      });
    }

    setTimeout(() => {
      setIsModalClick("applyCompleteModal");
    }, 100);
  };

  // Theme에서 selectedThemes가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      console.log("모달이 닫혔을 때 체크박스 초기화 실행");
      setClickedStates({});
    }
  }, [isModal]);

  useEffect(() => {
    console.log("현재 적용된 폰트:", appliedFont);
  }, [appliedFont]);

  // 체크박스 클릭 시 상태 업데이트
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
          {ownThemes.length > 0 || ownFonts.length > 0 ? (
            <ThemeWrapper>
              {/* ✅ 보유한 테마 목록 렌더링 */}
              {ownThemes.map((theme) => (
                <ThemeSet key={theme.id}>
                  <ThemeTitle>
                    <CheckBox
                      $isClicked={!!clickedStates[theme.id]}
                      onClick={() => checkClick(theme.id, theme)}
                    >
                      {!!clickedStates[theme.id] && <CheckIcon />}
                    </CheckBox>
                    {theme.name}
                  </ThemeTitle>
                  <ThemeBox>
                    <ImageBox>
                      <ThemeImage src={theme.image} />
                    </ImageBox>
                  </ThemeBox>
                  <ButtonBox>
                    <OrangeLineButton
                      $variant="theme"
                      onClick={() => applyItem(theme)}
                    >
                      적용하기
                    </OrangeLineButton>
                  </ButtonBox>
                </ThemeSet>
              ))}

              {/* 보유한 폰트 목록 렌더링 */}
              {ownFonts.map((font, index) => (
                <ThemeSet key={index}>
                  <ThemeTitle>
                    <CheckBox
                      $isClicked={!!clickedStates[index]}
                      onClick={() => checkClick(index, font)}
                    >
                      {!!clickedStates[index] && <CheckIcon />}
                    </CheckBox>
                    {font.name}
                  </ThemeTitle>
                  <ThemeBox>
                    <ImageBox>
                      <ThemeImage src={font.image} />
                    </ImageBox>
                  </ThemeBox>
                  <ButtonBox>
                    <OrangeLineButton
                      $variant="theme"
                      onClick={() => applyItem(font)}
                    >
                      적용하기
                    </OrangeLineButton>
                  </ButtonBox>
                </ThemeSet>
              ))}
            </ThemeWrapper>
          ) : (
            <NoTheme>보유한 상품이 존재하지 않습니다.</NoTheme>
          )}
        </ThemeContainer>
      </Layout>

      {isModal === "applyCompleteModal" && (
        <DeleteThemeCompleteModal
          title={modalData.title}
          content={modalData.content}
        />
      )}
    </>
  );
}
