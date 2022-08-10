import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
