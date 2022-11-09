import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: true,
  idleTimeout: 4000,
  integrations: [new BrowserTracing()],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

fetch("/test-param/:param")
  .then((res) => res.json())
  .then((data) => console.log(data));
fetch("/test")
  .then((res) => res.json())
  .then((data) => console.log(data));
fetch("/test-2")
  .then((res) => res.json())
  .then((data) => console.log(data));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
