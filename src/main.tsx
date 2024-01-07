import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const rootElm = document.getElementById("root")!;
ReactDOM.createRoot(rootElm).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </PrimeReactProvider>
);
