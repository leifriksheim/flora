import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/spectogram">Spectogram</Link>
      <Outlet />
    </div>
  );
}

export default App;
