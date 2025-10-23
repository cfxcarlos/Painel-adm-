import { useEffect, useState } from "react";

import { PersonalVehicle } from "../../../../interfaces/vehicles";
import clsx from "clsx";
import { useModal } from "../../../../stores/useModal";

export const Vehicles = ({ data }: { data: PersonalVehicle[] }) => {
  const modal = useModal();
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent + 1 < data.length ? prevCurrent + 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-[563px] h-full bg-white/2 flex-none rounded-[5px]">
      <header className="flex-none w-full h-[58px] flex items-center justify-between pl-[15px] pr-[20px] bg-white/1 border-1 border-transparent border-b-white/5">
        <p className="text-white uppercase font-bold text-[13px]">
          veículos do jogador ({data.length})
        </p>
        <button
          onClick={() => modal.setVisible("uservehicles", data)}
          className="uppercase text-white/10 text-[13px] font-bold hover:text-white/25"
        >
          ver tudo
        </button>
      </header>
      {data.length > 0 ? (
        <button
          onClick={() => modal.setVisible("infopersonalvehicle", data[current])}
          className="w-[513px] h-[239px] m-[25px] border-1 border-white/5 bg-white/1 rounded-sm flex flex-col items-center justify-center hover:bg-white/3"
        >
          <img
            src={data[current].image}
            className="w-[418px] max-h-[160px] object-center object-contain"
            draggable={false}
          />
          <p className="font-bold text-white text-[15px] uppercase my-[5px]">
            {data[current].name}{" "}
            {data[current].plate && ` | ${data[current].plate}`}
          </p>
          <div className="h-[5px] flex gap-[5px] mt-[5px]">
            {Array.from({ length: data.length }).map((_, index: number) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(index);
                }}
                className={clsx(
                  "h-full rounded-full",
                  index === current
                    ? "w-[24px] bg-white"
                    : "w-[5px] bg-white/10"
                )}
                key={index}
              />
            ))}
          </div>
        </button>
      ) : (
        <p className="leading-nonve overflow-visible mt-[25px] ml-[30px] text-white/60 font-medium text-[17px]">
          Este usuário não tem veículos pessoais
        </p>
      )}
    </section>
  );
};
