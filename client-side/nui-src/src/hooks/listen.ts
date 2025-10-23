import { MutableRefObject, useEffect, useRef } from "react";

import { NuiMessageDataFrame } from "../interfaces/interfaces";
import { noop } from "../utils/misc";

type NuiHandlerSignature<T> = (data: T) => void;
export const listen = <T = unknown>(
  action: string,
  handler: (data: T) => void
) => {
  const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageDataFrame<T>>) => {
      const { action: eventAction, payload } = event.data;
      if (savedHandler.current) {
        if (eventAction === action) {
          savedHandler.current(payload);
        }
      }
    };
    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};
