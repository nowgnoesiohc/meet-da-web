import styled from "styled-components";
import loginLogo from "../../assets/images/loginLogo.png";
import naver from "../../assets/icon/naver.png";
import google from "../../assets/icon/google.png";
import kakao from "../../assets/icon/kakao.png";
import naverHover from "../../assets/icon/naver-hover.png";
import googleHover from "../../assets/icon/google-hover.png";
import kakaoHover from "../../assets/icon/kakao-hover.png";
import error from "../../assets/icon/error.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import Navigation from "@/components/layout/navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useIsModalStore } from "@/store/ModalStore";

interface StyledProps {
  $isError?: boolean;
}

// interface FormData {
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

const LoginWrap = styled.div`
  width: 34.5rem;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 6rem;
`;

const LoginLogo = styled(Link)<StyledProps>`
  display: block;
  width: 34.5rem;
  height: 10.75rem;
  background-image: url(${loginLogo});
  background-size: cover;
  background-position: center;
`;

const JoinTitle = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  font-size: 1.25rem;
`;

const LoginButton = styled.button<{ variant: "login" }>`
  font-size: 1.25rem;
  color: var(--text-main);
  cursor: pointer;
`;

const Span = styled.span`
  &:first-child {
    margin-right: 0.625rem;
    color: var(--text-02);
  }
`;

// const Form = styled.form`
//     > div > input{
//         width:27.625rem;
//         height:4.25rem;
//         border-color: ${(props) => (props.$isError ? "var(--error-02)" : "var(--text-02)")}; // 에러 시 빨간색
//     }
//     > div:nth-child(odd){
//         margin:1.5rem 0;
//     }
// `

const Input = styled.input<StyledProps>`
  width: 27.625rem;
  height: 4.25rem;
  border: 0.0625rem solid;
  border-color: ${(props) =>
    props.$isError ? "var(--error-02)" : "var(--text-02)"}; // 에러 시 빨간색
  border-radius: 0.75rem;
  margin: ${(props) => (props.$isError ? "1.25rem 0 0.375rem 0" : "0.75rem 0")};
  padding-left: 1.125rem;
  font-size: 1.5rem;

  &:focus {
    border-color: var(--main-orange);
  }

  &::placeholder {
    color: ${(props) =>
      props.$isError ? "var(--error-02)" : "var(--text-02)"}; // 에러 시 빨간색
  }
`;

const Error = styled.div<StyledProps>`
  width: 27.625rem;
  height: 1.75rem;
  margin: 0 auto;
  color: var(--error-02);
  display: ${(props) => (props.$isError ? "flex" : "none")}; // 조건부 렌더링
  align-items: center;
  padding-left: 1.25rem;

  > img {
    width: 1rem;
    height: 1rem;
  }

  > p {
    margin: 0;
    padding-left: 0.5rem;
    padding-top: 0.25rem;
  }
`;

const JoinButton = styled.button`
  width: 27.625rem;
  height: 4.25rem;
  border-radius: 0.75rem;
  background-color: var(--main-orange);
  color: #fff;
  margin-top: 2.25rem;
  font-size: 1.5rem;
`;

const SnsWrap = styled.div`
  width: 27.625rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 2.375rem;
  color: var(--main-text);

  > span {
    font-size: 1.25rem;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;

  > button {
    width: 2.5rem;
    height: 2.5rem;
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
  margin: 0 1.5rem;
  transition: 0.5s;

  &:hover {
    background-image: url(${googleHover});
  }
`;
const Kakao = styled.button`
  background-image: url(${kakao});
  transition: 0.5s;

  &:hover {
    background-image: url(${kakaoHover});
  }
`;

interface AuthType {
  isLoggedIn: boolean;
}

const Join: React.FC<AuthType> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const handleLoing = () => {
    navigate("/auth/login");
  };
  const schema = z
    .object({
      email: z
        .string()
        .min(1, "이메일을 입력해주세요.")
        .email("이메일 형식이 올바르지 않습니다."),
      password: z
        .string()
        .min(8, {
          message: "비밀번호는 영문, 숫자 조합의 8자 이상 입력해야합니다.",
        })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
          message: "비밀번호는 영문, 숫자 조합의 8자 이상 입력해야합니다.",
        }),
      confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    });

  // 폼 데이터 타입 추출
  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://api.meet-da.site/auth/signup",
        {
          email: data.email,
          password: data.password,
        }
      );
      if (response.status === 201) {
        console.log("회원가입 성공", response.data);
      }
    } catch (error: any) {
      console.error("회원가입 실패", error);
      if (error.response) {
        alert(error.response.data.message || "회원가입에 실패했습니다.");
      } else if (error.request) {
        alert("서버와의 통신에 실패했습니다.");
      } else {
        alert("회원가입 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalClick("signUpModal"); // 로그인하지 않은 경우 모달 열기
    }
  }, [isLoggedIn, setIsModalClick]);
  if (!isLoggedIn) {
    return null; // 다른 요소를 렌더링하지 않음
  }

  return (
    <>
      {/* <Navigation /> */}
      <LoginWrap>
        <LoginLogo to="/Page1" />
        <JoinTitle>
          <Span>이미 회원이신가요?</Span>
          <LoginButton variant="login" onClick={handleLoing}>
            로그인 하기
          </LoginButton>
        </JoinTitle>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <Input
            type="text"
            placeholder="이메일"
            {...register("email")}
            $isError={!!formState.errors.email}
          />
          <Error $isError={!!formState.errors.email}>
            <img src={error} alt="에러" />
            {formState.errors.email && <p>{formState.errors.email.message}</p>}
          </Error>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password")}
            $isError={!!formState.errors.password}
          />
          <Error $isError={!!formState.errors.password}>
            <img src={error} alt="에러" />
            {formState.errors.password && (
              <p>{formState.errors.password.message}</p>
            )}
          </Error>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            {...register("confirmPassword")}
            $isError={!!formState.errors.confirmPassword}
          />
          <Error $isError={!!formState.errors.confirmPassword}>
            <img src={error} alt="에러" />
            {formState.errors.confirmPassword && (
              <p>{formState.errors.confirmPassword.message}</p>
            )}
          </Error>
          <JoinButton type="submit">가입하기</JoinButton>
        </form>
        <SnsWrap>
          <span>간편 회원가입</span>
          <Ul>
            <Naver></Naver>
            <Google></Google>
            <Kakao></Kakao>
          </Ul>
        </SnsWrap>
      </LoginWrap>
    </>
  );
};
export default Join;
