import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useMembers = create<ModalStore>((set) => ({
  isOpen: false,
  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
}));
