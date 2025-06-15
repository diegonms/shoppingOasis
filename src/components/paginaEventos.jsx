import React, { useState, useEffect } from "react";
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
              src={eventoPrincipal.imagem_path || "https://placehold.co/600x400"} 
              alt={eventoPrincipal.nome_evento} 
              className="evento-imagem-principal"
            />
          </div>
          <div className="evento-info-principal">
            <div className="evento-data-principal">
              {new Date(eventoPrincipal.data_inicio).toLocaleDateString()} - {new Date(eventoPrincipal.data_fim).toLocaleDateString()}
            </div>
            <h3 className="evento-nome-principal">{eventoPrincipal.nome_evento}</h3>
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
                  src={evento.imagem_path || "https://placehold.co/300x200"} 
                  alt={evento.nome_evento} 
                  className="evento-imagem"
                />
              </div>
              <div className="evento-info">
                <div className="evento-data">
                  {new Date(evento.data_inicio).toLocaleDateString()} - {new Date(evento.data_fim).toLocaleDateString()}
                </div>
                <h4 className="evento-nome">{evento.nome_evento}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShoppingHomepage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/evento');
        if (!response.ok) {
          throw new Error('Erro ao carregar eventos');
        }
        const data = await response.json();
        setEventos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) {
    return <div className="container">Carregando eventos...</div>;
  }

  if (error) {
    return <div className="container">Erro: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        {eventos.length > 0 ? (
          <Eventos eventos={eventos} />
        ) : (
          <p>Nenhum evento disponível no momento.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShoppingHomepage;