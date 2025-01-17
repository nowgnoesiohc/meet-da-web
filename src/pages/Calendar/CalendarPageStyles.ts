import styled from "styled-components";
export const Layout = styled.div`
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

export const UserWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0rem 1.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 390px) {
    gap: 0.75rem;
  }
`;

export const ProfileImage = styled.img`
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

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

export const UserName = styled.div`
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

export const UserText = styled.div`
  width: 100%;
  color: var(--search-placeholder);
  font-size: 1.125rem;
  font-weight: var(--font-regular);

  @media (max-width: 390px) {
    font-size: 0.875rem;
  }
`;

export const CalendarLayout = styled.div<{ bgImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

export const CalendarWrap = styled.div`
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

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 15rem;
  background-color: var(--white);
  border-radius: 100%;

  @media (max-width: 390px) {
    width: 8rem;
  }
`;

export const CalendarHeader = styled.div`
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

export const CalendarGrid = styled.div`
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

export const DateCell = styled.div<{ isCurrentMonth: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
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

export const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;

  @media (max-width: 390px) {
    gap: 0.375rem;
  }
`;

export const MoodEmoji = styled.img`
  width: 2.875rem;
  height: 2.875rem;
  align-self: center;

  @media (max-width: 390px) {
    width: 1.875rem;
    height: 1.875rem;
  }
`;

export const PastMoodWrap = styled.div`
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

export const PastMoodEmoji = styled.img`
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

export const TodayDate = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: var(--orange-button);
  border-radius: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
`;

export const PastMoodTrack = styled.div`
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

export const PastDate = styled.div`
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

export const PastDiary = styled.div`
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
