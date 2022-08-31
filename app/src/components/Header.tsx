import "./Header.css";
import { useEffect, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
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
    timer.current = setTimeout(startInteractionTimer, 5000);
  }

  function activeClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "active" : undefined;
  }

  return (
    <header
      className={classNames({
        header: true,
        show: showHeader,
        open: isOpen,
      })}
    >
      <div className="header__logo">
        <NavLink to="/">F.L.O.R.A</NavLink>
      </div>
      <div className="header__menu">
        <NavLink className={activeClassName} to="/project">
          About
        </NavLink>
        <NavLink className={activeClassName} to="/observations">
          Observations
        </NavLink>
        <NavLink className={activeClassName} to="/cameras">
          Camera
        </NavLink>
        <NavLink className={activeClassName} to="/radio">
          Bird radio
        </NavLink>
        <NavLink className={activeClassName} to="/traceability">
          Traceability
        </NavLink>
      </div>
    </header>
  );
}
