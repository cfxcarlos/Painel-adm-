import { Chat } from "./_components/Chat";
import { Commands } from "./_components/Commands";
import { Notifications } from "./_components/Notifications";
import { ServerData } from "./_components/ServerData";

export const Dashboard = () => {
  return (
    <main className="flex flex-col w-full h-full gap-[16px] animate-fadeIn">
      <div className="h-[217px] w-full flex gap-[25px] flex-none">
        <ServerData />
        <Notifications />
      </div>
      <div className="w-full h-full">
        <div className="h-[526px] w-full flex gap-[25px] flex-none">
          <Commands />
          <Chat />
        </div>
      </div>
    </main>
  );
};
