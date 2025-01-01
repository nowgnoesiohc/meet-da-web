// CommonStyles.ts
import styled, { css } from "styled-components";
import React, { useState, ChangeEvent } from "react";

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
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
  showCount?: boolean;
}

const StyledInput = styled.input<{ exceeded: boolean }>`
  ${commonStyle}
`;

export const Input: React.FC<InputProps> = ({
  maxLength,
  showCount,
  ...props
}) => {
  const [value, setValue] = useState(props.value?.toString() || "");
  const exceeded = maxLength ? value.length > maxLength : false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        {...props}
        value={value}
        onChange={handleChange}
        exceeded={exceeded}
        placeholder={exceeded ? "글자 수 초과!" : props.placeholder}
      />
      {showCount && maxLength !== undefined && (
        <CountIndicator exceeded={exceeded}>
          {value.length}/{maxLength}
        </CountIndicator>
      )}
    </div>
  );
};

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  showCount?: boolean;
}

const StyledTextarea = styled.textarea<{ exceeded: boolean }>`
  ${commonStyle}
  resize: none;
  min-height: 100px;
`;

export const Textarea: React.FC<TextareaProps> = ({
  maxLength,
  showCount,
  ...props
}) => {
  const [value, setValue] = useState(props.value?.toString() || "");
  const exceeded = maxLength ? value.length > maxLength : false;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledTextarea
        {...props}
        value={value}
        onChange={handleChange}
        exceeded={exceeded}
        placeholder={exceeded ? "글자 수 초과!" : props.placeholder}
      />
      {showCount && maxLength !== undefined && (
        <CountIndicator exceeded={exceeded}>
          {value.length}/{maxLength}
        </CountIndicator>
      )}
    </div>
  );
};

const CountIndicator = styled.span<{ exceeded: boolean }>`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  color: ${({ exceeded }) => (exceeded ? "#FF0000" : "#000")};
`;
