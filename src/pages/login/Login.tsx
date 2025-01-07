import styled from "styled-components"
import loginLogo from "../../assets/loginLogo.png";
import naver from "../../assets/naver.png"
import google from "../../assets/google.png"
import kakao from "../../assets/kakao.png"
import naverHover from "../../assets/naver-hover.png"
import googleHover from "../../assets/google-hover.png"
import kakaoHover from "../../assets/kakao-hover.png"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useIsModalStore } from "../../store/ModalStore";

    const LoginWrap = styled.div`
        width: 34.5rem; /* 552px */
        height: 43.75rem; /* 700px */
        margin: 0 auto;
        text-align: center;
    `

    const LoginLogo = styled.div`
        width: 34.5rem; /* 552px */
        height: 10.75rem; /* 172px */
        background-image: url(${loginLogo});
        background-size: cover;
        background-position: center;
    `

    const Join = styled.div`
        margin-top: 1.5rem; /* 24px */
        margin-bottom: 3rem; /* 48px */
    `

    const Span = styled.span`
        &:first-child {
            margin-right: 0.625rem; /* 10px */
            color: var(--text-02);
        }
    `

    const Input = styled.input`
        width: 27.625rem; /* 442px */
        height: 4.25rem; /* 68px */
        border: 0.0625rem solid;
        border-color: ${(props) => (props.$isError ? "var(--error-02)" : "var(--text-02)")}; // 에러 시 빨간색
        border-radius: 0.75rem; /* 12px */
        margin: ${(props) => (props.$isError ? "0" : "0.75rem 0")}; /* 12px */
        padding-left: 1.125rem; /* 18px */
        font-size: 1.5rem; /* 24px */

        &:focus {
            border-color: var(--main-orange);
        }

        &::placeholder {
            color: ${(props) => (props.$isError ? "var(--error-02)" : "var(--text-02)")}; // 에러 시 빨간색
        }
    `

    const LoginButton = styled.button`
        width: 27.625rem; /* 442px */
        height: 4.25rem; /* 68px */
        border-radius: 0.75rem; /* 12px */
        background-color: var(--main-orange);
        color: #fff;
        margin-top: 2.25rem; /* 36px */
        font-size: 1.5rem; /* 24px */
    `

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
    `

    const Ul = styled.ul`
        list-style: none;
        display: flex;

        > button {
            width: 2.5rem; /* 40px */
            height: 2.5rem; /* 40px */
            background-size: cover;
            background-position: center;
        }
    `

    const Naver = styled.button`
        background-image: url(${naver});
        transition: 0.5s;

        &:hover {
            background-image: url(${naverHover});
        }
    `

    const Google = styled.button`
        background-image: url(${google});
        margin: 0 1.5rem; /* 24px */
        transition: 0.5s;

        &:hover {
            background-image: url(${googleHover});
        }
    `

    const Kakao = styled.button`
        background-image: url(${kakao});
        transition: 0.5s;

        &:hover {
            background-image: url(${kakaoHover});
        }
    `

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
    `

    const Error = styled.div`
        width: 27.625rem; /* 442px */
        height: 1.75rem; /* 28px */
        margin: 0 auto;
        color: var(--error-02);
        display: ${(props) => (props.$isError ? "block" : "none")}; // 조건부 렌더링

        > p {
            margin: 0.75rem 0; /* 12px */
            padding: 0; 
            float: left;
        }
    `

export default function Login(){

    // 비밀번호 찾기
    // const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
    
    // const FindPassword = (type?: string) => {
    //     console.log(type);

    //     if(type){
    //         setIsModalClick(type);
    //     } else{
    //         setIsModalClick();
    //     }

    // };

    const schema = z.object({
        email: z.string().min(1, "이메일을 입력해주세요.").email("이메일 형식이 올바르지 않습니다."),
        password: z
            .string()
            .min(1, { message: "비밀번호를 입력해주세요."})
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                { message: "비밀번호는 영문, 숫자 조합의 8자 이상 입력해야합니다."}
            ),
        }
    )

    const { register, handleSubmit, formState} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onClickSubmit = (data) => {
        console.log(data);
    }   

    return(
        <LoginWrap>
            <LoginLogo></LoginLogo>
            <Join>
                <Span>회원이 아니신가요?</Span>
                <Span>회원가입하기</Span>
            </Join>
            <form onSubmit={handleSubmit(onClickSubmit)}>
                <Input $isError={!!formState.errors.email} type="text" placeholder="이메일" {...register("email")} $isError={!!formState.errors.email} />
                <Error $isError={!!formState.errors.email}>
                    {formState.errors.email && <p>{formState.errors.email.message}</p>}
                </Error>
                <Input $isError={!!formState.errors.password} type="password" placeholder="비밀번호" {...register("password")} $isError={!!formState.errors.password} />
                <Error $isError={!!formState.errors.password}>
                    {formState.errors.password && <p>{formState.errors.password.message}</p>}
                </Error>
                <LoginButton>로그인 하기</LoginButton>
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
                {/* <button onClick={() => FindPassword('findPasswordModal')}>비밀번호 찾기</button> */}
            </PasswordReset>
        </LoginWrap>
    )
}