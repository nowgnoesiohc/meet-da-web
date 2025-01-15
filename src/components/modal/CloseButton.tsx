import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import { AiOutlineClose } from "react-icons/ai";

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
const IconStyle = styled(AiOutlineClose)`
  font-size: 1.75rem;
  color: var(--text-02);

  @media (max-width: 390px) {
    font-size: 1.125rem;
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
          <IconStyle />
        </button>
      </CloseButtonWrap>
    </>
  );
}
