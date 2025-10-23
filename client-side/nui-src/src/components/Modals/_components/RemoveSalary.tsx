import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SalaryGroup } from "../../../interfaces/salary";
import clsx from "clsx";
import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";
import { useSalaries } from "../../../pages/Salary/_stores/useSalaries";
import { useState } from "react";

export const RemoveSalaryModal = () => {
  const [options, setOptions] = useState(false);
  const [option, setOption] = useState("Selecione um salário");
  const modal = useModal();
  const salary = useSalaries();
  return (
    <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <h1 className="text-white uppercase text-[50px] font-extrabold">
        remover salário
      </h1>
      <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[.5vw]">
        <button
          onClick={() => setOptions(() => !options)}
          className="w-full h-[3vw] cursor-pointer flex items-center justify-between px-[1vw] rounded-[.5vw] bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
        >
          <h1 className="text-white/50 text-[.9vw]">{option}</h1>
          <span
            className={clsx("text-white text-[1.5vw]", options && "rotate-180")}
          >
            <MdOutlineKeyboardArrowDown />
          </span>
        </button>
        {options && (
          <div className="flex flex-col gap-[.5vw] max-h-[10vw] overflow-y-scroll">
            {salary.list.map((data) => (
              <button
                onClick={() => {
                  setOption(data.name);
                  setOptions(false);
                }}
                className="w-full h-[3vw] cursor-pointer flex items-center justify-between px-[1vw] rounded-[.5vw] bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              >
                <h1 className="text-white text-[.9vw]">{data.name}</h1>
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-[.5vw]">
          <button
            onClick={() => modal.close()}
            className="h-[3vw] w-full text-white text[.8vw] uppercase rounded-[.5vw] bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              emit("removeSalary", { name: option });
              modal.close();
            }}
            className="h-[3vw] hover:scale-95 w-full text-white text[.8vw] uppercase rounded-[.5vw] bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
