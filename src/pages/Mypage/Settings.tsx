import { MypageButton } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import styled from "styled-components";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsModalStore } from "@/store/ModalStore";

interface StyledProps {
  $isError?: boolean;
}

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
interface ProfileImageProps {
  changeVisible: boolean;
}
interface PasswordChangeProps {
  infoChangeVisible: boolean;
}

const Layout = styled.div`
  display: flex;
  padding: 40px 80px;

  @media (max-width: 390px) {
    padding: 40px 20px 80px;
  }
`;

const Wrap = styled.div`
  width: 62.375rem;

  @media (max-width: 781px) {
    width: 25.875rem;
  }
  @media (max-width: 390px) {
    width: 20rem;
  }
`;

const MyProfile = styled.div`
  @media (max-width: 390px) {
    h2 {
      font-size: 1.125rem;
      margin-top: 0;
      margin-bottom: 1.25rem;
    }
  }
`;
const ProfileWrap = styled.div`
  width: 62.375rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--main-text);
  padding: 2.5rem 2.5rem 1.875rem 2.5rem;
  span {
    font-size: 1.125rem;
  }

  @media (max-width: 781px) {
    width: 25.875rem;
  }
  @media (max-width: 390px) {
    width: 20rem;
    padding: 1.875rem 1.5rem;
    span {
      font-size: 1rem;
    }
  }
`;
const ProfileBox = styled.div`
  width: 57.375rem;

  @media (max-width: 781px) {
    width: 20.875rem;
    padding-bottom: 1.25rem;
  }
  @media (max-width: 390px) {
    width: 17rem;
  }
`;
const ProfileImage = styled.div<ProfileImageProps>`
  width: 27.5rem;
  display: flex;

  @media (max-width: 781px) {
    width: 20.875rem;
    justify-content: space-between;
  }
  @media (max-width: 390px) {
    width: 17rem;
    justify-content: space-between;
    padding-right: ${(props) =>
      props.changeVisible
        ? "72px"
        : "32px"}; /* Change 태그의 가시성에 따라 padding-left 조정 */
  }
`;
const ImageWrap = styled.div`
  display: flex;

  @media (max-width: 781px) {
    flex-direction: column;
    justify-content: space-between;
    width: 12.125rem;
  }
  @media (max-width: 390px) {
    width: 100px;
  }
`;
const Image = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  background-color: var(--bg-02);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.625rem;
  margin-left: 5rem;

  @media (max-width: 781px) {
    margin-left: 0;
    margin-bottom: 0.75rem;
  }
`;
const Change = styled.div`
  margin-left: 1.25rem;
  span {
    display: block;
    font-size: 1rem;
    color: var(--text-03);
  }
  > button {
    width: 5rem;
    height: 2.5rem;
    font-size: 1.125rem;
    border: 0.0625rem solid var(--main-text);
    border-radius: 0.5rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 781px) {
    margin-left: 0;

    > button {
      float: right;
    }
  }
  @media (max-width: 390px) {
    width: 10.75rem;
  }
`;
const Nickname = styled.div`
  width: 57.375rem;
  height: 2.25rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1.625rem;

  > span {
    width: 5.25rem;
    height: 1.75rem;
  }
  > span:last-child {
    width: 47.125rem;
    font-weight: var(--font-medium);
  }
  > div {
    height: 1.75rem;
  }
  input {
    width: 47.125rem;
    height: 1.75rem;
    padding: 0 1.25rem;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    margin: 0;
  }

  @media (max-width: 781px) {
    width: 20.875rem;
    margin-top: 1.25rem;

    > span:last-child {
      width: 12.125rem;
    }
    > div {
      height: 1.75rem;
    }
    input {
      width: 12.125rem;
      height: 2.25rem;
    }
  }
  @media (max-width: 390px) {
    width: 17rem;
    span:first-child {
      width: 5.25rem;
    }
    span:last-child {
      width: 8.25rem;
      margin-left: 3.5rem;
    }
    input {
      width: 10.75rem;
    }
  }
`;
const Introduce = styled.div`
  width: 57.375rem;
  display: flex;
  margin-top: 1.625rem;
  margin-bottom: 1.25rem;

  > span {
    width: 5.25rem;
    height: 1.75rem;
  }
  > span:last-child {
    padding: 0;
    border: none;
    margin-left: 5rem;
    font-size: 1.125rem;
    width: 47.125rem;
    color: var(--text-03);
  }
  > div > textarea {
    width: 47.125rem;
    margin-left: 5rem;
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
    font-weight: var(--font-regular);

    &::placeholder {
      color: var(--text-03);
    }
  }

  @media (max-width: 781px) {
    width: 20.875rem;
    margin-top: 1.25rem;
    margin-bottom: 0;

    > span:last-child {
      width: 12.125rem;
      padding: 0;
      border: none;
      margin-left: 3.5rem;
      font-size: 1.125rem;
      color: var(--text-03);
    }
    > div {
      width: 12.125rem;
    }
    > div > textarea {
      width: 12.125rem;
      height: 16.125rem;
      margin-left: 3.5rem;
      padding: 0.75rem 1.25rem;
      font-size: 1.125rem;
      border-width: 0.0625rem;
    }
  }
  @media (max-width: 390px) {
    width: 17rem;
    justify-content: space-between;
    span:last-child {
      width: 8.25rem;
      font-size: 1rem;
    }
    > div {
      width: 10.75rem;
    }
    > div > textarea {
      width: 10.75rem;
      margin-left: 0;
      padding: 0.75rem;
      font-size: 1rem;
    }
  }
`;
const SettingButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;

  @media (max-width: 390px) {
    margin-top: 1.25rem;
  }
`;
const SaveCancelButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
`;

// 기본정보
const Info = styled.div`
  margin-top: 5.875rem;

  @media (max-width: 390px) {
    margin-top: 2.5rem;
  }
`;
const InfoWrap = styled.div`
  width: 62.375rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--main-text);
  padding: 2.5rem 2.5rem 1.875rem 2.5rem;
  span {
    font-size: 1.125rem;
  }

  @media (max-width: 781px) {
    width: 25.875rem;
    display: block;
  }
  @media (max-width: 390px) {
    width: 20rem;
    padding: 1.875rem 1.5rem;
    span {
      font-size: 1rem;
    }
  }
`;
const InfoBox = styled.div`
  width: 57.375rem;

  @media (max-width: 781px) {
    width: 20.875rem;
  }
  @media (max-width: 390px) {
    width: 17rem;
  }
`;
const Email = styled.div<PasswordChangeProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  > span {
    width: 5.25rem;
  }
  > span:last-child {
    width: 47.125rem;
    font-weight: var(--font-medium);
    white-space: normal;
    overflow-wrap: break-word;
  }

  @media (max-width: 781px) {
    width: 20.875rem;

    > span:last-child {
      width: 12.125rem;
      height: 3.5rem;
    }
  }
  @media (max-width: 390px) {
    width: 17rem;
    span:nth-child(2) {
      width: ${(props) => (props.infoChangeVisible ? "10.75rem" : "8.25rem")};
    }
  }
`;
const PasswordWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.25rem 0;

  > span {
    width: 5.25rem;
    padding-top: 0.5rem;
  }

  @media (max-width: 781px) {
    width: 20.875rem;
    align-items: unset;
  }
  @media (max-width: 390px) {
    width: 17rem;
  }
`;
const Password = styled.div`
  width: 47.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    height: 1.75rem;
    padding: 0 1.25rem;
    padding-top: 0.5rem;
    font-size: 1.125rem;
    border: none;
    letter-spacing: 0.3125rem;
  }

  @media (max-width: 781px) {
    width: 12.125rem;
    display: block;

    > button {
      float: right;
    }
  }
  @media (max-width: 390px) {
    width: 8.25rem;
    button {
      margin-top: 1.25rem;
    }
  }
`;
const ChangePasswordForm = styled.form<StyledProps>`
  input {
    height: 1.75rem;
    width: 47.125rem;
    padding: 0 1.25rem;
    font-size: 1.125rem;
    border-radius: 0.5rem;
    letter-spacing: 0.3125rem;
    line-height: 1.75rem;

    &::placeholder {
      letter-spacing: 0;
      color: var(--text-03);
    }
  }

  @media (max-width: 781px) {
    width: 12.125rem;

    input {
      width: 12.125rem;
      height: 1.75rem;
      padding: 0 1.25rem;
      font-size: 1.125rem;
      border-radius: 0.5rem;
      letter-spacing: 0.3125rem;

      &::placeholder {
        letter-spacing: 0;
        color: var(--text-03);
      }
    }
  }
  @media (max-width: 390px) {
    width: 10.75rem;
    span {
      font-size: 0.875rem;
    }

    input {
      width: 10.75rem;
      font-size: 1rem;
    }
  }
`;
const InputStyle = styled.input<StyledProps>`
  width: 27.625rem;
  height: 4.25rem;
  border: 0.0625rem solid;
  border-color: ${(props) =>
    props.$isError ? "var(--error-02)" : "var(--text-02)"}; // 에러 시 빨간색
  border-radius: 0.75rem;
  padding-left: 1.125rem;
  font-size: 1.5rem;

  &:focus {
    border-color: ${(props) =>
      props.$isError
        ? "var(--error-02)"
        : "var(--main-orange)"}; // 에러 시 빨간색
  }

  &::placeholder {
    color: ${(props) =>
      props.$isError ? "var(--error-02)" : "var(--text-02)"}; // 에러 시 빨간색
  }
`;
const Error = styled.div<StyledProps>`
  width: 27.625rem;
  /* height:1.75rem; */
  color: var(--error-02);
  display: ${(props) => (props.$isError ? "flex" : "none")}; // 조건부 렌더링
  align-items: center;

  > img {
    width: 1rem;
    height: 1rem;
  }

  > p {
    margin: 0;
    padding-left: 0.5rem;
    padding-top: 0.25rem;
  }

  @media (max-width: 781px) {
    align-items: unset;

    > img {
      margin-top: 0.5rem;
    }
  }
  @media (max-width: 390px) {
    img {
      width: 0.875rem;
      height: 0.875rem;
      margin-top: 0.25rem;
    }
    p {
      font-size: 0.875rem;
      padding-top: 0;
    }
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  margin: 0.625rem 0;

  > img {
    width: 1rem;
    height: 0.725rem;
  }
  > span {
    color: var(--text-03);
    font-size: 1rem;
    margin-left: 0.5rem;
    padding-top: 0.25rem;
  }
  div > span {
    font-size: 1rem;
    color: var(--text-03);
    padding-left: 0.5rem;
  }

  @media (max-width: 781px) {
    align-items: unset;

    > span {
      padding: 0;
    }
    > img {
      margin-top: 0.1875rem;
    }
  }
  @media (max-width: 390px) {
    span {
      font-size: 0.875rem;
    }
    margin: 0.5rem 0 0.25rem;
  }
`;
const InfoButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
`;
const InfoSaveCancelButton = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  /* > button:last-child{
    background-color:var(--disable-button);
    border:none;
    color:var(--text-01);

      &:hover{
      background-color:var(--bg-02);
      color:var(--main-text);
    }
  } */
`;

const MemberShipDelete = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    width: 5.25rem;
  }

  @media (max-width: 781px) {
    align-items: unset;
  }
`;
const DeleteBox = styled.div<PasswordChangeProps>`
  display: flex;
  justify-content: space-between;
  width: 47.125rem;

  span {
    color: var(--text-03);
    display: flex;
    align-items: center;
  }

  @media (max-width: 781px) {
    width: 12.125rem;
    display: block;

    > button {
      float: right;
      margin-top: 1.25rem;
    }
  }
  @media (max-width: 390px) {
    width: ${(props) => (props.infoChangeVisible ? "10.75rem" : "8.25rem")};
    span {
      width: ${(props) => (props.infoChangeVisible ? "10.75rem" : "8.25rem")};
    }
  }
`;

export default function Settings() {
  // 프로필
  const [profileShow, setProfileShow] = useState(false);

  const profileSettingClick = () => {
    setProfileShow((prev) => !prev);
  };
  const profileCancelClick = () => {
    setProfileShow((prev) => !prev);
  };

  // 기본 정보
  const [infoShow, setInfoShow] = useState(false);
  const passwordChange = () => {
    setInfoShow((prev) => !prev);
  };
  const infoCancelClick = () => {
    setInfoShow((prev) => !prev);
  };

  // 비밀번호
  const schema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: "현재 비밀번호를 입력해주세요." }),
      newPassword: z
        .string()
        .min(8, {
          message: "비밀번호는 영문, 숫자 조합의 8자 이상 입력해야합니다.",
        })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
          message: "새 비밀번호는 영문, 숫자 조합의 8자 이상 입력해야합니다.",
        }),
      confirmNewPassword: z.string().min(1, "새 비밀번호 확인을 입력해주세요."),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmNewPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data: FormData) => {
    if (isValid) {
      // setIsModalClick("changePassword");
      console.log(data);
    }
  };

  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  // 비밀번호 변경 모달
  const setIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const ChangePassword = (type?: string) => {
    console.log(type);

    if (type) {
      setIsModalClick(type);
    } else {
      setIsModalClick();
    }
  };

  // 회원탈퇴 모달
  const DeleteId = (type?: string) => {
    console.log(type);

    if (type) {
      setIsModalClick(type);
    } else {
      setIsModalClick();
    }
  };

  return (
    <>
      <Layout>
        <Wrap>
          <MyProfile>
            <h2>내 프로필</h2>
            <ProfileWrap>
              <ProfileBox>
                <ProfileImage changeVisible={profileShow}>
                  <span>프로필 사진</span>
                  <ImageWrap>
                    <Image></Image>
                    {profileShow && (
                      <Change>
                        <span>png, jpg, jpeg의 확장자</span>
                        <span>5MB 이하의 이미지</span>
                        <button>변경</button>
                      </Change>
                    )}
                  </ImageWrap>
                </ProfileImage>
                <Nickname>
                  <span>닉네임</span>
                  {!profileShow ? (
                    <span>포뇨소스케스키</span>
                  ) : (
                    <InputStyle type="text" />
                  )}
                </Nickname>
                <Introduce>
                  <span>자기소개</span>
                  {!profileShow ? (
                    <span>다양한 믿으미들에게 나를 소개해보세요!</span>
                  ) : (
                    <Textarea placeholder="다양한 믿으미들에게 나를 소개해보세요!" />
                  )}
                </Introduce>
              </ProfileBox>
              {!profileShow ? (
                <SettingButton>
                  <MypageButton variant="active" onClick={profileSettingClick}>
                    설정
                  </MypageButton>
                </SettingButton>
              ) : (
                <SaveCancelButton>
                  <MypageButton variant="cancel" onClick={profileCancelClick}>
                    취소
                  </MypageButton>
                  <MypageButton variant="active">저장</MypageButton>
                </SaveCancelButton>
              )}
            </ProfileWrap>
          </MyProfile>
          <Info>
            <h2>기본 정보</h2>
            <InfoWrap>
              <InfoBox>
                <Email infoChangeVisible={infoShow}>
                  <span>이메일</span>
                  <span>pnoyoloveclub@meetsosa.com</span>
                </Email>
                <PasswordWrap>
                  <span>비밀번호</span>
                  {!infoShow ? (
                    <Password>
                      <InputStyle
                        type="password"
                        placeholder="********"
                        disabled
                        style={{ paddingLeft: "0" }}
                      />
                      <MypageButton variant="active" onClick={passwordChange}>
                        변경
                      </MypageButton>
                    </Password>
                  ) : (
                    <ChangePasswordForm onSubmit={handleSubmit(onSubmit)}>
                      <InputStyle
                        type="password"
                        placeholder="현재 비밀번호"
                        {...register("currentPassword")}
                        $isError={!!errors.currentPassword}
                      />
                      <Flex>
                        {!errors.currentPassword ? (
                          <>
                            {/* <img
                              src={InfoCheckImg}
                              alt="비밀번호 체크 이미지"
                            /> */}
                            <span>
                              확인을 위해 현재 비밀번호를 다시 입력해주세요.
                            </span>
                          </>
                        ) : (
                          <Error $isError={!!errors.currentPassword}>
                            {/* <img src={error} alt="에러" /> */}
                            {errors.currentPassword && (
                              <p>{errors.currentPassword.message}</p>
                            )}
                          </Error>
                        )}
                      </Flex>
                      <InputStyle
                        type="password"
                        placeholder="새 비밀번호"
                        {...register("newPassword")}
                        $isError={!!errors.newPassword}
                      />
                      <Flex>
                        {newPassword && confirmNewPassword ? (
                          newPassword === confirmNewPassword ? ( // 두 비밀번호가 일치할 경우
                            <>
                              {/* <img
                                src={OrangeCheck}
                                alt="비밀번호 체크 이미지"
                              /> */}
                              <span style={{ color: "var(--main-orange)" }}>
                                영문, 숫자 조합 8자 이상 입력 (공백 제외)
                              </span>{" "}
                              {/* 일치할 때 색상 변경 */}
                            </>
                          ) : (
                            <Error $isError={!!errors.newPassword}>
                              {/* <img src={error} alt="에러" /> */}
                              {errors.newPassword && (
                                <p>{errors.newPassword.message}</p>
                              )}
                            </Error>
                          )
                        ) : (
                          <>
                            {/* <img
                              src={InfoCheckImg}
                              alt="비밀번호 체크 이미지"
                            /> */}
                            <span>
                              영문, 숫자 조합 8자 이상 입력 (공백 제외)
                            </span>
                          </>
                        )}
                      </Flex>
                      <InputStyle
                        type="password"
                        placeholder="새 비밀번호 확인"
                        {...register("confirmNewPassword")}
                        $isError={!!errors.confirmNewPassword}
                      />
                      <Flex>
                        {newPassword && confirmNewPassword ? (
                          newPassword === confirmNewPassword ? ( // 두 비밀번호가 일치할 경우
                            <>
                              {/* <img
                                src={OrangeCheck}
                                alt="비밀번호 체크 이미지"
                              /> */}
                              <span style={{ color: "var(--main-orange)" }}>
                                새 비밀번호와 일치합니다.
                              </span>{" "}
                              {/* 일치할 때 색상 변경 */}
                            </>
                          ) : (
                            <Error $isError={!!errors.confirmNewPassword}>
                              {/* <img src={error} alt="에러" /> */}
                              {errors.confirmNewPassword && (
                                <p>{errors.confirmNewPassword.message}</p>
                              )}
                            </Error>
                          )
                        ) : (
                          <>
                            {/* <img
                              src={InfoCheckImg}
                              alt="비밀번호 체크 이미지"
                            /> */}
                            <span>
                              확인을 위해 새 비밀번호를 다시 입력해주세요.
                            </span>
                          </>
                        )}
                      </Flex>
                    </ChangePasswordForm>
                  )}
                </PasswordWrap>
                <InfoButton>
                  {infoShow && (
                    <InfoSaveCancelButton>
                      <MypageButton variant="cancel" onClick={infoCancelClick}>
                        취소
                      </MypageButton>
                      <MypageButton
                        variant="active"
                        onClick={() => ChangePassword("changePasswordModal")}
                      >
                        저장
                      </MypageButton>
                    </InfoSaveCancelButton>
                  )}
                </InfoButton>
                <MemberShipDelete>
                  <span>회원 탈퇴</span>
                  <DeleteBox infoChangeVisible={infoShow}>
                    <span>
                      탈퇴 시 작성하신 다이어리 및 무드 트래커가 모두 삭제되며
                      복구되지 않습니다.
                    </span>
                    <MypageButton
                      variant="active"
                      onClick={() => DeleteId("deleteIdModal")}
                    >
                      탈퇴
                    </MypageButton>
                  </DeleteBox>
                </MemberShipDelete>
              </InfoBox>
            </InfoWrap>
          </Info>
        </Wrap>
      </Layout>
    </>
  );
}
