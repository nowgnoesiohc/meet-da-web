import styled from "styled-components";
import loginLogo from "../../assets/images/loginLogo.png";
import naver from "../../assets/icon/naver.png";
import google from "../../assets/icon/google.png";
import kakao from "../../assets/icon/kakao.png";
import naverHover from "../../assets/icon/naver-hover.png";
import googleHover from "../../assets/icon/google-hover.png";
import kakaoHover from "../../assets/icon/kakao-hover.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useIsModalStore } from "@/store/ModalStore";
// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrangeButton } from "@/components/ui/Button";
import { AiOutlineClose } from "react-icons/ai";
// import { useIsModalStore } from "../../store/ModalStore";

interface StyledProps {
  $isError?: boolean;
}

const LoginWrap = styled.div`
  width: 34.5rem; /* 552px */
  height: 43.75rem; /* 700px */
  margin: 10% auto;
  text-align: center;

  @media (max-width: 390px) {
    width: 22.5rem;

    form {
      width: 22.5rem;
    }
  }
`;

const LoginLogo = styled(Link)<StyledProps>`
  display: block;
  width: 34.5rem;
  height: 10.75rem;
  background-image: url(${loginLogo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 390px) {
    background-size: contain;
    width: 22.5rem;
    height: 5.4375rem;
  }
`;

const Join = styled.div`
  margin-top: 1.5rem; /* 24px */
  margin-bottom: 3rem; /* 48px */

  @media (max-width: 390px) {
    width: 17.5rem;
    margin: 1.5rem auto 1.125rem;
    font-size: 1rem;
    display: flex;
    justify-content: center;
  }
`;

const Span = styled.span`
  &:first-child {
    margin-right: 0.625rem; /* 10px */
    color: var(--text-02);
  }
  &:last-child {
    cursor: pointer;
  }
  font-size: 1.25rem;
`;

const Input = styled.input<StyledProps>`
  width: 27.625rem; /* 442px */
  height: 4.25rem; /* 68px */
  border: 0.0625rem solid;
  border-color: ${(props) =>
    props.$isError ? "var(--error-02)" : "var(--text-02)"}; // 에러 시 빨간색
  border-radius: 0.75rem; /* 12px */
  margin: ${(props) => (props.$isError ? "0" : "0.75rem 0")}; /* 12px */
  padding-left: 1.125rem; /* 18px */
  font-size: 1.5rem; /* 24px */

  &:focus {
    border-color: var(--main-orange);
  }

  &::placeholder {
    color: ${(props) =>
      props.$isError ? "var(--error-02)" : "var(--text-02)"}; // 에러 시 빨간색
  }

  @media (max-width: 390px) {
    width: 17.5rem;
    font-size: 1.125rem;
  }
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.25rem;

  @media (max-width: 390px) {
    margin-top: 1.25rem;
  }
`;

const SnsWrap = styled.div`
  width: 27.625rem; /* 442px */
  height: 2.5rem; /* 40px */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 2.375rem; /* 38px */
  color: var(--main-text);
  font-size: 1.25rem; /* 20px */

  @media (max-width: 390px) {
    width: 17.5rem;

    > span {
      width: 5.4375rem;
      white-space: nowrap;
      font-size: 1rem;
    }
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;

  > button {
    width: 2.5rem; /* 40px */
    height: 2.5rem; /* 40px */
    background-size: cover;
    background-position: center;
  }
`;

const Naver = styled.button`
  background-image: url(${naver});
  transition: 0.5s;

  &:hover {
    background-image: url(${naverHover});
  }
`;

const Google = styled.button`
  background-image: url(${google});
  margin: 0 1.5rem; /* 24px */
  transition: 0.5s;

  &:hover {
    background-image: url(${googleHover});
  }

  @media (max-width: 390px) {
    margin: 0 0.625rem;
  }
`;

const Kakao = styled.button`
  background-image: url(${kakao});
  transition: 0.5s;

  &:hover {
    background-image: url(${kakaoHover});
  }
`;

const PasswordReset = styled.button`
  width: 27.625rem; /* 442px */
  padding: 0;
  margin-top: 1.5rem; /* 24px */

  > button {
    float: right;
    padding: 0;
    color: var(--main-text);
    font-size: 1.25rem; /* 20px */
  }

  @media (max-width: 390px) {
    width: 17.5rem;
    button {
      white-space: nowrap;
      font-size: 1rem;
    }
  }
`;
const ErrorIcon = styled(AiOutlineClose)<StyledProps>`
  font-size: 1rem;
`;

const Error = styled.div<StyledProps>`
  width: 27.625rem; /* 442px */
  height: 1.75rem; /* 28px */
  color: var(--error-02);
  display: ${(props) => (props.$isError ? "flex" : "none")}; // 조건부 렌더링
  align-items: center;
  padding-left: 1.25rem;
  margin: 0.375rem auto 1.25rem;

  > img {
    width: 1rem;
    height: 1rem;
  }

  > p {
    margin: 0;
    padding-left: 0.5rem;
    padding-top: 0.25rem;
  }

  @media (max-width: 390px) {
    width: 17.5rem;
    padding-left: 0.375rem;
    font-size: 0.75rem;

    > p {
      padding-left: 0.1875rem;
      text-align: left;
    }
  }
`;

export default function Login() {
  // 비밀번호 찾기
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const FindPassword = (type?: string) => {
    console.log(type);

    if (type) {
      setIsModalClick(type);
    } else {
      setIsModalClick();
    }
  };

  const schema = z.object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("이메일 형식이 올바르지 않습니다."),
    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해주세요.",
      }),
  });

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  type FormData = z.infer<typeof schema>;
  const onClickSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await axios.post("https://api.meet-da.site/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (response.status === 201) {
        console.log("로그인 성공", response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        alert(apiError.response?.data?.message || "로그인에 실패했습니다.");
      } else {
        alert("로그인 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/auth/join");
  };

  return (
    <LoginWrap>
      <LoginLogo to="/" />
      <Join>
        <Span>회원이 아니신가요?</Span>
        <Span onClick={handleSignUp}>회원가입하기</Span>
      </Join>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        <Input
          $isError={!!formState.errors.email}
          type="text"
          placeholder="이메일"
          {...register("email")}
        />
        <Error $isError={!!formState.errors.email}>
          <ErrorIcon />
          {formState.errors.email && <p>{formState.errors.email.message}</p>}
        </Error>
        <Input
          $isError={!!formState.errors.password}
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        <Error $isError={!!formState.errors.password}>
          <ErrorIcon />
          {formState.errors.password && (
            <p>{formState.errors.password.message}</p>
          )}
        </Error>
        <Button>
          <OrangeButton $variant="membership" type="submit">
            로그인 하기
          </OrangeButton>
        </Button>
      </form>
      <SnsWrap>
        <span>SNS 간편 로그인</span>
        <Ul>
          <Naver></Naver>
          <Google></Google>
          <Kakao></Kakao>
        </Ul>
      </SnsWrap>
      <PasswordReset>
        <button onClick={() => FindPassword("findPasswordModal")}>
          비밀번호 찾기
        </button>
      </PasswordReset>
    </LoginWrap>
  );
}
