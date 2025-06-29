
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Force dark mode always active on body for trading interface
if (typeof document !== "undefined" && !document.body.classList.contains("dark")) {
  document.body.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
