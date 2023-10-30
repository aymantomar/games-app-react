import React, { useContext, useState } from "react";
import "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { userContext } from "../../context/userContext";

export default function Header() {
  const nav = useNavigate();

  let { usertoken, setusertoken } = useContext(userContext);

  function logout() {
    localStorage.removeItem("userToken");
    setusertoken(null);
    nav("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark">
        <div className="container">
          <Link className="navbar-brand text-white" to={"/"}>
            <img src={logo} className="img-fluid" alt="" width={80} /> GameOver
          </Link>
          {usertoken ? (
            <>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      id="dropdownId"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Platform
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./platforms/pc"}
                      >
                        PC (Windows)
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./platforms/browser"}
                      >
                        Web Browser
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      id="dropdownId"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort By
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./sortBy/alphabetical"}
                      >
                        alphabetical
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./sortBy/release-date"}
                      >
                        release date
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      id="dropdownIdCat"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Category
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownIdCat"
                    >
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./categories/mmorpg"}
                      >
                        mmorpg
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./categories/shooter"}
                      >
                        shooter
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./categories/sailing"}
                      >
                        sailing
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./categories/permadeath"}
                      >
                        permadeath
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./categories/superhero"}
                      >
                        superhero
                      </Link>
                      <Link
                        className="dropdown-item text-capitalize"
                        to={"./categories/pixel"}
                      >
                        pixel
                      </Link>
                    </div>
                  </li>
                </ul>
                <ul className="navbar-nav ms-auto mt-1">
                  <li className="nav-item mx-3" onClick={logout}>
                    <span className="btn btn-outline-primary">logout</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-1">
                  <li className="nav-item">
                    <Link className="btn btn-outline-primary" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="btn btn-outline-primary" to="/register">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
