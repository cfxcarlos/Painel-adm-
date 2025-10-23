import { useModal } from "../../../../stores/useModal";
import { useFilter } from "../_stores/useFilter";

export const Header = () => {
  const filter = useFilter();
  const addGroupModal = useModal();
  const removeGroupModal = useModal();

  return (
    <header className="flex items-center justify-between flex-none w-full overflow-visible">
      <div className="flex flex-col gap-[5px] overflow-visible">
        <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible max-w-[810px] truncate">
          Grupos
        </h1>
        <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
          <span className="text-white/35">Jogadores /</span> Permissões
        </small>
      </div>
      <div className="h-[39px] flex gap-[11px]">
        <div className="group h-full w-[408px] bg-white/1 border-1 border-white/5 group-focus:border-white/20 rounded-[5px] flex items-center pl-[16px] gap-[16px]">
          <Search />
          <input
            value={filter.value}
            onChange={(e) => filter.setValue(e.target.value)}
            className="w-full h-full bg-transparent placeholder:text-white/10 text-white/75 text-[14px] font-semibold"
            placeholder="Pesquise algum nome..."
            type="text"
          />
        </div>
        <button
          className="w-[144px] h-full rounded-[5px] border-1 border-white/5 bg-white/1 hover:bg-white/5 uppercase text-white text-[12px] font-extrabold active:scale-95"
          onClick={() =>
            removeGroupModal.setVisible("removeusergroup", "teste")
          }
        >
          - remover
        </button>
        <button
          className="w-[144px] h-full rounded-[5px] border-1 border-white/5 bg-white/1 hover:bg-white/5 uppercase text-white text-[12px] font-extrabold active:scale-95"
          onClick={() => addGroupModal.setVisible("addusergroup", "teste")}
        >
          - adicionar
        </button>
      </div>
    </header>
  );
};

const Search = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1498 10.6918H11.3819L11.1098 10.4294C12.0952 9.28636 12.6369 7.82709 12.6358 6.3179C12.6358 5.06834 12.2653 3.84684 11.571 2.80786C10.8768 1.76889 9.89009 0.95911 8.73565 0.480924C7.58121 0.00273745 6.31089 -0.122378 5.08534 0.121399C3.85979 0.365177 2.73404 0.966898 1.85047 1.85047C0.966898 2.73404 0.365177 3.85979 0.121399 5.08534C-0.122378 6.31089 0.00273745 7.58121 0.480924 8.73565C0.95911 9.89009 1.76889 10.8768 2.80786 11.571C3.84684 12.2653 5.06834 12.6358 6.3179 12.6358C7.88279 12.6358 9.32133 12.0623 10.4294 11.1098L10.6918 11.3819V12.1498L15.5517 17L17 15.5517L12.1498 10.6918ZM6.3179 10.6918C3.89766 10.6918 1.94397 8.73814 1.94397 6.3179C1.94397 3.89766 3.89766 1.94397 6.3179 1.94397C8.73814 1.94397 10.6918 3.89766 10.6918 6.3179C10.6918 8.73814 8.73814 10.6918 6.3179 10.6918Z"
      className="fill-white/10 group-focus-within:fill-white/75"
    />
  </svg>
);
