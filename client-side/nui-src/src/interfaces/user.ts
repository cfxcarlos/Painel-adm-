import { Permission } from "./permissions";

export interface User {
  name: string;
  image: string;
  id: number;
  role: Permission;
}
