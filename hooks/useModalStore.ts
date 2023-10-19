import { ServerWithMembersWithProfile } from "@/components/server/ServerHeader";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | 'members' | 'createChannel';

interface ModalData {
  server?: ServerWithMembersWithProfile;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) =>
    set((state) => ({ isOpen: true, type, data: { ...state.data, ...data } })),
  onClose: () => set({ type: null, isOpen: false }),
}));
