import React from 'react';
import './style-lojas.css';

const Lojas = ({ lojas }) => {
  return (
    <div className="container">
      <h1 className="title">Conheça nossas lojas</h1>
      
      <div className="lojas-grid">
        {lojas.map((loja, index) => (
          <div key={index} className="loja-card">
            <div className="loja-imagem-container">
              <img 
                src={loja.imagem || "https://placehold.co/300x200"} 
                alt={loja.nome} 
                className="loja-imagem"
              />
            </div>
            <div className="loja-info">
              <h3 className="loja-nome">{loja.nome}</h3>
              <p className="loja-categoria">{loja.categoria}</p>
              <p className="loja-email">{loja.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lojas;