import styled from "styled-components";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";

export const Wrap = styled.div`
  width: 62.125rem;
  margin: 5.25rem auto 11rem;
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
    margin-top: 0.75rem;
  }

  @media (max-width: 390px) {
    width: 20rem;
    margin: 10% auto;
  }
`;

export const Title = styled.div`
  > p {
    font-size: 2.25rem;
    font-weight: var(--font-semibold);
  }
  > h2 {
    font-weight: var(--font-medium);
  }

  @media (max-width: 390px) {
    > p {
      font-size: 1.125rem;
    }
    > h2 {
      font-size: 1rem;
    }
  }
`;

export const Span = styled.span``;

export const UserName = styled.span`
  font-weight: 500;
`;

export const Div = styled.div`
  position: relative;
  line-height: 1.5rem;
`;

export const MoodIcon = styled.img`
  width: 1.5rem;
  position: relative;
  height: 1.5rem;
  object-fit: cover;
`;

export const MoodWrap = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
`;

export const FrameContainer = styled.div`
  border-radius: 0.625rem;
  background-color: #f5f1e7;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  color: var(--main-text);
`;

export const Div1 = styled.div`
  position: relative;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const FrameGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;

  @media (max-width: 390px) {
    width: 20rem;
    font-size: 0.75rem;
  }
`;

export const FrameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const BookmarkIcon = styled(FaRegBookmark)`
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  color: var(--black);
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 390px) {
    font-size: 0.75rem;
    width: 0.75rem;
    height: 0.75rem;
  }
`;
export const BookmarkHoverIcon = styled(FaBookmark)`
  font-size: 1.5rem;
  position: absolute;
  top: 0rem;
  left: 0rem;
  color: var(--main-orange);
  cursor: pointer;

  @media (max-width: 390px) {
    font-size: 0.75rem;
    width: 0.75rem;
    height: 0.75rem;

    div {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
`;

export const UploadIcon = styled(AiOutlineUpload)`
  position: absolute;
  top: 0rem;
  left: 3.375rem;
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  color: var(--black);

  @media (max-width: 390px) {
    font-size: 0.75rem;
    width: 0.75rem;
    height: 0.75rem;

    div {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
`;

export const IconWrap = styled.div`
  width: 4.875rem;
  position: relative;
  height: 1.5rem;
  display: flex;

  @media (max-width: 390px) {
    margin-top: 0.5rem;
    float: right;

    button {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
`;

export const FrameParentRoot = styled.div`
  width: 100%;
  position: relative;
  height: 2.375rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 1.25rem;
  color: #f3752e;
  margin-top: 1.875rem;

  @media (max-width: 390px) {
    display: block;
    height: auto;
  }
`;

export const LikeWrap = styled.div`
  margin-top: 3.75rem;
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  gap: 0.625rem;

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    > span {
      position: relative;
      line-height: 1.5rem;
      font-size: 1.2rem;
    }
  }
`;
export const HeartIcon = styled(IoIosHeartEmpty)`
  font-size: 1.5rem;
  color: var(--main-orange);
`;
export const HeartHoverIcon = styled(IoIosHeart)`
  font-size: 1.5rem;
  color: var(--main-orange);
`;

export const Button = styled.div`
  width: 16.5rem;
  height: 3.25rem;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  margin-top: 3.75rem;
  margin-bottom: 6.125rem;

  > button {
    width: 7rem;
    border-radius: 0.625rem;
    color: #fff;
    font-size: 1.125rem;
  }

  @media (max-width: 390px) {
    margin-top: 1.75rem;
    margin-bottom: 4.5rem;
  }
`;

export const ProfileWrap = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReplyProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const ReplyUserProfile = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    color: var(--main-text);
    font-size: 1.125rem;
  }

  > span {
    color: var(--text-03);
    font-size: 0.875rem;
  }
`;

export const Profile = styled.div`
  > p {
    margin: 0;
    font-size: 1.5rem;
  }
  > span {
    font-size: 1.125rem;
    color: var(--search-placeholder);
    font-weight: var(--font-regular);
  }
`;

export const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 6.25rem;
  background-color: var(--line-basic);
  cursor: pointer;
  object-fit: cover;

  @media (max-width: 390px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const ReplyProfileImage = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  border-radius: 6.25rem;

  @media (max-width: 390px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const ProfileImagePlaceholder = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--line-basic);

  @media (max-width: 390px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const Line = styled.div`
  width: 100%;
  border-top: 0.0625rem solid var(--line-basic);
  margin: 3.75rem 0rem;

  @media (max-width: 390px) {
    margin-top: 3.75rem;
    margin-bottom: 2.875rem;
  }
`;

export const CommentCount = styled.div`
  margin-bottom: 0.875rem;
  font-size: 1.125rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 7.5rem;
  border-radius: 0.625rem;
  padding: 1.25rem;
  border: 0.0625rem solid var(--search-placeholder);
  resize: none;

  &:focus {
    outline: none;
    border: 0.0625rem solid var(--search-placeholder);
  }

  &::placeholder {
    color: var(--text-03);
  }
`;

export const CommentButtonWrap = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  flex-direction: row-reverse;
  margin: 1.5rem 0rem 7.5rem;

  @media (max-width: 390px) {
    margin-top: 0.75rem;
  }
`;

export const EditButtonWrap = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  flex-direction: row-reverse;
  margin: 1.5rem 0rem;

  @media (max-width: 390px) {
    margin-top: 0.75rem;
  }
`;

export const CommentList = styled.div`
  margin-top: 5rem;

  ${ProfileWrap} {
    display: block;

    ${ProfileImage} {
      width: 3.375rem;
      height: 3.375rem;
      background-color: var(--line-basic);
      position: absolute;
      top: 0;
      left: 0;
    }
    ${Profile} {
      position: absolute;
      top: 0;
      left: 4.375rem;
      > p {
        font-size: 1.125rem;
      }
      > span {
        font-size: 0.875rem;
        color: var(--text-03);
      }
    }
  }

  @media (max-width: 390px) {
    margin-top: 3.5rem;

    ${ProfileWrap} {
      ${ProfileImage} {
        width: 2.5rem;
        height: 2.5rem;
      }
    }

    ${Profile} {
      left: 3.375rem !important;
    }
  }
`;

export const ListArray = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 3.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

export const EditIcon = styled(AiOutlineEdit)`
  font-size: 1.125rem;
  color: var(--text-03);
`;

export const DeleteIcon = styled(AiOutlineDelete)`
  font-size: 1.125rem;
  color: var(--text-03);
`;

export const CommentWrite = styled.div`
  display: flex;
  align-items: center;
  height: 2.375rem;
  margin: 1rem 0;

  p {
    margin: 0 !important;
  }
`;

export const EditWrite = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;

  p {
    margin: 0 !important;
  }
`;

export const ReplyButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  height: 1.5rem;

  > button {
    height: 1.125rem;
    font-size: 1rem;
    color: var(--comment-button);
  }
`;

export const Reply = styled.div`
  width: 59.625rem;
  background-color: var(--bg-02);
  padding: 1.875rem 1.875rem 1.25rem 1.875rem;
  float: right;
  margin: 1.25rem 0rem 0rem 2.5rem;

  ${Line} {
    margin: 1.5rem 0;
  }
  ${TextArea} {
    width: 53.875rem;
    height: 6.25rem;
    resize: none;
  }

  ${Button} {
    width: 100%;
    gap: 0;
    display: flex;
    justify-content: flex-end;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;

    > button {
      font-size: 1rem;
      text-align: center;
    }
    > button:first-child {
      background-color: transparent;
      color: var(--comment-button);
    }
    > button:last-child {
      background-color: var(--comment-button);
      width: 5.875rem;
      display: unset;
    }
  }

  @media (max-width: 390px) {
    width: 18.75rem;
    padding: 1.25rem;

    ${TextArea} {
      width: 15.125rem;
    }
  }
`;

export const ReplyComment = styled.div`
  background-color: var(--bg-02);
  padding: 1.875rem 1.875rem 1.25rem 1.875rem;
`;

export const ReplyIcon = styled(IoChatbubblesOutline)`
  font-size: 1.125rem;
  color: var(--comment-button);
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.25rem;
  height: 3.25rem;
  border-radius: 0.625rem;
  background-color: none;
  color: var(--comment-button);
  text-align: center;
  font-size: 1.125rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    width: 5.375rem;
    height: 2.625rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }
`;

export const ClickedReplyIcon = styled(IoChatbubbles)`
  font-size: 1.125rem;
  color: var(--comment-button);
`;

export const TextAreaWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const ArrowIcon = styled(BsArrowReturnRight)`
  position: absolute;
  top: 0.62%;
  right: 97.87%;
  left: 0%;
  bottom: 87.04%;

  @media (max-width: 390px) {
    left: -1%;
  }
`;

export const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

// Swiper 컨테이너 (이미지 및 썸네일 포함)
export const SwiperContainer = styled.div<{ isSingleImage: boolean }>`
  display: flex;
  justify-content: ${({ isSingleImage }) =>
    isSingleImage ? "center" : "space-between"};
  align-items: center;
  margin: 3.75rem 0;
`;

// 메인 Swiper (이미지 1개일 경우 width 100%)
export const StyledSwiper = styled(Swiper)<{ isSingleImage: boolean }>`
  width: ${({ isSingleImage }) => (isSingleImage ? "100%" : "45rem")};
  height: 30rem;
  border-radius: 0.625rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;

  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }

  .swiper-pagination-bullet {
    background: var(--main-text);
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    background: var(--accent-color);
    opacity: 1;
  }

  @media (max-width: 390px) {
    width: ${({ isSingleImage }) => (isSingleImage ? "100%" : "20rem")};
    height: 10rem;
  }
`;

// 메인 Swiper 내부 이미지 슬라이드
export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
`;

export const SwiperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.625rem;
`;

// 세로 정렬 Swiper
export const ThumbnailSwiper = styled(Swiper)`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 30rem;
  gap: 0.625rem;
  overflow-y: auto !important;
  scrollbar-width: thin;
  scrollbar-color: var(--white) transparent;
  justify-content: flex-start;
  align-items: center;
  margin: 0;

  .swiper-wrapper {
    flex-direction: column !important;
    gap: 1.25rem;
  }

  .swiper-slide {
    width: 100% !important;
    margin-right: 0rem !important;
  }
`;

export const ThumbnailSlide = styled(SwiperSlide)`
  width: 11.25rem;
  height: 8.5rem;
  cursor: pointer;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  &.swiper-slide-thumb-active {
    opacity: 1;
    border: 2px solid var(--accent-color);
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.625rem;
`;

export const PostText = styled.div`
  width: 62.125rem;
  font-size: 1.125rem;
  line-height: 2rem;
  text-align: justify;
  margin: 2rem auto;
`;

export const CommentInfoWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
