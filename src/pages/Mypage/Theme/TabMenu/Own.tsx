import { useEffect, useState } from "react";
import { OrangeLineButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import { useOutletContext } from "react-router-dom";
import { moodIconMap } from "@/assets/common/themeImages";
import DeleteThemeCompleteModal from "@/components/modal/DeleteThemeCompleteModal";
import usePagination, {
  AfterIcon,
  BeforeIcon,
  PageNation,
  PageNumber,
  PaginationButton,
} from "./usePagination";
import {
  ButtonBox,
  CheckBox,
  CheckIcon,
  ImageBox,
  Layout,
  NoTheme,
  SearchBarContainer,
  SearchButton,
  SearchIcon,
  SearchInput,
  ThemeBox,
  ThemeContainer,
  ThemeImage,
  ThemeSet,
  ThemeTitle,
  ThemeWrapper,
} from "./Own.styles";
import { fontImageMap } from "@/assets/common/themeFonts";

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

          const updatedFonts = parsedFonts.map((font: { name: string }) => ({
            ...font,
            image: fontImageMap[font.name] || "", // 이미지가 없으면 빈 문자열
          }));

          console.log("보유 폰트 불러오기 성공:", updatedFonts);
          setOwnFonts(updatedFonts);
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

  const applyItem = (
    item: { name: string; image?: string },
    isTheme: boolean
  ) => {
    if (isTheme) {
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

      // 브라우저에 강제 적용 (CSS 변수 업데이트)
      document.documentElement.style.setProperty("--applied-font", item.name);
      document.body.style.fontFamily = `${item.name}, sans-serif`;

      // 강제 리렌더링 (일부 브라우저에서 필요할 수 있음)
      setTimeout(() => {
        document.body.style.fontFamily = `${item.name}, sans-serif`;
      }, 50);

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

  const {
    currentData,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
  } = usePagination([...ownThemes, ...ownFonts], 6);

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
          {currentData.length > 0 ? (
            <ThemeWrapper>
              {/* 보유한 테마 목록 렌더링 */}
              {currentData.map((item, index) => {
                const isTheme = ownThemes.some(
                  (theme) => theme.name === item.name
                );
                return (
                  <ThemeSet key={index}>
                    <ThemeTitle>
                      <CheckBox
                        $isClicked={!!clickedStates[index]}
                        onClick={() => checkClick(index, item)}
                      >
                        {!!clickedStates[index] && <CheckIcon />}
                      </CheckBox>
                      {item.name}
                    </ThemeTitle>
                    <ThemeBox>
                      <ImageBox>
                        <ThemeImage src={item.image} />
                      </ImageBox>
                    </ThemeBox>
                    <ButtonBox>
                      <OrangeLineButton
                        $variant="theme"
                        onClick={() => applyItem(item, isTheme)}
                      >
                        적용하기
                      </OrangeLineButton>
                    </ButtonBox>
                  </ThemeSet>
                );
              })}
            </ThemeWrapper>
          ) : (
            <NoTheme>보유한 상품이 존재하지 않습니다.</NoTheme>
          )}

          {totalPages > 1 && (
            <PageNation>
              <PaginationButton
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                <BeforeIcon />
              </PaginationButton>
              {Array.from({ length: totalPages }, (_, index) => (
                <PageNumber
                  key={index}
                  selected={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PageNumber>
              ))}
              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
              >
                <AfterIcon />
              </PaginationButton>
            </PageNation>
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
