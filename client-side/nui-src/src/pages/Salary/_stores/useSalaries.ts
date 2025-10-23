import { SalaryGroup } from "../../../interfaces/salary";
import { create } from "zustand";

interface SalariesFrame {
  list: SalaryGroup[];
  setList: (list: SalaryGroup[]) => void;
  setSalary: (salary: number, group: SalaryGroup) => void;
}

export const useSalaries = create<SalariesFrame>((set: Function) => ({
  list: [],
  setList: (list: SalaryGroup[]) => set({ list }),
  setSalary: (salary: number, group: SalaryGroup) =>
    set((state: SalariesFrame) => ({
      list: state.list.map((existingGroup: SalaryGroup) =>
        existingGroup === group ? { ...group, salary } : existingGroup
      ),
    })),
}));

interface SalariesSelectorFrame {
  current: number;
  set: (current: number) => void;
}

export const useSalariesSelector = create<SalariesSelectorFrame>(
  (set: Function) => ({
    current: -1,
    set: (current: number) => set({ current }),
  })
);
