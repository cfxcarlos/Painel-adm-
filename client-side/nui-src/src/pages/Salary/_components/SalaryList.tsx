import { EmptySalaryCell, PopulatedSalaryCell } from "./SalaryCell";

import { useSalaries } from "../_stores/useSalaries";

export const SalaryList = () => {
  const salaries = useSalaries();
  return (
    <section className="w-[804px] h-full bg-white/2 rounded-[5px] pb-[9px] pr-[15px] pl-[15px] flex flex-col flex-none">
      <header
        className={"flex h-[55px] items-center w-full pl-[10px] flex-none"}
      >
        <p className="text-white uppercase font-semibold text-[13px] w-[157px]">
          grupo
        </p>
        <p className="text-white uppercase font-semibold text-[13px] w-[143px] text-center">
          salário
        </p>
        <p className="text-white uppercase font-semibold text-[13px] w-[62px] ml-[43px]">
          setados
        </p>
        <p className="text-white uppercase font-semibold text-[13px] w-[322px] text-right">
          ação
        </p>
      </header>
      <ul className="w-full h-full overflow-y-scroll scroll-visible flex flex-col gap-[15px] pr-[14px]">
        {salaries.list.length < 9 ? (
          <>
            {Array.from({ length: 9 }).map((_, index) => {
              if (salaries.list[index]) {
                return (
                  <PopulatedSalaryCell
                    data={salaries.list[index]}
                    index={index}
                    key={index}
                  />
                );
              } else return <EmptySalaryCell key={index} />;
            })}
          </>
        ) : (
          <>
            {salaries.list.map((data, index) => (
              <PopulatedSalaryCell data={data} index={index} key={index} />
            ))}
          </>
        )}
      </ul>
    </section>
  );
};
