import { Aside } from "./Aside";
import { ChatMessage } from "../interfaces/chatMessages";
import { ModalFrame } from "./Modals";
import { RoutesProvider } from "../providers/Routes";
import { listen } from "../hooks/listen";
import { useChatMessages } from "../pages/Dashboard/_stores/useChatMessages";
import { useEffect } from "react";
import { useModal } from "../stores/useModal";

const Interface = () => {
  const chat = useChatMessages();
  const modal = useModal();
  useEffect(() => {
    modal.close();
  }, []);
  listen<ChatMessage[]>("setChatMessages", chat.setList);
  return (
    <main className="w-[1628px] h-[878px] rounded-[20px] border border-solid border-[#868484] bg-[#101015] p-[50px] max-[1800px]:[zoom:0.8] max-[1440px]:[zoom:0.6] max-[1080px]:[zoom:0.5] flex gap-[25px] relative">
      <Aside />
      <RoutesProvider />
      {modal.visible && <ModalFrame />}
    </main>
  );
};

export default Interface;
