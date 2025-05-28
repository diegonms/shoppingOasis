import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRouteUser({ children }: { children}) {
  const tipo = localStorage.getItem("tipoUsuario");

  console.log("Tipo de usuário:", tipo); // 👈 ajuda a ver o que está sendo lido

  if (tipo !== "cliente") {
    return <Navigate to="/" replace />;
  }

  return children;
}
