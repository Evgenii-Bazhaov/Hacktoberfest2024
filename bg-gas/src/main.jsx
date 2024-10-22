import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n";
import { store } from "./store";
import { Provider } from "react-redux";

// Create a root using the createRoot method and render the App component wrapped in a Provider component that takes the store as a prop.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
