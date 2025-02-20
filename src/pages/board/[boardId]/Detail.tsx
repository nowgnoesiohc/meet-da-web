import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

import {
  CommentButton,
  DiaryButton,
  FriendButton,
  ReplyButton,
} from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import PointModal from "@/components/modal/PointModal";
import { jwtDecode } from "jwt-decode";

const Wrap = styled.div`
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

const Title = styled.div`
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

const Span = styled.span``;

const UserName = styled.span`
  font-weight: 500;
`;

const Div = styled.div`
  position: relative;
  line-height: 1.5rem;
`;

// const MoodIcon = styled.img`
//   width: 1.5rem;
//   position: relative;
//   height: 1.5rem;
//   object-fit: cover;
// `;

const MoodWrap = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
`;

const FrameContainer = styled.div`
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

const Div1 = styled.div`
  width: 4.6875rem;
  position: relative;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FrameGroup = styled.div`
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

const FrameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const BookmarkIcon = styled(FaRegBookmark)`
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
const BookmarkHoverIcon = styled(FaBookmark)`
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
      width: 12px;
      height: 12px;
    }
  }
`;

const UploadIcon = styled(AiOutlineUpload)`
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
      width: 12px;
      height: 12px;
    }
  }
`;

const IconWrap = styled.div`
  width: 4.875rem;
  position: relative;
  height: 1.5rem;
  display: flex;

  @media (max-width: 390px) {
    margin-top: 0.5rem;
    float: right;

    button {
      width: 12px;
      height: 12px;
    }
  }
`;

const FrameParentRoot = styled.div`
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

// 이미지
const MainImage = styled.img`
  width: 42.875rem;
  position: relative;
  border-radius: 0.5rem;
  height: 27.875rem;
  object-fit: cover;

  @media (max-width: 390px) {
    width: 20rem;
    height: 10rem;
  }
`;
const SubImageWrap = styled.div`
  width: 17.25rem;
  max-height: 27.875rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 390px) {
    height: 10rem;
  }
`;
const SubImage = styled.img`
  align-self: stretch;
  position: relative;
  border-radius: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  height: 11.75rem;
  flex-shrink: 0;
  object-fit: cover;
  background-color: #333;

  @media (max-width: 390px) {
    height: 3.5rem;
  }
`;
const SubImageOpacity = styled.img`
  align-self: stretch;
  position: relative;
  border-radius: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  height: 11.75rem;
  flex-shrink: 0;
  object-fit: cover;
  opacity: 0.5;
  background-color: #333;

  @media (max-width: 390px) {
    height: 3.5rem;
  }
`;
const ImageWrap = styled.div`
  width: 100%;
  position: relative;
  height: 27.875rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 3.75rem;

  @media (max-width: 390px) {
    height: 10rem;
  }
`;

const Text = styled.div`
  margin-top: 3.75rem;
  width: 62.125rem;
  font-size: 1.125rem;
  line-height: 2.5rem;
`;
const LikeWrap = styled.div`
  margin-top: 3.75rem;
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  gap: 0.625rem;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      position: relative;
      line-height: 1.5rem;
      font-size: 1.25rem;
      margin-left: 0.625rem;
      padding-top: 0.25rem;
    }
  }
`;
const HeartIcon = styled(IoIosHeartEmpty)`
  font-size: 1.5rem;
  color: var(--main-orange);
`;
const HeratHoverIcon = styled(IoIosHeart)`
  font-size: 1.5rem;
  color: var(--main-orange);
`;

const Button = styled.div`
  width: 16.5rem;
  height: 3.25rem;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  margin-top: 60px;
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

const ProfileWrap = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
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

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 6.25rem;

  @media (max-width: 390px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const ProfileImagePlaceholder = styled.div`
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

const Line = styled.div`
  width: 100%;
  border-top: 0.0625rem solid var(--line-basic);
  margin-top: 6.875rem;
  margin-bottom: 5.125rem;

  @media (max-width: 390px) {
    margin-top: 3.75rem;
    margin-bottom: 2.875rem;
  }
`;

const CommentCount = styled.div`
  margin-bottom: 0.875rem;
  font-size: 1.125rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 7.5rem;
  border-radius: 0.625rem;
  padding: 1.25rem;
  border: 0.0625rem solid var(--search-placeholder);
  resize: none;

  &::placeholder {
    color: var(--text-03);
  }
`;

const CommentButtonWrap = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 1.5rem;

  @media (max-width: 390px) {
    margin-top: 0.75rem;
  }
`;

const CommentList = styled.div`
  margin-top: 9.875rem;

  ${ProfileWrap} {
    display: block;

    ${ProfileImage} {
      width: 3.375rem;
      height: 3.375rem;
      background-color: #f28a8a;
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

const ListArray = styled.div`
  position: relative;
  display: flex;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 3.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

const EditIcon = styled(AiOutlineEdit)`
  font-size: 1.125rem;
  color: var(--text-03);
`;

const DeleteIcon = styled(AiOutlineDelete)`
  font-size: 1.125rem;
  color: var(--text-03);
`;

const CommentWrite = styled.div`
  display: flex;
  /* align-items:center; */
  height: 2.375rem;
  margin-top: 1.125rem;
  margin-bottom: 1.375rem;
`;

const ReplyButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 1.5rem;
  margin-bottom: 1.25rem;

  > button {
    height: 1.125rem;
    font-size: 1rem;
    color: var(--comment-button);
  }
`;

const Reply = styled.div`
  width: 59.625rem;
  background-color: var(--bg-02);
  padding: 1.875rem 1.875rem 1.25rem 1.875rem;
  float: right;
  margin-bottom: 11rem;
  /* margin:0 auto; */

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

const ReplyIcon = styled(AiOutlineComment)`
  font-size: 1.125rem;
  color: var(--comment-button);
`;

const TextAreaWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const ArrowIcon = styled(BsArrowReturnRight)`
  position: absolute;
  top: 0.62%;
  right: 97.87%;
  left: 0%;
  bottom: 87.04%;

  @media (max-width: 390px) {
    left: -1%;
  }
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  visibility: string;
  images: string[];
  likes: number;
  viewCount: number;
  bookmarks: string[];
  // 필요한 다른 속성들 추가
}

interface Author {
  id: string;
  username: string;
  profileImage: string;
  description: string;
}

export default function BoardDetail() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const [isBookmarkHover, setIsBookmarkHover] = useState(false);
  const [isLikeHover, setIsLikeHover] = useState(false);
  const { boardId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();
  const { isModal, setIsModalClick } = useIsModalStore();

  useEffect(() => {
    const storedBoardId = sessionStorage.getItem("showPointModal");

    if (storedBoardId && storedBoardId === boardId) {
      console.log("sessionStorage에서 모달 상태 감지");
      setIsModalClick("pointModal");
      sessionStorage.removeItem("showPointModal"); // 한 번만 실행되도록 삭제
    }
  }, [boardId]); // boardId가 변경될 때만 실행

  // 친구 추가
  const fetchFollowStatus = async () => {
    if (!post) return;

    try {
      const userId = await getUserId();
      if (!userId) return;

      setIsAuthor(userId === post.author.id); // 내가 작성한 글인지 확인

      console.log(`팔로잉 조회 요청: /user/${userId}/following`);

      // API 응답 전체 확인
      const response = await axios.get(
        `https://api.meet-da.site/user/${userId}/following`
      );

      console.log("API 응답 전체 데이터:", response.data);

      if (!response.data) {
        console.error("API 응답이 없습니다.");
        return;
      }

      // 데이터가 올바른 배열인지 확인
      if (!response.data.following || !Array.isArray(response.data.following)) {
        console.error("팔로잉 목록이 없습니다.");
        console.log("예상했던 배열이 아님, API 응답 구조 확인 필요.");
        return;
      }

      const followingList = response.data.following;

      console.log(
        "팔로잉 리스트 데이터 타입:",
        typeof followingList,
        Array.isArray(followingList)
      );
      console.log("팔로잉 리스트 내용:", followingList);

      // '_id' 속성으로 비교하도록 수정
      const isUserFollowing = followingList.some(
        (follow) => follow._id === post.author.id
      );

      console.log(`팔로우 상태 확인: ${isUserFollowing}`);
      setIsFollowing(isUserFollowing);
    } catch (error) {
      console.error("팔로우 상태 가져오기 실패:", error);
    }
  };

  // 상태 변경 후 최신 데이터 가져오도록 useEffect 트리거
  useEffect(() => {
    fetchFollowStatus();
  }, [post, isFollowing]);

  const handleFollowToggle = async () => {
    if (!post) return;

    try {
      const userId = await getUserId();
      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      const targetId = post.author.id;
      if (!targetId) {
        console.error("타겟 ID가 존재하지 않습니다.");
        return;
      }

      if (isFollowing) {
        console.log(
          `팔로우 취소 요청: DELETE /user/follow/${userId}/${targetId}`
        );

        const response = await axios.delete(
          `https://api.meet-da.site/user/follow/${userId}/${targetId}`
        );

        console.log("팔로우 취소 응답:", response.data);
        if (response.status === 200) {
          console.log("팔로우 취소 성공! 버튼 상태 변경");
          setIsFollowing(false);
          setTimeout(fetchFollowStatus, 1000); // 1초 후 최신 상태 확인
        }
      } else {
        console.log(`팔로우 요청: POST /user/follow/${userId}/${targetId}`);

        const response = await axios.post(
          `https://api.meet-da.site/user/follow/${userId}/${targetId}`,
          {}
        );

        console.log("팔로우 응답:", response.data);
        if (response.status === 200) {
          console.log("팔로우 성공! 버튼 상태 변경");
          setIsFollowing(true);
          setTimeout(fetchFollowStatus, 1000); // 1초 후 최신 상태 확인
        }
      }
    } catch (error) {
      console.error("팔로우 상태 변경 실패:", error);
      alert("팔로우 상태를 변경하는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const checkIfAuthor = async () => {
      const userId = await getUserId();
      if (userId && post) {
        setIsAuthor(userId === post.author.id);
        console.log(`게시글 작성자 여부 확인: ${isAuthor}`);
      }
    };

    checkIfAuthor();
  }, [post]);

  // 유저 ID 가져오기
  const getUserId = async (): Promise<string | null> => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const userId = jwtDecode(token).sub;
      return userId || null;
    } catch {
      return null;
    }
  };

  // 포인트 적립 API 요청 함수
  const handlePointUpdate = async () => {
    try {
      const userId = await getUserId(); // 안정적으로 userId 가져오기
      if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

      const response = await axios.patch(
        `https://api.meet-da.site/user/${userId}/points`,
        {
          delta: 50,
          description: "다이어리 작성",
        }
      );

      if (response.status === 200) {
        console.log("포인트 적립 성공:", response.data);
      } else {
        console.error("포인트 적립 실패:", response.data);
      }
    } catch (error) {
      console.error("포인트 적립 요청 중 오류 발생:", error);
    }

    setIsModalClick(null); // 모달 닫기
  };

  const toggleBookmark = async () => {
    const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `https://api.meet-da.site/board/toggle-bookmark`,
        {
          boardId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 추가
          },
        }
      );

      console.log("API 응답:", response.data); // 응답 데이터 확인

      if (response.status === 200) {
        const updatedBookmarks = response.data.bookmarks;
        const isUserBookmarked = updatedBookmarks.includes(userId || "");

        console.log("북마크 상태 변경 전:", isBookmarked);
        setIsBookmarked(isUserBookmarked); // 상태 업데이트
        console.log("북마크 상태 변경 후:", isUserBookmarked);
      }
    } catch (error) {
      console.error("북마크 설정 실패:", error);
      alert("북마크 설정 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          `https://api.meet-da.site/board/${boardId}`
        );

        // console.log("API 응답:", response.data); // 데이터 구조 확인

        if (response.data) {
          setPost(response.data);

          const userId = localStorage.getItem("userId");
          const isUserBookmark = response.data.bookmarks.includes(userId || "");
          setIsBookmarked(isUserBookmark);
        } else {
          console.error("데이터가 없습니다");
        }
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.error("게시글을 찾을 수 없습니다");
          } else {
            console.error("서버 에러:", error.response?.data);
            console.error("서버 상태 코드:", error.response?.status);
          }
        } else {
          console.error("게시글 가져오기 실패:", error);
        }
        setLoading(false);
      }
    };
    fetchPost();
  }, [boardId]);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `https://api.meet-da.site/board/${boardId}`
        );
        if (response.status === 200) {
          console.log("게시글 삭제 성공");
          navigate("/"); // 삭제 후 홈 페이지로 리다이렉트
        } else {
          console.error("게시글 삭제 실패", response.data);
        }
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중일 때 표시할 내용
  }

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  const handleEdit = () => {
    navigate(`/board/edit/${boardId}`);
  };

  // visibility 값을 한글로 변환하는 객체
  const visibilityMap: { [key: string]: string } = {
    PUBLIC: "전체 공개",
    FRIENDS_ONLY: "서로 믿음 공개",
    PRIVATE: "비공개",
  };

  // visibility 값이 매핑에 없을 경우 대비 기본값 설정
  const visibilityText = visibilityMap[post.visibility] || "알 수 없음";

  const defaultProfileImage = ProfileImagePlaceholder; // 기본 이미지
  const profileImageSrc = post.author.profileImage || defaultProfileImage;

  return (
    <Wrap>
      <Title>
        <h2>{post.createdAt.substring(0, 10)}</h2>
        <p>{post.title}</p>
      </Title>
      <FrameParentRoot>
        <FrameWrapper>
          <FrameGroup>
            <FrameContainer>
              <MoodWrap>
                <Div>
                  <Span>{`오늘 `}</Span>
                  <UserName>{post.author.username}</UserName>
                  <Span>님의 기분은...</Span>
                </Div>
                {/* <MoodIcon alt="피곤" src={EmotionImg} /> */}
              </MoodWrap>
            </FrameContainer>
            <Div>·</Div>
            <Div>{post.createdAt.substring(0, 10)}</Div>
            <Div>·</Div>
            <Div1>{visibilityText}</Div1>
          </FrameGroup>
        </FrameWrapper>
        <IconWrap>
          <button onClick={toggleBookmark}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkHoverIcon />}
          </button>
          <UploadIcon />
        </IconWrap>
      </FrameParentRoot>
      <ImageWrap>
        <MainImage alt="" />
        <SubImageWrap>
          <SubImage alt="" />
          <SubImageOpacity alt="" />
          <SubImageOpacity alt="" />
        </SubImageWrap>
      </ImageWrap>
      <Text dangerouslySetInnerHTML={{ __html: post.content }}></Text>
      <LikeWrap>
        <div
          onMouseEnter={() => setIsLikeHover(true)}
          onMouseLeave={() => setIsLikeHover(false)}
        >
          {isLikeHover ? <HeratHoverIcon /> : <HeartIcon />}
          <span>21</span>
        </div>
      </LikeWrap>
      <Button>
        <DiaryButton $variant="delete" onClick={handleDelete}>
          삭제하기
        </DiaryButton>
        <DiaryButton $variant="modify" onClick={handleEdit}>
          수정하기
        </DiaryButton>
      </Button>
      <ProfileWrap>
        <UserInfoWrap>
          <ProfileImage
            src={profileImageSrc}
            alt={`${post.author.username}의 프로필 이미지`}
            onError={(e) => {
              e.currentTarget.src = defaultProfileImage;
            }}
          />
          <Profile>
            <p>{post.author.username}</p>
            <span>
              {post.author.description !== ""
                ? post.author.description
                : "믿-다에서 서로를 믿어보세요"}
            </span>
          </Profile>
        </UserInfoWrap>

        {post && !isAuthor && (
          <FriendButton
            $variant={isFollowing ? "diaryUnfollow" : "diaryFollow"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "헤어지기" : "만나기"}
          </FriendButton>
        )}
      </ProfileWrap>
      <Line />
      <CommentCount>2개의 댓글</CommentCount>
      <TextArea placeholder="댓글을 작성하세요." />
      <CommentButtonWrap>
        <CommentButton>댓글 작성</CommentButton>
      </CommentButtonWrap>
      <CommentList>
        <ListArray>
          <ProfileWrap>
            <ProfileImage
              src={profileImageSrc}
              alt={`${post.author.username}의 프로필 이미지`}
              onError={(e) => {
                e.currentTarget.src = defaultProfileImage;
              }}
            />
            <Profile>
              <p>믿음소망사과</p>
              <span>방금 전</span>
            </Profile>
          </ProfileWrap>
          <IconButton>
            <EditIcon />
            <DeleteIcon />
          </IconButton>
        </ListArray>
        <CommentWrite>
          <p>댓글을 작성해봅시다.</p>
        </CommentWrite>
        <ReplyButtonWrap>
          <ReplyIcon />
          <button>답글달기</button>
        </ReplyButtonWrap>
        <Reply>
          <TextAreaWrap>
            <ArrowIcon />
            <TextArea placeholder="댓글을 작성하세요." />
          </TextAreaWrap>
          <Button>
            <button>취소</button>
            <ReplyButton $variant="comment">댓글 작성</ReplyButton>
          </Button>
          <Line></Line>
          <ListArray>
            <ProfileWrap>
              <ProfileImage
                src={profileImageSrc}
                alt={`${post.author.username}의 프로필 이미지`}
                onError={(e) => {
                  e.currentTarget.src = defaultProfileImage;
                }}
              />
              <Profile>
                <p>믿음소망사과</p>
                <span>방금 전</span>
              </Profile>
            </ProfileWrap>
            <IconButton>
              <EditIcon />
              <DeleteIcon />
            </IconButton>
          </ListArray>
        </Reply>
      </CommentList>

      {isModal === "pointModal" && (
        <PointModal
          isOpen={true}
          title="다이어리 작성 완료!"
          content={"50 P"}
          subContent="포인트가 적립되었습니다."
          onConfirm={handlePointUpdate}
        />
      )}
    </Wrap>
  );
}
