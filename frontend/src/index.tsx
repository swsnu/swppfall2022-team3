import React from "react";
import { Cookies } from "react-cookie";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";
import { store } from "./store";
import "./index.css";


const cookies = new Cookies();
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers.common["X-CSRFToken"] = cookies.get("csrftoken");



const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
