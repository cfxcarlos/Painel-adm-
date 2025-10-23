import { ChatMessage } from "../../../interfaces/chatMessages";
import { create } from "zustand";

interface ChatMessagesFrame {
  list: ChatMessage[];
  setList: (list: ChatMessage[]) => void;
}

export const useChatMessages = create<ChatMessagesFrame>((set: Function) => ({
  list: [],
  setList: (list: ChatMessage[]) => set({ list }),
}));
