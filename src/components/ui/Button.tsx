import styled from "styled-components";

const FriendButtonStyle = {
  follow: {
    default: {
      width: "8rem",
      height: "3.5rem",
      border: "1px solid var(--main-text)",
      borderRadius: "1rem",
      color: "var(--search-placeholder)",
      fontSize: "1.25rem",
    },
    tablet: {
      width: "7.125rem",
      height: "3.5rem",
      border: "1px solid var(--main-text)",
      borderRadius: "1rem",
      color: "var(--search-placeholder)",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "4.5rem",
      height: "2.5rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.75rem",
      color: "var(--search-placeholder)",
      fontSize: "0.875rem",
    },
  },
  unfollow: {
    default: {
      width: "8rem",
      height: "3.5rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "1rem",
      color: "var(--unfollow-text)",
      fontSize: "1.25rem",
    },
    tablet: {
      width: "7.125rem",
      height: "3.5rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "1rem",
      color: "var(--unfollow-text)",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "4.5rem",
      height: "2.5rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.75rem",
      color: "var(--unfollow-text)",
      fontSize: "0.875rem",
    },
  },
  diaryFollow: {
    default: {
      width: "6.25rem",
      height: "3.5rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.625rem",
      color: "var(--search-placeholder)",
      fontSize: "1.25rem",
    },
    tablet: {
      width: "6.25rem",
      height: "3.5rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.625rem",
      color: "var(--search-placeholder)",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "6.125rem",
      height: "2.75rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.625rem",
      color: "var(--search-placeholder)",
      fontSize: "1rem",
    },
  },
  diaryUnfollow: {
    default: {
      width: "6.25rem",
      height: "3.5rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.625rem",
      color: "var(--unfollow-text)",
      fontSize: "1.25rem",
    },
    tablet: {
      width: "6.25rem",
      height: "3.5rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.625rem",
      color: "var(--unfollow-text)",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "6.125rem",
      height: "2.75rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.625rem",
      color: "var(--unfollow-text)",
      fontSize: "1rem",
    },
  },
  modalFollow: {
    default: {
      width: "6.25rem",
      height: "3.25rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.75rem",
      color: "var(--search-placeholder)",
      fontSize: "1.125rem",
    },
    tablet: {
      width: "6.25rem",
      height: "3.25rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.75rem",
      color: "var(--search-placeholder)",
      fontSize: "1.125rem",
    },
    mobile: {
      width: "6.125rem",
      height: "2.75rem",
      border: "1px solid var(--main-text)",
      borderRadius: "0.625rem",
      color: "var(--search-placeholder)",
      fontSize: "1rem",
    },
  },
  modalUnfollow: {
    default: {
      width: "6.25rem",
      height: "3.25rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.75rem",
      color: "var(--unfollow-text)",
      fontSize: "1.125rem",
    },
    tablet: {
      width: "6.25rem",
      height: "3.25rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.75rem",
      color: "var(--unfollow-text)",
      fontSize: "1.125rem",
    },
    mobile: {
      width: "6.125rem",
      height: "2.75rem",
      border: "1px solid var(--main-orange)",
      borderRadius: "0.625rem",
      color: "var(--unfollow-text)",
      fontSize: "1rem",
    },
  },
};

export const FriendButton = styled.button<{
  variant:
    | "follow"
    | "unfollow"
    | "diaryFollow"
    | "diaryUnfollow"
    | "modalFollow"
    | "modalUnfollow";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => FriendButtonStyle[props.variant].default.width};
  height: ${(props) => FriendButtonStyle[props.variant].default.height};
  background-color: none;
  border: ${(props) => FriendButtonStyle[props.variant].default.border};
  border-radius: ${(props) =>
    FriendButtonStyle[props.variant].default.borderRadius};
  color: ${(props) => FriendButtonStyle[props.variant].default.color};
  text-align: center;
  font-size: ${(props) => FriendButtonStyle[props.variant].default.fontSize};
  font-weight: var(--font-semibold);

  &:hover {
    background-color: ${({ variant }) => {
      if (
        variant === "follow" ||
        variant === "diaryFollow" ||
        variant === "modalFollow"
      ) {
        return "var(--hover-green)";
      }
      if (
        variant === "unfollow" ||
        variant === "diaryUnfollow" ||
        variant === "modalUnfollow"
      ) {
        return "var(--hover-orange)";
      }
    }};
  }

  @media (max-width: 781px) {
    width: ${(props) => FriendButtonStyle[props.variant].tablet.width};
    height: ${(props) => FriendButtonStyle[props.variant].tablet.height};
    border-radius: ${(props) =>
      FriendButtonStyle[props.variant].tablet.borderRadius};
    font-size: ${(props) => FriendButtonStyle[props.variant].tablet.fontSize};
  }

  @media (max-width: 390px) {
    width: ${(props) => FriendButtonStyle[props.variant].mobile.width};
    height: ${(props) => FriendButtonStyle[props.variant].mobile.height};
    border-radius: ${(props) =>
      FriendButtonStyle[props.variant].mobile.borderRadius};
    font-size: ${(props) => FriendButtonStyle[props.variant].mobile.fontSize};
  }
`;

export const PointConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 3.5rem;
  border-radius: 1rem;
  background-color: var(--orange-button);
  color: var(--white);
  font-size: 1.25rem;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    width: 6.875rem;
    height: 3rem;
    border-radius: 1rem;
    font-size: 1.25rem;
  }

  @media (max-width: 390px) {
    width: 6.125rem;
    height: 2.75rem;
    border-radius: 0.75rem;
    font-size: 1rem;
  }
`;

const RecordButtonStyle = {
  moodCancel: {
    default: {
      width: "8rem",
      height: "3.5rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
      backgroundColor: "var(--line-basic)",
    },
    tablet: {
      width: "6.875rem",
      height: "3.25rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "5rem",
      height: "2.75rem",
      borderRadius: "0.75rem",
      fontSize: "1rem",
    },
  },
  moodSubmit: {
    default: {
      width: "8rem",
      height: "3.5rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
      backgroundColor: "var(--submit-button)",
    },
    tablet: {
      width: "6.875rem",
      height: "3.25rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "5rem",
      height: "2.75rem",
      borderRadius: "0.75rem",
      fontSize: "1rem",
    },
  },
  diaryCancel: {
    default: {
      width: "8rem",
      height: "3.5rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
      backgroundColor: "var(--line-basic)",
    },
    tablet: {
      width: "8rem",
      height: "3.5rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "7rem",
      height: "3rem",
      borderRadius: "0.875rem",
      fontSize: "1rem",
    },
  },
  diarySubmit: {
    default: {
      width: "8rem",
      height: "3.5rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
      backgroundColor: "var(--submit-button)",
    },
    tablet: {
      width: "8rem",
      height: "3.5rem",
      borderRadius: "1rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "7rem",
      height: "3rem",
      borderRadius: "0.875rem",
      fontSize: "1rem",
    },
  },
};

export const RecordButton = styled.button<{
  variant: "moodCancel" | "moodSubmit" | "diaryCancel" | "diarySubmit";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => RecordButtonStyle[props.variant].default.width};
  height: ${(props) => RecordButtonStyle[props.variant].default.height};
  border-radius: ${(props) =>
    RecordButtonStyle[props.variant].default.borderRadius};
  background-color: ${(props) =>
    RecordButtonStyle[props.variant].default.backgroundColor};
  color: var(--white);
  text-align: center;
  font-size: ${(props) => RecordButtonStyle[props.variant].default.fontSize};
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    width: ${(props) => RecordButtonStyle[props.variant].tablet.width};
    height: ${(props) => RecordButtonStyle[props.variant].tablet.height};
    border-radius: ${(props) =>
      RecordButtonStyle[props.variant].tablet.borderRadius};
    font-size: ${(props) => RecordButtonStyle[props.variant].tablet.fontSize};
  }

  @media (max-width: 390px) {
    width: ${(props) => RecordButtonStyle[props.variant].mobile.width};
    height: ${(props) => RecordButtonStyle[props.variant].mobile.height};
    border-radius: ${(props) =>
      RecordButtonStyle[props.variant].mobile.borderRadius};
    font-size: ${(props) => RecordButtonStyle[props.variant].mobile.fontSize};
  }
`;

const OrangeButtonStyle = {
  membership: {
    default: {
      width: "27.625rem",
      height: "4.25rem",
      borderRadius: "0.75rem",
      fontSize: "1.5rem",
    },
    mobile: {
      width: "17.5rem",
      height: "3.5rem",
      borderRadius: "0.75rem",
      fontSize: "1.125rem",
    },
  },
  mailSend: {
    default: {
      width: "10.875rem",
      height: "3.5rem",
      borderRadius: "0.75rem",
      fontSize: "1.5rem",
    },
    mobile: {
      width: "8.25rem",
      height: "3rem",
      borderRadius: "0.625rem",
      fontSize: "1rem",
    },
  },
  confirm: {
    default: {
      width: "7.625rem",
      height: "3rem",
      borderRadius: "0.625rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "6.25rem",
      height: "2.75rem",
      borderRadius: "0.625rem",
      fontSize: "1.125rem",
    },
  },
  signupToLogin: {
    default: {
      width: "10.125rem",
      height: "4.25rem",
      borderRadius: "0.75rem",
      fontSize: "1.5rem",
    },
    mobile: {
      width: "7.5rem",
      height: "3.5rem",
      borderRadius: "0.75rem",
      fontSize: "1.125rem",
    },
  },
};

export const OrangeButton = styled.button<{
  variant: "membership" | "mailSend" | "confirm" | "signupToLogin";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => OrangeButtonStyle[props.variant].default.width};
  height: ${(props) => OrangeButtonStyle[props.variant].default.height};
  border-radius: ${(props) =>
    OrangeButtonStyle[props.variant].default.borderRadius};
  background-color: var(--main-orange);
  color: var(--white);
  text-align: center;
  font-size: ${(props) => OrangeButtonStyle[props.variant].default.fontSize};
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    width: ${(props) => OrangeButtonStyle[props.variant].mobile.width};
    height: ${(props) => OrangeButtonStyle[props.variant].mobile.height};
    border-radius: ${(props) =>
      OrangeButtonStyle[props.variant].mobile.borderRadius};
    font-size: ${(props) => OrangeButtonStyle[props.variant].mobile.fontSize};
  }
`;

export const DiaryButton = styled.button<{ variant: "delete" | "modify" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.25rem;
  height: 3.25rem;
  border-radius: 0.625rem;
  background-color: ${(props) =>
    props.variant === "delete" ? "var(--line-basic)" : "var(--orange-button)"};
  color: var(--white);
  text-align: center;
  font-size: 1.125rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    width: 6.5rem;
    height: 3rem;
    border-radius: 0.625rem;
    font-size: 1rem;
  }
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.25rem;
  height: 3.25rem;
  border-radius: 0.625rem;
  background-color: var(--comment-button);
  color: var(--white);
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

export const ReplyButton = styled.button<{
  variant: "cancel" | "comment";
}>`
  display: flex;
  align-items: center;
  width: 5.875rem;
  height: 2.625rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.variant === "cancel" ? "none" : "var(--comment-button)"};
  color: ${(props) =>
    props.variant === "cancel" ? "var(--comment-button)" : "var(--white)"};
  font-size: 1rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    width: 5.375rem;
    height: 2.625rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }
`;

export const DiarySettingButton = styled.button<{
  variant: "delete" | "bookmark";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.variant === "delete" ? "7.75rem" : "9.375rem")};
  height: 3.75rem;
  border-radius: 0.625rem;
  background-color: var(--orange-button);
  color: var(--white);
  text-align: center;
  font-size: 1.5rem;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    width: 7.75rem;
    height: 3.75rem;
    font-size: 1.25rem;
  }

  @media (max-width: 390px) {
    width: 6rem;
    height: 2.75rem;
    font-size: 1rem;
  }
`;

const ProfileButtonStyle = {
  friend: {
    default: {
      width: "8.75rem",
      height: "3rem",
      borderRadius: "0.625rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "4rem",
      height: "1.875rem",
      borderRadius: "0.375rem",
      fontSize: "0.625rem",
    },
  },
  diary: {
    default: {
      width: "10.875rem",
      height: "3rem",
      borderRadius: "0.625rem",
      fontSize: "1.25rem",
    },

    mobile: {
      width: "5.25rem",
      height: "1.875rem",
      borderRadius: "0.375rem",
      fontSize: "0.625rem",
    },
  },
  mood: {
    default: {
      width: "8.625rem",
      height: "3rem",
      borderRadius: "0.625rem",
      fontSize: "1.25rem",
    },
    mobile: {
      width: "4rem",
      height: "1.875rem",
      borderRadius: "0.375rem",
      fontSize: "0.625rem",
    },
  },
};

export const ProfileButton = styled.button<{
  variant: "friend" | "diary" | "mood";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => ProfileButtonStyle[props.variant].default.width};
  height: ${(props) => ProfileButtonStyle[props.variant].default.height};
  border-radius: ${(props) =>
    ProfileButtonStyle[props.variant].default.borderRadius};
  background-color: var(--bg-02);
  color: var(--main-text);
  font-size: ${(props) => ProfileButtonStyle[props.variant].default.fontSize};
  font-weight: var(--font-medium);

  &:hover {
    background-color: var(--hover-orange);
  }

  @media (max-width: 390px) {
    width: ${(props) => ProfileButtonStyle[props.variant].mobile.width};
    height: ${(props) => ProfileButtonStyle[props.variant].mobile.height};
    border-radius: ${(props) =>
      ProfileButtonStyle[props.variant].mobile.borderRadius};
    font-size: ${(props) => ProfileButtonStyle[props.variant].mobile.fontSize};
  }
`;

export const MypageButton = styled.button<{
  variant: "cancel" | "active";
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 2.5rem;
  border: ${(props) =>
    props.disabled
      ? "none"
      : `1px solid ${props.variant === "active" ? "var(--main-text)" : "none"}`};
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.disabled ? "var(--disable-button)" : "var(--white)"};
  color: ${(props) => (props.disabled ? "var(--text-01)" : "var(--main-text)")};
  font-size: 1.125rem;
  font-weight: var(--font-medium);
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => {
      if (props.disabled) {
        return "var(--disable-button)"; // Disabled 상태에서는 hover 효과 제거
      }
      return props.variant === "active"
        ? "var(--bg-02)" // Active일 때 hover 배경색
        : "var(--bg-02)"; // Cancel일 때 hover 배경색
    }};
  }

  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const OrangeLineButtonStyle = {
  theme: {
    default: {
      width: "7.125rem",
      height: "2.75rem",
      borderRadius: "0.5rem",
      fontSize: "1.25rem",
      fontWeight: "var(--font-medium)",
    },
    mobile: {
      width: "6.125rem",
      height: "2.75rem",
      borderRadius: "0.5rem",
      fontSize: "1.125rem",
      fontWeight: "var(--font-medium)",
    },
  },
  moveToHome: {
    default: {
      width: "10.125rem",
      height: "4.25rem",
      borderRadius: "0.75rem",
      fontSize: "1.5rem",
      fontWeight: "var(--font-semibold)",
    },
    mobile: {
      width: "7.5rem",
      height: "3.5rem",
      borderRadius: "0.75rem",
      fontSize: "1.5rem",
      fontWeight: "var(--font-semibold)",
    },
  },
  modal: {
    default: {
      width: "7.625rem",
      height: "3rem",
      borderRadius: "0.625rem",
      fontSize: "1.25rem",
      fontWeight: "var(--font-semibold)",
    },
    mobile: {
      width: "6.25rem",
      height: "2.75rem",
      borderRadius: "0.625rem",
      fontSize: "1.125rem",
      fontWeight: "var(--font-semibold)",
    },
  },
};

export const OrangeLineButton = styled.button<{
  variant: "theme" | "moveToHome" | "modal";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => OrangeLineButtonStyle[props.variant].default.width};
  height: ${(props) => OrangeLineButtonStyle[props.variant].default.height};
  border: 1px solid var(--main-orange);
  border-radius: ${(props) =>
    OrangeLineButtonStyle[props.variant].default.borderRadius};
  background-color: var(--white);
  color: var(--main-text);
  font-size: ${(props) =>
    OrangeLineButtonStyle[props.variant].default.fontSize};
  font-weight: ${(props) =>
    OrangeLineButtonStyle[props.variant].default.fontWeight};

  &:hover {
    background-color: var(--hover-orange);
  }

  @media (max-width: 390px) {
    width: ${(props) => OrangeLineButtonStyle[props.variant].mobile.width};
    height: ${(props) => OrangeLineButtonStyle[props.variant].mobile.height};
    border-radius: ${(props) =>
      OrangeLineButtonStyle[props.variant].mobile.borderRadius};
    font-size: ${(props) =>
      OrangeLineButtonStyle[props.variant].mobile.fontSize};
    font-weight: ${(props) =>
      OrangeLineButtonStyle[props.variant].mobile.fontWeight};
  }
`;

const FriendTabButtonStyle = {
  unclicked: {
    backgroundColor: "none",
    color: "var(--main-text)",
  },
  clicked: {
    backgroundColor: "var(--orange-button)",
    color: "var(--white)",
  },
};

export const FriendTabButton = styled.button<{
  variant: "unclicked" | "clicked";
  isClicked: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 3rem;
  border: 1px solid var(--main-text);
  border-radius: 0.625rem;
  background-color: ${(props) =>
    props.isClicked
      ? FriendTabButtonStyle.unclicked.backgroundColor
      : FriendTabButtonStyle.clicked.backgroundColor};
  color: ${(props) =>
    props.isClicked
      ? FriendTabButtonStyle.unclicked.color
      : FriendTabButtonStyle.clicked.color};
  font-size: 1.25rem;
  font-weight: var(--font-semibold);

  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

export const FeedButton = styled.button<{
  isClicked: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.875rem;
  height: 2.875rem;
  border: 1px solid var(--main-text);
  border-radius: 1rem;
  color: var(--main-text);
  font-size: 1.125rem;
  font-weight: var(--font-medium);
  background-color: ${(props) => (props.isClicked ? "" : "var(--bg-02)")};

  @media (max-width: 390px) {
    width: 3.5rem;
    height: 2.25rem;
    border-radius: 0.75rem;
    font-size: 0.75rem;
  }
`;
