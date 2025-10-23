export interface Player {
  name: string;
  id: number;
  online?: boolean | string;
  image: string;
  groups: string[];
  role: string;
}
