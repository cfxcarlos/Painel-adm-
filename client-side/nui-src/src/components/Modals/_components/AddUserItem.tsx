import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";
import { useState } from "react";

export const AddUserItemModal = () => {
  const [spawn, setSpawn] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const modal = useModal();
  const submit = () => {
    if (spawn !== "" && quantity !== "") {
      console.log(JSON.stringify(modal.data))
      emit("giveItemToUser", {
        spawn: spawn,
        quantity: Number(quantity),
        user: modal.data,
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
              spawn
            </p>
            <input
              value={spawn}
              onChange={(e) => setSpawn(e.target.value)}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
              placeholder="SPAWN DO ITEM"
            />
          </div>
          <div className="w-[265px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              quantidade
            </p>
            <input
              maxLength={9}
              value={quantity}
              onChange={(e) => {
                if (e.target.value === "" || /^\d*$/.test(e.target.value)) {
                  setQuantity(e.target.value);
                }
              }}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
              placeholder="QUANTIDADE"
            />
          </div>
        </div>
        <div className="flex gap-[15px] h-[48px]">
          <button
            onClick={() => modal.setVisible("useritems", modal.data.items)}
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
