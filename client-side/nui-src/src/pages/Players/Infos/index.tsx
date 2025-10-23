import { Informations } from "./_components/Informations";
import { Items } from "./_components/Items";
import { Properties } from "./_components/Properties";
import { TempUserContext } from "../Main";
import { Vehicles } from "./_components/Vehicles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PlayerInfos = () => {
  const location = useLocation();
  const data = location.state;
  const tempUser = TempUserContext();
  useEffect(() => {
    tempUser.setData(data);
  }, []);
  return (
    <main className="flex flex-col gap-[15px] w-full">
      <header className="flex items-center gap-[25px] flex-none w-full overflow-visible">
        <div className="flex flex-col gap-[5px] overflow-visible">
          <h1 className="text-white text-[25px] font-semibold leading-none flex-none overflow-visible max-w-[810px] truncate">
            {data.name} #{data.id}
          </h1>
          <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
            <span className="text-white/35">Jogadores /</span> Informações
          </small>
        </div>
      </header>
      <div className="w-full gap-[13px] flex flex-col h-full">
        <div className="flex w-full h-full gap-[25px]">
          <Informations data={data} />
          <Vehicles data={data.vehicles} />
        </div>
        <div className="flex w-full h-full gap-[25px]">
          <Items data={data.items} />
          <Properties data={data.properties} owner={data} />
        </div>
      </div>
    </main>
  );
};
