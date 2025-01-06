import styled from "styled-components"
import 기쁨 from "../../assets/images/기쁨.svg"
import 슬픔 from "../../assets/images/슬픔.svg"
import 평범 from "../../assets/images/평범.svg"
import 피곤 from "../../assets/images/피곤.svg"
import 화남 from "../../assets/images/화남.svg"
import { useIsModalStore } from "../../store/ModalStore"
import { RecordButton } from "../ui/Button"
import { Textarea } from "@/components/ui/Input"

const Wrap = styled.div`
    width:62.125rem;
    background-color:var(--bg-01);
    border-radius:7.5rem;

    @media (max-width: 781px){
        width:40rem;
        border-radius:7.5rem;
    }

    @media (max-width: 390px){
        width:17.5rem;
        border-radius:2.5rem;
        margin:0 auto;
    }
`

const Title = styled.div`
    padding-top:4.25rem;

    > h2{
        font-size:1.875rem;
        font-weight:var(--font-semibold);
        margin:0;
    }

    > p{
        font-size:1.5rem; 
        font-weight:var(--font-medium);
        margin:0.625rem;
    }

    @media (max-width: 781px){
        > h2{
            font-size:1.875rem;
        }
        > p{
            font-size:1.5rem;
        }
    }

    @media (max-width: 390px){
        width:11.25rem;
        margin:0 auto;

        > h2{
            font-size:1.5rem;
        }

        > p{
            font-size:1.25rem;
        }
    }
`

const Ul = styled.ul`
    display:flex;
    justify-content:center;
    width:62.125rem;
    margin:3.75rem 0;

    > li{
        list-style:none;
        margin-right:2.875rem;
    }

    > li > img{
        width:5rem;
        height:5rem; 
    }

    @media (max-width: 781px){
        width:26.125rem;
        margin:3.75rem auto;
        padding:0;

        > li{
            width:100%;
            margin:0;
        }
        > li >img{
            width:3.75rem;
            height:3.75rem;
        }
    }

    @media (max-width: 390px){
        width:13rem;
        height:7.125rem;
        margin:2.5rem auto;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        flex-wrap:wrap;
        align-content:center;
        gap:20px;

        > li{
            width:3.125rem;
            height:3.125rem;
        }

        > li > img{
            width:3.125rem;
            height:3.125rem;
            object-fit:cover;
        }
    }
`

const TextAreaWrap = styled.div`
    width:40.5rem;
    position:relative;
    margin:0 auto;

    textarea {
        height:160px;
    }

    @media (max-width:781px){
        width:26.125rem;

    }
    
    @media (max-width:390px){
        width:13rem;
    }
`

const ButtonWrap = styled.div`
    margin-top:3.75rem;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:2rem;
    padding-bottom:3.75rem;

    @media (max-width:390px){
        margin-top:2.5rem;
    }
`

export default function MoodTrackerModal(){

    const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
    const CloseButton = () => {
        useSetIsModalClick();
    }

    return(
        <>
            <Wrap>
                <Title>
                    <h2>오늘의 무드를 기록하세요!</h2>
                    <p>Track Your Mood</p>
                </Title>
                <Ul>
                    <li><img src={기쁨} alt="기쁨" /></li>
                    <li><img src={슬픔} alt="기쁨" /></li>
                    <li><img src={평범} alt="평범" /></li>
                    <li><img src={피곤} alt="피곤" /></li>
                    <li><img src={화남} alt="화남" /></li>
                </Ul>
                <TextAreaWrap>
                    <Textarea
                        maxLength={50}
                        showCount
                    />
                </TextAreaWrap>
                <ButtonWrap>
                    <RecordButton variant="moodCancel" onClick={CloseButton}>취소</RecordButton>
                    <RecordButton variant="moodSubmit">등록</RecordButton>
                </ButtonWrap>
            </Wrap>
        </>
    )
}