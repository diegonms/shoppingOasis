import React from "react";
import Navbar from "./navbar";
import "./style.css";
import Footer from "./footer.jsx";
import Lojas from "./lojas.jsx";
import Logo from "../idVisual/logotipoPreto.svg";

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
    <>
      <Navbar />

      {/* Banner FORA do container */}
      <Banner />

      {/* Restante DENTRO do container */}
      <div className="container">
        <Eventos />
        <Lojas />
        <Footer />
      </div>
    </>
  );
};

export default ShoppingHomepage;
