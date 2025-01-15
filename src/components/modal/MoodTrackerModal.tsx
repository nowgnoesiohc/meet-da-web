import styled from "styled-components";
import happy from "../../assets/mood/happy.svg";
import sad from "../../assets/mood/sad.svg";
import normal from "../../assets/mood/normal.svg";
import tired from "../../assets/mood/tired.svg";
import angry from "../../assets/mood/angry.svg";
import { useIsModalStore } from "../../store/ModalStore";
import { RecordButton } from "../ui/Button";
import { Textarea } from "@/components/ui/Input";
import { useState } from "react";

const Wrap = styled.div`
  width: 62.125rem;
  background-color: var(--bg-01);
  border-radius: 7.5rem;

  @media (max-width: 781px) {
    width: 40rem;
    border-radius: 7.5rem;
  }

  @media (max-width: 390px) {
    width: 17.5rem;
    border-radius: 2.5rem;
    margin: 0 auto;
  }
`;

const Title = styled.div`
  padding-top: 4.25rem;

  > h2 {
    font-size: 1.875rem;
    font-weight: var(--font-semibold);
    margin: 0;
  }

  > p {
    font-size: 1.5rem;
    font-weight: var(--font-medium);
    margin: 0.625rem;
  }

  @media (max-width: 781px) {
    > h2 {
      font-size: 1.875rem;
    }
    > p {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 390px) {
    width: 11.25rem;
    margin: 0 auto;

    > h2 {
      font-size: 1.5rem;
    }

    > p {
      font-size: 1.25rem;
    }
  }
`;

const MoodWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.875rem;
  margin: 3.75rem 0rem;

  @media (max-width: 781px) {
    gap: 1.75rem;
  }

  @media (max-width: 390px) {
    flex-wrap: wrap;
    gap: 1.25rem;
    justify-content: center;
    padding: 0rem 2.25rem;
  }
`;

const MoodClick = styled.button<{ isClicked: boolean }>`
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  background-color: ${(props) =>
    props.isClicked ? "var(--bg-mood)" : "transparent"};
  border-radius: 0.625rem;

  @media (max-width: 781px) {
    width: 3.75rem;
    height: 3.75rem;
  }

  @media (max-width: 390px) {
    width: 3.125rem;
    height: 3.125rem;
  }
`;

const MoodImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;

  @media (max-width: 781px) {
    width: 3.75rem;
    height: 3.75rem;
  }

  @media (max-width: 390px) {
    width: 3.125rem;
    height: 3.125rem;
  }
`;

const TextAreaWrap = styled.div`
  width: 40.5rem;
  position: relative;
  margin: 0 auto;

  textarea {
    height: 160px;
  }

  @media (max-width: 781px) {
    width: 26.125rem;
  }

  @media (max-width: 390px) {
    width: 13rem;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding-bottom: 3.75rem;

  @media (max-width: 390px) {
    margin-top: 2.5rem;
  }
`;

export default function MoodTrackerModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: "기쁨", src: happy },
    { id: "슬픔", src: sad },
    { id: "평범", src: normal },
    { id: "피곤", src: tired },
    { id: "화남", src: angry },
  ];

  const handleMoodClick = (id: string) => {
    setSelectedMood((prev) => (prev === id ? null : id)); // 같은 버튼 클릭 시 취소
  };

  const CloseButton = () => {
    useSetIsModalClick();
  };

  return (
    <>
      <Wrap>
        <Title>
          <h2>오늘의 무드를 기록하세요!</h2>
          <p>Track Your Mood</p>
        </Title>
        <MoodWrap>
          {moods.map((mood) => (
            <MoodClick
              key={mood.id}
              isClicked={selectedMood === mood.id}
              onClick={() => handleMoodClick(mood.id)}
            >
              <MoodImage src={mood.src} alt={mood.id} />
            </MoodClick>
          ))}
        </MoodWrap>
        <TextAreaWrap>
          <Textarea maxLength={100} showCount />
        </TextAreaWrap>
        <ButtonWrap>
          <RecordButton variant="moodCancel" onClick={CloseButton}>
            취소
          </RecordButton>
          <RecordButton variant="moodSubmit">등록</RecordButton>
        </ButtonWrap>
      </Wrap>
    </>
  );
}
