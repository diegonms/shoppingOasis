import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import "./style.css";
import Footer from "./footer.jsx";
import Lojas from "./lojas.jsx";
import Logo from "../idVisual/logotipoPreto.svg";

// Banner estático
const Banner = () => (
  <img src="https://placehold.co/1440x480" alt="Banner" className="banner" />
);

// Componente Eventos com campos nome/data corretos
const Eventos = ({ eventoPrincipal }) => (
  <div className="eventos-section">
    <h2 className="titulo">Eventos recomendados</h2>
    <div className="eventos-container">
      {eventoPrincipal ? (
        <div className="evento-card">
          <div className="evento-info">
            <div className="evento-data">
              {eventoPrincipal.data_inicio_formatada}
              {eventoPrincipal.data_fim_formatada &&
                ` - ${eventoPrincipal.data_fim_formatada}`}
            </div>
            <div className="evento-nome">{eventoPrincipal.nome_evento}</div>
            {eventoPrincipal.descricao && (
              <p className="evento-descricao">{eventoPrincipal.descricao}</p>
            )}
            {eventoPrincipal.imagem_base64 && (
              <img
                src={`data:image/jpeg;base64,${eventoPrincipal.imagem_base64}`}
                alt={eventoPrincipal.nome_evento}
                className="evento-imagem"
              />
            )}
          </div>
        </div>
      ) : (
        <p>Carregando evento...</p>
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

const ShoppingHomepage = () => {
  const [eventoPrincipal, setEventoPrincipal] = useState(null);

  useEffect(() => {
    const fetchEventoPrincipal = async () => {
      try {
        const resp = await fetch("http://localhost:8080/api/evento/1");
        if (!resp.ok) throw new Error("Erro ao buscar evento");
        const data = await resp.json();
        setEventoPrincipal(data);
      } catch (err) {
        console.error("Erro no fetch do evento principal:", err);
      }
    };
    fetchEventoPrincipal();
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <div className="container">
        <Eventos eventoPrincipal={eventoPrincipal} />
        <Lojas lojas={lojasCadastradas} />
      </div>
      <Footer />
    </>
  );
};

export default ShoppingHomepage;
