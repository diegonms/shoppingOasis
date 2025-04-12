import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./style-pagLojas.css";

const Eventos = ({ eventos }) => {
  // Separa o evento principal (primeiro da lista) dos demais
  const [eventoPrincipal, ...outrosEventos] = eventos;

  return (
    <div className="eventos-section">
      <h2 className="titulo">Eventos</h2>
      
      {/* Evento Principal (destaque) */}
      <div className="evento-principal">
        <div className="evento-card-principal">
          <div className="evento-imagem-container">
            <img 
              src={eventoPrincipal.imagem || "https://placehold.co/600x400"} 
              alt={eventoPrincipal.nome} 
              className="evento-imagem-principal"
            />
          </div>
          <div className="evento-info-principal">
            <div className="evento-data-principal">{eventoPrincipal.data}</div>
            <h3 className="evento-nome-principal">{eventoPrincipal.nome}</h3>
            <p className="evento-descricao">{eventoPrincipal.descricao}</p>
          </div>
        </div>
      </div>

      {/* Demais Eventos */}
      <div className="outros-eventos-container">
        <h3 className="subtitulo">Outros Eventos</h3>
        <div className="outros-eventos-grid">
          {outrosEventos.map((evento, index) => (
            <div key={index} className="evento-card">
              <div className="evento-imagem-container">
                <img 
                  src={evento.imagem || "https://placehold.co/300x200"} 
                  alt={evento.nome} 
                  className="evento-imagem"
                />
              </div>
              <div className="evento-info">
                <div className="evento-data">{evento.data}</div>
                <h4 className="evento-nome">{evento.nome}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShoppingHomepage = () => {
  const eventosCadastrados = [
    {
      nome: "Feira de Artesanato",
      data: "25/10 - 28/10",
      descricao: "Maior feira de artesanato da região com mais de 50 expositores",
      imagem: "https://placehold.co/600x400?text=Feira+Artesanato"
    },
    {
      nome: "Workshop de Gastronomia",
      data: "30/10",
      imagem: "https://placehold.co/300x200?text=Workshop+Gastronomia"
    },
    {
      nome: "Exposição de Arte Moderna",
      data: "05/11 - 15/11",
      imagem: "https://placehold.co/300x200?text=Arte+Moderna"
    },
    {
      nome: "Palestra Sustentabilidade",
      data: "20/11",
      imagem: "https://placehold.co/300x200?text=Sustentabilidade"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <Eventos eventos={eventosCadastrados} />
      </div>
      <Footer />
    </>
  );
};

export default ShoppingHomepage;