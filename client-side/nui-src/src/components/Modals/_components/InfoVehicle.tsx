import { Vehicle } from "../../../interfaces/vehicles";
import { useModal } from "../../../stores/useModal";

export const InfoVehicleModal = () => {
  const modal = useModal();
  return (
    <div className="flex flex-col justify-between absolute z-50 w-[1354px] h-[551px] bg-zinc-900 border-1 border-white/10 rounded-[10px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <button
        className="absolute right-[27px] top-[27px]"
        onClick={() => modal.close()}
      >
        <Close />
      </button>

      {modal.data && (
        <>
          <header className="px-[45px] pt-[45px] flex flex-col overflow-visible w-full">
            <p className="text-[20px] text-white font-medium uppercase tracking-[20px]">
              veículo
            </p>
            <h1 className="text-[120px] leading-none overflow-visible uppercase text-white font-extrabold truncate">
              {(modal.data as Vehicle).name}
            </h1>
          </header>
          <ul className="pl-[45px] pb-[52px] flex flex-col gap-[16px] w-[368px]">
            <Attribute
              title="motor"
              value={(modal.data as Vehicle).attributes.engine}
            />
            <Attribute
              title="lataria"
              value={(modal.data as Vehicle).attributes.body}
            />
            <Attribute
              title="combustível"
              value={(modal.data as Vehicle).attributes.gas}
            />
            <Attribute
              title="porta-malas"
              value={(modal.data as Vehicle).attributes.trunk}
            />
          </ul>
          <img
            className="max-w-[841px] max-h-[296px] absolute right-[39px] bottom-[54px]"
            src={(modal.data as Vehicle).image}
            draggable={false}
            alt="Vehicle Image"
          />
        </>
      )}
    </div>
  );
};

const Attribute = ({ title, value }: { title: string; value: number }) => {
  return (
    <li className="flex flex-col w-full gap-[10px]">
      <div className="flex items-center justify-between">
        <p className="text-white text-[13px] font-extrabold uppercase">
          {title}
        </p>
        <p className="text-[10px] text-white font-semibold leading-none uppercase">
          {value}
          {title === "porta-malas" ? "kg" : "%"}
        </p>
      </div>
      <div className="w-full h-[32px] rounded-[5px] border-1 border-white/5 flex items-center px-[14px]">
        <div className="w-full h-[4px] bg-white/5 rounded-full flex items-center overflow-visible">
          <div
            style={{
              width: `${value}%`,
            }}
            className="relative flex items-center h-full overflow-visible bg-white"
          >
            <Pin />
          </div>
        </div>
      </div>
    </li>
  );
};

const Pin = () => (
  <svg
    className="absolute right-0 translate-x-1/2"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5.96046e-08"
      y="1.41421"
      width="11"
      height="11"
      rx="3"
      transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 9.36401 17.2782)"
      fill="white"
      stroke="#333238"
      strokeWidth="2"
    />
  </svg>
);
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
