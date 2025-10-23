import { Permission } from "../interfaces/permissions";
import { create } from "zustand";

interface PermissionsFrame {
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
  permission: Permission;
  setPermission: (permission: Permission) => void;
}

export const usePermissions = create<PermissionsFrame>((set: Function) => ({
  permissions: [],
  setPermissions: (permissions: Permission[]) => set({ permissions }),
  permission: {
    name: "",
    id: 0,
  },
  setPermission: (permission: Permission) => set({ permission }),
}));
