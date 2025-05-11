import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayProvider } from "./contexts/Play";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Map from "./pages/Map";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </PlayProvider>
  </React.StrictMode>
);
