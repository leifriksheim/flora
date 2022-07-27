import "./Header.css";
import { useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const timer = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("mousemove", onMousemove, false);
    document.addEventListener("scroll", onMousemove, false);
  }, []);

  function startInteractionTimer() {
    setShowHeader(false);
  }

  function onMousemove() {
    setShowHeader(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(startInteractionTimer, 2000);
  }

  return (
    <header className={showHeader ? `header show` : `header`}>
      <div className="header__logo">
        <Link to="/">F.L.O.R.A</Link>
      </div>
      <div className="header__menu">
        <Link to="/project">Project</Link>
        <Link to="/biodiversity">Biodiversity</Link>
        <Link to="/park">Park</Link>
      </div>
    </header>
  );
}
