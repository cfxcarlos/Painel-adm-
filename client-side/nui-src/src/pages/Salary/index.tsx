import { Header } from "./_components/Header";
import { SalaryGroup } from "../../interfaces/salary";
import { SalaryInfo } from "./_components/SalaryInfo";
import { SalaryList } from "./_components/SalaryList";
import { emit } from "../../hooks/emit";
import { listen } from "../../hooks/listen";
import { useEffect } from "react";
import { useSalaries } from "./_stores/useSalaries";

export const Salary = () => {
  const salary = useSalaries();
  useEffect(() => {
    emit("getSalaries", {}, [
      {
        name: "Paramédico",
        group: "paramedic",
        members: [
          1, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100,
        ],
        salary: 15000,
      },
      {
        name: "Polícia",
        group: "police",
        members: [
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7, 100, 2, 3, 4, 5, 6, 7,
          100,
        ],
        salary: 25000,
      },
    ]).then(salary.setList);
  }, []);
  listen<SalaryGroup[]>("setSalaries", salary.setList);
  return (
    <main className="flex flex-col w-full h-full gap-[16px] animate-fadeIn">
      <Header />
      <div className="flex w-full h-full gap-[25px]">
        <SalaryList />
        <SalaryInfo />
      </div>
    </main>
  );
};
