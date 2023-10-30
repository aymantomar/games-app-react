import React from "react";
import "./ProtectRoute.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  if (localStorage.getItem("userToken") !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
