import { User } from "../interfaces/user";
import { create } from "zustand";

interface UserFrame {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const useUser = create<UserFrame>((set: Function) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
}));
