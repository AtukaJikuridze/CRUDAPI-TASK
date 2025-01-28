import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MyContextProvider } from "./Context/Context";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <MyContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MyContextProvider>
  </BrowserRouter>
  </Provider>
);


reportWebVitals();
