export const themeFonts: Record<string, string> = {
  세종글꽃: "'SejongGeulggot', sans-serif",
  KOROAD: "'KOROAD_Medium', sans-serif",
  "G마켓 산스": "'GmarketSansTTFMedium', sans-serif",
  "학교안심 둥근미소": "'HakgyoansimDunggeunmiso', sans-serif",
  이서윤체: "'LeeSeoyun', sans-serif",
  "온글잎 박다현체": "'pdh', sans-serif",
  "온글잎 백수빈": "'BaekSubin', sans-serif",
  망고또박: "'MangoDdobak)', sans-serif",
};

export const fontFiles: Record<string, string> = {
  세종글꽃: "../../fonts/Sejong/SejongGeulggot.ttf",
  KOROAD: "../../fonts/KOROAD/KOROAD_Medium.ttf",
  "G마켓 산스": "../../fonts/GmarketSans/GmarketSansTTFMedium.ttf",
  "학교안심 둥근미소":
    "../../fonts//HakgyoansimDunggeunmiso/HakgyoansimDunggeunmiso.ttf",
  이서윤체: "../../fonts/LeeSeoyun/LeeSeoyun.ttf",
  "온글잎 박다현체": "../../fonts/PDH/pdh.ttf",
  "온글잎 백수빈": "../../fonts/BaekSubin/BaekSubin.ttf",
  망고또박: "../../fonts/Mango/MangoDdobak.ttf",
};

// 폰트 세트 이미지
import Sejong from "../theme/font/SejongGeulggot.png";
import KOROAD from "../theme/font/KOROAD.png";
import Gmarket from "../theme/font/GmarketSans.png";
import Miso from "../theme/font/Hakgyoansim Dunggeunmiso.png";
import LeeSeoyun from "../theme/font/LeeSeoyun.png";
import PDH from "../theme/font/pdh.png";
import BaekSubin from "../theme/font/BaekSubin.png";
import Mango from "../theme/font/MangoDdobak.png";

// 폰트별 세트 이미지 매핑
export const fontImageMap: { [key: string]: string } = {
  세종글꽃: Sejong,
  KOROAD: KOROAD,
  "G마켓 산스": Gmarket,
  "학교안심 둥근미소": Miso,
  이서윤체: LeeSeoyun,
  "온글잎 박다현체": PDH,
  "온글잎 백수빈": BaekSubin,
  망고또박: Mango,
};
