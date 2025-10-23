import { DashedProgress } from "../../../../components/DashedProgress";
import { Player } from "../../Main/_interfaces/players";
import { useModal } from "../../../../stores/useModal";
import { useNavigate } from "react-router-dom";

export const Informations = ({ data }: { data: Player }) => {
  const navigate = useNavigate();
  const modal = useModal();
  return (
    <section className="w-[627px] h-full bg-white/2 flex-none rounded-[5px]">
      <header className="flex-none w-full h-[58px] flex items-center justify-between pl-[15px] pr-[20px] bg-white/1 border-1 border-transparent border-b-white/5">
        <button
          onClick={() => navigate("/players")}
          className="group flex items-center gap-[10px]"
        >
          <div className="bg-red-400 group-hover:bg-red-500 size-[26px] rounded-[4px] grid place-items-center">
            <Return />
          </div>
          <p className="text-white uppercase font-bold text-[13px]">
            informações do jogador
          </p>
        </button>
        <div>
          {typeof data.online === "boolean" && data.online && (
            <div className="flex items-center gap-[5px]">
              <div className="size-[6px] rounded-full bg-green-300" />
              <p className="text-[13px] text-white font-medium leading-none">
                Online
              </p>
            </div>
          )}
          {typeof data.online === "boolean" && !data.online && (
            <div className="flex items-center gap-[5px]">
              <div className="size-[6px] rounded-full bg-red-400" />
              <p className="text-[13px] text-white/10 font-medium leading-none">
                Offline
              </p>
            </div>
          )}
          {typeof data.online === "string" && (
            <p className="text-[13px] text-white font-medium leading-none">
              <span className="font-bold">Offline desde:</span> {data.online}
            </p>
          )}
        </div>
      </header>
      <div className="w-full h-full p-[15px]">
        <div className="flex w-full h-[155px] gap-[15px]">
          <div className="h-full w-[334px] flex flex-col pl-[10px] overflow-visible gap-[13px] items-start">
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">Nome do Personagem: </span>
              {data.name}
            </p>
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">Gênero: </span>
              {data.gender === "male" && "Masculino"}
              {data.gender === "female" && "Feminino"}
            </p>
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">Número de Telefone: </span>
              {data.phone}
            </p>
            <button
              onClick={() => modal.setVisible("usergroups", data)}
              className="px-[10px] bg-white hover:bg-neutral-300 rounded-[5px] h-[32px] text-[10px] text-neutral-950 uppercase font-extrabold"
            >
              ver grupos
            </button>
          </div>
          <div className="h-full w-[239px] flex flex-col pl-[10px] overflow-visible gap-[13px] items-start">
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">ID de Registro: </span>
              {String(data.id).padStart(2, "0")}
            </p>
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">Carteira: </span>
              {data.money.wallet.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">Banco: </span>
              {data.money.bank.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="truncate text-white text-[15px] w-full">
              <span className="font-bold">Registro: </span>
              {data.registry}
            </p>
          </div>
        </div>
        <footer className="w-full bg-white/1 border-1 border-white/5 h-[109px] rounded-[2px] grid grid-cols-2 p-[15px] gap-x-[25px] gap-y-[15px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-white text-[15px] leading-none">
              <span className="font-bold">Saúde:</span> {data.stats.health}%
            </p>
            <DashedProgress
              height={4}
              width={271}
              color="#A0FFA4"
              value={data.stats.health}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-white text-[15px] leading-none">
              <span className="font-bold">Colete:</span> {data.stats.armour}%
            </p>
            <DashedProgress
              height={4}
              width={271}
              color="#D5A0FF"
              value={data.stats.armour}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-white text-[15px] leading-none">
              <span className="font-bold">Fome:</span> {data.stats.hunger}%
            </p>
            <DashedProgress
              height={4}
              width={271}
              color="#FFB951"
              value={data.stats.hunger}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-white text-[15px] leading-none">
              <span className="font-bold">Sede:</span> {data.stats.thirst}%
            </p>
            <DashedProgress
              height={4}
              width={271}
              color="#A0E8FF"
              value={data.stats.thirst}
            />
          </div>
        </footer>
      </div>
    </section>
  );
};

const Return = () => (
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.49996 11.25C5.73021 11.2503 5.95488 11.174 6.13487 11.032L6.13492 11.0319C6.2364 10.9518 6.32105 10.8528 6.38344 10.7401C6.44585 10.6274 6.4846 10.5035 6.49699 10.3756C6.50938 10.2476 6.4951 10.1186 6.45517 9.9963C6.41526 9.87404 6.35067 9.76124 6.26571 9.66413C6.26569 9.6641 6.26567 9.66407 6.26564 9.66405L3.90564 6.96467H12.25C12.5114 6.96467 12.7644 6.8659 12.9527 6.68652C13.1415 6.50674 13.25 6.26023 13.25 6.00045C13.25 5.74067 13.1415 5.49415 12.9527 5.31437C12.7644 5.13499 12.5114 5.03622 12.25 5.03622H3.90564L6.26571 2.33677L6.26585 2.33661C6.43735 2.14012 6.52167 1.88426 6.4966 1.62537C6.47155 1.36663 6.33986 1.13116 6.13516 0.96914C5.93087 0.807439 5.66977 0.731102 5.40919 0.75398C5.14862 0.776858 4.90538 0.897526 4.73429 1.09347C4.73424 1.09352 4.7342 1.09357 4.73415 1.09362L0.984363 5.37871L0.977635 5.3864L0.971557 5.39461C0.938915 5.43871 0.909652 5.48514 0.884039 5.53353L0.865821 5.56795L0.850207 5.57857L0.821604 5.64748C0.775344 5.75892 0.750974 5.87794 0.750008 5.99844L0.749976 5.99844L0.750008 6.00245C0.75085 6.10753 0.769488 6.21148 0.804918 6.31026C0.808201 6.33773 0.815574 6.37284 0.831889 6.40836C0.852795 6.45386 0.881961 6.48863 0.910946 6.51523C0.929599 6.54654 0.949829 6.57693 0.971557 6.60628L0.977635 6.61449L0.984363 6.62218L4.73432 10.9075C4.73434 10.9075 4.73435 10.9075 4.73436 10.9075C4.82923 11.016 4.94723 11.1023 5.07945 11.1612C5.21154 11.22 5.35506 11.2502 5.49996 11.25ZM5.49996 11.25C5.49982 11.25 5.49968 11.25 5.49954 11.25L5.5 11L5.50039 11.25C5.50024 11.25 5.5001 11.25 5.49996 11.25Z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
    />
  </svg>
);
