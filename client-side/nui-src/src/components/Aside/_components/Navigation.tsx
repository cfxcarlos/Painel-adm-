import { useLocation, useNavigate } from "react-router-dom";

import clsx from "clsx";
import { useState } from "react";

export const Navigation = () => {
  const [lastVisitedPage, setLastVisitedPage] = useState<string>("");
  const navigation = useNavigate();
  const location = useLocation();
  return (
    <nav className="w-[278px] h-full bg-white/1 border-1 border-white/5 rounded-[5px] pt-[25px] flex flex-col gap-[20px] overflow-visible">
      <button
        onClick={() => navigation("/")}
        className={clsx(
          "flex items-center gap-[10px] relative pl-[24px] overflow-visible",
          location.pathname !== "/" && "opacity-15"
        )}
      >
        <div
          className={clsx(
            "h-[22px] w-[3px] bg-white rounded-full absolute -left-[1.5px]",
            location.pathname !== "/" && "opacity-0"
          )}
        />
        <Icons.Dashboard />
        <p className="text-white text-[13px] font-medium leading-none overflow-visible">
          Dashboard
        </p>
      </button>
      <div className="overflow-visible flex flex-col gap-[15px]">
        <button
          onClick={
            location.pathname.includes("/players")
              ? undefined
              : () => navigation("/players" + lastVisitedPage)
          }
          className={clsx(
            "flex items-center gap-[10px] relative pl-[24px] overflow-visible",
            !location.pathname.includes("/players") && "opacity-15"
          )}
        >
          <div
            className={clsx(
              "h-[22px] w-[3px] bg-white rounded-full absolute -left-[1.5px]",
              !location.pathname.includes("/players") && "opacity-0"
            )}
          />
          <Icons.Players />
          <p className="text-white text-[13px] font-medium leading-none overflow-visible">
            Jogadores
          </p>
          <Icons.Dropdown active={location.pathname.includes("/players")} />
        </button>
        {location.pathname.includes("/players") && (
          <div className="pl-[44px] flex flex-col relative">
            <div className="absolute h-full w-[1px] bg-white/5 top-0 left-[30px]" />
            <p
              onClick={() => {
                navigation("/players");
                setLastVisitedPage("");
              }}
              className={clsx(
                "text-[12px] text-white font-semibold cursor-pointer h-[35px] w-[106px] pl-[15px] flex items-center rounded-[5px]",
                (location.pathname === "/players" ||
                  location.pathname === "/players/infos") &&
                  "bg-white/5"
              )}
            >
              Lista
            </p>
            <p
              onClick={() => {
                navigation("/players/vehicles");
                setLastVisitedPage("/vehicles");
              }}
              className={clsx(
                "text-[12px] text-white font-semibold cursor-pointer h-[35px] w-[106px] pl-[15px] flex items-center rounded-[5px]",
                location.pathname === "/players/vehicles" && "bg-white/5"
              )}
            >
              Veículos
            </p>
            <p
              onClick={() => {
                navigation("/players/items");
                setLastVisitedPage("/items");
              }}
              className={clsx(
                "text-[12px] text-white font-semibold cursor-pointer h-[35px] w-[106px] pl-[15px] flex items-center rounded-[5px]",
                location.pathname === "/players/items" && "bg-white/5"
              )}
            >
              Itens
            </p>
            <p
              onClick={() => {
                navigation("/players/permissions");
                setLastVisitedPage("/permissions");
              }}
              className={clsx(
                "text-[12px] text-white font-semibold cursor-pointer h-[35px] w-[106px] pl-[15px] flex items-center rounded-[5px]",
                location.pathname === "/players/permissions" && "bg-white/5"
              )}
            >
              Permissões
            </p>
          </div>
        )}
      </div>
      <button
        onClick={() => navigation("/salary")}
        className={clsx(
          "flex items-center gap-[10px] relative pl-[24px] overflow-visible",
          location.pathname !== "/salary" && "opacity-15"
        )}
      >
        <div
          className={clsx(
            "h-[22px] w-[3px] bg-white rounded-full absolute -left-[1.5px]",
            location.pathname !== "/salary" && "opacity-0"
          )}
        />
        <Icons.Salary />
        <p className="text-white text-[13px] font-medium leading-none overflow-visible">
          Salário
        </p>
      </button>
    </nav>
  );
};

const Icons = {
  Dashboard: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.38123 1.49537V3.88305C5.38123 4.08075 5.34217 4.27651 5.26629 4.45909C5.19041 4.64166 5.0792 4.80746 4.93904 4.94697C4.79889 5.08648 4.63255 5.19696 4.44957 5.27205C4.26659 5.34715 4.07057 5.38539 3.87277 5.38458H1.49617C1.2989 5.38578 1.10342 5.34715 0.921445 5.27101C0.739473 5.19488 0.574754 5.0828 0.437164 4.94151C0.297749 4.80284 0.187308 4.63786 0.112261 4.45615C0.0372146 4.27444 -0.00093948 4.07963 1.75683e-05 3.88305V1.50153C1.4231e-05 1.10436 0.157447 0.723372 0.437854 0.441957C0.718261 0.160542 1.0988 0.00162773 1.49617 0H3.87892C4.07599 0.000189239 4.27106 0.0394475 4.45284 0.115502C4.63461 0.191556 4.79949 0.302896 4.93793 0.443074C5.07827 0.580084 5.18979 0.74376 5.26592 0.924474C5.34205 1.10519 5.38125 1.29929 5.38123 1.49537ZM12 1.50153V3.88305C11.9968 4.27923 11.8383 4.65837 11.5586 4.9391C11.2789 5.21982 10.9002 5.37976 10.5038 5.38458H8.11494C7.7167 5.38214 7.33491 5.22554 7.04978 4.94766C6.91045 4.80765 6.80012 4.64155 6.72511 4.45887C6.6501 4.27619 6.61188 4.08052 6.61263 3.88305V1.50153C6.61178 1.30441 6.65059 1.10914 6.72675 0.92731C6.8029 0.745481 6.91485 0.580807 7.05593 0.443074C7.19437 0.302896 7.35925 0.191556 7.54103 0.115502C7.7228 0.0394475 7.91787 0.000189239 8.11494 0H10.4977C10.8951 0.00321664 11.2754 0.162446 11.5564 0.443343C11.8375 0.72424 11.9968 1.10429 12 1.50153ZM12 8.11687V10.4984C11.9968 10.8946 11.8383 11.2737 11.5586 11.5544C11.2789 11.8352 10.9002 11.9951 10.5038 11.9999H8.11494C7.71417 12.004 7.32761 11.8517 7.03746 11.5753C6.89759 11.4357 6.7869 11.2697 6.71185 11.0869C6.6368 10.9041 6.59888 10.7083 6.60032 10.5107V8.12918C6.59951 7.93207 6.63833 7.7368 6.71448 7.55498C6.79063 7.37315 6.90256 7.20848 7.04362 7.07072C7.18207 6.93057 7.34696 6.81925 7.52873 6.7432C7.71051 6.66714 7.90556 6.62787 8.10262 6.62765H10.4854C10.8828 6.63087 11.2631 6.79009 11.5441 7.07099C11.8252 7.35189 11.9845 7.73194 11.9877 8.12918L12 8.11687ZM5.38123 8.12302V10.5045C5.37639 10.9018 5.21552 11.2812 4.93332 11.5609C4.65113 11.8407 4.27022 11.9983 3.87277 11.9999H1.49617C1.29946 12.0007 1.10454 11.9626 0.922653 11.8877C0.740764 11.8129 0.575506 11.7028 0.436414 11.5638C0.297321 11.4247 0.187146 11.2596 0.112246 11.0778C0.0373461 10.896 -0.000796957 10.7011 1.75683e-05 10.5045V8.12302C0.00160374 7.72577 0.159356 7.34507 0.439247 7.06302C0.719139 6.78097 1.09874 6.62018 1.49617 6.61534H3.87892C4.27816 6.61878 4.6603 6.77774 4.94408 7.05841C5.2249 7.34156 5.38208 7.72434 5.38123 8.12302Z"
        fill="white"
      />
    </svg>
  ),
  Players: () => (
    <svg
      width="11"
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 5.6C7.01878 5.6 8.25 4.3464 8.25 2.8C8.25 1.2536 7.01878 0 5.5 0C3.98122 0 2.75 1.2536 2.75 2.8C2.75 4.3464 3.98122 5.6 5.5 5.6Z"
        fill="white"
      />
      <path
        d="M11 10.85C11 12.5895 11 14 5.5 14C0 14 0 12.5895 0 10.85C0 9.1105 2.46262 7.7 5.5 7.7C8.53738 7.7 11 9.1105 11 10.85Z"
        fill="white"
      />
    </svg>
  ),
  Dropdown: ({ active }: { active: boolean }) => (
    <svg
      className={clsx(active ? "rotate-180" : "opacity-50")}
      width="9"
      height="4"
      viewBox="0 0 9 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0H1.25H0L4.5 4L9 0Z" fill="white" />
    </svg>
  ),
  Salary: () => (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.125 0.5C7.86228 0.500055 8.57927 0.732488 9.16648 1.1618C9.75369 1.59111 10.1788 2.19371 10.377 2.87756L10.416 3.02561L11.8185 2.68833C11.921 2.66376 12.0278 2.66032 12.1317 2.67824C12.2357 2.69616 12.3346 2.73502 12.4219 2.7923C12.5092 2.84957 12.583 2.92396 12.6384 3.01059C12.6937 3.09722 12.7295 3.19414 12.7432 3.295L12.75 3.38889V4.69611C13.1728 5.08649 13.5193 5.54689 13.773 6.05533L13.8765 6.27778H14.25C14.4337 6.2778 14.611 6.34275 14.7483 6.46029C14.8856 6.57784 14.9733 6.73982 14.9948 6.9155L15 7V9.16667C15 9.28554 14.9696 9.40258 14.9113 9.5074C14.8531 9.61222 14.7689 9.70158 14.6663 9.76756L14.5853 9.81233L13.7092 10.2348C13.3506 10.903 12.8312 11.4787 12.1943 11.914L12 12.0397V12.7778C12 12.9547 11.9325 13.1254 11.8105 13.2576C11.6884 13.3898 11.5202 13.4742 11.3378 13.4949L11.25 13.5H9C8.8163 13.5 8.639 13.435 8.50172 13.3175C8.36444 13.1999 8.27674 13.038 8.25525 12.8623L8.25 12.7778H7.5C7.49998 12.9547 7.43253 13.1254 7.31046 13.2576C7.18839 13.3898 7.02019 13.4742 6.83775 13.4949L6.75 13.5H4.5C4.3163 13.5 4.139 13.435 4.00172 13.3175C3.86444 13.1999 3.77674 13.038 3.75525 12.8623L3.75 12.7778V12.0397C3.20819 11.7061 2.74016 11.2727 2.37283 10.7644C2.00549 10.2561 1.74608 9.68297 1.6095 9.07783C1.16725 8.95108 0.776111 8.69654 0.48904 8.34867C0.201969 8.0008 0.0328236 7.57639 0.00450003 7.13289L0 7V6.63889C0.000212031 6.45481 0.0734094 6.27775 0.204636 6.1439C0.335863 6.01005 0.515215 5.9295 0.706046 5.91871C0.896877 5.90792 1.08478 5.96771 1.23137 6.08586C1.37796 6.20401 1.47217 6.3716 1.49475 6.55439L1.5 6.63889V7C1.5 7.10689 1.524 7.20872 1.5675 7.29972C1.68198 6.64951 1.93735 6.02981 2.317 5.48093C2.69664 4.93205 3.19206 4.4663 3.771 4.114C3.71779 3.65935 3.76486 3.199 3.90914 2.76308C4.05342 2.32716 4.29166 1.92548 4.60826 1.58433C4.92487 1.24319 5.3127 0.970254 5.7464 0.783397C6.18009 0.59654 6.64987 0.499968 7.125 0.5ZM10.5 6.27778C10.3011 6.27778 10.1103 6.35387 9.96967 6.48931C9.82902 6.62475 9.75 6.80845 9.75 7C9.75 7.19155 9.82902 7.37525 9.96967 7.51069C10.1103 7.64613 10.3011 7.72222 10.5 7.72222C10.6989 7.72222 10.8897 7.64613 11.0303 7.51069C11.171 7.37525 11.25 7.19155 11.25 7C11.25 6.80845 11.171 6.62475 11.0303 6.48931C10.8897 6.35387 10.6989 6.27778 10.5 6.27778ZM7.125 1.94444C6.67072 1.94444 6.23189 2.10326 5.89006 2.39138C5.54822 2.67951 5.32665 3.07734 5.2665 3.51094C5.62995 3.42967 6.00187 3.38872 6.375 3.38889H8.90775L8.96025 3.37661C8.87131 2.97141 8.64042 2.60798 8.30628 2.34723C7.97215 2.08648 7.55508 1.94427 7.125 1.94444Z"
        fill="white"
      />
    </svg>
  ),
};
