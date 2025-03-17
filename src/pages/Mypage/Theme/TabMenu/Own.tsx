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
      setClickedStates({});
    }
  }, [isModal]);

  const checkClick = (item: { id: string; name: string }) => {
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
    localStorage.removeItem("appliedTheme");

    const storedTheme = sessionStorage.getItem(`appliedTheme_${userId}`);

    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);

      localStorage.setItem(
        `appliedTheme_${userId}`,
        JSON.stringify(parsedTheme)
      );
      localStorage.setItem(
        "moodIcons",
        JSON.stringify(moodIconMap[parsedTheme.name])
      );
    }

    if (storedFont) {
      document.body.style.fontFamily = storedFont;
    }
  }, []);

  const applyThemeOrFont = async (itemId: string, type: "THEME" | "FONT") => {
    if (!itemId) {
      console.error("itemId가 존재하지 않음:", itemId);
      return;
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

      if (response.status !== 200 && response.status !== 201) {
        console.error("API 응답 오류:", response);
        throw new Error("테마/폰트 적용 실패");
      }

      if (type === "FONT") {
        const appliedFont = ownFonts.find((font) => font.id === itemId);
        if (appliedFont) {
          localStorage.setItem(`appliedFont_${userId}`, appliedFont.name);
          sessionStorage.setItem("appliedFont", appliedFont.name);
          document.body.style.fontFamily = appliedFont.name;
        }
      }

      // 테마 적용
      if (type === "THEME") {
        const appliedTheme = ownThemes.find((theme) => theme.id === itemId);

        if (!appliedTheme) {
          return;
        }

        sessionStorage.setItem(
          `appliedTheme_${userId}`,
          JSON.stringify(appliedTheme)
        );

        localStorage.removeItem("appliedTheme");
        localStorage.setItem(
          `appliedTheme_${userId}`,
          JSON.stringify(appliedTheme)
        );

        const moodIcons = moodIconMap[appliedTheme.name];

        if (!moodIcons) {
          console.error(
            "⚠️ moodIconMap에서 해당 테마의 아이콘을 찾을 수 없음:",
            appliedTheme.name
          );
        } else {
          localStorage.setItem("moodIcons", JSON.stringify(moodIcons));
        }
      }

      window.dispatchEvent(new Event("storage"));

      setClickedStates({});
      setSelectedItems([]);
      setModalData({
        name: "적용 완료",
        content: "선택한 테마 또는 폰트가 적용되었습니다.",
      });
      setIsModalClick("applyCompleteModal");
    } catch (error) {
      console.error("테마/폰트 적용 실패:", error);
      setModalData({
        name: "적용 실패",
        content: "테마 또는 폰트 적용 중 오류가 발생했습니다.",
      });
      setIsModalClick("deleteThemeCompleteModal");
    }
  };

  useEffect(() => {}, [selectedItems, clickedStates]); // 상태 변경 시 UI 강제 리렌더링

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
