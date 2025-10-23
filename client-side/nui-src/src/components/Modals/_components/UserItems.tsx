import { PlayerItem } from "../../../pages/Players/Main/_interfaces/players";
import { TempUserContext } from "../../../pages/Players/Main";
import clsx from "clsx";
import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";

export const UserItemsModal = () => {
  const selectedUser = TempUserContext();
  const modal = useModal();
  return (
    <div className="w-[1428px] h-[707px] rounded-[10px] border border-solid border-[#3A3A3A] bg-neutral-900 absolute z-50 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex flex-col px-[45px] pb-[28px]">
      <button
        className="absolute right-[25px] top-[25px] hover:opacity-60"
        onClick={modal.close}
      >
        <Close />
      </button>
      <h1 className="font-bold text-white text-[45px] uppercase leading-tight pt-[45px] pb-[25px]">
        itens
      </h1>
      <ul
        className={clsx(
          "grid w-full h-full grid-cols-6 overflow-y-scroll gap-[15px]",
          modal.data.length > 6 && "place-items-center"
        )}
      >
        {modal.data.map((item: PlayerItem, index: number) => (
          <ItemCell key={index} data={item} />
        ))}
        <button
          onClick={() => modal.setVisible("adduseritem", selectedUser.data)}
          className="w-[209px] h-[270px] border border-solid border-white/5 grid place-items-center rounded-[5px] bg-white/1 hover:bg-white/5 active:scale-95"
        >
          <Add />
        </button>
      </ul>
    </div>
  );
};

const ItemCell = ({ data }: { data: PlayerItem }) => {
  const selectedUser = TempUserContext();
  return (
    <li className="w-[209px] h-[270px] border border-solid border-white/5 rounded-[5px] bg-white/1 p-[15px] flex flex-col">
      <header className="flex justify-between w-full">
        <div className="flex flex-col">
          <small className="leading-tight uppercase text-[13px] text-white">
            item
          </small>
          <p className="leading-tight uppercase text-[13px] text-white font-bold">
            {data.name}
          </p>
        </div>
        <p className="text-[12px] text-white font-semibold">{data.quantity}x</p>
      </header>
      <div className="w-full h-[131px] grid place-items-center my-[18px]">
        <img src={data.image} className="object-contain size-full" />
      </div>
      <button
        onClick={() =>
          emit("removeItemFromUser", {
            item: data,
            user: selectedUser.data,
          })
        }
        className="w-full h-[40px] uppercase border border-solid border-white/5 rounded-[5px] bg-white/1 text-[12px] text-white font-medium hover:bg-white/5 active:scale-95"
      >
        remover
      </button>
    </li>
  );
};

const Close = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 15L14 2M14 15L2 2" stroke="white" strokeWidth="3" />
  </svg>
);
const Add = () => (
  <svg
    width="56"
    height="57"
    viewBox="0 0 56 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 28.5H27.6667M27.6667 28.5H56M27.6667 28.5V57M27.6667 28.5V0"
      stroke="white"
      strokeOpacity="0.05"
      strokeWidth="12"
    />
  </svg>
);
