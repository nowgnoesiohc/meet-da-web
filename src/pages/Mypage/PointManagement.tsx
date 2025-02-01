import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import React, { useMemo } from "react";
import { notification } from "antd";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding: 2.5rem 1.25rem 0rem 5rem;
  align-items: center;

  @media (max-width: 781px) {
    padding: 2.5rem 1.25rem 0rem 3.125rem;
    height: 100%;
  }

  @media (max-width: 390px) {
    gap: 1.625rem;
    height: 100%;
    padding-left: 0rem;
  }
`;

const PointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 781px) {
    flex-direction: column;
    gap: 0.625rem;
  }
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  color: var(--main-text);
  gap: 0.625rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const Username = styled.div`
  display: flex;
  color: var(--main-text);
  text-align: center;
  font-size: 1.75rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    font-size: 1.25rem;
  }
`;

const Userpoint = styled.div`
  display: flex;
  width: 16.375rem;
  height: 4.25rem;
  padding: 0rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background: var(--bg-01);
  color: var(--orange-button);
  text-align: center;
  font-size: 2.25rem;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    width: 100%;
  }

  @media (max-width: 390px) {
    font-size: 1.875rem;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.75rem;
  padding: 0.75rem 2.5rem;
  gap: 0.625rem;
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

const ListContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5rem 1.875rem;
  margin-bottom: 3.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0.25rem 0.25rem 0.75rem rgba(0, 0, 0, 0.25);

  @media (max-width: 781px) {
    padding: 2.5rem 3.125rem 1.875rem;
    gap: 2.5rem;
  }

  @media (max-width: 390px) {
    padding: 1.25rem 1.25rem 1.25rem;
    gap: 1.25rem;
  }
`;

const IndexWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1.6875rem;

  @media (max-width: 781px) {
    justify-content: space-between;
    height: 4.875rem;
  }
`;

const ContextIndex = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: var(--bg-02);
  color: var(--main-text);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    width: 7.75rem;
    height: 4.875rem;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const PointIndex = styled.div`
  display: flex;
  width: 26%;
  height: auto;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: var(--bg-02);
  color: var(--main-text);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    width: 7.75rem;
    height: 4.875rem;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const DateIndex = styled.div`
  display: flex;
  width: 22%;
  height: auto;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: var(--bg-02);
  color: var(--main-text);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    width: 7.75rem;
    height: 4.875rem;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const ListWrap = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem;
`;

const EachList = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 1.625rem;
  border-radius: 0.625rem;
  border: 1px solid var(--line-basic);

  @media (max-width: 781px) {
    padding: 2.5rem 0.75rem;
  }

  @media (max-width: 781px) {
    padding: 0.625rem 0.75rem;
  }
`;

const ContextList = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  color: var(--main-text);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    width: 7.125rem;
    height: auto;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const PointList = styled.div<{ $variant: "use" | "save" }>`
  display: flex;
  width: 26%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.$variant === "use" ? "var(--point-red)" : "var(--point-blue)"};
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-regular);

  @media (max-width: 781px) {
    width: 7.125rem;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const DateList = styled.div`
  display: flex;
  width: 22%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  color: var(--text-03);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-regular);

  @media (max-width: 781px) {
    width: 7.125rem;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const PageNation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  justify-content: center;
`;

const BeforeIcon = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  color: var(--line-basic);

  @media (max-width: 390px) {
    font-size: 1.25rem;
  }
`;

const AfterIcon = styled(IoIosArrowForward)`
  font-size: 1.5rem;
  color: var(--line-basic);

  @media (max-width: 390px) {
    font-size: 1.25rem;
  }
`;

const PageNumber = styled.div<{ selected: boolean }>`
  font-size: 1.25rem;
  cursor: pointer;
  color: ${(props) => (props.selected ? "var(--main-orange)" : "var(--black)")};

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const PaginationButton = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

const NotFound = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: var(--main-text);
  text-align: center;
  font-size: 1.25rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    width: 7.125rem;
    height: auto;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

type PointHistoryItem = {
  description: string;
  points: number;
  date: string;
};

const POINTS_PER_PAGE = 10; // 한 페이지에 보여줄 항목 수

const Context = React.createContext({ name: "Default" });

export default function PointManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  const [userData, setUserData] = useState({
    username: "",
    profileImage: "",
    description: "",
    points: "",
  });

  const [pointHistory, setPointHistory] = useState<PointHistoryItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [filteredData, setFilteredData] = useState<PointHistoryItem[]>([]); // 필터된 데이터
  const [isSearching, setIsSearching] = useState(false); // 검색 상태 확인

  const getUserId = async (): Promise<string | null> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return null; // 토큰이 없을 경우 null 반환
    }
    const userId = jwtDecode(token).sub;
    if (!userId) return null;
    else return userId;
  };

  // 로그인된 유저 정보
  useEffect(() => {
    async function fetchUserData() {
      const userId = await getUserId();
      try {
        const response = await axios.get(
          `https://api.meet-da.site/user/${userId}/`
        );
        const { username, profileImage, description, points, pointHistory } =
          response.data;
        setUserData({ username, profileImage, description, points });
        setPointHistory(pointHistory);
        setFilteredData(pointHistory); // 초기 데이터 설정
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다:", error);
      }
    }
    fetchUserData();
  }, []);

  // 검색 함수
  const performSearch = useCallback(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (keyword === "") {
      setFilteredData(pointHistory);
    } else {
      const filtered = pointHistory.filter((item) =>
        item.description.toLowerCase().includes(keyword)
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 초기화
    setIsSearching(false); // 검색 종료 상태로 변경
  }, [searchKeyword, pointHistory]);

  // 디바운싱
  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        performSearch();
      }, 1000);
      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [isSearching, performSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value); // 검색어 업데이트
    setIsSearching(true); // 검색 상태 활성화
  };

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * POINTS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - POINTS_PER_PAGE;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / POINTS_PER_PAGE);

  const formattedPoints = new Intl.NumberFormat().format(
    Number(userData.points)
  );

  const [api, contextHolder] = notification.useNotification();

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <>
      <Layout>
        <PointWrap>
          <InfoWrap>
            현재
            <Username>{userData.username}</Username>
            님의 포인트는...
          </InfoWrap>
          <Userpoint>{formattedPoints} P</Userpoint>
        </PointWrap>
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="포인트 사용내역을 검색해 보세요."
            value={searchKeyword}
            onChange={handleSearch}
          />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchBarContainer>
        <ListContainer>
          <IndexWrap>
            <ContextIndex>내역</ContextIndex>
            <PointIndex>사용 / 적립 포인트</PointIndex>
            <DateIndex>사용 / 적립일</DateIndex>
          </IndexWrap>
          <ListWrap>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <EachList key={index}>
                  <ContextList>{item.description}</ContextList>
                  <PointList $variant={item.points > 0 ? "save" : "use"}>
                    {item.points > 0
                      ? `+ ${new Intl.NumberFormat().format(item.points)} P`
                      : `- ${new Intl.NumberFormat().format(
                          Math.abs(item.points)
                        )} P`}
                  </PointList>
                  <DateList>
                    {new Date(item.date).toLocaleDateString()}
                  </DateList>
                </EachList>
              ))
            ) : (
              <NotFound>검색 결과가 없습니다.</NotFound>
            )}
          </ListWrap>
          {/* 페이지네이션 UI */}
          <PageNation>
            <Context.Provider value={contextValue}>
              {contextHolder}

              <PaginationButton
                disabled={currentPage === 1}
                onClick={() => {
                  if (currentPage === 1) {
                    api.warning({
                      message: "첫 페이지입니다.",
                      description: "더 이상 이전 페이지로 이동할 수 없습니다.",
                      placement: "topRight",
                    });
                  } else {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <BeforeIcon />
              </PaginationButton>

              {Array.from({ length: totalPages }, (_, index) => (
                <PageNumber
                  key={index + 1}
                  selected={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PageNumber>
              ))}

              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => {
                  if (currentPage === totalPages) {
                    api.warning({
                      message: "마지막 페이지입니다.",
                      description: "더 이상 다음 페이지로 이동할 수 없습니다.",
                      placement: "topRight",
                    });
                  } else {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                <AfterIcon />
              </PaginationButton>
            </Context.Provider>
          </PageNation>
        </ListContainer>
      </Layout>
    </>
  );
}
