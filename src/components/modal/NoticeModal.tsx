import styled from "styled-components"
import CloseButton from "./CloseButton"
import { OrangeButton } from "../ui/Button"

const NoticeModalWrap = styled.div`
    width:30.25rem;
    background-color:#fff;
    border-radius:1.875rem;
    padding-bottom:2.75rem;

    @media (max-width:781px){
        width:30.25rem;
    }

    @media (max-width:390px){
        width:20rem;
        margin:0 auto;
    }
`

const NoticeText = styled.div`
    padding-top:4.125rem;
    margin-bottom:2.75rem;

    > h2{
        margin:0;
        font-size:1.625rem;
        font-weight:var(--font-semibold);
        color:var(--main-orange);
        margin-bottom:0.75rem;
    }

    >p{
        margin:0;
        color:var(--main-text);
        font-weight:var(--font-medium);
        font-size:1.25rem;
    }

    @media (max-width:390px){
        > h2{
            font-size:1.5rem;
        }
        
        > p{
            font-size:1.125rem;
        }
    }
`

const Button = styled.button`
    color:#fff;
    border-radius:0.625rem;
    font-size:1.25rem;
    font-weight:var(--font-semibold);
`

export default function NoticeModal(){

    return(
        <>
            <NoticeModalWrap>
                <CloseButton />
                <NoticeText>
                    <h2>알림</h2>
                    <p>로그인이 필요한 서비스입니다.</p>
                    <p>로그인 하시겠습니까?</p>
                </NoticeText>
                <Button>
                    <OrangeButton variant="signupToLogin">로그인</OrangeButton>
                </Button>
            </NoticeModalWrap>
        </>
    )
}