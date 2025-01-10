import styled from "styled-components";
import CheckImg from "../../assets/images/signUp.svg";
import { useIsModalStore } from "../../store/ModalStore";
import { PointConfirmButton } from "../ui/Button";

const Wrap = styled.div`
  width: 36.5rem;
  background-color: var(--white);
  border-radius: 2.5rem;
  padding-top: 4.1875rem;
  padding-bottom: 3.4375rem;

  @media (max-width: 781px) {
    width: 29.5rem;
    border-radius: 2.5rem;
  }

  @media (max-width: 390px) {
    width: 20rem;
    margin: 0 auto;
    border-radius: 1.875rem;
    padding-top: 2.375rem;
    padding-bottom: 1.75rem;
  }
`;

const Title = styled.div`
  > h2 {
    margin: 0;
    color: var(--main-orange);
    font-size: 2.25rem;
    font-weight: var(--font-semibold);
    padding-top: 1.25rem;
  }

  > p {
    margin: 0;
    padding-top: 1.25rem;
    font-size: 1.5rem;
    font-weight: var(--font-medium);
  }
  > p:last-child {
    font-size: 1.125rem;
    font-weight: var(--font-regular);
    color: var(--text-03);
    padding-bottom: 1.75rem;
  }

  @media (max-width: 390px) {
    > p {
      font-size: 1.125rem;
    }
    > p:last-child {
      font-size: 0.875rem;
    }
    > h2 {
      font-size: 1.75rem;
    }
  }
`;

const Button = styled.div`
  > button {
    width: 8rem;
    height: 3.5rem;
    margin: 0 auto;
  }
`;

const Image = styled.img`
  width: 8.75rem;
  height: 7.125rem;

  @media (max-width: 781px) {
    width: 7.5rem;
  height: 5.125rem;
`;

export default function ThemeBuyCompleteModal() {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const onClickCheck = () => {
    setIsModalClick();
  };

  return (
    <>
      <Wrap>
        <Title>
          <Image src={CheckImg} alt="구매완료 체크 이미지" />
          <p>파스텔 팝콘 세트</p>
          <h2>- 300 P</h2>
          <p>구매 완료되었습니다!</p>
        </Title>
        <Button>
          <PointConfirmButton onClick={onClickCheck}>확인</PointConfirmButton>
        </Button>
      </Wrap>
    </>
  );
}
