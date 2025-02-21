import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useIsModalStore } from "@/store/ModalStore";
import axios from "axios";
import { themeFonts, fontImageMap } from "@/assets/common/themeFonts";
import usePagination, {
  AfterIcon,
  BeforeIcon,
  PageNation,
  PageNumber,
  PaginationButton,
} from "./usePagination";
import {
  Layout,
  SearchIcon,
  FontContainer,
  FontWrapper,
  SearchBarContainer,
  SearchButton,
  SearchInput,
  CheckIcon,
  FontSet,
  FontTitle,
  CheckBox,
  FontBox,
  ImageBox,
  FontImage,
  PurchaseBox,
  PriceText,
} from "./Font.styles";

export default function Font() {
  const [clickedStates, setClickedStates] = useState<{
    [key: number]: boolean;
  }>({});
  const { handleSelectedThemes, selectedThemes } = useOutletContext<{
    handleSelectedThemes: (themes: { name: string; price: number }[]) => void;
    selectedThemes: { name: string; price: number }[];
  }>();

  const isModal = useIsModalStore((state) => state.isModal);
  const [fonts, setFonts] = useState<
    { _id: number; name: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.meet-da.site/store?type=FONT`)
      .then((res) => {
        setFonts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("폰트 데이터 불러오기 실패:", err);
        setLoading(false);
      });
  }, []);

  console.log(loading);
  console.log(themeFonts);

  // Theme에서 selectedThemes가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      console.log("모달이 닫혔을 때 체크박스 초기화 실행");
      setClickedStates({});
    }
  }, [isModal]);

  // 개별 체크박스 클릭 (Font 상태 업데이트)
  const checkClick = (_id: number, fonts: { name: string; price: number }) => {
    setClickedStates((prev) => {
      const newState = { ...prev, [_id]: !prev[_id] };
      const isSelected = newState[_id];

      const updatedThemes = isSelected
        ? [...selectedThemes, fonts] // 체크 시 추가
        : selectedThemes.filter((t) => t.name !== fonts.name); // 체크 해제 시 제거

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
  } = usePagination(fonts, 6);

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
            {currentData.map((fonts) => (
              <FontSet key={fonts._id}>
                <FontTitle>
                  <CheckBox
                    $isClicked={!!clickedStates[fonts._id]}
                    onClick={() => checkClick(fonts._id, fonts)}
                  >
                    {!!clickedStates[fonts._id] && <CheckIcon />}
                  </CheckBox>
                  {fonts.name}
                </FontTitle>
                <FontBox>
                  <ImageBox>
                    <FontImage
                      src={fontImageMap[fonts.name]}
                      alt={fonts.name}
                    />
                  </ImageBox>
                </FontBox>
                <PurchaseBox>
                  가격
                  <PriceText>{fonts.price} P</PriceText>
                </PurchaseBox>
              </FontSet>
            ))}
          </FontWrapper>

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
        </FontContainer>
      </Layout>
    </>
  );
}
