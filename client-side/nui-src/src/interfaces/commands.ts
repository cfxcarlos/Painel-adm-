export interface ButtonCommand {
  type: "button";
  title: string;
  components: {
    name: string;
    event: string;
  }[];
}

export interface InputCommand {
  type: "input";
  title: string;
  placeholder: string;
  event: string;
  tunnel: string 
}

export type Command = ButtonCommand | InputCommand;
