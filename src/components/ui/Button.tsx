import styled from "styled-components";

const FriendButtonStyle = {
  follow: {
    default: {
      width: "128px",
      height: "56px",
      border: "1px solid var(--main-text)",
      borderRadius: "16px",
      color: "var(--search-placeholder)",
      fontSize: "20px",
    },
    tablet: {
      width: "114px",
      height: "56px",
      border: "1px solid var(--main-text)",
      borderRadius: "16px",
      color: "var(--search-placeholder)",
      fontSize: "20px",
    },
    mobile: {
      width: "72px",
      height: "40px",
      border: "1px solid var(--main-text)",
      borderRadius: "12px",
      color: "var(--search-placeholder)",
      fontSize: "14px",
    },
  },
  unfollow: {
    default: {
      width: "128px",
      height: "56px",
      border: "1px solid var(--main-orange)",
      borderRadius: "16px",
      color: "var(--unfollow-text)",
      fontSize: "20px",
    },
    tablet: {
      width: "114px",
      height: "56px",
      border: "1px solid var(--main-orange)",
      borderRadius: "16px",
      color: "var(--unfollow-text)",
      fontSize: "20px",
    },
    mobile: {
      width: "72px",
      height: "40px",
      border: "1px solid var(--main-orange)",
      borderRadius: "12px",
      color: "var(--unfollow-text)",
      fontSize: "14px",
    },
  },
  diaryFollow: {
    default: {
      width: "128px",
      height: "56px",
      border: "1px solid var(--main-text)",
      borderRadius: "10px",
      color: "var(--search-placeholder)",
      fontSize: "20px",
    },
    tablet: {
      width: "128px",
      height: "56px",
      border: "1px solid var(--main-text)",
      borderRadius: "10px",
      color: "var(--search-placeholder)",
      fontSize: "20px",
    },
    mobile: {
      width: "86px",
      height: "44px",
      border: "1px solid var(--main-text)",
      borderRadius: "10px",
      color: "var(--search-placeholder)",
      fontSize: "14px",
    },
  },
  diaryUnfollow: {
    default: {
      width: "128px",
      height: "56px",
      border: "1px solid var(--main-orange)",
      borderRadius: "10px",
      color: "var(--unfollow-text)",
      fontSize: "20px",
    },
    tablet: {
      width: "128px",
      height: "56px",
      border: "1px solid var(--main-orange)",
      borderRadius: "10px",
      color: "var(--unfollow-text)",
      fontSize: "20px",
    },
    mobile: {
      width: "86px",
      height: "44px",
      border: "1px solid var(--main-orange)",
      borderRadius: "10px",
      color: "var(--unfollow-text)",
      fontSize: "14px",
    },
  },
  modalFollow: {
    default: {
      width: "100px",
      height: "52px",
      border: "1px solid var(--main-text)",
      borderRadius: "12px",
      color: "var(--search-placeholder)",
      fontSize: "18px",
    },
    tablet: {
      width: "100px",
      height: "52px",
      border: "1px solid var(--main-text)",
      borderRadius: "12px",
      color: "var(--search-placeholder)",
      fontSize: "18px",
    },
    mobile: {
      width: "98px",
      height: "44px",
      border: "1px solid var(--main-text)",
      borderRadius: "10px",
      color: "var(--search-placeholder)",
      fontSize: "16px",
    },
  },
  modalUnfollow: {
    default: {
      width: "100px",
      height: "52px",
      border: "1px solid var(--main-orange)",
      borderRadius: "12px",
      color: "var(--unfollow-text)",
      fontSize: "18px",
    },
    tablet: {
      width: "100px",
      height: "52px",
      border: "1px solid var(--main-orange)",
      borderRadius: "12px",
      color: "var(--unfollow-text)",
      fontSize: "18px",
    },
    mobile: {
      width: "98px",
      height: "44px",
      border: "1px solid var(--main-orange)",
      borderRadius: "10px",
      color: "var(--unfollow-text)",
      fontSize: "16px",
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

  @media (max-width: 360px) {
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
  width: 128px;
  height: 56px;
  border-radius: 16px;
  background-color: var(--orange-button);
  color: var(--white);
  font-size: 20px;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    width: 110px;
    height: 48px;
    border-radius: 16px;
    font-size: 20px;
  }

  @media (max-width: 360px) {
    width: 98px;
    height: 44px;
    border-radius: 12px;
    font-size: 16px;
  }
`;

const RecordButtonStyle = {
  moodCancel: {
    default: {
      width: "128px",
      height: "56px",
      borderRadius: "16px",
      fontSize: "20px",
      backgroundColor: "var(--line-basic)",
    },
    tablet: {
      width: "110px",
      height: "52px",
      borderRadius: "16px",
      fontSize: "20px",
    },
    mobile: {
      width: "80px",
      height: "44px",
      borderRadius: "12px",
      fontSize: "16px",
    },
  },
  moodSubmit: {
    default: {
      width: "128px",
      height: "56px",
      borderRadius: "16px",
      fontSize: "20px",
      backgroundColor: "var(--submit-button)",
    },
    tablet: {
      width: "110px",
      height: "52px",
      borderRadius: "16px",
      fontSize: "20px",
    },
    mobile: {
      width: "80px",
      height: "44px",
      borderRadius: "12px",
      fontSize: "16px",
    },
  },
  diaryCancel: {
    default: {
      width: "128px",
      height: "56px",
      borderRadius: "16px",
      fontSize: "20px",
      backgroundColor: "var(--line-basic)",
    },
    tablet: {
      width: "128px",
      height: "56px",
      borderRadius: "16px",
      fontSize: "20px",
    },
    mobile: {
      width: "112px",
      height: "48px",
      borderRadius: "14px",
      fontSize: "16px",
    },
  },
  diarySubmit: {
    default: {
      width: "128px",
      height: "56px",
      borderRadius: "16px",
      fontSize: "20px",
      backgroundColor: "var(--submit-button)",
    },
    tablet: {
      width: "128px",
      height: "56px",
      borderRadius: "16px",
      fontSize: "20px",
    },
    mobile: {
      width: "112px",
      height: "48px",
      borderRadius: "14px",
      fontSize: "16px",
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

  @media (max-width: 360px) {
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
      width: "442px",
      height: "68px",
      borderRadius: "12px",
      fontSize: "24px",
    },
    mobile: {
      width: "280px",
      height: "56px",
      borderRadius: "12px",
      fontSize: "18px",
    },
  },
  mailSend: {
    default: {
      width: "174px",
      height: "56px",
      borderRadius: "12px",
      fontSize: "24px",
    },
    mobile: {
      width: "132px",
      height: "48px",
      borderRadius: "10px",
      fontSize: "16px",
    },
  },
  confirm: {
    default: {
      width: "122px",
      height: "48px",
      borderRadius: "10px",
      fontSize: "20px",
    },
    mobile: {
      width: "100px",
      height: "44px",
      borderRadius: "10px",
      fontSize: "18px",
    },
  },
  signupToLogin: {
    default: {
      width: "162px",
      height: "68px",
      borderRadius: "12px",
      fontSize: "24px",
    },
    mobile: {
      width: "120px",
      height: "56px",
      borderRadius: "12px",
      fontSize: "18px",
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

  @media (max-width: 360px) {
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
  width: 116px;
  height: 52px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.variant === "delete" ? "var(--line-basic)" : "var(--orange-button)"};
  color: var(--white);
  text-align: center;
  font-size: 18px;
  font-weight: var(--font-semibold);

  @media (max-width: 360px) {
    width: 104px;
    height: 48px;
    border-radius: 10px;
    font-size: 16px;
  }
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 116px;
  height: 52px;
  border-radius: 10px;
  background-color: var(--comment-button);
  color: var(--white);
  text-align: center;
  font-size: 18px;
  font-weight: var(--font-semibold);

  @media (max-width: 360px) {
    width: 86px;
    height: 42px;
    border-radius: 8px;
    font-size: 14px;
  }
`;

export const ReplyButton = styled.button<{
  variant: "cancel" | "comment";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94px;
  height: 42px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.variant === "cancel" ? "none" : "var(--comment-button)"};
  color: ${(props) =>
    props.variant === "cancel" ? "var(--comment-button)" : "var(--white)"};
  font-size: 16px;
  font-weight: var(--font-semibold);

  @media (max-width: 360px) {
    width: 86px;
    height: 42px;
    border-radius: 8px;
    font-size: 14px;
  }
`;

export const DiarySettingButton = styled.button<{
  variant: "delete" | "bookmark";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.variant === "delete" ? "124px" : "150px")};
  height: 60px;
  border-radius: 10px;
  background-color: var(--orange-button);
  color: var(--white);
  text-align: center;
  font-size: 24px;
  font-weight: var(--font-semibold);

  @media (max-width: 781px) {
    width: 124px;
    height: 60px;
    font-size: 20px;
  }

  @media (max-width: 360px) {
    width: 96px;
    height: 44px;
    font-size: 16px;
  }
`;

const ProfileButtonStyle = {
  friend: {
    default: {
      width: "140px",
      height: "48px",
      borderRadius: "10px",
      fontSize: "20px",
    },
    mobile: {
      width: "64px",
      height: "30px",
      borderRadius: "6px",
      fontSize: "10px",
    },
  },
  diary: {
    default: {
      width: "174px",
      height: "48px",
      borderRadius: "10px",
      fontSize: "20px",
    },

    mobile: {
      width: "84px",
      height: "30px",
      borderRadius: "6px",
      fontSize: "10px",
    },
  },
  mood: {
    default: {
      width: "138px",
      height: "48px",
      borderRadius: "10px",
      fontSize: "20px",
    },
    mobile: {
      width: "64px",
      height: "30px",
      borderRadius: "6px",
      fontSize: "10px",
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

  @media (max-width: 360px) {
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
  width: 80px;
  height: 40px;
  border: ${(props) =>
    props.disabled
      ? "none"
      : `1px solid ${props.variant === "active" ? "var(--main-text)" : "none"}`};
  border-radius: 8px;
  background-color: ${(props) =>
    props.disabled ? "var(--disable-button)" : "var(--white)"};
  color: ${(props) => (props.disabled ? "var(--text-01)" : "var(--main-text)")};
  font-size: 18px;
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

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

const OrangeLineButtonStyle = {
  theme: {
    default: {
      width: "114px",
      height: "44px",
      borderRadius: "8px",
      fontSize: "20px",
      fontWeight: "var(--font-medium)",
    },
    mobile: {
      width: "98px",
      height: "44px",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "var(--font-medium)",
    },
  },
  moveToHome: {
    default: {
      width: "162px",
      height: "68px",
      borderRadius: "12px",
      fontSize: "24px",
      fontWeight: "var(--font-semibold)",
    },
    mobile: {
      width: "120px",
      height: "56px",
      borderRadius: "12px",
      fontSize: "24px",
      fontWeight: "var(--font-semibold)",
    },
  },
  modal: {
    default: {
      width: "122px",
      height: "48px",
      borderRadius: "10px",
      fontSize: "20px",
      fontWeight: "var(--font-semibold)",
    },
    mobile: {
      width: "100px",
      height: "44px",
      borderRadius: "10px",
      fontSize: "18px",
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

  @media (max-width: 360px) {
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
  width: 112px;
  height: 48px;
  border: 1px solid var(--main-text);
  border-radius: 10px;
  background-color: ${(props) =>
    props.isClicked
      ? FriendTabButtonStyle.unclicked.backgroundColor
      : FriendTabButtonStyle.clicked.backgroundColor};
  color: ${(props) =>
    props.isClicked
      ? FriendTabButtonStyle.unclicked.color
      : FriendTabButtonStyle.clicked.color};
  font-size: 20px;
  font-weight: var(--font-semibold);

  @media (max-width: 360px) {
    font-size: 18px;
  }
`;
