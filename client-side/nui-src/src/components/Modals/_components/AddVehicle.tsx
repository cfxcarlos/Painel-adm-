import clsx from "clsx";
import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";
import { useState } from "react";

export const AddVehicleModal = () => {
  const modal = useModal();
  const [id, setId] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const timeOptions = [10, 20, 30, "permanente"];
  const submit = () => {
    if (id !== "") {
      emit("addVehicleToUser", {
        id: Number(id),
        duration: timeOptions[time],
        vehicle: modal.data,
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
              usuário
            </p>
            <input
              value={id}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setId(value);
                }
              }}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
              placeholder="ID"
            />
          </div>
          <div className="w-[265px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              tempo
            </p>
            <div className="flex items-center w-full h-[60px] rounded-[5px] bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10 pr-[23px]">
              <input
                className="w-full h-full bg-transparent text-[15px] font-extrabold text-white pl-[18px] uppercase"
                maxLength={14}
                value={`${timeOptions[time]} ${
                  typeof timeOptions[time] === "number" ? "dias" : ""
                }`}
                disabled
                type="text"
                placeholder="R$ 15.000"
              />
              <Lock />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {timeOptions.map((timeOption, index) => {
            return (
              <button
                onClick={() => setTime(index)}
                key={index}
                className="flex items-center gap-[10px]"
              >
                <div
                  className={clsx(
                    "size-[30px] grid place-items-center border-1 rounded-[5px]",
                    time === index
                      ? "border-white bg-white"
                      : "border-white/5 bg-white/2"
                  )}
                >
                  <Check active={time === index} />
                </div>
                <p
                  className={clsx(
                    "uppercase text-white text-[13px]",
                    time === index ? "font-extrabold" : "font-semibold"
                  )}
                >
                  {timeOption} {typeof timeOption === "number" && "dias"}
                </p>
              </button>
            );
          })}
        </div>
        <div className="flex gap-[15px] h-[48px]">
          <button
            onClick={() => modal.close()}
            className="w-[202px] h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
          >
            voltar
          </button>
          <div className="h-full flex w-[265px] gap-[15px]">
            <button
              onClick={submit}
              className="w-full h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
            >
              confirmar
            </button>
            <button
              onClick={() => modal.setVisible("infovehicle", modal.data)}
              className="flex-none w-[48px] h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 grid place-items-center"
            >
              <Infos />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Infos = () => (
  <svg
    width="8"
    height="18"
    viewBox="0 0 8 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.13277 0C5.63755 0 5.16262 0.177741 4.81244 0.494122C4.46227 0.810503 4.26554 1.23961 4.26554 1.68704C4.26554 2.13447 4.46227 2.56358 4.81244 2.87996C5.16262 3.19634 5.63755 3.37408 6.13277 3.37408C6.62799 3.37408 7.10293 3.19634 7.4531 2.87996C7.80328 2.56358 8 2.13447 8 1.68704C8 1.23961 7.80328 0.810503 7.4531 0.494122C7.10293 0.177741 6.62799 0 6.13277 0ZM5.68464 5.36479C4.2033 5.47725 0.157644 8.39021 0.157644 8.39021C-0.0913199 8.55891 -0.0166302 8.54767 0.182541 8.86258C0.381712 9.16625 0.356815 9.18874 0.593331 9.04253C0.842294 8.89632 1.25308 8.66013 1.93773 8.27774C4.57675 6.74816 2.36097 10.2797 1.22819 16.2293C0.780054 19.176 3.71782 17.6577 4.47716 17.2078C5.22406 16.7692 7.22821 15.5208 7.42738 15.397C7.70124 15.2283 7.50207 15.0934 7.29045 14.8122C7.14108 14.621 6.9917 14.756 6.9917 14.756C6.18256 15.2396 4.70123 16.2518 4.50206 15.6107C4.26554 14.9697 5.78422 10.5721 6.61825 7.54669C6.75518 6.82689 7.12863 5.25232 5.68464 5.36479Z"
      fill="white"
    />
  </svg>
);
const Lock = () => (
  <svg
    className="flex-none"
    width="10"
    height="14"
    viewBox="0 0 10 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 0C2.99251 0 1.15814 1.37512 1.15814 4.20142V5.85987C0.381546 5.94979 0 6.39883 0 7.28334V12.5559C0 13.551 0.47486 14 1.43164 14H8.56836C9.52514 14 10 13.551 10 12.5559V7.27656C10 6.39205 9.61876 5.92208 8.84186 5.83923V4.20142C8.84186 1.37512 7.00718 0 5 0ZM2.31659 4.04928C2.31659 2.12135 3.51065 1.06406 5 1.06406C6.48935 1.06406 7.6834 2.12135 7.6834 4.04928V5.83215L2.31659 5.83893V4.04928Z"
      fill="white"
    />
  </svg>
);
const Check = ({ active }: { active: boolean }) => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 6.27431L5.08446 9.75L12 1.625"
      stroke={active ? "#19191E" : "white"}
      stroke-width="3"
    />
  </svg>
);
