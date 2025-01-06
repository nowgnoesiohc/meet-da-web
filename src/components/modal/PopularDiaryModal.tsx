import styled from "styled-components"
import CheckImg from "../../assets/images/signUp.svg"
import { OrangeButton } from "../ui/Button"
import { useIsModalStore } from "@/store/ModalStore"

const PopularDiaryWrap = styled.div`
    width:36.5rem;
    background-color:var(--bg-01);
    border-radius:5rem;
    padding-top:3.375rem;
    padding-bottom:2.5rem;

    @media (max-width: 781px){
        width:29.5rem;
    }

    @media (max-width: 390px){
        border-radius:2.5rem;
        width:17.5rem;
        margin:0 auto;
    }
`

const Title = styled.div`

    > p{
        margin:0;
        font-size:1.5rem;
    }
    > p:nth-child(2){
        padding-top:1.25rem;
        padding-bottom:0.3125rem;
    }
    > p:nth-child(3), p:last-child{
        font-size:1.125rem;
        color:var(--text-03);
    }

    > h2{
        margin:0;
        font-size:2.25rem;
        color:var(--main-orange);
        padding:1.25rem 0;
    }

    @media (max-width: 390px){
        > p{
            width:9.75rem;
            margin:0 auto;
            font-size:1.125rem;
        }
        > p:nth-child(3){
            width:9.25rem;
            font-size:0.875rem;
        }
        > p:last-child{
            font-size:0.875rem;
        }
    }
`

const Button = styled.div`
    display:flex;
    justify-content:center;
    
    > button{
        width:8rem;
        height:3.5rem;
        background-color:var(--orange-button);
        color:#fff;
        border-radius:1rem;
        font-size:1.25rem;
        font-weight:var(--font-semibold);
        margin-top:1.75rem;
    }
`

export default function PopularDiaryModal(){

    const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
    const onClickCheck = () => {
        useSetIsModalClick();
    }

    return(
        <>
            <PopularDiaryWrap>
                <Title>
                    <img src={CheckImg} alt="체크 이미지" />
                    <p>인기 다이어리 선정</p>
                    <p>내 다이어리가 인기 피드에! 지금 확인해보세요.</p>
                    <h2>100 P</h2>
                    <p>포인트가 적립되었습니다.</p>
                </Title>
                <Button>
                    <OrangeButton variant="confirm" onClick={onClickCheck}>확인</OrangeButton>
                </Button>
            </PopularDiaryWrap>
        </>
    )
}