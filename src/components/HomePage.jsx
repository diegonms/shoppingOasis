import React from "react";
import Navbar from "./navbar";
import "./style.css";
import Footer from "./footer.jsx";
import Lojas from "./lojas.jsx";
import Logo from "../idVisual/logotipoPreto.svg";

const Banner = () => (
  <img src="https://placehold.co/1440x480" alt="Banner" className="banner" />
);

// Componente Eventos modificado para receber apenas o evento principal
const Eventos = ({ eventoPrincipal }) => (
  <div className="eventos-section">
    <h2 className="titulo">Eventos recomendados</h2>
    <div className="eventos-container">
      {eventoPrincipal && (
        <div className="evento-card">
          <div className="evento-info">
            <div className="evento-data">{eventoPrincipal.data}</div>
            <div className="evento-nome">{eventoPrincipal.nome}</div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const lojasCadastradas = [
  {
    nome: "Aquazero",
    email: "contato@aquazero.com",
    categoria: "Bem-estar",
    imagem: "https://placehold.co/300x200?text=Aquazero"
  },
  {
    nome: "Aldeia Coworking",
    email: "contato@aldeiacoworking.com",
    categoria: "Escritórios",
    imagem: "https://placehold.co/300x200?text=Aldeia+Coworking"
  }
];

const eventosCadastrados = [
  {
    nome: "Feira de Artesanato",
    data: "25/10 - 28/10",
    descricao: "Maior feira de artesanato da região com mais de 50 expositores",
    imagem: "https://placehold.co/600x400?text=Feira+Artesanato"
  },

];

const ShoppingHomepage = () => {
  const [eventoPrincipal] = eventosCadastrados;

  return (
    <>
      <Navbar />
      <Banner />
      <div className="container">
        <Eventos eventoPrincipal={eventoPrincipal} /> {/* Passa apenas o principal */}
        <Lojas lojas={lojasCadastradas} />
        <Footer />
      </div>
    </>
  );
};

export default ShoppingHomepage;