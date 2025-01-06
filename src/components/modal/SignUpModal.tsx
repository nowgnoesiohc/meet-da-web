import styled from "styled-components"
import CloseButton from "./CloseButton"
import signUpImg from "../../assets/images/signUp.svg"
import { OrangeButton, OrangeLineButton } from "../ui/Button"

const SignUpModalWrap = styled.div`
    width:36.5rem;
    // height:38.75rem;
    background-color:#fff;
    border-radius:1.875rem;

    @media (max-width:390px){
        width:19.5rem;
        margin:0 auto;
    }
`

const Title = styled.div`
    padding-top:6rem;

    > h2{
        margin:0;
        color:var(--main-orange);
        font-size:1.75rem;
        font-weight:var(--font-semibold);
        padding-top:1.875rem;
        padding-bottom:2.875rem;
    }

    > p{
        margin:0;
        font-size:1.5rem;
        font-weight:var(--font-medium);
    }

    > p:last-child{
        font-size:1.25rem;
        font-weight:var(--font-regular);
        color:var(--text-03);
        padding-top:0.375rem;
    }

    @media (max-width:390px){
        > h2{
            font-size:1.25rem;
            padding-bottom:1.75rem;
        }
        > p{
            font-size:1.125rem;
        }
    }
`

const Button = styled.div`
    padding:5rem 1.625rem 6rem 1.625rem;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1.25rem;
`

export default function SignUpModal(){

    return(
        <>
            <SignUpModalWrap>
                <CloseButton />
                <Title>
                    <img src={signUpImg} alt="회원가입 이미지" />
                    <h2>회원가입 완료</h2>
                    <p>회원가입이 완료되었습니다.</p>
                    <p>로그인 후 믿다를 이용해보세요</p>
                </Title>
                <Button>
                    <OrangeLineButton variant="moveToHome">🏠</OrangeLineButton>
                    <OrangeButton variant="signupToLogin">로그인</OrangeButton>
                </Button>
            </SignUpModalWrap>
        </>
    )
}