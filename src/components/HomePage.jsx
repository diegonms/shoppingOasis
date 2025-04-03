import React from "react";
import reactDom from "react-dom";
import navbar from "./navbar.jsx";
import "./style.css";
import Footer from "./footer.jsx";

const Header = () => (
  <div className="header">
    <div className="nav-menu">
      <div>Início</div>
      <div>Lojas</div>
      <div>Eventos</div>
      <div>Cinema</div>
      <div>Cliente</div>
    </div>
    <div className="logo"></div>
  </div>
);

const Banner = () => (
  <img src="https://placehold.co/1440x480" alt="Banner" className="banner" />
);

const Eventos = () => (
  <div className="eventos-section">
    <h2 className="titulo">Eventos recomendados</h2>
    <div className="eventos-container">
      {[1, 2].map((e) => (
        <div key={e} className="evento-card">
          <div className="evento-info">
            <div className="evento-data">18/10 - 21/10</div>
            <div className="evento-nome">Evento XX</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ShoppingHomepage = () => {
  return (
    <div className="container">
      <Header />
      <Banner />
      <Eventos />
      <Footer />
    </div>
  );
};

export default ShoppingHomepage;
