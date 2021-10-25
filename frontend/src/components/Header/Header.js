import React, { useState } from "react";
import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/userActions";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  }  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  
  const setActiveLink = (path) => {
    return location.pathname.toString().includes(path) ? "nav__link active" : "nav__link";
  }

  return (
    <>
      <div className="backdrop" style={{display: open? "block": "none"}} onClick={toggleMenu}></div>
      <header className="main-header">
        <nav className="nav bd-grid">
          <div className="nav__toggle" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="nav__brand__con">
            <NavLink exact to="/discover" className="nav__brand">
              CapitalMovies
            </NavLink>
          </div>

          <div className={open? "nav__menu open" :"nav__menu"}>
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  exact
                  to="/discover"
                  className={setActiveLink("/discover")}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/popular"
                  className={setActiveLink("/popular")}
                >
                  Popular
                </NavLink>
              </li>
              {userInfo && <li className="nav__item">
                <NavLink
                  exact
                  to="/favourite"
                  activeClassName="active"
                  className="nav__link"
                >
                  Favourite
                </NavLink>
              </li>}
              {userInfo ? <li className="nav__item">
                <NavLink
                  exact
                  to="/login"
                  className="nav__link"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </li> : <li className="nav__item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav__link"
                >
                  Sign in
                </NavLink>
              </li>}
             
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
