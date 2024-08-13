import React, { useRef, useEffect, useContext, useState } from "react";
import {
  Container,
  Row,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";

const nav__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/blogs",
    display: "Blogs",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList?.add("sticky__header");
        } else {
          headerRef.current.classList?.remove("sticky__header");
        }
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header" ref={headerRef}>
      <Container className="container-contained">
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            <div
              className={`navigation ${isMenuOpen ? "show__menu" : ""}`}
              ref={menuRef}
              onClick={toggleMenu}
            >
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <div className="nav__right d-flex align-items-center gap-4">
                    <div className="nav__btns d-flex align-items-center gap-4">
                      {user ? (
                        <>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title={
                              <img
                                src={user.photo}
                                alt="Profile"
                                className="profile-photo-circle"
                              />
                            }
                          >
                            <Dropdown.Item as={Link} to={`/profile/${user.id}`}>
                              Profile
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/settings">
                              Settings
                            </Dropdown.Item>
                            <Dropdown.Item onClick={logout}>
                              Logout
                            </Dropdown.Item>
                          </DropdownButton>
                        </>
                      ) : (
                        <>
                          <Button className="btn secondary__btn">
                            <Link to="/login">Login</Link>
                          </Button>
                          <Button className="btn primary__btn">
                            <Link to="/register">Register</Link>
                          </Button>
                        </>
                      )}
                    </div>

                    <span className="mobile__menu" onClick={toggleMenu}>
                      {isMenuOpen ? (
                        <FaTimes />
                      ) : (
                        <div className="mobile__header-lines">
                          <div className="mobile__header-line"></div>
                          <div className="mobile__header-line"></div>
                          <div className="mobile__header-line"></div>
                        </div>
                      )}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
