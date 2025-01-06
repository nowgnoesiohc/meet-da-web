import styled from "styled-components"
import { useIsModalStore } from "../../store/ModalStore";
import { OrangeButton } from "../ui/Button";

const ChangePasswordWrap = styled.div`
    width:30.25rem;
    background-color:#fff;
    border-radius:1.875rem;
    padding-top:2.875rem;
    padding-bottom:2.125rem;

    > button{
        width:8rem;
        height:3.25rem;
        background-color:var(--main-orange);
        border-radius:0.625rem;
        color:#fff; 
        font-size:1.25rem;
        font-weight:var(--font-semibold);
        margin-top:3.125rem;
    }

    @media (max-width:390px){
        width:20rem;
        margin:0 auto;
        padding-top:2.375rem;
    }
`

const Title = styled.div`
    > h2{
        margin:0;
        font-size:1.625rem;
        font-weight:var(--font-semibold);
        color:var(--main-orange);
        padding-bottom:1.875rem;
    }

    > p{
        margin:0;
        font-size:1.25rem;
        font-weight:var(--font-medium);
    }
    > p:last-child{
        font-size:1.125rem;
        font-weight:var(--font-regular);
        color:var(--text-03); 
        padding-top:0.5rem;
    }

    @media (max-width:390px){
        > h2{
            font-size:1.5rem;
            padding-bottom:1.75rem;
        }
        > p{
            font-size:1.125rem;
        }
        > p:last-child{
            font-size:1rem;
            padding-bottom:1.5rem;
        }
    }
`

const Button = styled.div`
    margin-top:3.125rem;
    display:flex;
    justify-content:center;

    @media (max-width:390px){
        margin:0;
    }
`

export default function ChangePasswordModal(){

    const setIsModalClick = useIsModalStore((state) => state.setIsModalClick); 
    const onClickCheck = () => {
        setIsModalClick();
    }

    return(
        <>
            <ChangePasswordWrap>
                <Title>
                    <h2>비밀번호 변경 완료</h2>
                    <p>비밀번호가 정상적으로 변경되었습니다.</p>
                    <p>새로 로그인 해주세요.</p>
                </Title>
                <Button>
                    <OrangeButton variant="confirm" onClick={onClickCheck}>확인</OrangeButton>
                </Button>
            </ChangePasswordWrap>
        </>
    )
}