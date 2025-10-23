import { VehicleCell } from "./VehicleCell";
import { useFilter } from "../_stores/useFilter";
import { useVehicles } from "../_stores/useVehicles";

export const VehicleList = () => {
  const vehicles = useVehicles();
  const filter = useFilter();

  const renderedVehicles = vehicles.list
    .filter((e) => e.name.toLowerCase().startsWith(filter.value.toLowerCase()))
    .sort((a, b) => Number(b.favorite) - Number(a.favorite));

  return (
    <div className="w-full h-full bg-white/2 rounded-[5px] py-[25px] pl-[25px] pr-[14px]">
      <ul className="grid w-full h-full grid-cols-4 overflow-y-scroll scroll-visible gap-[25px] pr-[8px]">
        {renderedVehicles.map((vehicle, index) => (
          <VehicleCell vehicle={vehicle} key={index} />
        ))}
      </ul>
    </div>
  );
};
