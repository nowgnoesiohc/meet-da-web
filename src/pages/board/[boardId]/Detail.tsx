import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";

import {
  CommentButton,
  DiaryButton,
  ReplyButton,
} from "@/components/ui/Button";

const Wrap = styled.div`
  width: 62.125rem;
  margin: 0 auto;
  padding-bottom: 11rem;
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
    margin-top: 0.75rem;
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
`;

const FrameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const BookmarkIcon = styled(FiBookmark)`
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  color: var(--black);
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
`;

const IconWrap = styled.div`
  width: 4.875rem;
  position: relative;
  height: 1.5rem;
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
`;

// 이미지
const MainImage = styled.img`
  width: 42.875rem;
  position: relative;
  border-radius: 0.5rem;
  height: 27.875rem;
  object-fit: cover;
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
`;
const SubImageWrap = styled.div`
  width: 17.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
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

  > span {
    position: relative;
    line-height: 1.5rem;
    font-size: 1.25rem;
  }
`;
const HeartIcon = styled(AiOutlineHeart)`
  font-size: 1.5rem;
  color: var(--main-orange);
`;

const Button = styled.div`
  width: 16.5rem;
  height: 3.25rem;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  margin-top: 3.75rem;
  margin-bottom: 6.125rem;

  > button {
    width: 7rem;
    height: 3.25rem;
    border-radius: 0.625rem;
    color: #fff;
    font-size: 1.125rem;
  }
  > button:first-child {
    background-color: var(--line-basic);
  }
  > button:last-child {
    background-color: var(--orange-button);
  }
`;

const ProfileWrap = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
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

const ProfileImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 6.25rem;
  background-color: var(--line-basic);
`;

const Line = styled.div`
  width: 100%;
  border-top: 0.0625rem solid var(--line-basic);
  margin-top: 6.875rem;
  margin-bottom: 5.125rem;
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
  /* margin:0 auto; */

  ${TextArea} {
    width: 51.375rem;
    height: 6.25rem;
    resize: none;
  }

  ${Button} {
    width: 100%;
    gap: 0;
    display: flex;
    justify-content: flex-end;
    padding-right: 2rem;

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
`;

const ReplyIcon = styled(AiOutlineComment)`
  font-size: 1.125rem;
  color: var(--comment-button);
`;

const TextAreaWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  > img {
    position: absolute;
    top: 0.62%;
    right: 97.87%;
    left: 0%;
    bottom: 87.04%;
  }
`;

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  visibility: string;
  // 필요한 다른 속성들 추가
}

export default function BoardDetail() {
  const { boardId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          `https://api.meet-da.site/board/${boardId}`
        );

        if (response.data) {
          setPost(response.data);
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

  return (
    <Wrap>
      <Title>
        {/* <h2>2024년 12월 12일</h2> */}
        {/* <p>Q. 올해 가장 감사했던 순간은 언제인가요?</p> */}
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
                  <UserName>{post.author}</UserName>
                  <Span>님의 기분은...</Span>
                </Div>
                {/* <MoodIcon alt="피곤" src={EmotionImg} /> */}
              </MoodWrap>
            </FrameContainer>
            <Div>·</Div>
            <Div>{post.createdAt.substring(0, 10)}</Div>
            <Div>·</Div>
            <Div1>{post.visibility}</Div1>
          </FrameGroup>
        </FrameWrapper>
        <IconWrap>
          <BookmarkIcon />
          <UploadIcon />
        </IconWrap>
      </FrameParentRoot>
      <ImageWrap>
        <MainImage alt="" src="Rectangle 3028.png" />
        <SubImageWrap>
          <SubImage alt="" src="Rectangle 3029.png" />
          <SubImageOpacity alt="" src="Rectangle 3030.png" />
          <SubImageOpacity alt="" src="Rectangle 3031.png" />
        </SubImageWrap>
      </ImageWrap>
      <Text dangerouslySetInnerHTML={{ __html: post.content }}></Text>
      <LikeWrap>
        <HeartIcon />
        <span>21</span>
      </LikeWrap>
      <Button>
        <DiaryButton variant="delete" onClick={handleDelete}>
          삭제하기
        </DiaryButton>
        <DiaryButton variant="modify" onClick={handleEdit}>
          수정하기
        </DiaryButton>
      </Button>
      <ProfileWrap>
        <ProfileImage></ProfileImage>
        <Profile>
          <p>{post.author}</p>
          <span>도토리가 좋아요</span>
        </Profile>
      </ProfileWrap>
      <Line></Line>
      <CommentCount>2개의 댓글</CommentCount>
      <TextArea placeholder="댓글을 작성하세요." />
      <CommentButtonWrap>
        <CommentButton>댓글 작성</CommentButton>
      </CommentButtonWrap>
      <CommentList>
        <ListArray>
          <ProfileWrap>
            <ProfileImage></ProfileImage>
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
            {/* <img src={ArrowImg} alt="답글 화살표" /> */}
            <TextArea placeholder="댓글을 작성하세요." />
          </TextAreaWrap>
          <Button>
            <button>취소</button>
            <ReplyButton variant="comment">댓글 작성</ReplyButton>
          </Button>
        </Reply>
      </CommentList>
    </Wrap>
  );
}
