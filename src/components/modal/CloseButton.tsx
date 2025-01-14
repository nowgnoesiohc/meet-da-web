import styled from "styled-components";
import ModalCloseButton from "../../assets/images/modalClose.svg";
import { useIsModalStore } from "../../store/ModalStore";

const CloseButtonWrap = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  @media (max-width: 390px) {
    top: 1.35rem;
    left: 17rem;

    > button > img {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
`;

export default function CloseButton() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const CloseModal = () => {
    useSetIsModalClick();
  };

  return (
    <>
      <CloseButtonWrap>
        <button onClick={CloseModal}>
          <img src={ModalCloseButton} alt="모달종료" />
        </button>
      </CloseButtonWrap>
    </>
  );
}
