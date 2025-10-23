import { useSalaries, useSalariesSelector } from "../_stores/useSalaries";

import clsx from "clsx";

export const SalaryInfo = () => {
  const selection = useSalariesSelector();
  const salary = useSalaries();
  const data = salary.list[selection.current];
  return (
    <section
      className={clsx(
        "w-full h-full bg-white/2 rounded-[5px]",
        !data && "opacity-0"
      )}
    >
      {data && (
        <>
          <header className="w-full h-[109px] flex flex-col gap-[5px] justify-center pl-[25px]">
            <h1 className="text-[25px] font-extrabold text-white leading-none overflow-visible">
              {data.name}
            </h1>
            <h2 className="text-white text-[15px] font-medium leading-none overflow-visible">
              Permissão
            </h2>
          </header>
          <div className="w-full pr-[12px] gap-[22px] pl-[25px] flex flex-col">
            <p className="text-[15px] font-medium text-white leading-tight flex-none">
              ID'S Registrados
            </p>
            <div className="w-full h-[575px] pb-[25px]">
              <div
                className={clsx(
                  "grid w-full max-h-full grid-cols-3 gap-[17px]",
                  data.members.length > 27 &&
                    "overflow-y-scroll scroll-visible pr-[12px]"
                )}
              >
                {data.members.map((id, index) => (
                  <div
                    key={index}
                    className="h-[35px] w-[104px] bg-white/1 hover:bg-white/3 rounded-[5px] border-1 border-white/5 grid place-items-center text-[12px] text-white font-medium leading-none"
                  >
                    {id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
