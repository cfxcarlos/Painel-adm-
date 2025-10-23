import { Notification } from "../../../interfaces/notifications";
import { create } from "zustand";

interface NotificationFrame {
  list: Notification[];
  setList: (list: Notification[]) => void;
}

export const useNotifications = create<NotificationFrame>((set: Function) => ({
  list: [],
  setList: (list: Notification[]) => set({ list }),
}));
