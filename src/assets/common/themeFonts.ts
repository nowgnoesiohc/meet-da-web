export const themeFonts: Record<string, string> = {
  세종글꽃: "'SejongFont', sans-serif",
  KOROAD: "'KOROAD', sans-serif",
  "G마켓 산스": "'GmarketSans', sans-serif",
  "학교안심 둥근미소": "'SchoolSmile', sans-serif",
  이서윤체: "'LeeSeoyoon', sans-serif",
  "온글잎 박다현체": "'OngleLeafPark', cursive",
  "온글잎 백수빈": "'OngleLeafBaek', cursive",
  망고또박: "'MangoTobak', sans-serif",
};

export const fontFiles: Record<string, string> = {
  세종글꽃: "/assets/fonts/SejongFont.ttf",
  KOROAD: "/assets/fonts/KOROAD.ttf",
  "G마켓 산스": "/assets/fonts/GmarketSans.ttf",
  "학교안심 둥근미소": "/assets/fonts/SchoolSmile.ttf",
  이서윤체: "/assets/fonts/LeeSeoyoon.ttf",
  "온글잎 박다현체": "/assets/fonts/OngleLeafPark.ttf",
  "온글잎 백수빈": "/assets/fonts/OngleLeafBaek.ttf",
  망고또박: "/assets/fonts/MangoTobak.ttf",
};

// 폰트 세트 이미지
import Sejong from "../theme/font/Sejong/SejongGeulggot.png";
import KOROAD from "../theme/font/KOROAD/KOROAD.png";
import Gmarket from "../theme/font/GmarketSans/GmarketSans.png";
import Miso from "../theme/font/Hakgyoansim Dunggeunmiso/Hakgyoansim Dunggeunmiso.png";
import LeeSeoyun from "../theme/font/LeeSeoyun/LeeSeoyun.png";
import PDH from "../theme/font/PDH/pdh.png";
import BaekSubin from "../theme/font/BaekSubin/BaekSubin.png";
import Mango from "../theme/font/Mango/MangoDdobak.png";

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
