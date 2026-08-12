import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.jsx";
import "./index.css";

Sentry.init({
  dsn: "https://0505c0b75ada7c4bcea660b8b531b77b@o4511897604849664.ingest.de.sentry.io/4511897624445008",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
