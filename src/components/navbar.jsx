import React, { useState } from "react";
import "./style.css";
import Logo from "../idVisual/logotipoPreto.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  const handleLogout = () => {
    localStorage.clear(); 
    setIsMenuOpen(false); 
    navigate("/");   
  };


  return (
    <div className="header">
      <div className="nav-menu">
        <Link to="/">
          <img className="logo-navbar" src={Logo} alt="Logo" />
        </Link>
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/paginalojas" className="nav-link">Lojas</Link>
        <Link to="/paginaeventos" className="nav-link">Eventos</Link>

        {tipoUsuario && (
        <Link to="/usuario" className="nav-link">Usuário</Link>
)}


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
              ></button>
            <div className="side-menu">
              <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
                ×
              </button>
              
              <Link to="/">
                <img className="logo-sidemenu" src="./src/idVisual/logotipoPreto.svg" alt="Logo" />
              </Link>
              <Link 
                to="/login" 
                className="menu-link footer-content" 
                style={{ fontSize: '16px', color: '#001219', textDecoration: 'none' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Login ou Cadastro
              </Link>
              
              <Link 
                to="/cadastroNegocio" 
                className="menu-link footer-content" 
                style={{ fontSize: '16px', color: '#001219', textDecoration: 'none' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastre sua loja
              </Link>
              
              <Link 
                to="/cadastroEvento" 
                className="menu-link footer-content" 
                style={{ fontSize: '16px', color: '#001219', textDecoration: 'none' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastre seu evento
              </Link>
              
              <Link 
                to="/trabalheConosco" 
                className="menu-link footer-content" 
                style={{ fontSize: '16px', color: '#001219', textDecoration: 'none' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Trabalhe conosco
              </Link>
              
              <div 
                className="menu-link footer-content" 
                style={{ fontSize: '16px', color: '#BB3E03', textDecoration: 'none', cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Sair
              </div>

            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;