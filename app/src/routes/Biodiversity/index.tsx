import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import Spectogram from "../Spectogram";
import "./index.css";

export default function Biodiversity() {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    // @ts-ignore
    const spectogram = new Spectogram({ el: canvasRef.current });
  }, []);

  return (
    <main>
      <div className="container">
        <ul className="page-menu">
          <li>
            <Link to="/cameras">Live Cameras</Link>
          </li>
          <li>
            <Link to="/radio">Bird Radio</Link>
          </li>
          <li>
            <Link to="/observations">Observations</Link>
          </li>
          <li>
            <Link to="/tracibility">Tracibility</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
