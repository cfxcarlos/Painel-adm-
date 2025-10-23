import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";
import { useState } from "react";

export const AddSalaryModal = () => {
  const modal = useModal();
  const [group, setGroup] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  function parseCurrency(e: string) {
    let numberString = e.replace(/[R$\s]/g, "");
    numberString = numberString.replace(/\./g, "");
    return parseFloat(numberString);
  }
  const submit = () => {
    if (quantity !== "" && group !== "") {
      // enviar nui message "setSalaries" com a nova lista de salários
      emit("addNewSalary", {
        name,
        group,
        newSalary: parseCurrency(quantity),
      });
      modal.close();
    }
  };
  return (
    <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <h1 className="text-white uppercase text-[50px] font-extrabold">
        adicionar
      </h1>
      <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[25px]">
        <div className="flex gap-[15px]">
          <div className="w-[202px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              nome
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
              placeholder="NOME"
            />
          </div>
          <div className="w-[202px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              grupo
            </p>
            <input
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
              placeholder="GRUPO"
            />
          </div>
          <div className="w-[265px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              quantidade
            </p>
            <input
              className="pr-[19px] w-full h-[60px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10 text-[15px] font-medium text-white/75 placeholder:text-white/10 pl-[18px]"
              maxLength={14}
              value={quantity}
              onChange={(e) => {
                if (!isNaN(parseCurrency(e.target.value))) {
                  setQuantity(
                    parseCurrency(e.target.value).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })
                  );
                } else {
                  setQuantity("");
                }
              }}
              type="text"
              placeholder="R$ 15.000"
            />
          </div>
        </div>
        <div className="flex gap-[15px] h-[48px]">
          <button
            onClick={() => modal.close()}
            className="w-[202px] h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
          >
            voltar
          </button>
          <button
            onClick={submit}
            className="w-[265px] h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
          >
            confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
