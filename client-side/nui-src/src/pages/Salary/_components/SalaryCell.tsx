import { SalaryGroup } from "../../../interfaces/salary";
import clsx from "clsx";
import { useModal } from "../../../stores/useModal";
import { useSalariesSelector } from "../_stores/useSalaries";

export const PopulatedSalaryCell = ({
  data,
  index,
}: {
  data: SalaryGroup;
  index: number;
}) => {
  const selection = useSalariesSelector();
  const modal = useModal();
  return (
    <li
      onClick={
        selection.current === index
          ? () => selection.set(-1)
          : () => selection.set(index)
      }
      className={clsx(
        "w-[757px] h-[57px] cursor-pointer border-1 flex-none rounded-[5px] flex items-center pl-[15px]",
        selection.current === index
          ? "bg-white/5 border-white/5"
          : "bg-white/1 border-white/3"
      )}
    >
      <p className="text-white text-[13px] font-medium w-[152px]">
        {data.name}
      </p>
      <p className="text-white text-[13px] font-medium w-[143px] text-center">
        {data.salary.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p className="text-white text-[13px] font-medium w-[62px] ml-[43px] text-center">
        {data.members.length}
      </p>
      <button
        onClick={(e) => {
          if (selection.current === index) {
            e.stopPropagation();
          }
          modal.setVisible("editsalary", data);
        }}
        className="size-[26px] bg-white/5 rounded-full ml-[292.5px] hover:bg-white/10 grid place-items-center"
      >
        <Dots />
      </button>
    </li>
  );
};

const Dots = () => (
  <svg
    width="2"
    height="10"
    viewBox="0 0 2 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="1"
      cy="1"
      r="1"
      transform="matrix(-1 0 0 1 2 0)"
      fill="#D9D9D9"
    />
    <circle
      cx="1"
      cy="1"
      r="1"
      transform="matrix(-1 0 0 1 2 4)"
      fill="#D9D9D9"
    />
    <circle
      cx="1"
      cy="1"
      r="1"
      transform="matrix(-1 0 0 1 2 8)"
      fill="#D9D9D9"
    />
  </svg>
);

export const EmptySalaryCell = () => {
  return (
    <li className="w-[757px] h-[57px] border-1 border-white/5 flex-none rounded-[5px] grid place-items-center uppercase text-white/5 font-medium text-[20px]">
      vazio
    </li>
  );
};
