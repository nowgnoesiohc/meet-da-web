import styled from "styled-components";
import { useIsModalStore } from "../../store/ModalStore";
import { RecordButton } from "../ui/Button";
import { Textarea } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { themeImages } from "@/assets/common/themeImages";

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

interface MoodTrackerModalProps {
  title?: string;
  content?: string;
  onConfirm?: () => void;
}

export default function MoodTrackerModal({
  content,
  title,
  onConfirm,
}: MoodTrackerModalProps) {
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [selectedMood, setSelectedMood] = useState<string | null>(
    title ?? null
  );
  const [memo, setMemo] = useState<string>(content ?? "");

  const [moodIcons, setMoodIcons] = useState(themeImages); // 기본값 설정

  useEffect(() => {
    const appliedTheme = JSON.parse(
      localStorage.getItem("appliedTheme") || "{}"
    );

    console.log("🟠 테마 변경 감지, 적용된 테마:", appliedTheme);

    if (appliedTheme.moodImages) {
      setMoodIcons(appliedTheme.moodImages); // ✅ 테마 Mood 이미지 업데이트
    }
  }, []);

  // const moodIcons = appliedTheme.moodImages || {
  //   joy: "/defaultMood/happy.svg",
  //   sadness: "/defaultMood/sad.svg",
  //   neutral: "/defaultMood/normal.svg",
  //   tired: "/defaultMood/tired.svg",
  //   anger: "/defaultMood/angry.svg",
  // };

  const moods = [
    { id: "joy", label: "기쁨", src: moodIcons.joy },
    { id: "sadness", label: "슬픔", src: moodIcons.sadness },
    { id: "neutral", label: "평범", src: moodIcons.neutral },
    { id: "tired", label: "피곤", src: moodIcons.tired },
    { id: "anger", label: "화남", src: moodIcons.anger },
  ];

  const getKSTDate = () => {
    const now = new Date();
    now.setHours(now.getHours() + 9); // UTC+9로 시간 보정
    return now.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  const handleMoodClick = (id: string) => {
    setSelectedMood((prev) => (prev === id ? null : id)); // 같은 버튼 클릭 시 취소
  };

  const handleSubmit = async () => {
    try {
      // AccessToken에서 userId 추출
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const userId = jwtDecode(token).sub;
      const date = getKSTDate();
      // console.log(userId);

      // const selectedMoodValue = moods.find(
      //   (mood) => mood.id === selectedMood
      // )?.value;

      // console.log(selectedMoodValue, date, memo);
      // API 요청 데이터
      if (!selectedMood && title) {
        // 기분 삭제 요청
        const response = await axios.delete(
          `https://api.meet-da.site/user/${userId}/mood/`,
          {
            data: { date }, // data 속성으로 전달
          }
        );
        console.log("무드가 삭제되었습니다.", response.data.moodEntries);
      } else if (selectedMood) {
        // 기분 저장 요청
        const response = await axios.post(
          `https://api.meet-da.site/user/${userId}/mood/`,
          {
            mood: selectedMood,
            date,
            memo,
          }
        );
        console.log("무드가 등록되었습니다.", response.data.moodEntries);
      }

      if (onConfirm) onConfirm(); // 모달 닫히기 전에 부모 컴포넌트에서 데이터 갱신
      setIsModalClick();
    } catch (error) {
      console.error("Failed to submit mood:", error);
      alert("기분 등록에 실패했습니다. 다시 시도해주세요.");
    }
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
          <Textarea
            maxLength={100}
            showCount
            value={memo ?? ""}
            onChange={(e) => setMemo(e.target.value)}
          />
        </TextAreaWrap>
        <ButtonWrap>
          <RecordButton $variant="moodCancel" onClick={() => setIsModalClick()}>
            취소
          </RecordButton>
          <RecordButton $variant="moodSubmit" onClick={handleSubmit}>
            등록
          </RecordButton>
        </ButtonWrap>
      </Wrap>
    </>
  );
}
