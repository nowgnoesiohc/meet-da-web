import DeleteModal from "@/components/modal/DeleteModal";
import PointModal from "@/components/modal/PointModal";
import { DiarySettingButton } from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { themeSetImageMap } from "@/assets/common/themeImages";
import DeleteThemeCompleteModal from "@/components/modal/DeleteThemeCompleteModal";
import { themeFonts } from "@/assets/common/themeFonts";

const Layout = styled.div`
  display: flex;
  gap: 1.875rem;
  padding: 2.5rem 1.25rem 0rem 5rem;
  margin-bottom: 2rem;

  @media (max-width: 781px) {
    flex-direction: column;
    padding: 2.5rem 1.25rem 0rem 3.125rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 390px) {
    gap: 1.25rem;
    padding: 2.5rem 1.25rem 1.25rem 0rem;
    margin: unset;
  }
`;

const TabWrap = styled.div`
  display: flex;
  gap: 1.875rem;
`;

const TabWrapper = styled.button`
  display: flex;
  height: 3rem;
  align-items: flex-start;

  @media (max-width: 781px) {
    height: 2.125rem;
  }
`;

const TabMenu = styled.button<{
  isClicked: boolean;
}>`
  display: flex;
  width: 100%;
  padding-bottom: 1rem;
  color: var(--black);
  font-size: 1.5rem;
  font-weight: var(--font-semibold);
  border-bottom: ${(props) =>
    props.isClicked ? "3px solid var(--orange-button)" : ""};

  @media (max-width: 781px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  width: 7.75rem;

  @media (max-width: 781px) {
    justify-content: center;
    margin: unset;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
`;

export default function Theme() {
  const [ownThemes, setOwnThemes] = useState<
    { id: number; name: string; image: string }[]
  >([]);
  const [ownFonts, setOwnFonts] = useState<{ name: string; image: string }[]>(
    []
  );
  const navigate = useNavigate();
  const location = useLocation();

  console.log(ownThemes);
  console.log(ownFonts);

  // 선택한 상품 상태 관리
  const [selectedThemes, setSelectedThemes] = useState<
    { name: string; price: number }[]
  >([]);

  // 메뉴 데이터 정의
  const TabItems = [
    { key: "Emoji", path: "emoji", label: "이모지" },
    { key: "Font", path: "font", label: "폰트" },
    { key: "Own", path: "own", label: "보유 테마" },
  ];

  // 현재 활성 탭을 상태로 관리
  const [activeTab, setActiveTab] = useState("Emoji");

  // 컴포넌트가 처음 로드되었을 때 기본 경로로 리다이렉트
  useEffect(() => {
    if (location.pathname === "/mypage" || location.pathname === "/mypage/") {
      navigate(TabItems[0].path); // 기본 경로로 리다이렉트
    }
  }, [location, navigate]);

  // 현재 경로에 따라 활성 탭 상태 업데이트
  useEffect(() => {
    const currentTab = TabItems.find((tab) =>
      location.pathname.includes(tab.path)
    );
    if (currentTab) {
      setActiveTab(currentTab.key);
    }
  }, [location.pathname]);

  const isModal = useIsModalStore((state) => state.isModal) as string | null;
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick) as (
    type: string | null
  ) => void;

  const isModalOpen = (type?: string | null) => {
    console.log(type);
    setIsModalClick(type || null); // type이 없으면 null을 설정
  };

  // 선택된 상품 정보 받아오기 (자식 -> 부모)
  const handleSelectedThemes = (
    themes: { id: number; name: string; price: number }[]
  ) => {
    setSelectedThemes(themes);
  };

  const [modalData, setModalData] = useState<{ name: string; price: number }>({
    name: "",
    price: 0,
  });

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

  useEffect(() => {
    console.log("selectedThemes 변경됨, totalPrice 업데이트됨:", totalPrice);
  }, [selectedThemes]); // 상태가 변경될 때마다 로그 출력

  useEffect(() => {
    console.log("현재 isModal 상태:", isModal);
  }, [isModal]);

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

  // 구매 핸들러 (포인트 차감 API 연결)
  const handlePurchase = async () => {
    try {
      const userId = await getUserId();
      if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

      const response = await axios.patch(
        `https://api.meet-da.site/user/${userId}/points`,
        {
          delta: -totalPrice,
          description: truncatedNames,
        }
      );

      if (response.status === 200) {
        console.log("포인트 차감 성공:", response.data);

        // 기존 보유 테마 및 폰트 불러오기
        const storedThemes = JSON.parse(
          localStorage.getItem("ownedThemes") || "[]"
        );
        const storedFonts = JSON.parse(
          localStorage.getItem("ownedFonts") || "[]"
        );

        // 선택한 항목 구분 (테마/폰트)
        const selectedFonts = selectedThemes.filter((item) =>
          Object.keys(themeFonts).includes(item.name)
        );
        const selectedThemesList = selectedThemes.filter((item) =>
          Object.keys(themeSetImageMap).includes(item.name)
        );

        // 새로운 폰트 추가 (즉시 적용 X)
        const newFonts = selectedFonts.filter(
          (font) =>
            !storedFonts.some((t: { name: string }) => t.name === font.name)
        );

        // 새로운 테마 추가
        const newThemes = selectedThemesList.filter(
          (theme) =>
            !storedThemes.some((t: { name: string }) => t.name === theme.name)
        );

        // 보유 폰트 업데이트
        if (newFonts.length > 0) {
          const updatedFonts = [...storedFonts, ...newFonts];
          localStorage.setItem("ownedFonts", JSON.stringify(updatedFonts));
        }

        // 보유 테마 업데이트
        if (newThemes.length > 0) {
          const updatedThemes = [
            ...storedThemes,
            ...newThemes.map((theme, index) => ({
              id: index,
              name: theme.name,
              image: themeSetImageMap[theme.name] || "",
            })),
          ];
          localStorage.setItem("ownedThemes", JSON.stringify(updatedThemes));
        }

        // 강제 리렌더링 유도
        setTimeout(() => {
          window.dispatchEvent(new Event("storage"));
        }, 200);

        // 모달 데이터 업데이트
        setModalData({
          name: truncatedNames || "상품 선택 오류",
          price: totalPrice,
        });

        // 구매 완료 후 선택한 상품 초기화 & 모달 닫기
        setSelectedThemes([]);
        setIsModalClick(null);

        // PointModal 표시
        setTimeout(() => {
          setIsModalClick("pointModal");
        }, 100);
      } else {
        console.error("포인트 차감 실패:", response.data);
      }
    } catch (error) {
      console.error("포인트 차감 요청 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Layout>
        <TabWrap>
          {TabItems.map((menu) => (
            <TabWrapper key={menu.key}>
              <Link to={menu.path}>
                <TabMenu
                  isClicked={activeTab === menu.key}
                  onClick={() => setActiveTab(menu.key)}
                >
                  {menu.label}
                </TabMenu>
              </Link>
            </TabWrapper>
          ))}
        </TabWrap>
        {/* Emoji & Font 탭일 때는 일괄 구매 버튼 표시 */}
        {["Emoji", "Font"].includes(activeTab) && (
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
        )}

        {/* Own 탭일 때는 삭제하기 버튼 표시 */}
        {["Own"].includes(activeTab) && (
          <ButtonWrapper>
            <DiarySettingButton
              $variant="delete"
              style={{ width: "100%" }}
              onClick={() => isModalOpen("deleteModal")}
              disabled={selectedThemes.length === 0}
            >
              삭제하기
            </DiarySettingButton>
          </ButtonWrapper>
        )}
      </Layout>
      <ContentWrapper>
        <Content>
          {/* Outlet에 props 전달 (자식 컴포넌트가 선택된 상품을 업데이트할 수 있도록 함) */}
          <Outlet context={{ handleSelectedThemes, selectedThemes }} />
        </Content>
      </ContentWrapper>

      {/* 삭제하기 모달 */}
      {isModal === "deleteModal" && (
        <DeleteModal
          isOpen={isModal === "deleteModal"}
          title={truncatedNames ? `${truncatedNames} 삭제` : "상품 선택 오류"}
          content={
            selectedThemes.length === 1
              ? "정말로 삭제 하시겠습니까?"
              : "선택한 상품을 모두 삭제하시겠습니까?"
          }
          subContent="삭제한 테마와 사용된 포인트는 복구되지 않습니다."
          onConfirm={() => {
            console.log("삭제 모달 확인 버튼 클릭됨");

            // 삭제할 항목이 없는 경우 조기 종료 (오류 방지)
            if (selectedThemes.length === 0) {
              console.warn("삭제할 상품이 없습니다.");
              return;
            }

            // 선택한 테마 초기화 (삭제 전에 실행)
            console.log("삭제 전 selectedThemes:", selectedThemes);
            setSelectedThemes([]);
            console.log("삭제 후 selectedThemes:", selectedThemes);

            // 기존 보유 목록 불러오기
            const storedThemes = JSON.parse(
              localStorage.getItem("ownedThemes") || "[]"
            );
            const storedFonts = JSON.parse(
              localStorage.getItem("ownedFonts") || "[]"
            );

            // 삭제된 테마/폰트를 제외한 새로운 목록 생성
            const updatedThemes = storedThemes.filter(
              (theme: { name: string }) =>
                !selectedThemes.some((t) => t.name === theme.name)
            );

            const updatedFonts = storedFonts.filter(
              (font: { name: string }) =>
                !selectedThemes.some((t) => t.name === font.name)
            );

            // 상태 업데이트
            setOwnThemes([...updatedThemes]); // 강제 리렌더링
            setOwnFonts([...updatedFonts]);

            // 로컬스토리지 업데이트
            localStorage.setItem("ownedThemes", JSON.stringify(updatedThemes));
            localStorage.setItem("ownedFonts", JSON.stringify(updatedFonts));

            // 스토리지 이벤트 발생 (다른 컴포넌트에 즉시 반영)
            window.dispatchEvent(new Event("storage"));
            console.log("storage 이벤트 발생");

            // 기존 모달 닫기
            setIsModalClick(null);

            setTimeout(() => {
              setIsModalClick("deleteCompleteModal");
            }, 150);
          }}
        />
      )}

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

      {/* 삭제 후 모달 표시 */}
      {isModal === "deleteCompleteModal" && (
        <DeleteThemeCompleteModal
          title="테마 삭제"
          content="테마가 정상적으로 삭제되었습니다."
        />
      )}
    </>
  );
}
