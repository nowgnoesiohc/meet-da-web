import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { RecordButton } from "@/components/ui/Button";
import { jwtDecode } from "jwt-decode";

interface DropdownItemProps {
  isSelected: boolean;
}

const QuillWrapper = styled.div`
  .quill {
    margin: 2.25rem 0;
    font-size: 1.125rem;
  }

  .ql-container {
    border-bottom-left-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    overflow-y: auto;
    font-family: inherit;
  }

  .ql-editor {
    min-height: 12.5rem;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: inherit;
    font-size: 1.125rem;
    padding: 1.75rem 2.5rem;
  }

  .ql-toolbar {
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
  }

  @media (max-width: 390px) {
    margin: 1.3125rem 0 1.625rem;
  }
`;

const Wrap = styled.div`
  width: 62.125rem;
  margin: 5rem auto;

  h2 {
    height: 1.5rem;
    font-size: 1.5rem;
    font-weight: var(--font-medium);
  }

  @media (max-width: 781px) {
    width: 40rem;
    margin: 10% auto;
  }
  @media (max-width: 390px) {
    h2 {
      font-size: 1rem;
      margin: 0;
    }
    width: 20rem;
  }
`;

const TitleWrap = styled.div`
  height: 3.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    font-size: 1.875rem;
    font-weight: 600;
  }

  @media (max-width: 781px) {
    p {
      font-size: 1.75rem;
    }
  }
  @media (max-width: 390px) {
    flex-direction: column;
    height: auto;
    p {
      margin: 0.375rem 0 0.75rem;
      width: 20rem;
      font-size: 1.125rem;
    }
    > div {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const DropdownContainer = styled.div`
  width: 8.75rem;
  height: 3.25rem;
  border: 0.0625rem solid var(--main-text);
  border-radius: 0.625rem;
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 781px) {
    font-size: 1.125rem;
  }
  @media (max-width: 390px) {
    width: 7.75rem;
    height: 2.75rem;
    font-size: 1rem;
  }
`;

const DropdownMenu = styled.ul`
  width: 8.75rem;
  height: 12.25rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
  position: absolute;
  margin: 0;
  margin-top: 0.5rem;
  padding: 0.5rem;
  z-index: 10;
  background-color: #fff;
  border-radius: 0.625rem;

  > li:nth-child(2) {
    margin: 0.75rem auto;
  }
  @media (max-width: 390px) {
    width: 7.75rem;
    top: 14.6875rem;
  }
`;

const DropdownItem = styled.li<DropdownItemProps>`
  width: 100%;
  height: 3.25rem;
  font-size: 1.125rem;
  list-style: none;
  cursor: pointer;
  padding: 0.625rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;

  // 선택된 항목 스타일
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--bg-02)" : "#fff"};

  &:hover {
    background-color: var(--bg-02);
  }

  @media (max-width: 390px) {
    font-size: 1rem;
    padding: 0rem;
  }
`;

const SelectMenu = styled.div`
  width: 4.375rem;
  height: 3.25rem;
  line-height: 3.3125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EditorWrap = styled.div`
  width: 62.125rem;
  margin: 0 auto;
  position: relative;

  > p {
    position: absolute;
    bottom: 0.3125rem;
    right: 2.5rem;
  }
  @media (max-width: 781px) {
    width: 40rem;
  }
  @media (max-width: 390px) {
    width: 20rem;
  }
`;

const WriteEmotion = styled.div`
  height: 5.75rem;
  background-color: #f5f1e7;
  border-radius: 1.25rem;

  > p {
    line-height: 5.75rem;
    padding: 0 2.5rem;
    font-size: 1.25rem;
  }
  @media (max-width: 390px) {
    height: 4.5rem;
    p {
      line-height: 4.5rem;
      font-size: 1.125rem;
      margin: 0;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 18rem;
  height: 3.5rem;
  margin: 0 auto;

  > button {
    width: 8rem;
    height: 3.5rem;
    text-align: center;
    color: #fff;
    margin: 0 1rem;
    margin-top: 2.875rem;
    border-radius: 1.25rem;
    font-size: 1.25rem;
  }

  @media (max-width: 390px) {
    button {
      margin-top: 2.25rem;
    }
  }
`;

interface BoarWriteProps {
  isEdit: boolean;
}

type Visibility = "PUBLIC" | "FRIENDS_ONLY" | "PRIVATE";

const BoardWrite: React.FC<BoarWriteProps> = ({ isEdit }) => {
  const [currentDate, setCurrentDate] = useState<string>(""); // 현재 날짜 상태
  // HTML 태그 제거 함수
  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html; // HTML을 DOM 요소로 변환
    return div.textContent || div.innerText || ""; // 텍스트만 반환
  };

  // 웹에디터 이미지 관련
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState("테스트 제목입니다."); // 제목 상태 (임시제목)
  console.log(setTitle);

  // 글자 수
  const [text, setText] = useState(0);
  const maxLength = 1000;

  //   const handleChange = (value: string) => {
  //     const textContent = stripHtmlTags(value); // HTML 태그 제거 후 순수 텍스트 추출
  //     if (textContent.length <= maxLength) {
  //       // 제한된 글자 수 이하만 허용
  //       setContent(value); // 에디터 내용 설정
  //       setText(textContent.length); // 글자 수 업데이트
  //     }
  //   };
  const handleChange = (value: string) => {
    if (!value) return; // 빈 값 체크 추가

    const textContent = stripHtmlTags(value);
    if (textContent.length <= maxLength) {
      setContent(value);
      setText(textContent.length);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0]; // ?
      if (file) {
        // 파일 크기 제한 (예: 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("이미지 크기는 5MB를 초과할 수 없습니다.");
          return;
        }

        // FileReader로 이미지 읽기
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection(true);
          quill?.insertEmbed(range!.index, "image", e.target?.result); // ?
          quill?.setSelection(range!.index + 1);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  // 커스텀 툴바 모듈
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          ["image"],
          ["code"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
      keyboard: {
        bindings: {
          enter: {
            key: 13,
            // handler: (range, context) => {
            //   // Enter 키 핸들링
            //   return true;
            // },
          },
        },
      },
    }),
    []
  );

  // 허용되는 포맷 지정
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "image",
    "code",
    // 'list', 'bullet', // 'link',
  ];

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
        }
      };

      editor.root.addEventListener("keydown", handleKeyDown);
      return () => {
        editor.root.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  // 드롭다운
  // 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false); // 메뉴 열림 여부
  const [selected, setSelected] = useState<Visibility>("PUBLIC"); // 선택된 메뉴
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 토글 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 메뉴 아이템 클릭 함수
  const handleSelect = (item: Visibility) => {
    setSelected(item); // 선택된 메뉴 업데이트
    setIsOpen(false); // 메뉴 닫기
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 외부 클릭 시 메뉴 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 드롭다운 아이템 목록
  const items: Visibility[] = ["PUBLIC", "FRIENDS_ONLY", "PRIVATE"];
  const descriptions: Record<Visibility, string> = {
    PUBLIC: "전체 공개",
    FRIENDS_ONLY: "서로 믿음 공개",
    PRIVATE: "비공개",
  };

  const onClickCancel = () => {
    navigate(`/board/${boardId}`);
  };

  // 작성
  const navigate = useNavigate();
  const { boardId } = useParams();

  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `https://api.meet-da.site/board/${boardId}`
          );
          setContent(response.data.content);
          setSelected(response.data.visibility); // 가시성 설정
        } catch (error) {
          console.error("게시글 가져오기 실패", error);
        }
      };
      fetchPost(); // 게시글 데이터 요청
    }
  }, [isEdit, boardId]);

  // 날짜
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate = `${year}년 ${month}월 ${day}일`;
    setCurrentDate(formattedDate);
  }, []);

  const [userInfo, setUserInfo] = useState<{
    id: string;
    username: string;
  } | null>(null);

  // 컴포넌트가 마운트될 때 사용자 정보를 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };

    fetchUserInfo();
  }, []);

  const getUserInfo = async (): Promise<{
    id: string;
    username: string;
  } | null> => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("토큰이 존재하지 않습니다.");
        return null;
      }

      const decoded: { sub: string; username: string } = jwtDecode(token);
      if (!decoded.sub) {
        console.warn("userId가 토큰에 포함되어 있지 않습니다.");
        return null;
      }

      // JWT 토큰에 username이 없다면, API를 통해 사용자 정보를 가져오는 방법
      const response = await axios.get(
        `https://api.meet-da.site/user/${decoded.sub}`
      );

      return {
        id: decoded.sub,
        username: response.data.username, // API 응답에서 username을 가져옴
      };
    } catch (error) {
      console.error("사용자 정보 가져오기 중 오류가 발생했습니다.", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const userInfo = await getUserInfo();
    if (!userInfo) {
      alert("사용자 정보를 가져올 수 없습니다.");
      return;
    }
    console.log(userInfo);

    const postData = {
      title: title,
      content: content,
      images: [], // 이미지 배열
      visibility: selected,
      author: userInfo.id,
      authorName: userInfo.username,
      createdAt: currentDate,
    };

    try {
      if (isEdit) {
        // 수정 요청
        // const response = await axios.patch(`https://api.meet-da.site/board/${boardId}`, postData);
        console.log(content);
        const response = await axios.patch(
          `https://api.meet-da.site/board/${boardId}`,
          { content: content, visibility: selected }
        );

        if (response.status === 200) {
          console.log("게시글 수정 성공", response.data);
          const boardId = response.data._id;
          navigate(`/board/${boardId}`);
        }
      } else {
        // 작성 요청
        const response = await axios.post(
          "https://api.meet-da.site/board",
          postData
        );

        if (response.status === 201) {
          console.log("게시글 작성 성공", response.data);
          const boardId = response.data._id;
          navigate(`/board/${boardId}`);
        }
      }
    } catch (error) {
      console.error("게시글 저장 실패", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrap>
      <h2>{currentDate}</h2>
      <TitleWrap>
        <p>{title}</p>
        <div ref={menuRef}>
          <DropdownContainer onClick={toggleDropdown}>
            <SelectMenu>{descriptions[selected]}</SelectMenu>
            <AiOutlineDown />
          </DropdownContainer>

          {/* 드롭다운 메뉴 */}
          {isOpen && (
            <DropdownMenu>
              {items.map((item) => (
                <DropdownItem
                  key={item}
                  onClick={() => handleSelect(item)}
                  isSelected={selected === item}
                >
                  {descriptions[item]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </div>
      </TitleWrap>
      <EditorWrap>
        <QuillWrapper>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </QuillWrapper>
        <p>
          {text}/{maxLength}
        </p>
      </EditorWrap>
      <WriteEmotion>
        <p>오늘 {userInfo ? userInfo.username : "사용자"} 님의 기분은...</p>
      </WriteEmotion>
      <ButtonWrap>
        <RecordButton $variant="moodCancel" onClick={onClickCancel}>
          취소
        </RecordButton>
        <RecordButton
          $variant="moodSubmit"
          onClick={handleSubmit}
          disabled={text < 1} // 1글자 이상 입력
        >
          {isEdit ? "수정" : "등록"}
        </RecordButton>
      </ButtonWrap>
    </Wrap>
  );
};

export default BoardWrite;
