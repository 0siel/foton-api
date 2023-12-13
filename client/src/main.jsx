// Autor: Osiel Rubio
// Descriotcion: Punto de entrada de la aplicación, renderiza el componente App.jsx en el elemento con id root, esto permite que la aplicación se renderice en el navegador

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
