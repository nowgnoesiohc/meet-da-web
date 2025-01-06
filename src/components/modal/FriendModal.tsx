import styled from "styled-components"
import CloseButton from "./CloseButton"
import SearchImg from "../../assets/images/search.svg"
import { FriendButton, FriendTabButton } from "../ui/Button"
import { useState } from "react"

const FriendWrap = styled.div`
    width:40.375rem;
    background-color:var(--bg-01);
    border-radius:1.25rem;
    padding-top:5.375rem;
    padding-bottom:2.875rem;

    @media (max-width:390px){
        width:20rem;
        margin:0 auto;
        padding-top:4.125rem;
    }
`

const SearchBar = styled.div`
    width:34.75rem;
    position:relative;
    margin:0 auto;

    > button{
        position:absolute;
        top:0.9375rem;
        right:0.9375rem; 
    }

    @media (max-width:390px){
        width:17.5rem;

        > button{
            top:1.25rem;
        }

        > button > img{
            width:1rem;
            height:1rem;
        }
    }
`

const Input = styled.input`
    width:100%;
    height:3.75rem;
    background-color:#fff;
    border:0.0625rem solid var(--main-text);
    border-radius:0.625rem;
    padding-left:1.875rem;
    font-size:1.25rem;
    position:relative;
    
    &::placeholder {
        color:var(--sub-text);
    }

    @media (max-width:390px){
        font-size:0.875rem;
        padding-left:1.25rem;
    }
`

const Profile = styled.div`
    width:35.375rem;
    height:3rem;
    margin:1.875rem auto;
    display:flex;
    align-items:center;
    justify-content:space-between;

    > p{
        font-size:1.5rem;
        font-weight:var(--font-semibold);

        > span{
            font-size:1.125rem;
        }
    }

    @media (max-width:390px){
        > p{
            margin:0;
            padding-bottom:0.75rem;

             > span{
                font-size:1rem;
                font-weight:var(--font-regular);
            }
        }
    }

    @media (max-width:390px){
        width:17.5rem;
        height:5.625rem;
        display:block;
        text-align:left;
        margin:1.25rem auto;
        padding:0 1rem;
    }
`

const Button = styled.div`
    display:flex;
    gap:1.25rem;
`

const Content = styled.div`
    width:35.375rem;
    background-color:#fff;
    margin:0 auto;
    border-radius:0.75rem;
    box-shadow:0.125rem 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
    padding:2.5rem;
    
    @media (max-width:390px){
        width:17.5rem;
        padding:1.75rem 1.25rem;
    }
`

const FriendList = styled.div`
    width:30.375rem;
    height:3.25rem;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;

    &:not(:last-child){
        margin-bottom:1.75rem;
    }

    @media (max-width:390px){
        width:15rem;
        height:10.0625rem;
        display:block;

        > button{
            float:right;
        }
    }
`

const FriendProfile = styled.div`
    width:23.125rem;
    height:3.25rem;
    border-radius:0.625rem;
    background-color:var(--bg-02);
    display:flex;
    justify-content:space-around;
    padding:0 1.25rem;

    @media (max-width:390px){
        width:100%;
        height:6.3125rem;
        display:block;
        margin-bottom:1rem;
        padding-bottom:0.75rem;
    }
`

const UserWrap = styled.div`
    display:flex;
    align-items:center;
    gap:0.5rem;
`
const UserImage = styled.div`
    width:2.25rem;
    height:2.25rem;
    border-radius:6.25rem;
    background-color:#000;
`

const UserName = styled.p`
    font-size:1.125rem;
    font-weight:var(--font-semibold);

    @media (max-width:390px){
        font-size:1.125rem;
    }
`

const UserText = styled.p`
    font-size:1rem;
    color:var(--line-basic);
    
    @media (max-width:390px){
        text-align:left;
        font-size:1rem;
        margin:0;
    }
`

export default function FriendModal(){
    const [isClicked, setIsClicked] = useState(true);

    const handleClick = () => {
        setIsClicked(!isClicked); // 클릭 상태 토글
    };

    return(
        <>
            <FriendWrap>
                <CloseButton />
                <SearchBar>
                    <Input type="text" placeholder="믿다에서 새로운 친구를 만나보세요!" />
                    <button><img src={SearchImg} alt="검색 이미지" /></button>
                </SearchBar>
                <Profile>
                    <p>포뇨소스케스키<span>님의</span></p>
                    <Button>
                    <FriendTabButton
                        isClicked={isClicked}
                        onClick={handleClick}
                        variant="unclicked"
                    >
                    서로 믿음
                    </FriendTabButton>
                    <FriendTabButton
                        isClicked={isClicked}
                        onClick={handleClick}
                        variant="unclicked"
                    >
                    믿으미
                    </FriendTabButton>
                    </Button>
                </Profile>
                <Content>
                    <FriendList>
                        <FriendProfile>
                            <UserWrap>
                                <UserImage></UserImage>
                                <UserName>믿음소망사과</UserName>
                            </UserWrap>
                            <UserText>믿음소망사랑 아니고 사과</UserText>
                        </FriendProfile>
                        <FriendButton variant="diaryFollow">만나기</FriendButton>
                    </FriendList>
                </Content>
            </FriendWrap>
        </>
    )
}