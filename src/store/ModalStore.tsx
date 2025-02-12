import { create } from "zustand";

interface UseIsModalStoreType {
  isModal: string | null; // null을 허용하도록 변경
  modalData?: { title: string; content: string; onConfirm: () => void };
  setIsModalClick: (modalType?: string | null) => void; // null도 받을 수 있도록 수정
}

export const useIsModalStore = create<UseIsModalStoreType>((set) => ({
  isModal: null, // 기본값 유지
  setIsModalClick: (modalType?: string | null) => {
    set(() => ({
      isModal: modalType ?? null, // undefined일 경우에도 null로 처리
    }));
  },
}));
