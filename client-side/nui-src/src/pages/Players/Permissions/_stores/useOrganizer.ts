import { create } from "zustand";

interface OrganizerFrame {
  current: string | undefined;
  setCurrent: (current: string | undefined) => void;
}
export const useOrganizer = create<OrganizerFrame>((set: Function) => ({
  current: undefined,
  setCurrent: (current: string | undefined) => set({ current }),
}));
