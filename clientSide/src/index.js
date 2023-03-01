// import React, {  } from "react";
// import ReactDOM from "react-dom";

// import App from "./App";
// ReactDOM.render(
//     <App />,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { GlobalContextProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
