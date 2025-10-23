import { NuiDebugEventFrame } from "../interfaces/interfaces";
import { isEnvBrowser } from "./misc";

export const debugData = (events: NuiDebugEventFrame[], timer = 1000): void => {
  if (import.meta.env.MODE === "development" && isEnvBrowser()) {
    for (const event of events) {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: { ...event },
          })
        );
      }, timer);
    }
  }
};
