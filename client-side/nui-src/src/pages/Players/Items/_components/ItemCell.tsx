import { Item } from "../../../../interfaces/items";
import { emit } from "../../../../hooks/emit";
import { useModal } from "../../../../stores/useModal";

export const ItemCell = ({ item }: { item: Item }) => {
  const modal = useModal();
  return (
    <li className="w-[209px] h-[246px] bg-white/2 hover:bg-white/2 rounded-[5px] border-1 border-white/5 p-[15px] items-center flex flex-col">
      <header className="flex flex-col w-full uppercase">
        <small className="text-[10px] font-medium tracking-[5px] text-white leading-none">
          item
        </small>
        <p className="text-[20px] font-extrabold text-white truncate">
          {item.name}
        </p>
      </header>
      <div className="size-[101px] grid place-items-center mt-[16px]">
        <img src={item.image} className="h-full" draggable={false} />
      </div>
      <div className="flex gap-[10px] h-[40px] mt-[23px] w-full">
        <button
          onClick={() => emit("getItem", { item })}
          className="w-full h-full rounded-[5px] border-1 border-white/5 bg-white/1 hover:bg-white/5 text-[12px] uppercase text-white font-medium active:scale-95"
        >
          pegar
        </button>
        <button
          onClick={() => modal.setVisible("item", item)}
          className="active:scale-95 h-full w-[40px] bg-white/1 hover:bg-white/5 grid flex-none place-items-center rounded-[5px] border-1 border-white/5"
        >
          <Options />
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
