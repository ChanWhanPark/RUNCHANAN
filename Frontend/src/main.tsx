import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

// redux
import { Provider } from "react-redux";
import { reduxApp } from "./redux/store";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={reduxApp}>
      <App />
    </Provider>
  </BrowserRouter>
);
