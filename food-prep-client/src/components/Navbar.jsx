import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [navbarToggle, setNavbarToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const logo = new URL("../assets/ratatouille-logo.png", import.meta.url).href;

  // Mobile - Desktop navbar toggle
  function toggleNavbar() {
    if (!navbarToggle) {
      setNavbarToggle(true);
    } else if (navbarToggle) {
      setNavbarToggle(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth > 431 && !navbarToggle) {
    setNavbarToggle(true);
  }

  return (
    <nav className="nav-container">
      {isLoggedIn && (
        <>
          <div className="branding">
            <NavLink to="/new-meal">
              <img className="logo" src={logo} alt="image" height={50} />
            </NavLink>
          </div>
          {/* Hamburger menu -> mobile navbar */}
          <NavLink className="toggle-button" onClick={toggleNavbar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </NavLink>

          <div
            className="nav-links"
            style={{ display: navbarToggle ? "flex" : "none" }}
          >
            <ul>
              <li>
                <NavLink
                  className="links"
                  to="/"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "black" : "white",
                    };
                  }}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="links"
                  to="/new-meal"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "black" : "white",
                    };
                  }}
                >
                  Serve
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="links"
                  to="/favorites"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "black" : "white",
                    };
                  }}
                >
                  Favorites
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="links"
                  to="/shopping-list"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "black" : "white",
                    };
                  }}
                  end
                >
                  Shopping list
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="links space"
                  to="/profile"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "black" : "white",
                    };
                  }}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button className="red logout-btn" onClick={logOutUser}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
      {/* Navbar for logged out users */}
      {!isLoggedIn && (
        <div className="nav-container align-container">
          <div className="branding">
            <NavLink to="/new-meal">
              <img className="logo" src={logo} alt="image" height={50} />
            </NavLink>
          </div>
          <div className="nav-links align-signup">
            <ul>
              <li>
                <NavLink className="signup-links" to="/signup">
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink className="signup-links" to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
