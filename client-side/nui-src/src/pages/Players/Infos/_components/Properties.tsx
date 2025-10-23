import { Player } from "../../Main/_interfaces/players";
import { Property } from "../../Main/_interfaces/property";
import { emit } from "../../../../hooks/emit";
import { useModal } from "../../../../stores/useModal";

export const Properties = ({
  data,
  owner,
}: {
  data: Property[];
  owner: Player;
}) => {
  const modal = useModal();
  return (
    <section className="w-[563px] h-[347px] bg-white/2 flex-none rounded-[5px]">
      <header className="flex-none w-full h-[58px] flex items-center justify-between pl-[15px] pr-[20px] bg-white/1 border-1 border-transparent border-b-white/5">
        <p className="text-white uppercase font-bold text-[13px]">
          propriedades do jogador
        </p>
        <button
          onClick={() => modal.setVisible("userproperties", data)}
          className="uppercase text-white/10 text-[13px] font-bold hover:text-white/25"
        >
          ver tudo
        </button>
      </header>
      <div className="w-full h-full p-[25px]">
        <ul className="w-full h-full flex gap-[15px]">
          {data.length < 3 ? (
            <>
              {Array.from({ length: 3 }).map((_, index: number) => {
                if (data[index]) {
                  return (
                    <li
                      className="h-[239px] w-[161px] bg-white/1 border-1 border-white/5 rounded-[4px] flex flex-col items-center p-[15px]"
                      key={index}
                    >
                      <header className="flex flex-col gap-[5px] w-full mb-[49px]">
                        <h1 className="text-white text-[13px] font-bold uppercase leading-tight">
                          {data[index].name}
                        </h1>
                        <h2 className="text-[10px] text-white">
                          {data[index].street}
                        </h2>
                      </header>
                      <Home />
                      <button
                        onClick={() =>
                          emit("removeProperty", {
                            owner,
                            property: data[index],
                          })
                        }
                        className="w-full h-[28px] border-1 border-white/5 bg-gradient-to-r from-white/5 to-white/3 rounded-[5px] hover:bg-white/5 mt-[51px] text-[10px] font-medium text-white uppercase active:scale-95"
                      >
                        remover
                      </button>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="h-[239px] w-[161px] bg-white/1 border-1 border-white/5 rounded-[4px]"
                      key={index}
                    />
                  );
                }
              })}
            </>
          ) : (
            <>
              {data.slice(0, 3).map((property: Property, index: number) => (
                <li
                  className="h-[239px] w-[161px] bg-white/1 border-1 border-white/5 rounded-[4px] flex flex-col items-center p-[15px]"
                  key={index}
                >
                  <header className="flex flex-col gap-[5px] w-full mb-[49px]">
                    <h1 className="text-white text-[13px] font-bold uppercase leading-tight">
                      {property.name}
                    </h1>
                    <h2 className="text-[10px] text-white">
                      {property.street}
                    </h2>
                  </header>
                  <Home />
                  <button
                    onClick={() =>
                      emit("removeProperty", {
                        owner,
                        property,
                      })
                    }
                    className="w-full h-[28px] border-1 border-white/5 bg-gradient-to-r from-white/5 to-white/3 rounded-[5px] hover:bg-white/5 mt-[51px] text-[10px] font-medium text-white uppercase active:scale-95"
                  >
                    remover
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </section>
  );
};

const Home = () => (
  <svg
    width="53"
    height="46"
    viewBox="0 0 53 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.0414 25.8391C51.6058 25.8391 52.9861 24.5812 52.9861 22.9551C53.0781 22.1465 52.71 21.4277 51.9739 20.7988L47.1151 16.6211V5.75C47.1151 4.15977 45.7992 2.875 44.1704 2.875H41.2257C39.5969 2.875 38.281 4.15977 38.281 5.75V9.04727L28.4807 0.628906C27.9286 0.179688 27.1924 0 26.5483 0C25.9041 0 25.1679 0.0898438 24.5238 0.71875L0.920217 20.7988C0.276065 21.4277 0 22.1465 0 22.9551C0 24.5723 1.2883 25.8391 2.94469 25.8391H5.88939V32.1012C5.88019 32.182 5.88019 32.2629 5.88019 32.3527V42.4062C5.88019 44.3918 7.52738 46 9.56106 46H11.0334C11.1438 46 11.2543 45.991 11.3647 45.982C11.5027 45.991 11.6407 46 11.7788 46H16.932C18.9657 46 20.6129 44.3918 20.6129 42.4062V34.5C20.6129 32.9098 21.9288 31.625 23.5576 31.625H29.4469C31.0757 31.625 32.3916 32.9098 32.3916 34.5V42.4062C32.3916 44.3918 34.0388 46 36.0725 46H41.2717C41.4006 46 41.5294 46 41.6582 45.991C41.7595 46 41.8607 46 41.9619 46H43.4342C45.4679 46 47.1151 44.3918 47.1151 42.4062V40.9508C47.1427 40.7172 47.1611 40.4746 47.1611 40.223L47.0967 25.8301H50.0414V25.8391Z"
      fill="white"
    />
  </svg>
);
