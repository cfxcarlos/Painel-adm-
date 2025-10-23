import { PlayerItem } from "../../Main/_interfaces/players";
import { useModal } from "../../../../stores/useModal";

export const Items = ({ data }: { data: PlayerItem[] }) => {
  const modal = useModal();
  return (
    <section className="w-[627px] h-[347px] bg-white/2 flex-none rounded-[5px]">
      <header className="flex-none w-full h-[58px] flex items-center justify-between pl-[15px] pr-[20px] bg-white/1 border-1 border-transparent border-b-white/5">
        <p className="text-white uppercase font-bold text-[13px]">
          inventário do jogador ({data.length})
        </p>
        <button
          onClick={() => modal.setVisible("useritems", data)}
          className="uppercase text-white/10 text-[13px] font-bold hover:text-white/25"
        >
          ver tudo
        </button>
      </header>
      <div className="w-full h-[284px] p-[15px] pr-[20px]">
        <ul className="grid w-full h-full grid-cols-4 overflow-y-scroll scroll-visible gap-y-[10px] pr-[10px]">
          {data.length < 8 ? (
            <>
              {Array.from({ length: 8 }).map((_, index: number) => {
                if (data[index]) {
                  return (
                    <li
                      className="h-[158px] w-[135px] bg-white/1 border-1 border-white/5 rounded-[4px] hover:bg-white/5 group grid place-items-center relative"
                      key={index}
                    >
                      <div className="absolute grid place-items-center size-[85px] group-hover:-translate-y-[20px]">
                        <img
                          className="h-full"
                          src={data[index].image}
                          draggable={false}
                        />
                      </div>
                      <p className="absolute right-[15px] top-[15px] z-50 text-[12px] text-white font-semibold">
                        {data[index].quantity}x
                      </p>
                      <div className="absolute bottom-0 flex flex-col items-center w-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-[15px]">
                        <small className="leading-none uppercase text-[10px] text-white">
                          item
                        </small>
                        <p className="text-white uppercase text-[12px] font-bold">
                          {data[index].name}
                        </p>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="h-[158px] w-[135px] bg-white/1 border-1 border-white/5 rounded-[4px]"
                      key={index}
                    />
                  );
                }
              })}
            </>
          ) : (
            <>
              {data.map((item: PlayerItem, index: number) => (
                <li
                  className="h-[158px] w-[135px] bg-white/1 border-1 border-white/5 rounded-[4px] hover:bg-white/5 group grid place-items-center relative"
                  key={index}
                >
                  <div className="absolute grid place-items-center size-[85px] group-hover:-translate-y-[20px]">
                    <img
                      className="h-full"
                      src={item.image}
                      draggable={false}
                    />
                  </div>
                  <p className="absolute right-[15px] top-[15px] z-50 text-[12px] text-white font-semibold">
                    {item.quantity}x
                  </p>
                  <div className="absolute bottom-0 flex flex-col items-center w-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-[15px]">
                    <small className="leading-none uppercase text-[10px] text-white">
                      item
                    </small>
                    <p className="text-white uppercase text-[12px] font-bold">
                      {item.name}
                    </p>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </section>
  );
};
