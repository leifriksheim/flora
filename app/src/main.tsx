import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import "./index.css";
import "./assets/css/satoshi.css";

import Park from "./routes/Park";
import Project from "./routes/Project";

import Biodiversity from "./routes/Biodiversity";
import Cameras from "./routes/Biodiversity/Cameras";
import Radio from "./routes/Biodiversity/Radio";
import Observations from "./routes/Biodiversity/Observations";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/biodiversity" element={<Biodiversity />} />
          <Route path="/park" element={<Park />} />
          <Route path="/project" element={<Project />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/observations" element={<Observations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
