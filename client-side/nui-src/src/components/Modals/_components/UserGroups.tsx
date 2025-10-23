import { Player } from "../../../pages/Players/Main/_interfaces/players";
import { useModal } from "../../../stores/useModal";

export const UserGroupsModal = () => {
  const modal = useModal();
  const groups = (): string => {
    let groups_str: string = "";
    (modal.data as Player).groups.forEach((group) => {
      groups_str += group + "; ";
    });
    return groups_str;
  };
  return (
    <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <h1 className="text-white uppercase text-[50px] font-extrabold">
        grupos #{(modal.data as Player).id}
      </h1>
      <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[25px]">
        <textarea
          value={groups()}
          className="resize-none [user-select:text] cursor-text bg-white/2 w-full h-[183px] rounded-[5px] border-1 border-white/10 px-[21px] py-[19px] text-[20px] text-white placeholder:text-white/30 font-extrabold overflow-y-scroll"
          placeholder="Este usuário não está em nenhum grupo..."
          disabled
        />
        <button
          onClick={() => modal.close()}
          className="w-full h-[48px] bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
        >
          voltar
        </button>
      </div>
    </div>
  );
};
