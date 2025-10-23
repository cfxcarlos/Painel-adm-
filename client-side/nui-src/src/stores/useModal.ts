import { create } from "zustand";

export type ModalOptions =
  | "item"
  | "editsalary"
  | "addsalary"
  | "removesalary"
  | "addvehicle"
  | "infovehicle"
  | "usergroups"
  | "useritems"
  | "adduseritem"
  | "userproperties"
  | "adduserproperty"
  | "fastadduseritem"
  | "fastaddusermoney"
  | "fastadduservehicle"
  | "fastbanuser"
  | "uservehicles"
  | "infopersonalvehicle"
  | "adduservehicle"
  | "addusergroup"
  | "removeusergroup";
export type ModalDataOptions = any;

interface ModalFrame {
  visible: ModalOptions | false;
  data?: ModalDataOptions;
  setVisible: (visible: ModalOptions | false, data: ModalDataOptions) => void;
  close: () => void;
}

export const useModal = create<ModalFrame>((set: Function) => ({
  visible: false,
  data: undefined,
  setVisible: (visible: ModalOptions | false, data: ModalDataOptions) =>
    set({ visible, data }),
  close: () => set({ visible: false, data: undefined }),
}));
