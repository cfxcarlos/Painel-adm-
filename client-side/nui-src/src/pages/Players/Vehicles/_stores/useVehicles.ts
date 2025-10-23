import { Vehicle } from "../../../../interfaces/vehicles";
import { create } from "zustand";

interface VehiclesFrame {
  list: Vehicle[];
  setList: (list: Vehicle[]) => void;
}

export const useVehicles = create<VehiclesFrame>((set: Function) => ({
  list: [],
  setList: (list: Vehicle[]) => set({ list }),
}));
