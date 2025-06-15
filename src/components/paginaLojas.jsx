import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./style-pagLojas.css";

const Lojas = ({ lojas }) => (
  <div className="lojas-section">
    <h2 className="titulo">Lojas</h2>
    <div className="lojas-container">
      {lojas.map((loja, index) => (
        <div key={index} className="loja-card">
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
            <h3 className="loja-nome">{loja.nome_negocio}</h3>
            <p className="loja-categoria">{loja.categoria}</p>
            <p className="loja-email">{loja.email}</p>
            {loja.telefone && <p className="loja-telefone">Tel: {loja.telefone}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ShoppingHomepage = () => {
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/loja');
        if (!response.ok) {
          throw new Error('Erro ao carregar lojas');
        }
        const data = await response.json();
        setLojas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLojas();
  }, []);

  if (loading) return <div className="loading">Carregando lojas...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <>
      <Navbar />
      <Lojas lojas={lojas} />
      <Footer />
    </>
  );
};

export default ShoppingHomepage;