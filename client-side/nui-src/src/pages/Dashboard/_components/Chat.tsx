import { ChatMessage, NuserMessage } from "../../../interfaces/chatMessages";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { debugData } from "../../../utils/debugData";
import { emit } from "../../../hooks/emit";
import { isEnvBrowser } from "../../../utils/misc";
import { useChatMessages } from "../_stores/useChatMessages";

export const Chat = () => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    debugData([
      {
        action: "setChatMessages",
        payload: [
          {
            type: "user",
            date: "Hoje ás 12:13",
            image:
              "https://s3-alpha-sig.figma.com/img/f0d8/c4d3/6907b3972cc0c2bcb150ee0de889c782?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LalX1oIDGOzXFY46Kk3m67M3B3leoJhoIPiG0ozGLTWkbloe8wkZSkmGW28t3MPAljYJeOtr1qgQJcMOTKfLhg~RjoI3Gacy0mvt1~4E2n4iS6O3CC6kbLQ44Jej1yT6iKS2GZyWafSla67xd9Joq7dyT9mkDmgYxvB-K~PM-GMPeBqm1DwkT52xTrn-wHZ4PDy8Cd6gvU0hLzevEhmMi34IQka0U6m~fT7kcIpF8YQjF6T09nhOPgolApS2dXgqdzzuQJwjvMQdDPJk9~VrRAp~UAJed7~075TuXOFuif5iHXeh0ATjj76Mw7KElxCW-Id1ExZQp2LLCBbeRmuEuQ__",
            message: "In ea aute reprehenderit id aliquip.",
          },
          {
            type: "nuser",
            author: "AGS",
            date: "Hoje ás 12:13",
            image:
              "https://s3-alpha-sig.figma.com/img/8f97/dd76/f278a131df85685c556bb2cbccd2260a?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JDkoTf~Nw4Fh7C9Q39dyWXMlYsd4QvGRRw5DbNrzC0vUZFwU48Kv6KG2ce8C57NnmbFDgT4-9wfXH2Lg9brHQ4adGv7smxTYOMXQ3iP5Yv8wSR9NH82Eq1jQs08UHFG2mh01QlGoIeJbQNdo6~AEFLLuuIa9su33S~bo5A6z1vvbV2ftTx9ohzGifQdhgDz2oupFFUiVW~~GeapdDOZ~sNE-oN58W4-TeEqyfyl4a15rf4JpXZkoEi31SxNJh4JbBvssAEId7rZ11v33SeVEe6fd5Jc22lf7px1iZChs-IgiQHBP6CGEpB6NrK12NGbvPGWD8ea8zneZ1huQ-pW1sQ__",
            message:
              "Culpa minim laboris minim ea commodo aliqua pariatur minim culpa consectetur ipsum et.",
          },
          {
            type: "user",
            date: "Hoje ás 12:13",
            image:
              "https://s3-alpha-sig.figma.com/img/f0d8/c4d3/6907b3972cc0c2bcb150ee0de889c782?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LalX1oIDGOzXFY46Kk3m67M3B3leoJhoIPiG0ozGLTWkbloe8wkZSkmGW28t3MPAljYJeOtr1qgQJcMOTKfLhg~RjoI3Gacy0mvt1~4E2n4iS6O3CC6kbLQ44Jej1yT6iKS2GZyWafSla67xd9Joq7dyT9mkDmgYxvB-K~PM-GMPeBqm1DwkT52xTrn-wHZ4PDy8Cd6gvU0hLzevEhmMi34IQka0U6m~fT7kcIpF8YQjF6T09nhOPgolApS2dXgqdzzuQJwjvMQdDPJk9~VrRAp~UAJed7~075TuXOFuif5iHXeh0ATjj76Mw7KElxCW-Id1ExZQp2LLCBbeRmuEuQ__",
            message:
              "Ea ipsum non cillum amet magna laborum consequat minim ex proident occaecat duis.",
          },
        ],
      },
    ]);
  }, []);
  const [input, setInput] = useState<string>("");
  const submitMessage = () => {
    if (input !== "") {
      if (isEnvBrowser()) {
        const newMessage: ChatMessage = {
          type: "user",
          date: "Agora",
          image:
            "https://s3-alpha-sig.figma.com/img/f0d8/c4d3/6907b3972cc0c2bcb150ee0de889c782?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LalX1oIDGOzXFY46Kk3m67M3B3leoJhoIPiG0ozGLTWkbloe8wkZSkmGW28t3MPAljYJeOtr1qgQJcMOTKfLhg~RjoI3Gacy0mvt1~4E2n4iS6O3CC6kbLQ44Jej1yT6iKS2GZyWafSla67xd9Joq7dyT9mkDmgYxvB-K~PM-GMPeBqm1DwkT52xTrn-wHZ4PDy8Cd6gvU0hLzevEhmMi34IQka0U6m~fT7kcIpF8YQjF6T09nhOPgolApS2dXgqdzzuQJwjvMQdDPJk9~VrRAp~UAJed7~075TuXOFuif5iHXeh0ATjj76Mw7KElxCW-Id1ExZQp2LLCBbeRmuEuQ__",
          message: input,
        };
        data.setList([...data.list, newMessage]);
      } else {
        emit("sendChatMessage", {
          content: input,
        });
      }
      setInput("");
    }
  };
  const data = useChatMessages();
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [data.list]);
  return (
    <section className="flex flex-col gap-[15px] overflow-visible w-[475px]">
      <header className="flex flex-col gap-[5px] overflow-visible">
        <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible">
          Chat Staff
        </h1>
        <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
          <span className="text-white/35">Principal /</span> Dashboard
        </small>
      </header>
      <div className="h-[464px] w-full bg-white/2 rounded-[5px] flex flex-col">
        <header className="leading-none w-full h-[48px] bg-white/1 border-1 border-transparent border-b-white/5 flex items-center gap-[10px] pl-[20px]">
          <Icon />
          <p className="text-[13px] text-white font-medium leading-tight">
            chat-geral
          </p>
        </header>
        <div
          ref={chatRef}
          className="flex flex-col items-start w-full h-full gap-[20px] px-[15px] py-[15px] overflow-y-scroll"
        >
          {data.list.map((message: ChatMessage, index) => (
            <MessageCell key={index} data={message} />
          ))}
        </div>
        <footer className="border-transparent border-1 border-t-white/5 w-full bg-white/2 flex items-center py-[15px] px-[10px]">
          <div className="w-full h-[36px] bg-gradient-to-r from-white/2 to-white/1 border-1 border-white/5 rounded-[3px] flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={({ key }) => {
                if (key === "Enter") submitMessage();
              }}
              type="text"
              className="w-full h-full bg-transparent pl-[11px] text-[12px] font-medium text-white/80 placeholder:text-white/10"
              placeholder="Conversar em #chat-geral"
            />
            <button
              onClick={submitMessage}
              className="h-full px-[11px] flex-none"
            >
              <SendIcon />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

const Icon = () => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9858 12.1384L13.2287 12.1977C13.206 12.291 13.1653 12.3792 13.1088 12.4569C13.0522 12.5346 12.9808 12.6005 12.8983 12.65C12.8157 12.6996 12.724 12.7318 12.6284 12.7442C12.5329 12.7566 12.4359 12.749 12.3435 12.7219C12.251 12.6948 12.1654 12.6489 12.0914 12.5874C12.0183 12.5268 11.9581 12.4522 11.9138 12.3683C10.8691 10.4928 9.03147 9.38258 7 9.38258C4.96852 9.38258 3.13088 10.4928 2.08619 12.3683C2.04186 12.4522 1.98168 12.5268 1.90864 12.5874L1.74889 12.3951L1.90864 12.5874C1.83463 12.6489 1.74896 12.6948 1.65653 12.7219C1.56407 12.749 1.46712 12.7566 1.37156 12.7442C1.27601 12.7318 1.18427 12.6996 1.10174 12.65C1.10174 12.65 1.10174 12.65 1.10174 12.65L1.23047 12.4357L12.9858 12.1384ZM12.9858 12.1384L13.2287 12.1976C13.2515 12.1043 13.256 12.0073 13.2421 11.9123C13.2284 11.8184 13.1969 11.7278 13.1491 11.6458M12.9858 12.1384L13.1491 11.6458M13.1491 11.6458C12.3266 10.1684 11.0979 9.06553 9.65298 8.4577C10.2889 7.95897 10.7842 7.28873 11.0828 6.51714C11.4413 5.5911 11.4974 4.56884 11.2429 3.60678C10.9883 2.64465 10.4366 1.79419 9.67052 1.18708C8.90423 0.579837 7.96605 0.25 7 0.25C6.03395 0.25 5.09577 0.579837 4.32948 1.18708C3.56337 1.79419 3.01169 2.64465 2.75714 3.60678C2.50262 4.56884 2.55874 5.5911 2.91718 6.51714C3.21582 7.28868 3.711 7.95889 4.34689 8.45761C2.90199 9.06501 1.67338 10.1679 0.850934 11.6458L13.1491 11.6458ZM4.52663 3.08749C4.1982 3.59863 4.02235 4.20055 4.02235 4.81708L4.52663 3.08749ZM4.52663 3.08749C4.855 2.57643 5.32072 2.17963 5.86373 1.94573M4.52663 3.08749L5.86373 1.94573M5.86373 1.94573C6.40662 1.71188 7.0034 1.65086 7.57904 1.76994M5.86373 1.94573L7.57904 1.76994M7.57904 1.76994C8.15476 1.88902 8.68498 2.18324 9.10209 2.617M7.57904 1.76994L9.10209 2.617M9.10209 2.617C9.51931 3.05087 9.80447 3.60481 9.92009 4.20926M9.10209 2.617L9.92009 4.20926M9.92009 4.20926C10.0357 4.81375 9.97629 5.44022 9.74971 6.00907M9.92009 4.20926L9.74971 6.00907M9.74971 6.00907C9.52316 6.57785 9.14013 7.06242 8.65053 7.40262M9.74971 6.00907L8.65053 7.40262M8.65053 7.40262C8.16115 7.74267 7.58688 7.92353 7.00028 7.92359M8.65053 7.40262L7.00028 7.92359M7.00028 7.92359C6.21396 7.92272 5.45802 7.59759 4.89892 7.01616C4.33955 6.43447 4.02326 5.64379 4.02235 4.81711L7.00028 7.92359Z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
    />
  </svg>
);
const SendIcon = () => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 14V8.75L5.05263 7L0 5.25V0L12 7L0 14Z" fill="white" />
  </svg>
);

const MessageCell = ({ data }: { data: ChatMessage }) => {
  return (
    <div
      className={clsx(
        "animate-fadeIn flex items-start gap-[10px] max-w-[301px] flex-none",
        data.type === "user" && "self-end"
      )}
    >
      <img
        className="size-[41px] object-cover rounded-full flex-none"
        src={data.image}
        draggable={false}
      />
      <div className="flex flex-col gap-[3px]">
        <header className="flex items-center gap-[6px] text-[15px] text-white/85 font-extrabold leading-tight">
          {data.type === "user" ? "Você" : (data as NuserMessage).author}{" "}
          <span className="font-normal text-[10px] text-white/55">
            {data.date}
          </span>
        </header>
        <p className="text-[13px] leading-tight text-white">{data.message}</p>
      </div>
    </div>
  );
};
