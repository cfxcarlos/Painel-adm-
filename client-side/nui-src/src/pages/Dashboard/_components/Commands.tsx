import { Command, InputCommand } from "../../../interfaces/commands";
import { useEffect, useState } from "react";

import { emit } from "../../../hooks/emit";
import { useCommands } from "../_stores/useCommands";

export const Commands = () => {
  const data = useCommands();
  useEffect(() => {
    emit("getCommands", {}, [
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "A",
            event: "announce",
          },
          {
            name: "B",
            event: "announce",
          },
          {
            name: "C",
            event: "announce",
          },
          {
            name: "D",
            event: "announce",
          },
          {
            name: "E",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "Anunciar",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "Anunciar",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "Anunciar",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "Anunciar",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "Anunciar",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
      {
        type: "button",
        title: "Criar anúncio",
        components: [
          {
            name: "Anunciar",
            event: "announce",
          },
        ],
      },
      {
        type: "input",
        title: "Reviver",
        placeholder: "Digite aqui...",
        event: "god",
      },
    ]).then((response: any) => data.setList(response));
  }, []);
  return (
    <section className="flex flex-col gap-[15px] overflow-visible w-[729px]">
      <header className="flex flex-col gap-[5px] overflow-visible">
        <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible">
          Comandos
        </h1>
        <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
          <span className="text-white/35">Principal /</span> Dashboard
        </small>
      </header>
      <ul className="grid w-full h-full grid-cols-3 gap-[15px] overflow-y-scroll">
        {data.list.map((command: Command, index: number) => (
          <li
            key={index}
            className="flex-none h-[105px] w-[232px] bg-white/2 rounded-[5px] flex flex-col p-[15px] justify-between"
          >
            <p className="truncate text-[12px] text-white font-medium">
              {command.title}
            </p>
            <div className="w-full h-[32px] flex gap-[10px]">
              {command.type === "button" ? (
                <>
                  {command.components.map((data, index) => (
                    <Button data={data} key={index} />
                  ))}
                </>
              ) : (
                <Input data={command} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Button = ({ data }: { data: { name: string; event: string } }) => {
  return (
    <button
      onClick={() =>
        emit("executeCommand", {
          type: "button",
          event: data.event,
        })
      }
      className="rounded-[2px] w-full h-full bg-gradient-to-r from-white/5 to-white/10 p-[1px] hover:bg-white/5 active:scale-95"
    >
      <div className="rounded-[1px] grid w-full h-full leading-none bg-gradient-to-r from-black/25 to-black/30 place-items-center text-[12px] text-white font-extrabold">
        {data.name}
      </div>
    </button>
  );
};
const Input = ({ data }: { data: InputCommand }) => {
  const [value, setValue] = useState<string>("");
  const submit = () => {
    if (value !== "") {
      emit("executeCommand", {
        type: "input",
        content: value,
        event: data.event,
        tunnel: data.tunnel 
      });
      setValue("");
    }
  };
  return (
    <>
      <div className="rounded-[2px] w-full h-full bg-gradient-to-r from-white/5 to-white/10 p-[1px]">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-[1px] grid w-full h-full leading-none bg-gradient-to-r from-black/25 to-black/30 place-items-center text-[12px] text-white font-extrabold bg-transparent text-center placeholder:text-white/10 placeholder:font-medium"
          placeholder={data.placeholder}
        />
      </div>
      <button
        onClick={submit}
        className="rounded-[2px] flex-none size-[32px] bg-gradient-to-r from-white/5 to-white/10 p-[1px] hover:bg-white/5 active:scale-95"
      >
        <div className="rounded-[1px] grid w-full h-full leading-none bg-gradient-to-r from-black/25 to-black/30 place-items-center text-[12px] text-white font-extrabold">
          <Chevron />
        </div>
      </button>
    </>
  );
};

const Chevron = () => (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 11L6 6L1 1" stroke="white" strokeWidth="2" />
  </svg>
);
