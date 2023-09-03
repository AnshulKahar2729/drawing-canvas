import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./context/SocketProvider";

ReactDOM.render(
  <SocketProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SocketProvider>,
  document.getElementById("root"),
);
