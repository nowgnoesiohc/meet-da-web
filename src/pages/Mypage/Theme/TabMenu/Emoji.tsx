import { themeSetImageMap } from "@/assets/common/themeImages";
import { useEffect, useMemo, useState } from "react";
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
  ButtonWrapper,
  NavWrap,
} from "./Emoji.styles";
import { DiarySettingButton } from "@/components/ui/Button";
import PointModal from "@/components/modal/PointModal";
import DeleteModal from "@/components/modal/DeleteModal";
import DeleteThemeCompleteModal from "@/components/modal/DeleteThemeCompleteModal";
import { jwtDecode } from "jwt-decode";

export default function Emoji() {
  const [clickedStates, setClickedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedThemes, setSelectedThemes] = useState<
    { id: string; name: string; price: number }[]
  >([]);

  const isModal = useIsModalStore((state) => state.isModal);
  const [themes, setThemes] = useState<
    { _id: number; name: string; price: number }[]
  >([]);
  const [_, setLoading] = useState(true);

  const {
    currentData,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
  } = usePagination(themes, 6);

  const [modalData, setModalData] = useState<{
    name: string;
    content: string;
    price?: number;
  }>({
    name: "",
    content: "",
    price: 0,
  });

  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick) as (
    type: string | null
  ) => void;

  const isModalOpen = (type?: string | null) => {
    setIsModalClick(type || null); // type이 없으면 null을 설정
  };

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

  // Theme에서 selectedThemes가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      setClickedStates({});
    }
  }, [isModal]);

  // 개별 체크박스 클릭
  const checkClick = (theme: { id: string; name: string; price: number }) => {
    setSelectedThemes((prevThemes) => {
      const isSelected = prevThemes.some((t) => t.id === theme.id);
      return isSelected
        ? prevThemes.filter((t) => t.id !== theme.id) // 선택 해제
        : [...prevThemes, theme]; // 선택 추가
    });

    setClickedStates((prevStates) => ({
      ...prevStates,
      [theme.id]: !prevStates[theme.id], // 기존 값 반전
    }));
  };

  // 유저 ID 가져오기
  const getUserId = async (): Promise<string | null> => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const userId = jwtDecode(token).sub;
      return userId || null;
    } catch {
      return null;
    }
  };

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("인증 토큰이 없습니다.");

      // 사용자 ID 가져오기
      const userId = await getUserId();
      if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

      // 보유한 아이템 확인
      const ownedItemsResponse = await axios.get(
        `https://api.meet-da.site/store/my-items?type=THEME`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (ownedItemsResponse.status !== 200) {
        throw new Error("보유한 테마 목록을 불러오지 못했습니다.");
      }

      const ownedItems: string[] = ownedItemsResponse.data.map(
        (item: { name: string }) => item.name
      );

      const alreadyOwnedItems = selectedThemes.filter((item) =>
        ownedItems.includes(item.name)
      );

      if (alreadyOwnedItems.length > 0) {
        setModalData({
          name: "이미 보유한 테마",
          content: `${alreadyOwnedItems.map((i) => i.name).join(", ")}을 이미 보유 중입니다.`,
        });
        setIsModalClick("deleteThemeCompleteModal");
        return;
      }

      // 테마 구매 요청
      const purchasedItems: string[] = [];

      await Promise.all(
        selectedThemes.map(async (item) => {
          try {
            const purchaseResponse = await axios.post(
              `https://api.meet-da.site/store/buy/${item.id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (purchaseResponse.data?.message?.includes("구매 완료")) {
              purchasedItems.push(item.name);
            }
          } catch (error) {
            console.error(`${item.name} 구매 중 오류 발생:`, error);
          }
        })
      );

      // 구매 결과에 따라 모달 변경 (배경 유지)
      if (purchasedItems.length > 0) {
        setModalData({
          name: purchasedItems.join(", "),
          content: "구매가 완료되었습니다.",
          price: totalPrice,
        });
        setIsModalClick("pointModal"); // 기존 모달 덮어쓰기
      } else {
        setModalData({
          name: "구매 실패",
          content: "구매를 완료할 수 없습니다.",
        });
        setIsModalClick("deleteThemeCompleteModal");
      }
    } catch (error) {
      console.error("구매 오류 발생:", error);
      setModalData({
        name: "구매 오류",
        content: "구매 과정에서 오류가 발생했습니다.",
      });
      setIsModalClick("deleteThemeCompleteModal");
    }
  };

  // 상품명 20자 제한 + "..." 처리
  const selectedNames = selectedThemes.map((t) => t.name).join(", ");
  const truncatedNames =
    selectedNames.length > 20
      ? selectedNames.slice(0, 20) + " ..."
      : selectedNames;

  const totalPrice = useMemo(() => {
    return selectedThemes.reduce((sum, theme) => sum + theme.price, 0);
  }, [selectedThemes]);

  useEffect(() => {
    if (!isModal) {
      setSelectedThemes([]);
    }
  }, [isModal]);

  useEffect(() => {}, [selectedThemes]); // 상태가 변경될 때마다 로그 출력

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
              onClick={() => isModalOpen("bulkPurchaseModal")}
              disabled={selectedThemes.length === 0} // 선택된 상품이 없으면 비활성화
            >
              구매하기
            </DiarySettingButton>
          </ButtonWrapper>
        </NavWrap>
        <ThemeContainer>
          <ThemeWrapper>
            {currentData.map((theme) => (
              <ThemeSet key={theme._id}>
                <ThemeTitle>
                  <CheckBox
                    $isClicked={!!clickedStates[theme._id]}
                    onClick={() =>
                      checkClick({
                        id: theme._id.toString(),
                        name: theme.name,
                        price: theme.price,
                      })
                    }
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

      {/* 구매하기 모달 */}
      {isModal === "bulkPurchaseModal" && selectedThemes.length > 0 && (
        <DeleteModal
          isOpen={isModal === "bulkPurchaseModal"}
          title={truncatedNames || "상품 선택 오류"}
          content={
            selectedThemes.length === 1
              ? "구매 하시겠습니까?"
              : "선택한 상품을 모두 구매하시겠습니까?"
          }
          subContent={
            selectedThemes.length === 1
              ? ` ${totalPrice} 포인트가 차감됩니다.`
              : `총 ${totalPrice} 포인트가 차감됩니다.`
          }
          onConfirm={handlePurchase} // 구매 API 요청 실행
        />
      )}

      {/* PointModal */}
      {isModal === "pointModal" && (
        <PointModal
          isOpen={isModal === "pointModal"}
          title={modalData.name}
          content={`- ${modalData.price} P`} // 차감된 포인트 표시
          subContent="구매 완료되었습니다!"
          onConfirm={() => setIsModalClick(null)} // 확인 클릭 시 모달 닫기
        />
      )}

      {/* 구매 완료 모달 */}
      {isModal === "deleteThemeCompleteModal" && (
        <DeleteThemeCompleteModal
          title={modalData.name}
          content={modalData.content}
          onConfirm={() => setIsModalClick(null)}
        />
      )}
    </>
  );
}
