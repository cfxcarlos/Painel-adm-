import clsx from "clsx";
import { usePlayerSelection } from "../_stores/usePlayers";
import { Player } from "../interfaces/players";

export const PlayerListCellPopulated = ({ data }: { data: Player }) => {
  const selection = usePlayerSelection();
  return (
    <div
      onClick={() =>
        selection.setCurrent(selection.current === data ? false : data)
      }
      className={clsx(
        "cursor-pointer w-full h-[57px] flex-none rounded-[5px] border-1 border-white/5 flex items-center relative",
        selection.current === data
          ? "bg-white/5"
          : "bg-white/1 hover:bg-white/3"
      )}
    >
      <p className="truncate w-[199px] pl-[15px] text-white text-[13px] font-medium flex-none">
        {data.name}
      </p>
      <p className="truncate w-[94px] text-center text-white text-[13px] font-medium flex-none">
        {data.role}
      </p>
      <p className="truncate w-[72px] ml-[65px] text-center flex-none text-white text-[13px] font-medium">
        {data.id}
      </p>
      <div
        className={clsx(
          "w-[60px] ml-[71px] text-center flex-none flex items-center gap-[5px] text-[13px] font-medium transition-none",
          typeof data.online === "boolean" && data.online
            ? "text-white"
            : "text-white/10"
        )}
      >
        <div
          className={clsx(
            "size-[6px] rounded-full",
            typeof data.online === "boolean" && data.online
              ? "bg-green-300"
              : "bg-red-400"
          )}
        />
        {typeof data.online === "boolean" && data.online ? "Online" : "Offline"}
      </div>
      <button
        onClick={() => {}}
        className="size-[26px] rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 absolute right-[12px] grid place-items-center"
      >
        <ActionIcon />
      </button>
    </div>
  );
};
export const PlayerListCell = () => {
  return (
    <div className="w-full h-[57px] flex-none rounded-[5px] border-1 border-white/5 grid place-items-center">
      <p className="uppercase text-[20px] font-medium text-white/5">vazio</p>
    </div>
  );
};

const ActionIcon = () => (
  <svg
    width="2"
    height="10"
    viewBox="0 0 2 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="1"
      cy="1"
      r="1"
      transform="matrix(-1 0 0 1 2 0)"
      fill="#D9D9D9"
    />
    <circle
      cx="1"
      cy="1"
      r="1"
      transform="matrix(-1 0 0 1 2 4)"
      fill="#D9D9D9"
    />
    <circle
      cx="1"
      cy="1"
      r="1"
      transform="matrix(-1 0 0 1 2 8)"
      fill="#D9D9D9"
    />
  </svg>
);
