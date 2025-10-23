import { Item } from "../../../../interfaces/items";
import { PersonalVehicle } from "../../../../interfaces/vehicles";
import { Property } from "./property";

export interface PlayerItem extends Item {
  quantity: number;
}

export interface Player {
  name: string;
  id: number;
  online?: boolean | string;
  image: string;
  groups: string[];
  stats: {
    health: number;
    armour: number;
    hunger: number;
    thirst: number;
  };
  gender: string; // "male" | "female"
  phone: string;
  role: string;
  registry: string;
  money: {
    wallet: number;
    bank: number;
  };
  vehicles: PersonalVehicle[];
  items: PlayerItem[];
  properties: Property[];
}
