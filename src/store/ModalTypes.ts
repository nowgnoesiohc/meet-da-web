// 공통 interface
export interface CommonModalProps {
  title: string;
  content: string;
  subContent?: string; // 선택적 속성
  onConfirm: () => void; // 함수 타입 (매개변수 없음, 반환값 없음)
  onCancel?: () => void;
  isOpen?: boolean;
}
