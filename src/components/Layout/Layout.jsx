import React, { useContext, useEffect } from "react";
import "./Layout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { userContext } from "../../context/userContext";

export default function Layout() {
  let { setusertoken } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setusertoken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="container text-white py-3" style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}
