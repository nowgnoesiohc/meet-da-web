import styled from "styled-components";
import { useState, useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const PageNation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  justify-content: center;
`;

export const BeforeIcon = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  color: var(--line-basic);

  @media (max-width: 390px) {
    font-size: 1.25rem;
  }
`;

export const AfterIcon = styled(IoIosArrowForward)`
  font-size: 1.5rem;
  color: var(--line-basic);

  @media (max-width: 390px) {
    font-size: 1.25rem;
  }
`;

export const PageNumber = styled.div<{ selected: boolean }>`
  font-size: 1.25rem;
  cursor: pointer;
  color: ${(props) => (props.selected ? "var(--main-orange)" : "var(--black)")};

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

export const PaginationButton = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

export default function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = useMemo(
    () => data.slice(indexOfFirstItem, indexOfLastItem),
    [data, currentPage]
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return {
    currentData,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
  };
}
