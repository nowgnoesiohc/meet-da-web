import Header from "@/components/layout/Header";
import ModalPortal from "@/components/modal/ModalPortal";
import ModalTemplate from "@/components/modal/ModalTemplate";
import { useIsModalStore } from "@/store/ModalStore";
import GlobalStyles from "@/styles/GlobalStyle";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CalLarge from "@/assets/images/캘린더배경.png";
import CalMedium from "@/assets/images/캘린더배경_781.png";
import CalSmall from "@/assets/images/캘린더배경_390.png";
import test from "@/assets/test/testImage.png";
import happy from "@/assets/mood/happy.svg";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem auto;
  padding: 0rem 6.25rem;
  gap: 1.875rem;
  align-items: center;
  height: 100%;

  @media (max-width: 781px) {
    padding: 0rem 4.375rem;
  }

  @media (max-width: 390px) {
    padding: 0rem 3.4375rem;
  }
`;

const UserWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0rem 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 390px) {
    gap: 0.75rem;
  }
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 781px) {
    width: 3.75rem;
    height: 3.75rem;
  }

  @media (max-width: 390px) {
    width: 3rem;
    height: 3rem;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

const UserName = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: var(--main-text);
  font-size: 1.5rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const UserText = styled.div`
  width: 100%;
  color: var(--search-placeholder);
  font-size: 1.125rem;
  font-weight: var(--font-regular);

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

const CalendarLayout = styled.div<{ bgImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5rem;

  @media (max-width: 390px) {
    border-radius: 2.5rem;
    height: 100%;
  }
`;

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
  width: 100%;
  padding: 1.25rem;

  @media (max-width: 390px) {
    padding: 1.25rem 0.375rem;
    gap: 0.75rem;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 15rem;
  background-color: var(--white);
  border-radius: 100%;

  @media (max-width: 390px) {
    width: 8rem;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 36px;
  font-weight: var(--font-bold);

  @media (max-width: 390px) {
    font-size: 24px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.25rem;
  width: 100%;
  padding: inherit;

  @media (max-width: 390px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.375rem;
  }
`;

const DateCell = styled.div<{ isCurrentMonth: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  font-size: 1.25rem;
  font-weight: var(--font-regular);
  color: var(--search-placeholder);

  @media (max-width: 1920px) {
    height: 2.5rem;
  }

  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;

  @media (max-width: 390px) {
    gap: 0.375rem;
  }
`;

const MoodImoji = styled.img`
  width: 2.875rem;
  height: 2.875rem;
  align-self: center;

  @media (max-width: 390px) {
    width: 1.875rem;
    height: 1.875rem;
  }
`;

const PastMoodWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 1.875rem 0rem;

  @media (max-width: 781px) {
    gap: 1.25rem;
  }
`;

const PastMoodImoji = styled.img`
  width: 8.75rem;
  height: 8.75rem;

  @media (max-width: 781px) {
    width: 6.25rem;
    height: 6.25rem;
  }

  @media (max-width: 390px) {
    width: 3.75rem;
    height: 3.75rem;
  }
`;

const PastMoodTrack = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  padding: 2.5rem 3.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 3.125rem;
  background: var(--past-track);

  @media (max-width: 781px) {
    border-radius: 1.875rem;
    padding: 2.5rem 2.25rem;
    gap: 0.5rem;
  }

  @media (max-width: 390px) {
    border-radius: 1.5rem;
    padding: 1.25rem 1rem;
  }
`;

const PastDate = styled.div`
  color: var(--search-placeholder);
  text-align: center;
  font-size: 1.875rem;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    font-size: 1.5rem;
  }

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

const PastDiary = styled.div`
  color: var(--search-placeholder);
  font-size: 1.5rem;
  font-weight: var(--font-medium);

  @media (max-width: 781px) {
    font-size: 1.25rem;
  }

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

export default function MainPage() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const [calendarSrc, setCalendarSrc] = useState(CalLarge);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPastDate, setSelectedPastDate] = useState<Date | null>(null);

  const month = currentDate.getMonth();

  // 오늘 날짜 판별 함수
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date: Date, type: string) => {
    if (isToday(date)) {
      // 오늘 날짜 클릭 시 모달만 열림
      setIsModalClick(type);
      setSelectedPastDate(null);
      return; // 이후 코드 실행 방지
    }

    if (date < new Date()) {
      // 과거 날짜 클릭 시 상태 업데이트
      setSelectedPastDate(date);
    }
  };

  useEffect(() => {
    const updateCalendarSrc = () => {
      if (window.innerWidth <= 390) {
        setCalendarSrc(CalSmall); // 390px 이하
      } else if (window.innerWidth <= 781) {
        setCalendarSrc(CalMedium); // 781px 이하
      } else {
        setCalendarSrc(CalLarge); // 기본 이미지
      }
    };

    updateCalendarSrc();

    window.addEventListener("resize", updateCalendarSrc);

    return () => {
      window.removeEventListener("resize", updateCalendarSrc);
    };
  }, []);

  // 현재 달의 첫 날
  const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1);
  // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  // 현재 달의 마지막 날
  const lastDayOfMonth = new Date(currentDate.getFullYear(), month + 1, 0);
  // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  // 주 단위로 날짜를 그룹화
  const weeks = groupDatesByWeek(startDay, endDay);

  /** 주 단위로 그룹화하는 함수 */
  function groupDatesByWeek(startDay: Date, endDay: Date) {
    const weeks = [];
    let currentWeek = [];
    const currentDate = new Date(startDay);

    while (currentDate <= endDay) {
      currentWeek.push(new Date(currentDate));
      if (currentWeek.length === 7 || currentDate.getDay() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }

  // 월 변경 (현재 달의 변경 없이 자동으로 달력이 업데이트됨)
  useEffect(() => {
    setCurrentDate(new Date()); // 현재 날짜에 맞게 자동 업데이트
  }, []);

  useEffect(() => {
    console.log(calendarSrc); // 변경된 경로가 제대로 출력되는지 확인
  }, [calendarSrc]);

  const moods = [{ id: "기쁨", src: happy }];

  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}

      <Layout>
        <UserWrap>
          <UserInfo>
            <ProfileImage src={test} />
            <Profile>
              <UserName>믿음소망사과</UserName>
              <UserText>사과가 좋아요</UserText>
            </Profile>
          </UserInfo>
        </UserWrap>
        <CalendarLayout bgImage={calendarSrc}>
          <CalendarWrap>
            <CalendarHeader>
              <HeaderWrap>
                <p>{month + 1}</p>
              </HeaderWrap>
            </CalendarHeader>
            <CalendarGrid>
              {[
                ...Array(firstDayOfMonth.getDay()).fill(null), // 첫 주의 빈칸 추가
                ...weeks.flat().filter((date) => date.getMonth() === month), // 현재 달 날짜
                ...Array(6 - lastDayOfMonth.getDay()).fill(null), // 마지막 주의 빈칸 추가
              ].map((date, index) =>
                date ? (
                  <DateWrap
                    onClick={() => handleDateClick(date, "moodTrackerModal")}
                  >
                    <DateCell key={index} isCurrentMonth={true}>
                      {date.getDate()}
                    </DateCell>
                    {moods.map((mood) => (
                      <MoodImoji src={mood.src} alt={mood.id} />
                    ))}
                  </DateWrap>
                ) : (
                  <div key={index}></div> // 빈 칸 렌더링
                )
              )}
            </CalendarGrid>
          </CalendarWrap>
        </CalendarLayout>
        {/* 클릭된 과거 날짜에 따른 추가 div */}
        {selectedPastDate && (
          <PastMoodWrap>
            <PastMoodImoji src={happy} />
            <PastMoodTrack>
              <PastDate>1월 12일</PastDate>
              <PastDiary>에는 아직 무드를 남기지 않았어요!</PastDiary>
              {/* 백엔드 api 연결할 때 기록을 남기지 않았으면 PastDate 없이 PastDiary만 뜨도록 하면 되고
              (PastDiary에 무드 기록 내용 연결) PastMoodEmoji에 그날 기록한 무드 이모지 연결하면 됩니당 */}
            </PastMoodTrack>
          </PastMoodWrap>
        )}
      </Layout>
    </>
  );
}
