import { emit } from "../../../hooks/emit";
import { usePlayerSelection } from "../../../pages/Players/Permissions/_stores/usePlayers";
import { useModal } from "../../../stores/useModal";
import { useState } from "react";

export const RemoveUserGroupModal = () => {
  const selectedPlayer = usePlayerSelection();

  const [id, setId] = useState<string>(
    selectedPlayer.current !== false ? selectedPlayer.current.id.toString() : ""
  );
  const [role, setRole] = useState<string>("");
  const modal = useModal();
  const submit = () => {
    if (id !== "" && role !== "") {
      emit("removeUserGroup", {
        id: id,
        role: role,
      });
      modal.close();
    }
  };
  return (
    <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <h1 className="text-white uppercase text-[50px] font-extrabold">
        remover
      </h1>
      <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[25px]">
        <div className="flex gap-[15px]">
          <div className="w-[202px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              {selectedPlayer.current !== false
                ? selectedPlayer.current.name
                : "id"}
            </p>
            {selectedPlayer.current !== false ? (
              <div className="flex items-center">
                <input
                  value={id}
                  disabled
                  className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
                  type="text"
                  placeholder="ID"
                />
                <Lock />
              </div>
            ) : (
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
                type="text"
                placeholder="ID"
              />
            )}
          </div>
          <div className="w-[265px] flex flex-col gap-[15px]">
            <p className="text-white uppercase text-[20px] font-extrabold">
              cargo
            </p>
            <input
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="text-[15px] font-medium text-white/75 placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
              type="text"
              placeholder="GRUPO"
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

const Lock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="14"
    fill="none"
    viewBox="0 0 10 14"
    className="absolute left-[207px]"
  >
    <path
      fill="#fff"
      d="M5 0C2.993 0 1.158 1.375 1.158 4.201V5.86C.382 5.95 0 6.399 0 7.283v5.273C0 13.55.475 14 1.432 14h7.136C9.525 14 10 13.551 10 12.556v-5.28c0-.884-.381-1.354-1.158-1.437V4.201C8.842 1.375 7.007 0 5 0zM2.317 4.05C2.317 2.12 3.51 1.063 5 1.063c1.49 0 2.683 1.057 2.683 2.985v1.783l-5.366.007v-1.79z"
    ></path>
  </svg>
);
