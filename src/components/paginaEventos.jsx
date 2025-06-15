import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./style-pagLojas.css";

const Eventos = ({ eventos }) => {
  return (
    <div className="eventos-grid">
      {eventos.map((evento) => (
        <div key={evento.id} className="evento-card">
          <div className="evento-imagem-container">
            {evento.imagem_base64 ? (
              <img 
                src={`data:image/jpeg;base64,${evento.imagem_base64}`}
                alt={evento.nome_evento}
                className="evento-imagem"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x200";
                  console.error("Erro ao carregar imagem do evento", evento.id);
                }}
              />
            ) : (
              <img
                src="https://placehold.co/300x200"
                alt={evento.nome_evento}
                className="evento-imagem"
              />
            )}
          </div>
          <div className="evento-info">
            <div className="evento-data">
              {evento.data_inicio_formatada} {evento.data_fim && `- ${evento.data_fim_formatada}`}
            </div>
            <h3 className="evento-nome">{evento.nome_evento}</h3>
            {evento.descricao && (
              <p className="evento-descricao">{evento.descricao}</p>
            )}
          </div>
        </div>
      ))}
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
      
      // Verifique o tipo de conteúdo da resposta
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Resposta inesperada: ${text.substring(0, 100)}...`);
      }
      
      const data = await response.json();
      setEventos(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchEventos();
}, []);

  if (loading) return <div className="container">Carregando...</div>;
  if (error) return <div className="container">Erro: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">Eventos</h1>
        {eventos.length > 0 ? (
          <Eventos eventos={eventos} />
        ) : (
          <p>Nenhum evento disponível no momento</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShoppingHomepage;