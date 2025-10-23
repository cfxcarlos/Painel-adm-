export interface UserMessage {
  type: "user";
  date: string;
  image: string;
  message: string;
}

export interface NuserMessage {
  type: "nuser";
  author: string;
  date: string;
  image: string;
  message: string;
}

export type ChatMessage = UserMessage | NuserMessage;
