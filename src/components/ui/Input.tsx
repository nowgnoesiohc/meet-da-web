import styled, { css } from "styled-components";

interface CommonProps {
  exceeded?: boolean; // 글자수 초과 여부
}

// 공통 인풋 스타일 믹스인
export const commonStyle = css<CommonProps>`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border: 2px solid ${({ exceeded }) => (exceeded ? "#FF0000" : "#635E4E")};
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  color: #000;
  ::placeholder {
    color: ${({ exceeded }) => (exceeded ? "#FF0000" : "#aaa")};
  }

  &:focus {
    border-color: ${({ exceeded }) => (exceeded ? "#FF0000" : "#F3752E")};
  }
`;

const StyledInput = styled.input<{ exceeded: boolean }>`
  ${commonStyle}
`;
const Input = ({a color, onChange }) => {
  return <StyledInput color={color} onChange={onChange} />;
};

export { Input };
