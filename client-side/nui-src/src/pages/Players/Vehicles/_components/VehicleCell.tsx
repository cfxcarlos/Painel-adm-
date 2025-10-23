import {} from "react-icons";

import { MdStar } from "react-icons/md";
import { Vehicle } from "../../../../interfaces/vehicles";
import clsx from "clsx";
import { emit } from "../../../../hooks/emit";
import { useModal } from "../../../../stores/useModal";
import { useVehicles } from "../_stores/useVehicles";

export const VehicleCell = ({ vehicle }: { vehicle: Vehicle }) => {
  const vehicles = useVehicles();
  const modal = useModal();
  return (
    <li className="w-[270px] h-[316px] bg-white/2 hover:bg-white/2 rounded-[5px] border-1 border-white/5 p-[15px] items-center flex flex-col">
      <header className="flex flex-col flex-none w-full uppercase">
        <small className="text-[10px] font-medium tracking-[5px] text-white leading-none">
          veículo
        </small>
        <p className="text-[25px] font-extrabold text-white truncate">
          {vehicle.name}
        </p>
      </header>
      <div className="size-full grid place-items-center mt-[16px]">
        <img
          src={vehicle.image}
          className="object-contain w-full"
          draggable={false}
        />
      </div>
      <div className="flex gap-[10px] h-[40px] mt-[23px] w-full flex-none">
        <button
          onClick={() => emit("spawnVehicle", { vehicle })}
          className="w-full h-full rounded-[5px] border-1 border-white/5 bg-white/1 hover:bg-white/5 text-[12px] uppercase text-white font-medium active:scale-95"
        >
          spawn
        </button>
        <button
          onClick={() => modal.setVisible("addvehicle", vehicle)}
          className="active:scale-95 h-full w-[40px] bg-white/1 hover:bg-white/5 grid flex-none place-items-center rounded-[5px] border-1 border-white/5"
        >
          <Options />
        </button>
        <button
          onClick={() => {
            if (!vehicle.favorite) {
              emit("favoriteVehicle", {vehicle: vehicle}).then((response: any) => {
                vehicles.setList(response);
              });
            } else {
              emit("unfavoriteVehicle", {vehicle: vehicle}).then((response: any) => {
                vehicles.setList(response);
              });
            }
          }}
          className={clsx(
            "active:scale-95 h-full text-white/20 hover:text-yellow-500 w-[40px] bg-white/1 hover:bg-white/5 grid flex-none place-items-center rounded-[5px] border-1 border-white/5",
            vehicle.favorite && "text-yellow-500"
          )}
        >
          <MdStar className="text-[1vw]" />
        </button>
      </div>
    </li>
  );
};

const Options = () => (
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0.5L14 0.500004M0 4.95431L14 4.95432M0 9.5L14 9.5"
      stroke="white"
    />
  </svg>
);
