import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./style-pagLojas.css";

const Homepage = () => {
  const [eventoDestaque, setEventoDestaque] = useState(null);
  const [lojasDestaque, setLojasDestaque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca o primeiro evento
        const eventosResponse = await fetch('http://localhost:8080/api/evento?limit=1');
        if (!eventosResponse.ok) throw new Error('Erro ao carregar eventos');
        const eventosData = await eventosResponse.json();

        // Busca as 3 primeiras lojas
        const lojasResponse = await fetch('http://localhost:8080/api/loja?limit=3');
        if (!lojasResponse.ok) throw new Error('Erro ao carregar lojas');
        const lojasData = await lojasResponse.json();

        setEventoDestaque(eventosData.length > 0 ? eventosData[0] : null);
        setLojasDestaque(lojasData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="container">Carregando...</div>;
  if (error) return <div className="container">Erro: {error}</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Seção do Evento em Destaque */}
        <section className="destaque-section">
          <h1 className="page-title">Evento em destaque</h1>
          {eventoDestaque ? (
            <div className="evento-destaque">
              <div className="evento-imagem-container">
                {eventoDestaque.imagem_base64 ? (
                  <img
                    src={`data:image/jpeg;base64,${eventoDestaque.imagem_base64}`}
                    alt={eventoDestaque.nome_evento}
                    className="evento-imagem"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400";
                      console.error("Erro ao carregar imagem do evento");
                    }}
                  />
                ) : (
                  <img
                    src="https://placehold.co/600x400"
                    alt={eventoDestaque.nome_evento}
                    className="evento-imagem"
                  />
                )}
              </div>
              <div className="evento-info">
                <h2>{eventoDestaque.nome_evento}</h2>
                <div className="evento-data">
                  {eventoDestaque.data_inicio_formatada}
                  {eventoDestaque.data_fim && ` - ${eventoDestaque.data_fim_formatada}`}
                </div>
                {eventoDestaque.descricao && (
                  <p className="evento-descricao">{eventoDestaque.descricao}</p>
                )}
              </div>
            </div>
          ) : (
            <p>Nenhum evento disponível no momento</p>
          )}
        </section>
        </div>

      <div className="container-lojas">
        {/* Seção das Lojas em Destaque */}
        <section className="lojas-destaque-section">
          <h2 className="page-title">Lojas em destaque</h2>
          <div className="lojas-grid">
            {lojasDestaque.length > 0 ? (
              lojasDestaque.map((loja) => (
                <div key={loja.id} className="loja-card">
                  <div className="loja-imagem-container">
                    {loja.imagem_base64 ? (
                      <img
                        src={`data:image/jpeg;base64,${loja.imagem_base64}`}
                        alt={loja.nome_negocio}
                        className="loja-imagem"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/300x200?text=Sem+Imagem"
                        alt={loja.nome_negocio}
                        className="loja-imagem"
                      />
                    )}
                  </div>
                  <div className="loja-info">
                    <h3>{loja.nome_negocio}</h3>
                    <p className="loja-categoria">{loja.descricao}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma loja disponível no momento</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;