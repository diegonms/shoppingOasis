import React from "react";
import "./style.css";
import logo from "../idVisual/logotipoPreto.svg";

const navbar = () => {
  return (
    <div>
      <img src={logo} className="logo-navbar" />
    </div>
  );
};

export default navbar;
