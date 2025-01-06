import styled from "styled-components"
import CheckImg from "../../assets/images/signUp.svg"
import { OrangeButton } from "../ui/Button"
import { useIsModalStore } from "@/store/ModalStore"

const AttendancePoint = styled.div`
    width:36.5rem;
    background-color:var(--bg-01);
    border-radius:5rem;
    padding-top:3.375rem;
    padding-bottom:3.5rem;

    @media (max-width:390px){
        width:20rem;
        margin:0 auto;
        border-radius:2.5rem;
        padding-top:2.375rem;
        padding-bottom:1.875rem;
    }
`

const Title = styled.div`

    > p{
        margin:0;
        font-size:1.5rem;
        padding-top:1.25rem;
    }
    > p:last-child{
        font-size:1.125rem;
        color:var(--text-03);
        padding:0;
    }

    > h2{
        margin:0;
        font-size:2.25rem;
        color:var(--main-orange);
        padding:1.25rem 0;
    }

    @media (max-width:390px){
        > h2{
            font-size:1.75rem;
        }
        > p{
            padding-top:1.25rem;
        }
        > p:last-child{
            font-size:1rem;
        }
    }
`

const Button = styled.div`
    margin-top:1.75rem;
    height:3.5rem;
    display:flex;
    justify-content:center;

    > button{
        height:3.5rem;
    }
`

export default function TodayMoodModal(){
    const setIsModalClick = useIsModalStore((state) => state.setIsModalClick); 
    const onClickCheck = () => {
        setIsModalClick();
    }

    return(
        <>
            <AttendancePoint>
                <Title>
                    <img src={CheckImg} alt="체크 이미지" />
                    <p>오늘의 무드 기록 완료!</p>
                    <h2>10 P</h2>
                    <p>포인트가 적립되었습니다.</p>
                </Title>
                <Button>
                    <OrangeButton variant="confirm" onClick={onClickCheck}>확인</OrangeButton>
                </Button>
            </AttendancePoint>
        </>
    )
}