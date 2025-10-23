import { Item } from "../../../../interfaces/items";
import { create } from "zustand";

interface ItemsFrame {
  list: Item[];
  setList: (list: Item[]) => void;
}

export const useItems = create<ItemsFrame>((set: Function) => ({
  list: [],
  setList: (list: Item[]) => set({ list }),
}));
