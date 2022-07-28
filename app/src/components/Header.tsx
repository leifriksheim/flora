import "./Header.css";
import { useEffect, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
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

  function activeClassName({isActive}:  {isActive: boolean}) {
    return  isActive ? 'active' : undefined
  }

  return (
    <header className={showHeader ? `header show` : `header`}>
      <div className="header__logo">
        <NavLink to="/" >F.L.O.R.A</NavLink>
      </div>
      <div className="header__menu">
        <NavLink className={activeClassName} to="/project">Project</NavLink>
        <NavLink className={activeClassName} to="/biodiversity">Biodiversity</NavLink>
        <NavLink className={activeClassName} to="/park">Park</NavLink>
      </div>
    </header>
  );
}
