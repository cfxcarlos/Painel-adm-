import { emit } from "../../../hooks/emit";
import { useEffect, useState } from "react";

interface NotificationsProps {
  id: string | number;
  message: string;
  data: string;
}

export const Notifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelet, setShowModalDelet] = useState(false);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | number | null>(null);

  const OpenModal = () => setShowModal(true);
  const ExitModal = () => setShowModal(false);

  const handleSave = () => {
    emit("saveMessage", { message }).then((resp: any) => {
      setNotifications(resp);
    });
    ExitModal();
  };

  useEffect(() => {
    emit("getAllNotifications", {}).then((resp: any) => {
      setNotifications(resp);
    });
  }, []);

  return (
    <section className="flex flex-col gap-[15px] overflow-visible w-[395px]">
      <header className="flex items-center justify-between gap-[5px] overflow-visible">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-white text-[25px] font-semibold leading-none overflow-visible">
            Notificações
          </h1>
          <small className="leading-none overflow-visible text-white/55 text-[10px] font-semibold">
            <span className="text-white/35">Principal /</span> Dashboard
          </small>
        </div>
        <div className="flex items-center gap-[.5vw]">
          <button
            className="w-[2vw] h-[2vw] flex items-center justify-center"
            onClick={OpenModal}
          >
            <IconAdd />
          </button>
        </div>
      </header>
      <ul className="flex w-full flex-col h-[155px] gap-[15px] overflow-y-scroll">
        {notifications.map((notify) => (
          <li
            key={notify.id}
            className={`py-[15px] flex-none pl-[15px] flex items-center justify-between bg-white/2 min-h-[70px] rounded-[5px]`}
          >
            <div className="flex flex-col gap-[3px]">
              <p className="font-extrabold text-white text-[15px] leading-tight">
                {notify.message}
              </p>
              <small className="text-[10px] text-white/15 font-bold">
                {notify.data}
              </small>
            </div>
            <div className="w-[40px] flex-none h-full grid place-items-center">
              <button onClick={() => {
                emit("deleteMessage", { notifyId: notify.id }).then((response: any) => {
                  setNotifications(response);
                })
              }}>
                <IconDell />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <ModalAdd
          message={message}
          setMessage={setMessage}
          handleSave={handleSave}
          ExitModal={ExitModal}
        />
      )}
    </section>
  );
};

const ModalAdd = ({
  message,
  setMessage,
  handleSave,
  ExitModal,
}: {
  message: string;
  setMessage: (value: string) => void;
  handleSave: () => void;
  ExitModal: () => void;
}) => {
  return (
    <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[25px]">
        <h1 className="text-white uppercase text-[1vw] font-extrabold">Avisos</h1>
        <p className="text-white/50 text-[.8vw]">Preencha o formulário abaixo</p>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-[15px] font-medium text-white placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
          type="text"
          placeholder="Mensagem"
        />
        <div className="flex gap-[15px] h-[48px]">
          <button
            onClick={ExitModal}
            className="w-[202px] h-full bg-white/2 rounded-[5px] border-1 border-white/10 text-white/10 text-[15px] font-extrabold uppercase"
          >
            Voltar
          </button>
          <button
            onClick={handleSave}
            className="w-[265px] h-full bg-white/2 rounded-[5px] border-1 border-white/10 text-white/10 text-[15px] font-extrabold uppercase"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const Icon = () => (
  <svg
    width="5"
    height="18"
    viewBox="0 0 5 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 0L4.53572 12.1846H0.464383L0.000107568 0H5ZM2.50005 18C1.80959 18 1.21734 17.7663 0.723306 17.299C0.235222 16.826 -0.00584462 16.2519 0.000107568 15.5769C-0.00584462 14.9192 0.235222 14.3567 0.723306 13.8894C1.21734 13.4221 1.80959 13.1885 2.50005 13.1885C3.1548 13.1885 3.73217 13.4221 4.23216 13.8894C4.7381 14.3567 4.99405 14.9192 5 15.5769C4.99405 16.0269 4.87203 16.4365 4.63394 16.8058C4.4018 17.1692 4.09823 17.4606 3.72324 17.6798C3.34825 17.8933 2.94052 18 2.50005 18Z"
      fill="white"
    />
  </svg>
);

const IconAdd = () => {
  return (
    <svg width="1vw" height="1vw" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C10.3009 0.0448832 6.76598 1.53429 4.15013 4.15013C1.53429 6.76598 0.0448832 10.3009 0 14C0.0448832 17.6991 1.53429 21.234 4.15013 23.8499C6.76598 26.4657 10.3009 27.9551 14 28C17.6991 27.9551 21.234 26.4657 23.8499 23.8499C26.4657 21.234 27.9551 17.6991 28 14C27.9551 10.3009 26.4657 6.76598 23.8499 4.15013C21.234 1.53429 17.6991 0.0448832 14 0ZM22 15H15V22H13V15H6V13H13V6H15V13H22V15Z"
        fill="white" />
    </svg>
  )
}

const IconDell = () => {
  return (
    <svg width=".8vw" height=".8vw" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="white" />
    </svg>
  )
}
