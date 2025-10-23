import { create } from "zustand";

interface ServerDataFrame {
  players: number;
  setPlayers: (players: number) => void;
  slots: number;
  setSlots: (slots: number) => void;
}
interface ObjectsFrame {
  props: number;
  setProps: (props: number) => void;
  vehicles: number;
  setVehicles: (vehicles: number) => void;
}

export const useServerData = create<ServerDataFrame>((set: Function) => ({
  players: 0,
  setPlayers: (players: number) => set({ players }),
  slots: 0,
  setSlots: (slots: number) => set({ slots }),
}));
export const useObjects = create<ObjectsFrame>((set: Function) => ({
  props: 0,
  setProps: (props: number) => set({ props }),
  vehicles: 0,
  setVehicles: (vehicles: number) => set({ vehicles }),
}));
