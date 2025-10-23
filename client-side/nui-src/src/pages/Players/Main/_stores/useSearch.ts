import { create } from "zustand";

interface SearchFrame {
  current: string;
  setCurrent: (current: string) => void;
}
export const useSearch = create<SearchFrame>((set: Function) => ({
  current: "",
  setCurrent: (current: string) => set({ current }),
}));
