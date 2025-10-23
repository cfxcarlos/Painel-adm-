import { useObjects, useServerData } from "../_stores/useServerData";

import { emit } from "../../../hooks/emit";
import { useEffect } from "react";

export const ServerData = () => {
  const data = useServerData();
  const objects = useObjects();
  useEffect(() => {
    emit(
      "getOnlinePlayers",
      {},
      {
        players: 500,
        slots: 1024,
      }
    ).then((response: { [key: string]: number }) => {
      data.setPlayers(response.players);
      data.setSlots(response.slots);
    });
    emit(
      "getObjects",
      {},
      {
        props: 108,
        vehicles: 60,
      }
    ).then((response: { [key: string]: number }) => {
      objects.setProps(response.props);
      objects.setVehicles(response.vehicles);
    });
  }, []);
  return (
    <section className="flex flex-col gap-[15px] overflow-visible w-[805px]">
      <header className="flex flex-col gap-[5px] overflow-visible">
        <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible">
          Dashboard
        </h1>
        <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
          <span className="text-white/35">Principal /</span> Dashboard
        </small>
      </header>
      <div className="h-[155px] w-[805px] flex gap-[25px]">
        <div className="h-full w-[475px] bg-white/2 rounded-[5px] flex-none flex items-center justify-between p-[25px]">
          <div className="flex flex-col w-[245px] justify-between">
            <h1 className="font-extrabold text-white text-[15px]">
              Jogadores conectados
            </h1>
            <p className="text-[35px] text-white/5 italic">
              <span className="not-italic font-extrabold text-white">
                {data.players}/
              </span>
              {data.slots}
            </p>
            <small className="text-white text-[10px]">
              *Percentual atualizado ao abrir o painel, representa a quantidade de
              usuários conectados.
            </small>
          </div>
          <div className="size-[98px] bg-white/1 rounded-full relative grid place-items-center">
            <svg
              height={98}
              width={98}
              className="absolute -rotate-90"
              viewBox="0 0 98 98"
            >
              <circle
                cx={47}
                cy={47}
                r={40}
                fill="none"
                stroke="white"
                strokeOpacity={0.05}
                strokeWidth={12}
              />
              <circle
                pathLength={100.001}
                strokeDasharray={100.001}
                strokeDashoffset={
                  100.001 - (data.players / data.slots) * 100 || 100.001
                }
                cx={47}
                cy={47}
                r={40}
                fill="none"
                stroke="white"
                strokeWidth={12}
              />
            </svg>
            <p className="absolute leading-none text-[25px] font-extrabold text-white">
              {data.players}
            </p>
          </div>
        </div>
        <div className="h-full w-full bg-white/2 rounded-[5px] flex flex-col justify-between p-[25px]">
          <h1 className="font-extrabold text-white text-[15px]">
            Veículos e objetos spawnados
          </h1>
          <div className="flex justify-between w-full">
            <p className="text-[10px] text-white/15 italic">
              <span className="not-italic text-[35px] font-extrabold text-white">
                {objects.vehicles}
              </span>{" "}
              VEÍCULOS
            </p>
            <p className="text-[10px] text-white/15 italic">
              <span className="not-italic text-[35px] font-extrabold text-white">
                {objects.props}
              </span>{" "}
              OBJETOS
            </p>
          </div>
          <small className="text-white text-[10px]">
            *Percentual atualizado ao abrir o painel, representa a quantidade de
            veículos e objetos spawnados.
          </small>
        </div>
      </div>
    </section>
  );
};
