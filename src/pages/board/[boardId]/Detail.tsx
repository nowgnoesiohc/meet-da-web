import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CommentButton,
  DiaryButton,
  FriendButton,
} from "@/components/ui/Button";
import { useIsModalStore } from "@/store/ModalStore";
import PointModal from "@/components/modal/PointModal";
import { jwtDecode } from "jwt-decode";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { themeImages } from "@/assets/common/themeImages";
import {
  ArrowIcon,
  BookmarkHoverIcon,
  BookmarkIcon,
  Button,
  CancelButton,
  ClickedReplyIcon,
  CommentButtonWrap,
  CommentCount,
  CommentInfoWrap,
  CommentList,
  CommentWrite,
  DeleteIcon,
  Div,
  Div1,
  EditButtonWrap,
  EditIcon,
  EditWrite,
  FrameContainer,
  FrameGroup,
  FrameParentRoot,
  FrameWrapper,
  HeartHoverIcon,
  HeartIcon,
  IconButton,
  IconWrap,
  LikeWrap,
  Line,
  ListArray,
  MoodIcon,
  MoodWrap,
  PostText,
  Profile,
  ProfileImage,
  ProfileImagePlaceholder,
  ProfileWrap,
  Reply,
  ReplyButtonWrap,
  ReplyComment,
  ReplyIcon,
  ReplyProfileImage,
  ReplyProfileWrap,
  ReplyUserProfile,
  Span,
  StyledSwiper,
  StyledSwiperSlide,
  SwiperContainer,
  SwiperImage,
  TextArea,
  TextAreaWrap,
  ThumbnailImage,
  ThumbnailSlide,
  ThumbnailSwiper,
  Title,
  UploadIcon,
  UserInfoWrap,
  UserName,
  Wrap,
} from "./Detail.styles";

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
  mood: string;
}

interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    id?: string;
    username: string;
    profileImage: string;
  };
  createdAt: string;
  parentCommentId?: string | null;
  replies: Comment[];
}

interface MoodEntry {
  date: string;
  mood: string;
}

export default function BoardDetail() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { boardId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();
  const { isModal, setIsModalClick } = useIsModalStore();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  useEffect(() => {
    const storedBoardId = sessionStorage.getItem("showPointModal");

    if (storedBoardId && storedBoardId === boardId) {
      setIsModalClick("pointModal");
      sessionStorage.removeItem("showPointModal"); // 한 번만 실행되도록 삭제
    }
  }, [boardId]); // boardId가 변경될 때만 실행

  const [moodIcons, setMoodIcons] = useState(themeImages);

  useEffect(() => {
    const loadAppliedTheme = () => {
      const userId = localStorage.getItem("userId");
      const appliedTheme = userId
        ? JSON.parse(localStorage.getItem(`appliedTheme_${userId}`) || "{}")
        : JSON.parse(localStorage.getItem("appliedTheme") || "{}");

      if (appliedTheme.name && appliedTheme.moodImages) {
        setMoodIcons(appliedTheme.moodImages);
      }
    };

    loadAppliedTheme(); // 초기 실행
    window.addEventListener("storage", loadAppliedTheme); // 스토리지 변경 감지

    return () => {
      window.removeEventListener("storage", loadAppliedTheme);
    };
  }, []);

  const fetchMoodByDate = async (authorId: string, createdAt: string) => {
    try {
      const postDate = new Date(createdAt);
      const year = postDate.getFullYear();
      const month = postDate.getMonth() + 1;
      const day = postDate.getDate(); // 게시글 작성 날짜

      const response = await axios.get<MoodEntry[]>(
        `https://api.meet-da.site/user/${authorId}/moods?year=${year}&month=${month}`
      );

      if (response.data.length > 0) {
        // 해당 날짜에 맞는 무드 찾기
        const matchedMood = response.data.find((moodEntry: MoodEntry) => {
          const moodDate = new Date(moodEntry.date); // API에서 제공하는 날짜 값
          return (
            moodDate.getFullYear() === year &&
            moodDate.getMonth() + 1 === month &&
            moodDate.getDate() === day
          );
        });

        return matchedMood ? matchedMood.mood : null; // 해당 날짜 무드가 없으면 null 반환
      }
      return null;
    } catch (error) {
      console.error(
        `사용자 ${authorId}의 ${createdAt} 무드 데이터를 불러오는 데 실패했습니다:`,
        error
      );
      return null;
    }
  };

  const getMoodImage = (mood: string | null) => {
    if (!moodIcons || Object.keys(moodIcons).length === 0)
      return themeImages["hurt"];
    return moodIcons[mood as keyof typeof moodIcons] || themeImages["hurt"];
  };

  // 친구 추가
  const fetchFollowStatus = async () => {
    if (!post) return;

    try {
      const userId = await getUserId();
      if (!userId) return;

      setIsAuthor(userId === post.author.id); // 내가 작성한 글인지 확인

      // API 응답 전체 확인
      const response = await axios.get(
        `https://api.meet-da.site/user/${userId}/following`
      );

      if (!response.data) {
        console.error("API 응답이 없습니다.");
        return;
      }

      // 데이터가 올바른 배열인지 확인
      if (!response.data.following || !Array.isArray(response.data.following)) {
        console.error("팔로잉 목록이 없습니다.");
        return;
      }

      const followingList = response.data.following;

      // '_id' 속성으로 비교하도록 수정
      const isUserFollowing = followingList.some(
        (follow: { _id: string }) => follow._id === post.author.id
      );

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
        const response = await axios.delete(
          `https://api.meet-da.site/user/follow/${userId}/${targetId}`
        );

        if (response.status === 200) {
          setIsFollowing(false);
          setTimeout(fetchFollowStatus, 1000);
        }
      } else {
        const response = await axios.post(
          `https://api.meet-da.site/user/follow/${userId}/${targetId}`,
          {}
        );

        if (response.status === 200) {
          setIsFollowing(true);
          setTimeout(fetchFollowStatus, 1000);
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

  const fetchPost = async () => {
    try {
      setLoading(true);
      const userId = await getUserId(); // 현재 로그인한 사용자 ID 가져오기
      if (!userId) {
        console.error("유저 ID를 가져올 수 없음");
        navigate("/"); // 로그인 안 한 사용자는 차단
        return;
      }

      const response = await axios.get(
        `https://api.meet-da.site/board/${boardId}`
      );
      const postData = response.data;

      // 비공개 게시글인데 작성자가 아니면 접근 차단
      if (postData.visibility === "PRIVATE" && postData.author.id !== userId) {
        alert("비공개 게시글은 작성자만 볼 수 있습니다.");
        navigate("/"); // 홈으로 리디렉트
        return;
      }

      // 작성일 기준으로 무드 가져오기
      const authorMood = await fetchMoodByDate(
        postData.author.id,
        postData.createdAt
      );

      setPost({
        ...postData,
        author: {
          ...postData.author,
          mood: authorMood || "hurt", // 무드 정보 추가
        },
      });

      setIsBookmarked(postData.bookmarks.includes(userId));
      setIsLiked(postData.likes.includes(userId));
      setLikeCount(postData.likes.length);
    } catch (error) {
      console.error("게시글 데이터 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserAndPost = async () => {
      const userId = await getUserId();
      if (userId) {
        fetchPost();
      }
    };
    fetchUserAndPost();
  }, [boardId]);

  const toggleBookmark = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      setIsBookmarked((prev) => !prev);

      const response = await axios.post(
        `https://api.meet-da.site/board/toggle-bookmark`,
        { boardId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsBookmarked(response.data.message === "Bookmark added");
    } catch (error) {
      console.error("북마크 설정 실패:", error);
    }
  };

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      const response = await axios.post(
        `https://api.meet-da.site/board/toggle-like`,
        { boardId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLiked(response.data.message === "Like added");
      setLikeCount(
        response.data.message === "Like added" ? likeCount + 1 : likeCount - 1
      );
    } catch (error) {
      console.error("좋아요 설정 실패:", error);
    }
  };

  const handleEdit = async () => {
    const userId = await getUserId();
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (userId !== post?.author.id) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }

    navigate(`/board/edit/${boardId}`);
  };

  const handleDelete = async () => {
    const userId = await getUserId();
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (userId !== post?.author.id) {
      alert("작성자만 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `https://api.meet-da.site/board/${boardId}`
        );
        if (response.status === 200) {
          navigate("/"); // 삭제 후 홈 페이지로 이동
        } else {
          console.error("게시글 삭제 실패", response.data);
        }
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://api.meet-da.site/comment/${boardId}`
      );

      if (!response.data || response.data.length === 0) {
        console.warn("댓글이 없습니다.");
        setComments([]);
        return;
      }

      const commentsWithReplies = await Promise.all(
        response.data.map(async (comment: Comment) => {
          const replies = await fetchReplies(comment._id); // 대댓글 가져오기

          return {
            ...comment,
            author: {
              _id: comment.author?._id || "",
              username: comment.author?.username || "익명",
              profileImage: comment.author?.profileImage || defaultProfileImage,
            },
            createdAt: comment.createdAt || new Date().toISOString(),
            replies, // 대댓글 추가
          };
        })
      );

      setComments(commentsWithReplies);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
    }
  };

  const postComment = async () => {
    if (
      (!newComment.trim() && !replyingTo) ||
      (!newReplyComment.trim() && replyingTo)
    ) {
      alert("댓글을 입력하세요.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const userId = await getUserId();
      if (!userId) {
        alert("사용자 정보를 가져올 수 없습니다.");
        return;
      }

      const payload = {
        boardId,
        author: userId,
        content: replyingTo ? newReplyComment : newComment, // 대댓글이면 newReplyComment 사용
        parentCommentId: replyingTo ? replyingTo : null,
      };

      const response = await axios.post(
        `https://api.meet-da.site/comment`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("댓글 생성 응답:", response.data);

      if (replyingTo) {
        setNewReplyComment(""); // 대댓글 입력 후 초기화
      } else {
        setNewComment(""); // 일반 댓글 입력 후 초기화
      }

      fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  // 대댓글 작성 버튼 클릭 시 replyingTo 설정
  const toggleReplyBox = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null); // 대댓글 입력 취소
      setActiveReplyId(null);
    } else {
      setReplyingTo(commentId); // 클릭한 댓글을 부모로 지정
      setActiveReplyId(commentId);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [boardId]);

  const editComment = async (
    commentId: string,
    currentContent: string,
    authorId: string,
    parentCommentId?: string
  ) => {
    const userId = await getUserId();

    if (!userId || userId.trim() !== authorId.trim()) {
      alert("본인이 작성한 댓글만 수정할 수 있습니다.");
      return;
    }

    console.log("수정할 댓글 정보:", { commentId, parentCommentId });

    // parentCommentId가 있으면 대댓글 수정, 없으면 일반 댓글 수정
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  const saveEditedComment = async (
    commentId: string,
    parentCommentId?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("로그인이 필요합니다.");

      await axios.patch(
        `https://api.meet-da.site/comment/${commentId}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prevComments) => {
        if (parentCommentId) {
          // 대댓글 수정
          return prevComments.map((comment) =>
            comment._id === parentCommentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === commentId
                      ? { ...reply, content: editContent }
                      : reply
                  ),
                }
              : comment
          );
        } else {
          // 일반 댓글 수정
          return prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, content: editContent }
              : comment
          );
        }
      });

      setEditingCommentId(null);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const deleteComment = async (
    commentId: string,
    authorId: string,
    parentCommentId?: string
  ) => {
    const userId = await getUserId();

    if (!userId || userId.trim() !== authorId.trim()) {
      alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
      return;
    }

    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`https://api.meet-da.site/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setComments((prevComments) => {
        if (parentCommentId) {
          // 대댓글 삭제: 부모 댓글의 replies에서만 삭제
          return prevComments.map((comment) =>
            comment._id === parentCommentId
              ? {
                  ...comment,
                  replies: comment.replies.filter(
                    (reply) => reply._id !== commentId
                  ),
                }
              : comment
          );
        } else {
          // 일반 댓글 삭제
          return prevComments.filter((comment) => comment._id !== commentId);
        }
      });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const [newReplyComment, setNewReplyComment] = useState(""); // 대댓글 입력 상태 추가

  const fetchReplies = async (commentId: string) => {
    try {
      const response = await axios.get(
        `https://api.meet-da.site/comment/replies/${commentId}`
      );

      return response.data
        .map((reply: Comment) => ({
          ...reply,
          author: {
            id: reply.author?._id || "",
            username: reply.author?.username || "익명",
            profileImage: reply.author?.profileImage || defaultProfileImage,
          },
          createdAt: reply.createdAt || new Date().toISOString(),
        }))
        .sort(
          (a: { createdAt: string }, b: { createdAt: string }) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ); // 최신순 정렬
    } catch (error) {
      console.error("대댓글 조회 실패:", error);
      return [];
    }
  };

  const handleProfileClick = async () => {
    if (!post || !post.author) return;

    const userId = await getUserId();
    if (!userId) {
      console.warn("로그인이 필요합니다."); // 로그 출력
      return;
    }

    if (userId !== post.author.id) {
      navigate("/calendar", { state: { userId: post.author.id } }); // 게시글 작성자의 캘린더 페이지로 이동
    }
  };

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중일 때 표시할 내용
  }

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const commentDate = new Date(createdAt);
    const diffMs = now.getTime() - commentDate.getTime(); // 시간 차이 (밀리초)
    const diffSec = Math.floor(diffMs / 1000); // 초 단위 변환
    const diffMin = Math.floor(diffSec / 60); // 분 단위 변환
    const diffHour = Math.floor(diffMin / 60); // 시간 단위 변환
    const diffDay = Math.floor(diffHour / 12); // 일 단위 변환

    if (diffDay >= 1) {
      // 12시간 이상 지난 경우 YYYY.MM.DD 형식 표시
      return `${commentDate.getFullYear()}.${String(commentDate.getMonth() + 1).padStart(2, "0")}.${String(commentDate.getDate()).padStart(2, "0")}`;
    } else if (diffHour >= 1) {
      // 1시간 이상 경과한 경우
      return `${diffHour}시간 전`;
    } else if (diffMin >= 1) {
      // 1분 이상 경과한 경우
      return `${diffMin}분 전`;
    } else {
      // 1분 이내
      return "방금 전";
    }
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

  const totalComments = comments.reduce((count, comment) => {
    return count + 1 + (comment.replies ? comment.replies.length : 0);
  }, 0);

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
                <MoodIcon
                  alt={post.author.mood || "기본 무드"}
                  src={getMoodImage(post.author.mood)}
                />
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
            {isBookmarked ? <BookmarkHoverIcon /> : <BookmarkIcon />}
          </button>
          <UploadIcon />
        </IconWrap>
      </FrameParentRoot>
      {post.images.length > 0 ? (
        <>
          <SwiperContainer isSingleImage={post.images.length === 1}>
            {/* 메인 Swiper */}
            <StyledSwiper
              isSingleImage={post.images.length === 1}
              modules={[FreeMode, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              slidesPerView={1}
            >
              {post.images.map((image, index) => (
                <StyledSwiperSlide key={index}>
                  <SwiperImage src={image} alt={`게시글 이미지 ${index + 1}`} />
                </StyledSwiperSlide>
              ))}
            </StyledSwiper>

            {/* 이미지 2개 이상일 때만 표시 */}
            {post.images.length > 1 && (
              <ThumbnailSwiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                mousewheel={true} /* 스크롤 가능 */
                modules={[FreeMode, Thumbs]}
              >
                {post.images.map((image, index) => (
                  <ThumbnailSlide key={index}>
                    <ThumbnailImage src={image} alt={`썸네일 ${index + 1}`} />
                  </ThumbnailSlide>
                ))}
              </ThumbnailSwiper>
            )}
          </SwiperContainer>

          <PostText
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></PostText>
        </>
      ) : (
        <PostText dangerouslySetInnerHTML={{ __html: post.content }}></PostText>
      )}

      <LikeWrap>
        <button onClick={toggleLike}>
          {isLiked ? <HeartHoverIcon /> : <HeartIcon />}
          <span>{likeCount}</span>
        </button>
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
            onError={(e) => {
              e.currentTarget.src = defaultProfileImage;
            }}
            onClick={handleProfileClick}
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
      <CommentList>
        <CommentCount>{totalComments}개의 댓글</CommentCount>
        <TextArea
          placeholder="댓글을 작성하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentButtonWrap>
          <CommentButton onClick={postComment}>댓글 작성</CommentButton>
        </CommentButtonWrap>
        {comments.map((comment, index) => {
          const isLastComment = index === comments.length - 1; // 마지막 댓글인지 확인

          return (
            <ListArray key={comment._id}>
              <CommentInfoWrap>
                <ProfileWrap>
                  <ProfileImage
                    src={
                      comment.author.profileImage &&
                      comment.author.profileImage !== ""
                        ? comment.author.profileImage
                        : defaultProfileImage
                    }
                    alt={`${comment.author.username}의 프로필 이미지`}
                    onError={(e) => {
                      e.currentTarget.src = defaultProfileImage;
                    }}
                    style={{
                      backgroundColor: "transparent", // 배경색을 하얀색이 아닌 투명하게 설정
                      display: "block", // 이미지가 사라지지 않도록 강제 설정
                    }}
                  />

                  <Profile>
                    <p>{comment.author.username}</p>
                    <span>{formatTimeAgo(comment.createdAt)}</span>
                  </Profile>
                </ProfileWrap>
                <IconButton>
                  <EditIcon
                    onClick={() => {
                      editComment(
                        comment._id,
                        comment.content,
                        comment.author?._id || "undefined"
                      ); // 값이 없을 경우 기본값 전달
                    }}
                  />
                  <DeleteIcon
                    onClick={() =>
                      deleteComment(comment._id, comment.author._id)
                    }
                  />
                </IconButton>
              </CommentInfoWrap>
              {editingCommentId === comment._id ? (
                <EditWrite>
                  <>
                    {/* 댓글 작성 UI와 동일한 형태로 수정 */}
                    <TextArea
                      placeholder="댓글을 작성하세요."
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <EditButtonWrap>
                      <CommentButton
                        onClick={() => saveEditedComment(comment._id)}
                      >
                        수정 완료
                      </CommentButton>
                      <CancelButton onClick={() => setEditingCommentId(null)}>
                        취소
                      </CancelButton>
                    </EditButtonWrap>
                  </>
                </EditWrite>
              ) : (
                <CommentWrite>
                  <p>{comment.content}</p>
                </CommentWrite>
              )}

              <ReplyButtonWrap>
                {activeReplyId === comment._id ? (
                  <ClickedReplyIcon />
                ) : (
                  <ReplyIcon />
                )}
                <button onClick={() => toggleReplyBox(comment._id)}>
                  답글 달기
                </button>
              </ReplyButtonWrap>
              {activeReplyId !== comment._id && !isLastComment && <Line />}
              {activeReplyId === comment._id && (
                <>
                  <Reply>
                    <TextAreaWrap>
                      <ArrowIcon />
                      <TextArea
                        placeholder="답글을 작성하세요."
                        value={newReplyComment}
                        onChange={(e) => setNewReplyComment(e.target.value)}
                      />
                    </TextAreaWrap>
                    <Button>
                      <button onClick={() => setActiveReplyId(null)}>
                        취소
                      </button>
                      <CommentButton onClick={() => postComment()}>
                        댓글 작성
                      </CommentButton>
                    </Button>
                    {/* 대댓글 렌더링 */}
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <React.Fragment key={reply._id}>
                          <ReplyComment>
                            <CommentInfoWrap>
                              <ReplyProfileWrap>
                                <ReplyProfileImage
                                  src={
                                    reply.author.profileImage ||
                                    defaultProfileImage
                                  }
                                  alt={`${reply.author.username}의 프로필 이미지`}
                                  onError={(e) => {
                                    e.currentTarget.src = defaultProfileImage;
                                  }}
                                />
                                <ReplyUserProfile>
                                  <p>{reply.author.username}</p>
                                  <span>{formatTimeAgo(reply.createdAt)}</span>
                                </ReplyUserProfile>
                              </ReplyProfileWrap>
                              <IconButton>
                                <EditIcon
                                  onClick={() => {
                                    if (!reply.author?.id) {
                                      console.error(
                                        "대댓글의 작성자 ID가 없습니다!",
                                        reply
                                      );
                                      return;
                                    }
                                    if (!comment?._id) {
                                      console.error(
                                        "부모 댓글 ID가 없습니다!",
                                        comment
                                      );
                                      return;
                                    }

                                    editComment(
                                      reply._id,
                                      reply.content,
                                      reply.author.id || "", // undefined 방지
                                      comment._id // parentCommentId 전달
                                    );
                                  }}
                                />
                                <DeleteIcon
                                  onClick={() => {
                                    if (!reply.author?.id) {
                                      console.error(
                                        "대댓글의 작성자 ID가 없습니다!",
                                        reply
                                      );
                                      return;
                                    }
                                    if (!comment?._id) {
                                      console.error(
                                        "부모 댓글 ID가 없습니다!",
                                        comment
                                      );
                                      return;
                                    }

                                    deleteComment(
                                      reply._id,
                                      reply.author.id || "", // undefined 방지
                                      comment._id || "" // undefined 방지
                                    );
                                  }}
                                />
                              </IconButton>
                            </CommentInfoWrap>

                            {/* 대댓글 수정 UI 추가 */}
                            {editingCommentId === reply._id ? (
                              <EditWrite>
                                <TextArea
                                  placeholder="대댓글을 수정하세요."
                                  value={editContent}
                                  onChange={(e) =>
                                    setEditContent(e.target.value)
                                  }
                                />
                                <EditButtonWrap>
                                  <CommentButton
                                    onClick={() =>
                                      saveEditedComment(reply._id, comment._id)
                                    }
                                  >
                                    수정 완료
                                  </CommentButton>
                                  <CancelButton
                                    onClick={() => setEditingCommentId(null)}
                                  >
                                    취소
                                  </CancelButton>
                                </EditButtonWrap>
                              </EditWrite>
                            ) : (
                              <CommentWrite>
                                <p>{reply.content}</p>
                              </CommentWrite>
                            )}
                          </ReplyComment>
                        </React.Fragment>
                      ))}
                  </Reply>
                  {!isLastComment && <Line />}
                </>
              )}
            </ListArray>
          );
        })}
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
