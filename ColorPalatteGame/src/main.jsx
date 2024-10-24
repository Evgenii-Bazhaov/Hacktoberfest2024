import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Captcha from "./captcha.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Captcha />
  </StrictMode>
);
