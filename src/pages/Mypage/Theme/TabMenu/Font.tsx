import { useEffect, useMemo, useState } from "react";
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
  NavWrap,
  ButtonWrapper,
} from "./Font.styles";
import { jwtDecode } from "jwt-decode";
import DeleteModal from "@/components/modal/DeleteModal";
import PointModal from "@/components/modal/PointModal";
import DeleteThemeCompleteModal from "@/components/modal/DeleteThemeCompleteModal";
import { DiarySettingButton } from "@/components/ui/Button";

export default function Font() {
  const [clickedStates, setClickedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedFonts, setSelectedFonts] = useState<
    { id: string; name: string; price: number }[]
  >([]);

  const isModal = useIsModalStore((state) => state.isModal);
  const [fonts, setFonts] = useState<
    { _id: number; name: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

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
    console.log(type);
    setIsModalClick(type || null); // type이 없으면 null을 설정
  };

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

  // Theme에서 selectedFonts가 초기화되면 체크박스도 초기화
  useEffect(() => {
    if (isModal === null) {
      console.log("모달이 닫혔을 때 체크박스 초기화 실행");
      setClickedStates({});
    }
  }, [isModal]);

  // 개별 체크박스 클릭 (Font 상태 업데이트)
  const checkClick = (font: { id: string; name: string; price: number }) => {
    setSelectedFonts((prevFonts) => {
      const isSelected = prevFonts.some((t) => t.id === font.id);
      return isSelected
        ? prevFonts.filter((t) => t.id !== font.id) // 선택 해제
        : [...prevFonts, font]; // 선택 추가
    });

    setClickedStates((prevStates) => ({
      ...prevStates,
      [font.id]: !prevStates[font.id], // 기존 값 반전
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

  // 폰트 구매 처리
  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("인증 토큰이 없습니다.");

      const userId = await getUserId();
      if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

      // 보유한 아이템 확인
      const ownedItemsResponse = await axios.get(
        `https://api.meet-da.site/store/my-items?type=FONT`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (ownedItemsResponse.status !== 200) {
        throw new Error("보유한 폰트 목록을 불러오지 못했습니다.");
      }

      const ownedItems: string[] = ownedItemsResponse.data.map(
        (item: { name: string }) => item.name
      );

      const alreadyOwnedItems = selectedFonts.filter((item) =>
        ownedItems.includes(item.name)
      );

      if (alreadyOwnedItems.length > 0) {
        setModalData({
          name: "이미 보유한 폰트",
          content: `${alreadyOwnedItems.map((i) => i.name).join(", ")}을 이미 보유 중입니다.`,
        });
        setIsModalClick("deleteThemeCompleteModal");
        return;
      }

      // 포인트 차감 API 요청
      const pointResponse = await axios.patch(
        `https://api.meet-da.site/user/${userId}/points`,
        { delta: -totalPrice, description: truncatedNames },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (pointResponse.status !== 200) {
        setModalData({ name: "포인트 부족", content: "포인트가 부족합니다." });
        setIsModalClick("deleteThemeCompleteModal");
        return;
      }

      // 폰트 구매 요청
      const purchasedItems: string[] = [];

      await Promise.all(
        selectedFonts.map(async (item) => {
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

      // 구매 결과에 따라 모달 변경
      if (purchasedItems.length > 0) {
        setModalData({
          name: purchasedItems.join(", "),
          content: "구매가 완료되었습니다.",
          price: totalPrice,
        });
        setIsModalClick("pointModal");
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
  const selectedNames = selectedFonts.map((t) => t.name).join(", ");
  const truncatedNames =
    selectedNames.length > 20
      ? selectedNames.slice(0, 20) + " ..."
      : selectedNames;

  const totalPrice = useMemo(() => {
    return selectedFonts.reduce((sum, theme) => sum + theme.price, 0);
  }, [selectedFonts]);

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
              disabled={selectedFonts.length === 0} // 선택된 상품이 없으면 비활성화
            >
              구매하기
            </DiarySettingButton>
          </ButtonWrapper>
        </NavWrap>
        <FontContainer>
          <FontWrapper>
            {currentData.map((fonts) => (
              <FontSet key={fonts._id}>
                <FontTitle>
                  <CheckBox
                    $isClicked={!!clickedStates[fonts._id]}
                    onClick={() =>
                      checkClick({
                        id: fonts._id.toString(),
                        name: fonts.name,
                        price: fonts.price,
                      })
                    }
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

      {/* 구매하기 모달 */}
      {isModal === "bulkPurchaseModal" && selectedFonts.length > 0 && (
        <DeleteModal
          isOpen={isModal === "bulkPurchaseModal"}
          title={truncatedNames || "상품 선택 오류"}
          content={
            selectedFonts.length === 1
              ? "구매 하시겠습니까?"
              : "선택한 상품을 모두 구매하시겠습니까?"
          }
          subContent={
            selectedFonts.length === 1
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
