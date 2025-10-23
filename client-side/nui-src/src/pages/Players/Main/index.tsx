import { Header } from "./_components/Header";
import { Player } from "./_interfaces/players";
import { PlayerList } from "./_components/PlayerList";
import { SelectedPlayerHome } from "./_components/SelectedPlayerHome";
import { create } from "zustand";
import { emit } from "../../../hooks/emit";
import { useEffect } from "react";
import { usePlayers } from "./_stores/usePlayers";

interface TempData {
  data: undefined | Player;
  setData: (data: Player | undefined) => void;
}

export const TempUserContext = create<TempData>((set: Function) => ({
  data: undefined,
  setData: (data: Player | undefined) => set({ data }),
}));

export const PlayersMain = () => {
  const players = usePlayers();
  useEffect(() => {
    emit("getOnlinePlayersData", {}, [
      {
        name: "Enrique Marquez",
        id: 10,
        image: "",
        online: true,
        groups: ["admin", "cv", "vip"],
        stats: {
          health: 50,
          armour: 50,
          hunger: 50,
          thirst: 50,
        },
        gender: "male",
        phone: "756-642",
        role: "Administrador",
        registry: "MARQUEZZ",
        money: {
          wallet: 0,
          bank: 0,
        },
        vehicles: [
          {
            name: "Mitsubishi Lancer",
            spawn: "lancerx",
            plate: "gh374b3",
            image:
              "https://s3-alpha-sig.figma.com/img/f69d/420e/5f9139e473b023dd531812d478620c16?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EYS8Le6AI8Ly-RvIm3b2cqDPIlt7A-JyWXwLmF~2cqT6o0TrdscNR1k8hAZ7l5BsJlS4gvyUlTMJs-dhpsuEzWKcZaiWqBfgV245q0ZkTz8yEvevPfNEBRg8olnxogrX4DhBQpWF8tSE4XE1pnQ2336T7hCFjK0Xk3NbA-T7nC3os4e3c-4V-2PcwzYZq-jZwXX8DnCLRP6YVrJ3ZiYRX7DjsJnHwFUh6fWnJjsoI0kYFr1iBE98cuZ3TutTi2MskmkH8b-95Eez3Ybu11xSSLWkqCSRXHL8uGPjH4G2JC6tLHNP~vxfKdsILteowxcpU5~XvpEs4Dw22zAVm2xmTA__",
            attributes: {
              engine: 50,
              body: 50,
              gas: 50,
              trunk: 50,
            },
          },
          {
            name: "Tesla",
            spawn: "tesla",
            plate: "gh374b3",
            image:
              "https://s3-alpha-sig.figma.com/img/f69d/420e/5f9139e473b023dd531812d478620c16?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EYS8Le6AI8Ly-RvIm3b2cqDPIlt7A-JyWXwLmF~2cqT6o0TrdscNR1k8hAZ7l5BsJlS4gvyUlTMJs-dhpsuEzWKcZaiWqBfgV245q0ZkTz8yEvevPfNEBRg8olnxogrX4DhBQpWF8tSE4XE1pnQ2336T7hCFjK0Xk3NbA-T7nC3os4e3c-4V-2PcwzYZq-jZwXX8DnCLRP6YVrJ3ZiYRX7DjsJnHwFUh6fWnJjsoI0kYFr1iBE98cuZ3TutTi2MskmkH8b-95Eez3Ybu11xSSLWkqCSRXHL8uGPjH4G2JC6tLHNP~vxfKdsILteowxcpU5~XvpEs4Dw22zAVm2xmTA__",
            attributes: {
              engine: 50,
              body: 50,
              gas: 50,
              trunk: 50,
            },
          },
        ],
        items: [
          {
            name: "Energético",
            quantity: 1,
            spawn: "string",
            image:
              "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
          },
        ],
        properties: [
          {
            name: "ts-22",
            street: "Ohlone Avenue, 555",
          },
          {
            name: "mk-10",
            street: "Ohlone Avenue, 555",
          },
        ],
      },
      {
        name: "Guilherme Costa",
        id: 1,
        image: "",
        online: false,
        groups: [],
        stats: {
          health: 50,
          armour: 50,
          hunger: 50,
          thirst: 50,
        },
        gender: "male",
        phone: "756-642",
        role: "Fundador",
        registry: "BLACKNTW",
        money: {
          wallet: 0,
          bank: 0,
        },
        vehicles: [],
        items: [],
        properties: [],
      },
      {
        name: "Gabriel Xisto",
        id: 5,
        image: "",
        online: true,
        groups: [],
        stats: {
          health: 50,
          armour: 50,
          hunger: 50,
          thirst: 50,
        },
        gender: "male",
        phone: "756-642",
        role: "Desenvolvedor",
        registry: "3H12IK32",
        money: {
          wallet: 0,
          bank: 0,
        },
        vehicles: [],
        items: [],
        properties: [],
      },
      {
        name: "Leadro Lil",
        id: 15,
        image: "",
        online: "26/04/2024 as 10:26:45 PM",
        groups: [],
        stats: {
          health: 50,
          armour: 50,
          hunger: 50,
          thirst: 50,
        },
        gender: "male",
        phone: "756-642",
        role: "Desenvolvedor",
        registry: "2FAST",
        money: {
          wallet: 0,
          bank: 0,
        },
        vehicles: [],
        items: [],
        properties: [],
      },
    ]).then((response: any) => {
      players.setList(response);
      console.log(JSON.stringify(response));
    });
  }, []);
  return (
    <main className="flex flex-col w-full h-full gap-[15px]">
      <Header />
      <div className="flex h-full w-full gap-[25px]">
        <PlayerList />
        <SelectedPlayerHome />
      </div>
    </main>
  );
};
