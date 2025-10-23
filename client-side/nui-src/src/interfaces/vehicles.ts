export interface Vehicle {
  name: string;
  spawn: string;
  image: string;
  favorite: boolean;
  attributes: {
    engine: number;
    body: number;
    gas: number;
    trunk: number;
  };
}

export interface PersonalVehicle extends Vehicle {
  plate: string;
}
