import clsx from "clsx";
import { useModal } from "../../../stores/useModal";
import { useSalariesSelector } from "../_stores/useSalaries";

export const Header = () => {
  const selection = useSalariesSelector();
  const modal = useModal();
  return (
    <header className="flex items-center gap-[25px] flex-none w-full overflow-visible">
      <div className="flex items-center justify-between overflow-visible w-[804px]">
        <div className=" flex flex-col gap-[5px] overflow-visible">
          <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible max-w-[810px] truncate">
            Salários
          </h1>
          <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
            <span className="text-white/35">Principal /</span> Salário
          </small>
        </div>
        <div className="flex items-center gap-[.5vw]">
          <button
            onClick={() => modal.setVisible("removesalary", undefined)}
            className="uppercase bg-white/1 h-[39px] w-[144px] rounded-[5px] border-1 border-white/5 hover:bg-white/5 text-white text-[12px] font-extrabold tracking-[0.6px] active:scale-95"
          >
            - Remover
          </button>
          <button
            onClick={() => modal.setVisible("addsalary", undefined)}
            className="uppercase bg-white/1 h-[39px] w-[144px] rounded-[5px] border-1 border-white/5 hover:bg-white/5 text-white text-[12px] font-extrabold tracking-[0.6px] active:scale-95"
          >
            + adicionar
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-[5px] overflow-visible w-[396px]",
          selection.current < 0 && "opacity-0"
        )}
      >
        <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible max-w-[810px] truncate">
          Informações
        </h1>
        <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
          <span className="text-white/35">Principal /</span> Salário
        </small>
      </div>
    </header>
  );
};
