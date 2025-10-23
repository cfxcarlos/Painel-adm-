import { Player } from "../_interfaces/players";
import { create } from "zustand";

interface PlayersFrame {
  list: Player[];
  setList: (list: Player[]) => void;
}
interface PlayerSelectionFrame {
  current: false | Player;
  setCurrent: (current: false | Player) => void;
}

export const usePlayers = create<PlayersFrame>((set: Function) => ({
  list: [],
  setList: (list: Player[]) => set({ list }),
}));

export const usePlayerSelection = create<PlayerSelectionFrame>(
  (set: Function) => ({
    current: false,
    setCurrent: (current: false | Player) => set({ current }),
  })
);
