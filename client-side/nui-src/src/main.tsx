import "./style/global.css";

import { BrowserRouter } from "react-router-dom";
import Interface from "./components/Interface";
import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./providers/Visibility";
import { debugData } from "./utils/debugData";

debugData([
  {
    action: "showFrame",
    payload: true,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <VisibilityProvider>
        <Interface />
      </VisibilityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
