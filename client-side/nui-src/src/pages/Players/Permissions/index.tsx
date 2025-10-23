import { useEffect } from "react";
import { Header } from "./_components/Header";
import { PlayerList } from "./_components/PlayerList";
import { emit } from "../../../hooks/emit";
import { usePlayers } from "./_stores/usePlayers";

export const Permissions = () => {
  const players = usePlayers();
  useEffect(() => {
    emit("getGroupPlayersList", {}, [
      {
        name: "Enrique Marquez",
        id: 10,
        image: "",
        online: true,
        groups: ["admin", "cv", "vip"],
        role: "Administrador",
      },
      {
        name: "Guilherme Costa",
        id: 1,
        image: "",
        online: false,
        groups: [],
        role: "Fundador",
      },
      {
        name: "Gabriel Xisto",
        id: 5,
        image: "",
        online: true,
        groups: [],
        role: "Desenvolvedor",
      },
      {
        name: "Leadro Lil",
        id: 15,
        image: "",
        online: "26/04/2024 as 10:26:45 PM",
        groups: [],
        role: "Desenvolvedor",
      },
    ]).then(players.setList);
  }, []);
  return (
    <main className="flex flex-col w-full h-full gap-[16px] animate-fadeIn">
      <Header />
      <div className="flex h-full w-full gap-[25px]">
        <PlayerList />
      </div>
    </main>
  );
};
