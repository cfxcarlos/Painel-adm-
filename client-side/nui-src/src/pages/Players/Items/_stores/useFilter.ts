import { create } from "zustand";

interface FilterFrame {
  value: string;
  setValue: (value: string) => void;
}

export const useFilter = create<FilterFrame>((set: Function) => ({
  value: "",
  setValue: (value: string) => set({ value }),
}));
