import { useEffect, useState } from "react";
import { DiarySettingButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import DeleteThemeCompleteModal from "@/components/modal/DeleteThemeCompleteModal";
import { fontImageMap } from "@/assets/common/themeFonts";
import { themeSetImageMap, moodIconMap } from "@/assets/common/themeImages";
import usePagination, {
  AfterIcon,
  BeforeIcon,
  PageNation,
  PageNumber,
  PaginationButton,
} from "./usePagination";
import {
  ButtonWrapper,
  CheckBox,
  CheckIcon,
  ImageBox,
  Layout,
  NavWrap,
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

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Own() {
  const [ownThemes, setOwnThemes] = useState<
    { id: string; name: string; image: string }[]
  >([]);

  const [ownFonts, setOwnFonts] = useState<{ id: string; name: string }[]>([]);

  const [selectedItems, setSelectedItems] = useState<
    { id: string; name: string }[]
  >([]);

  const [clickedStates, setClickedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const isModal = useIsModalStore((state) => state.isModal);
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const [modalData, setModalData] = useState<{
    name: string;
    content: string;
    price?: number;
  }>({
    name: "",
    content: "",
    price: 0,
  });

  const selectedItem = selectedItems[0]; // 첫 번째 선택된 항목
  const isTheme = ownThemes.some((theme) => theme.id === selectedItem?.id);
  const itemType = isTheme ? "THEME" : "FONT"; // 올바른 타입 구분

  useEffect(() => {
    const fetchOwnedItems = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("인증 토큰이 없습니다.");

        const response = await axios.get(
          `https://api.meet-da.site/store/my-items`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        type ThemeType = { _id: string; name: string; type: string };
        type FontType = { _id: string; name: string; type: string };

        // API에서 받은 데이터를 테마와 폰트로 분류
        const themes = response.data
          .filter((item: ThemeType) => item.type === "THEME")
          .map((theme: ThemeType) => ({
            id: theme._id,
            name: theme.name,
          }));

        const fonts = response.data
          .filter((item: FontType) => item.type === "FONT")
          .map((font: FontType) => ({
            id: font._id,
            name: font.name,
          }));

        setOwnThemes(themes);
        setOwnFonts(fonts);
      } catch (error) {
        console.error("보유한 테마 및 폰트 불러오기 실패:", error);
      }
    };

    fetchOwnedItems();
  }, []);

  // Theme에서 selectedThemes가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      console.log("모달이 닫혔을 때 체크박스 초기화 실행");
      setClickedStates({});
    }
  }, [isModal]);

  const checkClick = (item: { id: string; name: string }) => {
    console.log("Clicked Item:", item);
    if (!item.id) {
      console.error("Invalid item clicked:", item);
      return;
    }

    setClickedStates((prevStates) => ({
      ...prevStates,
      [item.id]: !prevStates[item.id], // id를 기준으로 체크박스 상태 업데이트
    }));

    setSelectedItems((prevItems) => {
      const isSelected = prevItems.some((t) => t.id === item.id);
      return isSelected
        ? prevItems.filter((t) => t.id !== item.id) // 선택 해제
        : [...prevItems, item]; // 선택 추가
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const userId = jwtDecode(token).sub;
    if (!userId) return;

    // 사용자별 적용된 테마 및 폰트 불러오기
    const storedFont = sessionStorage.getItem(`appliedFont_${userId}`);
    const storedTheme = sessionStorage.getItem(`appliedTheme_${userId}`);

    if (storedFont) {
      document.body.style.fontFamily = storedFont;
    }

    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);
      localStorage.setItem(
        "moodIcons",
        JSON.stringify(moodIconMap[parsedTheme.name])
      );
    }
  }, []);

  const applyThemeOrFont = async (itemId: string, type: "THEME" | "FONT") => {
    console.log("applyThemeOrFont 실행됨:", { itemId, type }); // 실행 여부 확인
    if (!itemId) {
      console.error("itemId가 존재하지 않음:", itemId);
      return; // itemId가 없으면 실행 중단
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("인증 토큰이 없습니다.");

      const userId = jwtDecode(token).sub;
      if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

      const response = await axios.post(
        `https://api.meet-da.site/store/change/${itemId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        if (type === "FONT") {
          const appliedFont = ownFonts.find((font) => font.id === itemId);
          if (appliedFont) {
            sessionStorage.setItem(`appliedFont_${userId}`, appliedFont.name);
            document.body.style.fontFamily = appliedFont.name;
            console.log("폰트 적용 완료:", appliedFont.name);
          }
        }

        if (type === "THEME") {
          const appliedTheme = ownThemes.find((theme) => theme.id === itemId);
          if (appliedTheme) {
            sessionStorage.setItem(
              `appliedTheme_${userId}`,
              JSON.stringify(appliedTheme)
            );
            if (moodIconMap[appliedTheme.name]) {
              localStorage.setItem(
                "moodIcons",
                JSON.stringify(moodIconMap[appliedTheme.name])
              );
            }
            console.log("테마 적용 완료:", appliedTheme.name);
          }
        }

        if (type === "FONT") {
          const appliedFont = ownFonts.find((font) => font.id === itemId);
          if (appliedFont) {
            document.body.style.fontFamily = appliedFont.name;
            sessionStorage.setItem(`appliedFont_${userId}`, appliedFont.name);
          }
        }

        if (type === "THEME") {
          const appliedTheme = ownThemes.find((theme) => theme.id === itemId);
          if (appliedTheme) {
            sessionStorage.setItem(
              `appliedTheme_${userId}`,
              JSON.stringify(appliedTheme)
            );

            if (moodIconMap[appliedTheme.name]) {
              // moodIconMap이 존재하는지 확인
              localStorage.setItem(
                "moodIcons",
                JSON.stringify(moodIconMap[appliedTheme.name])
              );
            }
          }
        }

        // 적용 후 체크박스 상태 초기화
        setClickedStates((prev) => {
          console.log("🔵 체크박스 초기화 전 상태:", prev);
          return {};
        });
        setSelectedItems((prev) => {
          console.log("🔵 선택된 항목 초기화 전 상태:", prev);
          return [];
        });

        // 적용 완료 후 applyCompleteModal 모달 표시
        setModalData({
          name: "적용 완료",
          content: "선택한 테마 또는 폰트가 적용되 었습니다.",
        });
        setIsModalClick("applyCompleteModal"); // applyCompleteModal로 변경
      }
    } catch (error) {
      console.error("테마/폰트 적용 실패:", error);
      setModalData({
        name: "적용 실패",
        content: "테마 또는 폰트 적용 중 오류가 발생했습니다.",
      });
      setIsModalClick("deleteThemeCompleteModal");
    }
  };

  useEffect(() => {
    console.log("🔄 적용 후 UI 업데이트 실행됨");
  }, [selectedItems, clickedStates]); // ✅ 상태 변경 시 UI 강제 리렌더링

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
        <NavWrap>
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder="다양한 테마를 검색해 보세요."
            />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBarContainer>
          <ButtonWrapper>
            <DiarySettingButton
              $variant="delete"
              style={{ width: "100%" }}
              onClick={() => applyThemeOrFont(selectedItem?.id, itemType)}
              disabled={selectedItems.length === 0}
            >
              적용하기
            </DiarySettingButton>
          </ButtonWrapper>
        </NavWrap>

        <ThemeContainer>
          {currentData.length > 0 ? (
            <ThemeWrapper>
              {currentData.map((item, index) => {
                const isTheme = ownThemes.some(
                  (theme) => theme.name === item.name
                );
                const imageSrc = isTheme
                  ? themeSetImageMap[item.name] || ""
                  : fontImageMap[item.name] || "";

                if (!item.id) {
                  console.error(`Invalid item found at index ${index}:`, item);
                }

                return (
                  <ThemeSet key={index}>
                    <ThemeTitle>
                      <CheckBox
                        $isClicked={!!clickedStates[item.id]}
                        onClick={() =>
                          checkClick({
                            id: item.id,
                            name: item.name,
                          })
                        }
                      >
                        {!!clickedStates[item.id] && <CheckIcon />}
                      </CheckBox>
                      {item.name}
                    </ThemeTitle>
                    <ThemeBox>
                      <ImageBox>
                        <ThemeImage src={imageSrc} alt={item.name} />
                      </ImageBox>
                    </ThemeBox>
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
          title={modalData.name}
          content={modalData.content}
        />
      )}
    </>
  );
}
