import { SalaryGroup } from "../../../interfaces/salary";
import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";
import { useSalaries } from "../../../pages/Salary/_stores/useSalaries";
import { useState } from "react";

export const EditSalaryModal = () => {
  const modal = useModal();
  const salary = useSalaries();
  const [edit, setEdit] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>(
    (modal.data as SalaryGroup).salary.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    })
  );
  function parseCurrency(e: string) {
    let numberString = e.replace(/[R$\s]/g, "");
    numberString = numberString.replace(/\./g, "");
    return parseFloat(numberString);
  }
  const submit = () => {
    if (quantity !== "") {
      if (modal.data) {
        salary.setSalary(parseCurrency(quantity), modal.data as SalaryGroup);
      }
      emit("setNewSalary", {
        group: modal.data,
        newSalary: parseCurrency(quantity),
      });
      modal.close();
    }
  };
  return (
    <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <h1 className="text-white uppercase text-[50px] font-extrabold">
        editar salário
      </h1>
      <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[25px]">
        <div className="flex gap-[15px]">
          <div className="w-[202px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              grupo
            </p>
            <input
              disabled
              value={modal.data?.name}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
            />
          </div>
          <div className="w-[265px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              quantidade
            </p>
            <div className="pr-[19px] w-full h-[60px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10 flex items-center">
              <input
                className="w-full h-full bg-transparent text-[15px] font-medium text-white/75 placeholder:text-white/10 pl-[18px]"
                disabled={!edit}
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
                placeholder="Digite aqui..."
              />
              {!edit && (
                <button
                  onClick={() => {
                    setEdit((prev: boolean) => !prev);
                    setQuantity("");
                  }}
                  className="flex-none"
                >
                  <EditIcon />
                </button>
              )}
            </div>
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

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4094 0.160481C10.5366 0.171885 10.5922 0.326975 10.5008 0.417444L4.16491 6.74267C4.09334 6.81417 4.04209 6.90338 4.01642 7.00115L3.2549 9.91289C3.22976 10.0091 3.23026 10.1102 3.25637 10.2062C3.28247 10.3022 3.33326 10.3896 3.40369 10.46C3.47413 10.5303 3.56176 10.581 3.65789 10.607C3.75402 10.6331 3.8553 10.6336 3.95169 10.6085L6.86755 9.84827C6.96556 9.82239 7.05492 9.77096 7.12647 9.69926L13.5522 3.28432C13.5723 3.26372 13.5979 3.2493 13.6259 3.24276C13.654 3.23623 13.6833 3.23786 13.7105 3.24746C13.7377 3.25705 13.7615 3.27422 13.7792 3.29692C13.7969 3.31962 13.8077 3.34691 13.8103 3.37555C14.0777 5.92209 14.0623 8.49031 13.7646 11.0335C13.5948 12.4818 12.4289 13.6183 10.9836 13.7802C8.33626 14.0733 5.66462 14.0733 3.0173 13.7802C1.57117 13.6183 0.405285 12.4818 0.235465 11.0335C-0.0784885 8.35364 -0.0784885 5.64639 0.235465 2.96654C0.405285 1.51752 1.57117 0.380952 3.0173 0.219781C5.47284 -0.0518872 7.94979 -0.0717573 10.4094 0.160481Z"
      fill="white"
    />
    <path
      d="M11.4344 1.09786C11.4521 1.08016 11.4731 1.06612 11.4962 1.05654C11.5193 1.04696 11.5441 1.04202 11.5692 1.04202C11.5942 1.04202 11.619 1.04696 11.6421 1.05654C11.6653 1.06612 11.6863 1.08016 11.704 1.09786L12.7808 2.17361C12.8163 2.20923 12.8363 2.25749 12.8363 2.30779C12.8363 2.35809 12.8163 2.40635 12.7808 2.44197L6.46547 8.74819C6.44139 8.772 6.41144 8.78905 6.37866 8.79761L4.9211 9.17773C4.88898 9.1861 4.85521 9.18593 4.82317 9.17724C4.79113 9.16856 4.76192 9.15166 4.73844 9.12822C4.71496 9.10478 4.69803 9.07562 4.68933 9.04363C4.68063 9.01164 4.68046 8.97793 4.68884 8.94586L5.0696 7.49075C5.07808 7.45798 5.09516 7.42806 5.1191 7.40408L11.4344 1.09786Z"
      fill="white"
    />
  </svg>
);
