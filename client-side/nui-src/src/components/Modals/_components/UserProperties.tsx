import { Property } from "../../../pages/Players/Main/_interfaces/property";
import { TempUserContext } from "../../../pages/Players/Main";
import clsx from "clsx";
import { emit } from "../../../hooks/emit";
import { useModal } from "../../../stores/useModal";

export const UserPropertiesModal = () => {
  const selectedUser = TempUserContext();
  const modal = useModal();
  return (
    <div className="w-[1428px] h-[707px] rounded-[10px] border border-solid border-[#3A3A3A] bg-neutral-900 absolute z-50 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex flex-col px-[45px] pb-[28px]">
      <button
        className="absolute right-[25px] top-[25px] hover:opacity-60"
        onClick={modal.close}
      >
        <Close />
      </button>
      <h1 className="font-bold text-white text-[45px] uppercase leading-tight pt-[45px] pb-[25px]">
        propriedades
      </h1>
      <ul
        className={clsx(
          "grid w-full h-full grid-cols-6 overflow-y-scroll gap-[15px]",
          modal.data.length > 6 && "place-items-center"
        )}
      >
        {modal.data.map((item: Property, index: number) => (
          <PropertyCell key={index} data={item} />
        ))}
        <button
          onClick={() => modal.setVisible("adduserproperty", selectedUser.data)}
          className="w-[209px] h-[270px] border border-solid border-white/5 grid place-items-center rounded-[5px] bg-white/1 hover:bg-white/5 active:scale-95"
        >
          <Add />
        </button>
      </ul>
    </div>
  );
};

const PropertyCell = ({ data }: { data: Property }) => {
  const selectedUser = TempUserContext();
  return (
    <li className="w-[209px] h-[270px] border border-solid border-white/5 rounded-[5px] bg-white/1 p-[15px] flex flex-col">
      <header className="flex flex-col">
        <p className="leading-tight uppercase text-[13px] text-white font-bold">
          {data.name}
        </p>
        <small className="leading-tight uppercase text-[10px] text-white">
          {data.street}
        </small>
      </header>
      <div className="w-full h-[58px] grid place-items-center my-auto">
        <Home />
      </div>
      <button
        onClick={() =>
          emit("removePropertyFromUser", {
            property: data,
            user: selectedUser.data,
          })
        }
        className="w-full h-[40px] uppercase border border-solid border-white/5 rounded-[5px] bg-white/1 text-[12px] text-white font-medium hover:bg-white/5 active:scale-95"
      >
        remover
      </button>
    </li>
  );
};

const Close = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 15L14 2M14 15L2 2" stroke="white" strokeWidth="3" />
  </svg>
);
const Home = () => (
  <svg
    width="67"
    height="58"
    viewBox="0 0 67 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M63.2599 32.5797C65.2375 32.5797 66.9824 30.9937 66.9824 28.9434C67.0988 27.9238 66.6334 27.0176 65.7028 26.2246L59.5606 20.957V7.25C59.5606 5.24492 57.8971 3.625 55.8381 3.625H52.1155C50.0565 3.625 48.393 5.24492 48.393 7.25V11.4074L36.0039 0.792969C35.306 0.226562 34.3753 0 33.561 0C32.7467 0 31.8161 0.113281 31.0018 0.90625L1.16329 26.2246C0.348988 27.0176 0 27.9238 0 28.9434C0 30.9824 1.62861 32.5797 3.72254 32.5797H7.44508V40.4754C7.43344 40.5773 7.43344 40.6793 7.43344 40.7926V53.4688C7.43344 55.9723 9.51574 58 12.0866 58H13.9479C14.0875 58 14.2271 57.9887 14.3667 57.9773C14.5412 57.9887 14.7157 58 14.8902 58H21.4046C23.9755 58 26.0578 55.9723 26.0578 53.4688V43.5C26.0578 41.4949 27.7213 39.875 29.7803 39.875H37.2254C39.2844 39.875 40.9479 41.4949 40.9479 43.5V53.4688C40.9479 55.9723 43.0302 58 45.6011 58H52.1737C52.3366 58 52.4994 58 52.6623 57.9887C52.7903 58 52.9182 58 53.0462 58H54.9074C57.4783 58 59.5606 55.9723 59.5606 53.4688V51.6336C59.5955 51.3391 59.6188 51.0332 59.6188 50.716L59.5374 32.5684H63.2599V32.5797Z"
      fill="white"
    />
  </svg>
);
const Add = () => (
  <svg
    width="56"
    height="57"
    viewBox="0 0 56 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 28.5H27.6667M27.6667 28.5H56M27.6667 28.5V57M27.6667 28.5V0"
      stroke="white"
      strokeOpacity="0.05"
      strokeWidth="12"
    />
  </svg>
);
