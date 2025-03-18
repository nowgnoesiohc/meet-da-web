export const themeFonts: Record<string, string> = {
  세종글꽃: "'SejongGeulggot', sans-serif",
  KOROAD: "'KOROAD_Medium', sans-serif",
  "G마켓 산스": "'GmarketSansTTFMedium', sans-serif",
  "한컴 말랑말랑": "'Hancom MalangMalang', sans-serif",
  이서윤체: "'LeeSeoyun', sans-serif",
  페이퍼로지: "'Paperlogy', sans-serif",
  머니그라피: "'Moneygraphy', sans-serif",
  한컴: "'Ulju', sans-serif",
};

export const fontFiles: Record<string, string> = {
  세종글꽃: "../../fonts/SejongGeulggot.ttf",
  KOROAD: "../../fonts/KOROAD_Medium.ttf",
  "G마켓 산스": "../../fonts/GmarketSansTTFMedium.ttf",
  "한컴 말랑말랑": "../../fonts/HancomMalangMalang-Regular",
  이서윤체: "../../fonts/LeeSeoyun.ttf",
  페이퍼로지: "../../fonts/Paperlogy-4Regular.ttf",
  머니그라피: "../../fonts/Moneygraphy-Rounded.ttf",
  한컴: "../../fonts/LeeSeoyun.ttf",
};

// 폰트 세트 이미지
import Sejong from "../theme/font/SejongGeulggot.png";
import KOROAD from "../theme/font/KOROAD.png";
import Gmarket from "../theme/font/GmarketSans.png";
import MalangMalang from "../theme/font/hancomMalang.png";
import LeeSeoyun from "../theme/font/LeeSeoyun.png";
import Paperlogy from "../theme/font/paperlogy.png";
import Moneygraphy from "../theme/font/moneygraphy.png";
import Ulju from "../theme/font/ulju.png";

// 폰트별 세트 이미지 매핑
export const fontImageMap: { [key: string]: string } = {
  세종글꽃: Sejong,
  KOROAD: KOROAD,
  "G마켓 산스": Gmarket,
  "한컴 말랑말랑": MalangMalang,
  이서윤체: LeeSeoyun,
  페이퍼로지: Paperlogy,
  머니그라피: Moneygraphy,
  "한컴 울주 천전리 각석체": Ulju,
};
