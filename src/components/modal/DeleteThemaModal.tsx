import styled from "styled-components"
import { useIsModalStore } from "../../store/ModalStore";
import { OrangeButton, OrangeLineButton } from "../ui/Button";

const DeleteThemaWrap = styled.div`
    width:30.25rem;
    background-color:#fff;
    border-radius:1.875rem;
    padding-bottom:2.875rem;
    padding-top:3.625rem;

    @media (max-width:390px){
        width:20rem;
        margin:0 auto;
        padding-top:2.375rem;
        padding-bottom:1.75rem;
    }
`

const Title = styled.div`
    > h2{
        font-size:1.625rem;
        font-weight:var(--font-semibold);
        color:var(--main-orange);
        margin:0;
        padding-bottom:1.875rem;
    }
    
    > p{
        margin:0;
        font-size:1.25rem;
        font-weight:var(--font-medium);
        color:var(--main-text);
    }
    > p:last-child{
        padding-top:0.5rem;
        padding-bottom:3.125rem;
        font-size:1rem;
        font-weight:var(--font-regular);
        color:var(--text-03);
    }

    @media (max-width:390px){
        > h2{
            font-size:1.5rem;
        }
        > p{
            font-size:1.125rem;
        }
        > p:last-child{
            font-size:0.875rem;
            padding-bottom:1.5rem;
        }
    }
`

const Button = styled.div`
    width:16.75rem;
    height:3rem;
    margin:0 auto;
    display:flex;
    justify-content:center;
    gap:1.5rem;

    > button{
        width:7.625rem;
        height:3rem;
    }
`

export default function DeleteThemaModal(){

    const setIsModalClick = useIsModalStore((state) => state.setIsModalClick); 
    const onClickCancel = () => {
        setIsModalClick();
    }


    return(
        <>
            <DeleteThemaWrap>
                <Title>
                    <h2>테마 삭제</h2>
                    <p>정말로 삭제 하시겠습니까?</p>
                    <p>삭제한 테마와 사용된 포인트는 복구되지 않습니다.</p>
                </Title>
                <Button>
                    <OrangeLineButton variant="modal" onClick={onClickCancel}>취소</OrangeLineButton>
                    <OrangeButton variant="confirm">확인</OrangeButton>
                </Button>
            </DeleteThemaWrap>
        </>
    )
}