import styled from "styled-components"
import signUpImg from "../../assets/images/signUp.svg"
import { useIsModalStore } from "../../store/ModalStore"
import { OrangeButton } from "../ui/Button"

const CommentWriteWrap = styled.div`
    width:36.5rem;
    background-color:var(--bg-01);
    border-radius:5rem;
    padding-bottom:3.625rem;

    @media (max-width:781px){
        width:29.5rem;
        border-radius:5rem;
    }

    @media (max-width:390px){
        padding-bottom:1.875rem;
        width:17.5rem;
        margin:0 auto;
        border-radius:2.5rem;
    }
`

const Title = styled.div`
    padding-top:4.125rem;

    > h2{
        margin:0;
        padding-top:1.25rem;
        color:var(--main-orange);
        font-size:2.25rem;
        font-weight:var(--font-semibold);
    }

    > p{
        margin:0; 
        font-size:1.5rem;
        font-weight:var(--font-medium);
        padding-top:1.25rem;
    }
    > p:last-child{
        font-size:1.125rem;
        font-weight:var(--font-regular);
        color:var(--text-03);
        padding-bottom:1.75rem;
    }

    @media (max-width:390px){
        padding-top:2.375rem;
        
        > p{
            font-size:1.125rem;
        }
        > p:last-child{
            font-size:0.875rem;
        }

        > h2{
            font-size:1.75rem;
        }
    }
`

const Button = styled.button`
    font-size:1.25rem;
    font-weight:var(--font-semibold);
`

export default function CommentWriteModal(){
    
    const setIsModalClick = useIsModalStore((state) => state.setIsModalClick); 
    const onClickCheck = () => {
        setIsModalClick();
    }

    return(
        <>
            <CommentWriteWrap>
                <Title>
                    <img src={signUpImg} alt="체크 이미지" />
                    <p>댓글 작성 완료!</p>
                    <h2>20 P</h2>
                    <p>포인트가 적립되었습니다.</p>
                </Title>
                <Button>
                    <OrangeButton variant="confirm" onClick={onClickCheck}>확인</OrangeButton>
                </Button>
            </CommentWriteWrap>
        </>
    )
}