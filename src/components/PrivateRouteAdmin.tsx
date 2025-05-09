import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRouteAdmin({ children }) {
  const tipo = localStorage.getItem("tipoUsuario");

  if (tipo !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
