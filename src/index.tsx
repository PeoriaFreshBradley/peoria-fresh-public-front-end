import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";
import {instance as axios} from "axios-instance";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ThemeProvider } from "@mui/material";
import pFreshTheme from "./components/layout/theme";
import { Helmet, HelmetProvider } from "react-helmet-async";

axios.defaults.headers.common["Authorization"] = `bearer: ${
  JSON.parse(localStorage.getItem("appState") || '{"userInfo":{"authToken":""}}')
    .userInfo.authToken
}`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={pFreshTheme}>
          <Helmet>
            <meta charSet="utf-8" />
              <title>Peoria Fresh</title>
            <meta
              name="description"
              content="Peoria Fresh is a platform that connects food pantries and gardeners to provide fresh produce to those in need."
            />
          </Helmet>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
