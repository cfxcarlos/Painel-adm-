import clsx from "clsx";
import { emit } from "../../../../hooks/emit";
import { useModal } from "../../../../stores/useModal";
import { useNavigate } from "react-router-dom";
import { usePlayerSelection } from "../_stores/usePlayers";

export const SelectedPlayerHome = () => {
  const selection = usePlayerSelection();
  const navigate = useNavigate();
  const modal = useModal();
  const data = selection.current;
  const simpleAction = (action: string) => {
    emit(`playerAction`, {
      action,
      player: data,
    });
  };
  if (data) {
    return (
      <div className="w-full h-full bg-white/2 rounded-[5px] flex flex-col items-center gap-[20px] pt-[26px]">
        <div className="w-full flex flex-col gap-[43px] items-center flex-none">
          <div className="bg-white/50 size-[177px] rounded-full grid place-items-center">
            <img
              src={data.image}
              className="rounded-full size-full"
              draggable={false}
            />
          </div>
          <div className="flex flex-col w-full gap-[5px] px-[27px]">
            <h1 className="text-[25px] text-white font-extrabold leading-none">
              <span className="truncate">{data.name}</span> #{data.id}
            </h1>
            <p className="leading-none text-white/90 font-medium text-[14px]">
              {data.role}
            </p>
          </div>
        </div>
        <div className="w-[352px] h-[1px] bg-white/5 flex-none" />
        <button
          onClick={() => navigate("/players/infos", { state: data })}
          className="w-[352px] h-[47px] border-1 border-white/5 rounded-[5px] bg-gradient-to-r from-white/3 to-white/1 hover:bg-white/5 hover:border-white/10 text-[13px] text-white font-bold uppercase flex-none"
        >
          ver informações
        </button>
        <div className="w-[352px] h-[1px] bg-white/5 flex-none" />
        <div className="w-[352px] grid grid-cols-3 gap-[17px] h-[270px] overflow-y-scroll">
          <button
            onClick={data.online ? () => simpleAction("spectate") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Assistir
          </button>
          <button
            onClick={data.online ? () => simpleAction("tpto") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Teleportar
          </button>
          <button
            onClick={data.online ? () => simpleAction("tptome") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Puxar
          </button>
          <button
            onClick={data.online ? () => simpleAction("god") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Curar
          </button>
          <button
            onClick={data.online ? () => simpleAction("armour") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Colete
          </button>
          <button
            onClick={
              data.online
                ? () => modal.setVisible("fastadduseritem", data)
                : undefined
            }
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Dar item
          </button>
          <button
            onClick={
              data.online
                ? () => modal.setVisible("fastaddusermoney", data)
                : undefined
            }
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Dar dinheiro
          </button>
          <button
            onClick={
              data.online
                ? () => modal.setVisible("fastadduservehicle", data)
                : undefined
            }
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Dar veículo
          </button>
          <button
            onClick={data.online ? () => simpleAction("kill") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Matar
          </button>
          <button
            onClick={data.online ? () => simpleAction("fix") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Fix
          </button>
          <button
            onClick={data.online ? () => simpleAction("tuning") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Tuning
          </button>
          <button
            onClick={() => simpleAction("unwl")}
            className="w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 hover:bg-white/3 text-[12px] text-white font-medium active:scale-95"
          >
            Remover WL
          </button>
          <button
            onClick={() => modal.setVisible("usergroups", data)}
            className="w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 hover:bg-white/3 text-[12px] text-white font-medium active:scale-95"
          >
            Ver Grupos
          </button>
          <button
            onClick={data.online ? () => simpleAction("kick") : undefined}
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Expulsar
          </button>
          <button
            onClick={
              data.online
                ? () => modal.setVisible("fastbanuser", data)
                : undefined
            }
            className={clsx(
              "w-[104px] h-[35px] rounded-[5px] border-1 border-white/5 bg-white/1 text-[12px] text-white font-medium",
              typeof data.online === "boolean" && data.online
                ? "hover:bg-white/3 active:scale-95"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Banir
          </button>
        </div>
      </div>
    );
  }
};
