// 테마 세트 이미지
import pastelSet from "../theme/emoji/pastelSet/pastelSet.png";
import vintageSet from "../theme/emoji/vintageSet/vintageSet.png";
import vividSet from "../theme/emoji/vividSet/vividSet.png";
import modernSet from "../theme/emoji/modernSet/modernSet.png";
import orangeSet from "../theme/emoji/orangeSet/orangeSet.png";
import pinkSet from "../theme/emoji/pinkSet/pinkSet.png";
import purpleSet from "../theme/emoji/purpleSet/purpleSet.png";
import greenSet from "../theme/emoji/greenSet/greenSet.png";
import blueSet from "../theme/emoji/blueSet/blueSet.png";
import redSet from "../theme/emoji/redSet/redSet.png";

// 개별 감정별 테마 이미지
// 파스텔
import pastelJoy from "../theme/emoji/pastelSet/pastelhappy.png";
import pastelSad from "../theme/emoji/pastelSet/pastelsad.png";
import pastelAngry from "../theme/emoji/pastelSet/pastelangry.png";
import pastelNormal from "../theme/emoji/pastelSet/pastelnormal.png";
import pastelTired from "../theme/emoji/pastelSet/pasteltired.png";
import pastelHurt from "../theme/emoji/pastelSet/pastelhurt.png";

// 빈티지
import vintageJoy from "../theme/emoji/vintageSet/vintageHappy.png";
import vintageSad from "../theme/emoji/vintageSet/vintageSad.png";
import vintageAngry from "../theme/emoji/vintageSet/vintageAngry.png";
import vintageHurt from "../theme/emoji/vintageSet/vintageHurt.png";
import vintageNormal from "../theme/emoji/vintageSet/vintageNormal.png";
import vintageTired from "../theme/emoji/vintageSet/vintageTired.png";

// 비비드
import vividJoy from "../theme/emoji/vividSet/vividHappy.png";
import vividSad from "../theme/emoji/vividSet/vividSad.png";
import vividAngry from "../theme/emoji/vividSet/vividAngry.png";
import vividHurt from "../theme/emoji/vividSet/vividHurt.png";
import vividNormal from "../theme/emoji/vividSet/vividNormal.png";
import vividTired from "../theme/emoji/vividSet/vividTired.png";

// 모던
import modernJoy from "../theme/emoji/modernSet/modernHappy.png";
import modernSad from "../theme/emoji/modernSet/modernSad.png";
import modernAngry from "../theme/emoji/modernSet/modernAngry.png";
import modernHurt from "../theme/emoji/modernSet/modernHurt.png";
import modernNormal from "../theme/emoji/modernSet/modernNormal.png";
import modernTired from "../theme/emoji/modernSet/modernTired.png";

// 오렌지
import orangeJoy from "../theme/emoji/orangeSet/orangeHappy.png";
import orangeSad from "../theme/emoji/orangeSet/orangeSad.png";
import orangeAngry from "../theme/emoji/orangeSet/orangeAngry.png";
import orangeHurt from "../theme/emoji/orangeSet/orangeHurt.png";
import orangeNormal from "../theme/emoji/orangeSet/orangeNormal.png";
import orangeTired from "../theme/emoji/orangeSet/orangeTired.png";

// 핑크
import pinkJoy from "../theme/emoji/pinkSet/pinkHappy.png";
import pinkSad from "../theme/emoji/pinkSet/pinkSad.png";
import pinkAngry from "../theme/emoji/pinkSet/pinkAngry.png";
import pinkHurt from "../theme/emoji/pinkSet/pinkHurt.png";
import pinkNormal from "../theme/emoji/pinkSet/pinkNormal.png";
import pinkTired from "../theme/emoji/pinkSet/pinkTired.png";

// 퍼플
import purpleJoy from "../theme/emoji/purpleSet/purpleHappy.png";
import purpleSad from "../theme/emoji/purpleSet/purpleSad.png";
import purpleAngry from "../theme/emoji/purpleSet/purpleAngry.png";
import purpleHurt from "../theme/emoji/purpleSet/purpleHurt.png";
import purpleNormal from "../theme/emoji/purpleSet/purpleNormal.png";
import purpleTired from "../theme/emoji/purpleSet/purpleTired.png";

// 그린
import greenJoy from "../theme/emoji/greenSet/greenHappy.png";
import greenSad from "../theme/emoji/greenSet/greenSad.png";
import greenAngry from "../theme/emoji/greenSet/greenAngry.png";
import greenHurt from "../theme/emoji/greenSet/greenHurt.png";
import greenNormal from "../theme/emoji/greenSet/greenNormal.png";
import greenTired from "../theme/emoji/greenSet/greenTired.png";

// 블루
import blueJoy from "../theme/emoji/blueSet/blueHappy.png";
import blueSad from "../theme/emoji/blueSet/blueSad.png";
import blueAngry from "../theme/emoji/blueSet/blueAngry.png";
import blueHurt from "../theme/emoji/blueSet/blueHurt.png";
import blueNormal from "../theme/emoji/blueSet/blueNormal.png";
import blueTired from "../theme/emoji/blueSet/blueTired.png";

// 레드
import redJoy from "../theme/emoji/redSet/redHappy.png";
import redSad from "../theme/emoji/redSet/redSad.png";
import redAngry from "../theme/emoji/redSet/redAngry.png";
import redHurt from "../theme/emoji/redSet/redHurt.png";
import redNormal from "../theme/emoji/redSet/redNormal.png";
import redTired from "../theme/emoji/redSet/redTired.png";

// 테마별 세트 이미지 매핑
export const themeSetImageMap: { [key: string]: string } = {
  "파스텔 팝콘 세트": pastelSet,
  "빈티지 팝콘 세트": vintageSet,
  "비비드 팝콘 세트": vividSet,
  "모던 팝콘 세트": modernSet,
  "오렌지 팝콘 세트": orangeSet,
  "핑크 팝콘 세트": pinkSet,
  "퍼플 팝콘 세트": purpleSet,
  "그린 팝콘 세트": greenSet,
  "블루 팝콘 세트": blueSet,
  "레드 팝콘 세트": redSet,
};

// 감정별 개별 테마 이미지 매핑
export const moodIconMap: { [key: string]: { [key: string]: string } } = {
  "파스텔 팝콘 세트": {
    joy: pastelJoy,
    sad: pastelSad,
    angry: pastelAngry,
    tired: pastelTired,
    normal: pastelNormal,
    hurt: pastelHurt,
  },
  "빈티지 팝콘 세트": {
    joy: vintageJoy,
    sad: vintageSad,
    angry: vintageAngry,
    tired: vintageTired,
    normal: vintageNormal,
    hurt: vintageHurt,
  },
  "비비드 팝콘 세트": {
    joy: vividJoy,
    sad: vividSad,
    angry: vividAngry,
    tired: vividTired,
    normal: vividNormal,
    hurt: vividHurt,
  },
  "모던 팝콘 세트": {
    joy: modernJoy,
    sad: modernSad,
    angry: modernAngry,
    tired: modernTired,
    normal: modernNormal,
    hurt: modernHurt,
  },
  "오렌지 팝콘 세트": {
    joy: orangeJoy,
    sad: orangeSad,
    angry: orangeAngry,
    tired: orangeTired,
    normal: orangeNormal,
    hurt: orangeHurt,
  },
  "핑크 팝콘 세트": {
    joy: pinkJoy,
    sad: pinkSad,
    angry: pinkAngry,
    tired: pinkTired,
    normal: pinkNormal,
    hurt: pinkHurt,
  },
  "퍼플 팝콘 세트": {
    joy: purpleJoy,
    sad: purpleSad,
    angry: purpleAngry,
    tired: purpleTired,
    normal: purpleNormal,
    hurt: purpleHurt,
  },
  "그린 팝콘 세트": {
    joy: greenJoy,
    sad: greenSad,
    angry: greenAngry,
    tired: greenTired,
    normal: greenNormal,
    hurt: greenHurt,
  },
  "블루 팝콘 세트": {
    joy: blueJoy,
    sad: blueSad,
    angry: blueAngry,
    tired: blueTired,
    normal: blueNormal,
    hurt: blueHurt,
  },
  "레드 팝콘 세트": {
    joy: redJoy,
    sad: redSad,
    angry: redAngry,
    tired: redTired,
    normal: redNormal,
    hurt: redHurt,
  },
};
