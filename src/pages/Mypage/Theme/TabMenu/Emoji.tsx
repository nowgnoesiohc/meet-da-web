import { themeSetImageMap } from "@/assets/common/themeImages";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useIsModalStore } from "@/store/ModalStore";
import axios from "axios";
import usePagination, {
  AfterIcon,
  BeforeIcon,
  PageNation,
  PageNumber,
  PaginationButton,
} from "./usePagination";
import {
  Layout,
  CheckBox,
  CheckIcon,
  ImageBox,
  PriceText,
  PurchaseBox,
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
} from "./Emoji.styles";

export default function Emoji() {
  const [clickedStates, setClickedStates] = useState<{
    [key: number]: boolean;
  }>({});
  const { handleSelectedThemes, selectedThemes } = useOutletContext<{
    handleSelectedThemes: (themes: { name: string; price: number }[]) => void;
    selectedThemes: { name: string; price: number }[];
  }>();
  const isModal = useIsModalStore((state) => state.isModal);
  const [themes, setThemes] = useState<
    { _id: number; name: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const {
    currentData,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
  } = usePagination(themes, 6);

  useEffect(() => {
    axios
      .get(`https://api.meet-da.site/store?type=THEME`)
      .then((res) => {
        setThemes((prevThemes) => {
          if (JSON.stringify(prevThemes) === JSON.stringify(res.data))
            return prevThemes;
          return res.data;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("테마 데이터 불러오기 실패:", err);
        setLoading(false);
      });
  }, []);

  console.log(loading);

  // Theme에서 selectedThemes가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      console.log("모달이 닫혔을 때 체크박스 초기화 실행");
      setClickedStates({});
    }
  }, [isModal]);

  // 개별 체크박스 클릭 (Theme 상태 업데이트)
  const checkClick = (_id: number, theme: { name: string; price: number }) => {
    setClickedStates((prev) => {
      const newState = { ...prev, [_id]: !prev[_id] };
      const isSelected = newState[_id];

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
            {currentData.map((theme) => (
              <ThemeSet key={theme._id}>
                <ThemeTitle>
                  <CheckBox
                    $isClicked={!!clickedStates[theme._id]}
                    onClick={() => checkClick(theme._id, theme)}
                  >
                    {!!clickedStates[theme._id] && <CheckIcon />}
                    {/* 클릭 시 CheckIcon 표시 */}
                  </CheckBox>
                  {theme.name}
                </ThemeTitle>
                <ThemeBox>
                  <ImageBox>
                    <ThemeImage
                      src={themeSetImageMap[theme.name]}
                      alt={theme.name}
                    />
                  </ImageBox>
                </ThemeBox>
                <PurchaseBox>
                  가격
                  <PriceText>{theme.price} P</PriceText>
                </PurchaseBox>
              </ThemeSet>
            ))}
          </ThemeWrapper>

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
    </>
  );
}
