import { Command } from "../../../interfaces/commands";
import { create } from "zustand";

interface CommandFrame {
  list: Command[];
  setList: (list: Command[]) => void;
}

export const useCommands = create<CommandFrame>((set: Function) => ({
  list: [],
  setList: (list: Command[]) => set({ list }),
}));
