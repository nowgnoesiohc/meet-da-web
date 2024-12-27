import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    position: relative;

    &:hover {
      background-color: #e0f7fa;
    }
  }
`;

const MoodIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 5px;
  cursor: pointer;
`;

const SelectedMood = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
`;

const moodIcons = [
  {
    id: 1,
    src: "src/pages/Home/assets/기쁨.png",
    label: "Happy",
  },
  {
    id: 2,
    src: "src/pages/Home/assets/평범.png",
    label: "Neutral",
  },
  { id: 3, src: "src/pages/Home/assets/슬픔.png", label: "Sad" },
  {
    id: 4,
    src: "src/pages/Home/assets/화남.png",
    label: "Angry",
  },
  {
    id: 5,
    src: "src/pages/Home/assets/피곤.png",
    label: "Sleepy",
  },
];

const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodData, setMoodData] = useState({});

  const onDateChange = (date) => setSelectedDate(date);

  const handleMoodSelect = (date, mood) => {
    setMoodData((prev) => ({
      ...prev,
      [date.toDateString()]: mood,
    }));
  };

  const tileContent = ({ date }) => {
    const mood = moodData[date.toDateString()];
    return (
      mood && (
        <SelectedMood>
          <MoodIcon src={mood.src} alt={mood.label} />
        </SelectedMood>
      )
    );
  };

  return (
    <AppContainer>
      <h1>My Mood Calendar</h1>
      <CalendarContainer>
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </CalendarContainer>
      <h2>Select Mood for {selectedDate.toDateString()}</h2>
      <div>
        {moodIcons.map((mood) => (
          <MoodIcon
            key={mood.id}
            src={mood.src}
            alt={mood.label}
            onClick={() => handleMoodSelect(selectedDate, mood)}
          />
        ))}
      </div>
    </AppContainer>
  );
};

export default MoodCalendar;
