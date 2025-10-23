import { PlayerListCell, PlayerListCellPopulated } from "./PlayerListCell";

import { useOrganizer } from "../_stores/useOrganizer";
import { usePlayers } from "../_stores/usePlayers";
import { useFilter } from "../_stores/useFilter";
import { Player } from "../interfaces/players";

export const PlayerList = () => {
  const organizer = useOrganizer();
  return (
    <div className="w-full flex-none h-full bg-white/2 rounded-[5px] px-[15px]">
      <header className="w-full h-[55px] pl-[10px] pr-[26px] flex items-center">
        <button
          onClick={() =>
            organizer.setCurrent(
              organizer.current === "name" ? undefined : "name"
            )
          }
          className="w-[190px] flex items-center uppercase text-white text-[13px] font-semibold gap-[4px] flex-none"
        >
          nome
          <Organize />
        </button>
        <p className="w-[98px] text-center uppercase text-white text-[13px] font-semibold flex-none">
          cargo
        </p>
        <button
          onClick={() =>
            organizer.setCurrent(organizer.current === "id" ? undefined : "id")
          }
          className="w-[72px] ml-[65px] flex items-center justify-center uppercase flex-none text-white text-[13px] font-semibold gap-[4px]"
        >
          id
          <Organize />
        </button>
        <button
          onClick={() =>
            organizer.setCurrent(
              organizer.current === "online" ? undefined : "online"
            )
          }
          className="w-[60px] ml-[71px] flex items-center justify-center uppercase flex-none text-white text-[13px] font-semibold gap-[4px]"
        >
          status
          <Organize />
        </button>
        <p className="w-full text-right uppercase text-white text-[13px] font-semibold">
          ação
        </p>
      </header>
      <List />
    </div>
  );
};

const List = () => {
  const players = usePlayers();
  const organizer = useOrganizer();
  const filter = useFilter();
  const sortedList = (): Player[] => {
    const current = organizer.current;
    if (current) {
      if (current === "name" || current === "id") {
        return players.list.sort((a: any, b: any) => {
          if (a[current as string] < b[current as string]) {
            return -1;
          }
          if (a[current as string] > b[current as string]) {
            return 1;
          }
          return 0;
        });
      } else {
        if (current === "online") {
          return players.list.sort((a: any, b: any) => {
            if (a.online && !b.online) {
              return -1;
            }
            if (!a.online && b.online) {
              return 1;
            }
            return 0;
          });
        }
      }
    }
    return players.list;
  };

  const renderList = (): Player[] => {
    return sortedList().filter(
      (e) =>
        e.name.toLowerCase().startsWith(filter.value.toLowerCase()) ||
        String(e.id).includes(filter.value.toLowerCase())
    );
  };

  return (
    <ul className="w-full h-[647px] overflow-y-scroll scroll-visible flex flex-col gap-[15px]">
      {renderList().length < 10 ? (
        <>
          {Array.from({ length: 9 }).map((_, index: number) => {
            if (renderList()[index]) {
              return (
                <PlayerListCellPopulated
                  data={renderList()[index]}
                  key={index}
                />
              );
            } else {
              return <PlayerListCell key={index} />;
            }
          })}
        </>
      ) : (
        <>
          {renderList().map((player: Player, index: number) => {
            return <PlayerListCellPopulated data={player} key={index} />;
          })}
        </>
      )}
    </ul>
  );
};

const Organize = () => (
  <svg
    width="5"
    height="8"
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.5 0L5 3H0L2.5 0Z" fill="white" fillOpacity="0.5" />
    <path d="M2.5 8L0 5H5L2.5 8Z" fill="white" fillOpacity="0.5" />
  </svg>
);
