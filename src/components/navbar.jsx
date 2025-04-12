import React, { useState } from "react";
import "./style.css";
import Logo from "../idVisual/logotipoPreto.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="nav-menu">
        <Link to="/">
          <img className="logo-navbar" src={Logo} alt="Logo" />
        </Link>
        <div>Início</div>
        <div>Lojas</div>
        <div>Eventos</div>
        <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer" }}>
          Cliente
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="overlay"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="side-menu"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button
                className="close-btn"
                onClick={() => setIsMenuOpen(false)}
              >

              </button>
              <Link to="/">
                <img className="logo-sidemenu" src={Logo} alt="Logo" />
              </Link>
              <h3>Área do Cliente</h3>
              <Link
                to="/login"
                className="menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/cadastro"
                className="menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastro
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
