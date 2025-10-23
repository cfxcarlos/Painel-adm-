import React, { createContext, useEffect, useState } from "react";

import { AnimationProvider } from "./Animation";
import { NuiVisibilityFrame } from "../interfaces/interfaces";
import clsx from "clsx";
import { emit } from "../hooks/emit";
import { isEnvBrowser } from "../utils/misc";
import { listen } from "../hooks/listen";
import { useNavigate } from "react-router-dom";

const VisibilityContext = createContext<NuiVisibilityFrame | null>(null);

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  listen<boolean>("showFrame", (payload: boolean) => setVisible(payload));
  useEffect(() => {
    navigate("/");
  }, [visible]);
  useEffect(() => {
    if (!visible) return;
    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        if (!isEnvBrowser()) emit("hideFrame");
        setVisible(false);
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <VisibilityContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      <AnimationProvider show={visible}>
        <div
          className={clsx(
            "h-screen grid place-items-center bg-black/10",
            isEnvBrowser() && "bg-placeholder bg-cover"
          )}
        >
          {children}
        </div>
      </AnimationProvider>
    </VisibilityContext.Provider>
  );
};
