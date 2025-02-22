// src/pages/Calendar/CalendarPage.tsx

import ModalPortal from "@/components/modal/ModalPortal";
import ModalTemplate from "@/components/modal/ModalTemplate";
import { useIsModalStore } from "@/store/ModalStore";
import GlobalStyles from "@/styles/GlobalStyle";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import CalLarge from "@/assets/images/캘린더배경.png";
import CalMedium from "@/assets/images/캘린더배경_781.png";
import CalSmall from "@/assets/images/캘린더배경_390.png";
import { themeImages } from "@/assets/common/themeImages";
import hurt from "@/assets/mood/hurt.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as s from "./CalendarPageStyles";

type MoodData = {
  date: string;
  memo: string;
  mood: string;
};

export default function MainPage() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  // const [modalData, setModalData] = useState({});
  const [calendarSrc, setCalendarSrc] = useState(CalLarge);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPastDate, setSelectedPastDate] = useState<Date | null>(null);
  const [moodMap, setMoodMap] = useState<Record<string, MoodData>>({});

  const [userInfo, setUserInfo] = useState({
    username: "",
    description: "",
    profileImage: "",
  });

  // Mood 아이콘 매핑
  // const moodIcons: Record<string, string> = {
  //   joy: themeImages["joy"],
  //   normal: themeImages["normal"],
  //   sad: themeImages["sad"],
  //   tired: themeImages["tired"],
  //   angry: themeImages["angry"],
  // };

  const appliedTheme = JSON.parse(localStorage.getItem("appliedTheme") || "{}");
  const moodIcons = appliedTheme.moodImages || themeImages;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getUserId = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No accessToken found");
    const userId = jwtDecode(token).sub; // JWT 해독
    return userId;
  };

  const fetchUserData = async () => {
    const userId = await getUserId();
    try {
      const response = await axios.get(
        `https://api.meet-da.site/user/${userId}`
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch user data :", error);
    }
  };

  const fetchMoodData = async () => {
    // console.log("fetch mood data 실행");
    const userId = await getUserId();
    try {
      const response = await axios.get(
        `https://api.meet-da.site/user/${userId}/moods?year=${year}&month=${month + 1}`
      );

      // 데이터를 날짜 기반으로 매핑
      const moodArray: MoodData[] = response.data;
      const mappedData = moodArray.reduce(
        (acc, mood) => {
          const dateKey = new Date(mood.date).toISOString().split("T")[0];
          acc[dateKey] = mood;
          return acc;
        },
        {} as Record<string, MoodData>
      );
      setMoodMap(mappedData);
      // console.log(mappedData);
    } catch (error) {
      console.error("Failed to fetch mood data :", error);
    }
  };

  useEffect(() => {
    fetchMoodData();
    fetchUserData();
  }, [year, month]);

  useEffect(() => {
    if (!useIsModal) {
      fetchMoodData(); // Refetch data when modal closes
    }
  }, [useIsModal]);

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
    // const moodData = moodMap[changeToFormattedDate(date)];
    const formattedDate = changeToFormattedDate(date);
    const moodData = moodMap[formattedDate]; // 해당 날짜의 기분 데이터 가져오기

    console.log(moodMap);
    console.log("date", date);
    console.log("changeTo", changeToFormattedDate(date));
    console.log("moodData", moodMap[changeToFormattedDate(date)]);

    if (isToday(date)) {
      // 오늘 날짜 클릭 시 모달만 열림
      // console.log(moodMap[changeToFormattedDate(date)].mood);
      // setModalData({
      //   mood: moodMap[changeToFormattedDate(date)].mood,
      //   memo: moodMap[changeToFormattedDate(date)].memo,
      // });
      console.log("✅ 오늘 날짜 클릭됨:", date);
      console.log("✅ 상태에 저장할 데이터:", moodData);

      setIsModalClick(type, {
        title: moodData?.mood || "", // 기존 기분이 있다면 전달, 없으면 빈 값
        content: moodData?.memo || "", // 기존 메모가 있다면 전달, 없으면 빈 값
        onConfirm: () => {
          console.log("✅ onConfirm 실행됨");
          fetchMoodData(); // 기분 데이터 갱신
        },
      });
      setSelectedPastDate(null);
      return; // 이후 코드 실행 방지
    }

    if (date < new Date()) {
      // 과거 날짜 클릭 시 상태 업데이트
      setSelectedPastDate(date);
    }
  };
  // useEffect(() => {
  //   console.log("modla", modalData);
  // }, [modalData]);

  const changeToFormattedDate = (date: Date) => {
    const formattedDate = date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.\s/g, "-")
      .replace(/\.$/, "");
    return formattedDate;
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
    // console.log(calendarSrc); // 변경된 경로가 제대로 출력되는지 확인
  }, [calendarSrc]);

  return (
    <>
      <GlobalStyles />
      <Outlet />
      {useIsModal && (
        <ModalPortal>
          <ModalTemplate />
        </ModalPortal>
      )}

      <s.Layout>
        <s.UserWrap>
          <s.UserInfo>
            <s.ProfileImage isImageAvailable={!!userInfo.profileImage}>
              {userInfo.profileImage && (
                <img src={userInfo.profileImage} alt="Profile" />
              )}
            </s.ProfileImage>
            <s.Profile>
              <s.UserName>{userInfo.username}</s.UserName>
              <s.UserText>
                {userInfo.description !== ""
                  ? userInfo.description
                  : "믿-다에서 서로를 믿어보세요"}
              </s.UserText>
            </s.Profile>
          </s.UserInfo>
        </s.UserWrap>
        <s.CalendarLayout bgImage={calendarSrc}>
          <s.CalendarWrap>
            <s.CalendarHeader>
              <s.HeaderWrap>
                <p>{month + 1}</p>
              </s.HeaderWrap>
            </s.CalendarHeader>
            <s.CalendarGrid>
              {[
                ...Array(firstDayOfMonth.getDay()).fill(null), // 첫 주의 빈칸 추가
                ...weeks.flat().filter((date) => date.getMonth() === month), // 현재 달 날짜
                ...Array(6 - lastDayOfMonth.getDay()).fill(null), // 마지막 주의 빈칸 추가
              ].map((date, index) =>
                date ? (
                  <s.DateWrap
                    onClick={() => handleDateClick(date, "moodTrackerModal")}
                    key={index}
                  >
                    {isToday(date) ? (
                      <s.DateCell key={index} isCurrentMonth={true}>
                        <s.TodayDate>{date.getDate()}</s.TodayDate>
                      </s.DateCell>
                    ) : (
                      <s.DateCell key={index} isCurrentMonth={true}>
                        {date.getDate()}
                      </s.DateCell>
                    )}

                    {moodMap[changeToFormattedDate(date)] ? (
                      <s.MoodEmoji
                        src={
                          moodIcons[moodMap[changeToFormattedDate(date)].mood]
                        }
                        alt={
                          moodIcons[moodMap[changeToFormattedDate(date)].mood]
                        }
                      />
                    ) : (
                      <div style={{ width: "2.875rem", height: "2.875rem" }} />
                    )}
                  </s.DateWrap>
                ) : (
                  <div key={index}></div> // 빈 칸 렌더링
                )
              )}
            </s.CalendarGrid>
          </s.CalendarWrap>
        </s.CalendarLayout>
        {/* 클릭된 과거 날짜에 따른 추가 div */}
        {selectedPastDate &&
          (!moodMap[changeToFormattedDate(selectedPastDate)] ? (
            <s.PastMoodWrap>
              <s.PastMoodEmoji src={hurt} />
              <s.PastMoodTrack>
                <s.PastDate>
                  {selectedPastDate.toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                  })}
                </s.PastDate>
                <s.PastDiary>에는 무드를 남기지 않았어요!</s.PastDiary>
              </s.PastMoodTrack>
            </s.PastMoodWrap>
          ) : (
            <s.PastMoodWrap>
              <s.PastMoodEmoji
                src={
                  moodIcons[
                    moodMap[changeToFormattedDate(selectedPastDate)].mood
                  ]
                }
              />
              <s.PastMoodTrack>
                <s.PastDiary>
                  {moodMap[changeToFormattedDate(selectedPastDate)].memo}
                </s.PastDiary>
              </s.PastMoodTrack>
            </s.PastMoodWrap>
          ))}
      </s.Layout>
    </>
  );
}
