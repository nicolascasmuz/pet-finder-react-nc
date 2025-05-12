import React, { useEffect, useRef } from "react";
import petFinderLogo1 from "../resources/pet-finder-logo.png";
import burgerMenuImg from "../resources/burger-menu.png";
import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";
import "./header-menu-comp.css";

export function HeaderMenuComp({ profilePic }) {
  const logOut = useLogOut();
  const logOutRef = useRef<HTMLAnchorElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  useEffect(() => {
    const logOutEl = logOutRef.current;

    if (logOutEl) {
      logOutEl.addEventListener("click", () => {
        logOut();
        closeMenu();
      });

      return () => {
        logOutEl.removeEventListener("click", logOut);
      };
    }
  }, [logOut]);

  return (
    <header className="header">
      <img
        className="header__logo"
        src={petFinderLogo1}
        alt="pet-finder-logo"
      />
      <input
        ref={checkboxRef}
        className="header__menu-input"
        type="checkbox"
        id="check"
      />
      <label htmlFor="check" className="header__menu-label">
        <div className="header__pp-burger-container">
          <img
            className="header__profile-pic-menu"
            src={profilePic}
            alt="profile-pic-menu"
          />
          <img
            className="header__menu-img"
            src={burgerMenuImg}
            alt="menu-icon"
          />
        </div>
      </label>
      <ul className="header__menu-lista">
        <li>
          <Link to="/home" className="header__option" onClick={closeMenu}>
            Inicio
          </Link>
          <Link to="/my-data" className="header__option" onClick={closeMenu}>
            Mis datos
          </Link>
          <Link
            to="/reported-pets"
            className="header__option"
            onClick={closeMenu}
          >
            Mascotas reportadas
          </Link>
          <Link to="/new-report" className="header__option" onClick={closeMenu}>
            Reportar mascota
          </Link>
          <Link to="/map" className="header__option" onClick={closeMenu}>
            Mapa
          </Link>
          <Link to="/" className="header__option-log-out" ref={logOutRef}>
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </header>
  );
}
