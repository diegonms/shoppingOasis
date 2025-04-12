import React from 'react';
import './style-lojas.css';

const Lojas = () => {
  return (
    <div className="container">
      <h1 className="title">Conheça nossas lojas</h1>
      
      <div className="lojas-grid">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="loja-card">
            <div className="loja-info">
              <span>Loja XX</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lojas;