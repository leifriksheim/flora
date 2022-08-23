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
            <div className="page-menu-item">
              <Link to="/cameras">Live Camera</Link>
              <p>Watch our live video feed</p>
            </div>
          </li>
          <li>
            <div className="page-menu-item">
              <Link to="/radio">Bird Radio</Link>
              <p>Listen to our live audio feed</p>
            </div>
          </li>
          <li>
            <div className="page-menu-item">
              <Link to="/observations">Observations</Link>
              <p>See all observations of biodiversity</p>
            </div>
          </li>
          <li>
            <div className="page-menu-item">
              <Link to="/tracibility">Tracibility</Link>
              <p>See where we cut the trees</p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
