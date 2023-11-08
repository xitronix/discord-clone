import { ServerWithMembersWithProfile } from "@/types";
import { Channel } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "editChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "searchServer"
  | "deleteMessage";

interface ModalData {
  server?: ServerWithMembersWithProfile;
  channel?: Channel;
  url?: string;
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
