import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

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

const PointList = styled.div<{ variant: "use" | "save" }>`
  display: flex;
  width: 26%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.variant === "use" ? "var(--point-red)" : "var(--point-blue)"};
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

export default function PointManagement() {
  type ExampleItem = {
    context: string;
    point: string;
    date: string;
    variant: "use" | "save"; // 정확한 타입 지정
  };

  const exampleData: ExampleItem[] = Array.from({ length: 25 }, (_, i) => ({
    context: `내역 ${i + 1}`,
    point: i % 2 === 0 ? `+ ${100 + i} P` : `- ${100 + i} P`,
    date: `2025. 01. ${String(i + 1).padStart(2, "0")}`,
    variant: i % 2 === 0 ? "save" : "use", // "use" | "save"로 제한
  }));

  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 표시할 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = exampleData.slice(startIndex, startIndex + itemsPerPage);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(exampleData.length / itemsPerPage);

  return (
    <>
      <Layout>
        <PointWrap>
          <InfoWrap>
            현재
            <Username>포뇨소스케스키</Username>
            님의 포인트는...
          </InfoWrap>
          <Userpoint>7,900 P</Userpoint>
        </PointWrap>
        <SearchBarContainer>
          <SearchInput type="text" placeholder="다양한 테마를 검색해 보세요." />
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
            {currentData.map((item, index) => (
              <EachList key={index}>
                <ContextList>{item.context}</ContextList>
                <PointList variant={item.variant}>{item.point}</PointList>
                <DateList>{item.date}</DateList>
              </EachList>
            ))}
          </ListWrap>
          {/* 페이지네이션 UI */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.625rem",
              marginTop: "1.25rem",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  fontWeight: currentPage === i + 1 ? "bold" : "normal",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              다음
            </button>
          </div>
        </ListContainer>
      </Layout>
    </>
  );
}
