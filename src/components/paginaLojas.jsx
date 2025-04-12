import React from "react";
import Navbar from "./navbar"; // Adicione esta importação
import Footer from "./footer"; // Adicione esta importação
import "./style-pagLojas.css"; // Mude para o CSS principal

// Componente Lojas (melhor mover para um arquivo separado Lojas.jsx)
const Lojas = ({ lojas }) => (
    console.log(lojas),
  <div className="lojas-section">
    <h2 className="titulo">Lojas</h2>
    <div className="lojas-container">
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

const ShoppingHomepage = () => {
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
  
    return (
      <>
        <Navbar />
        <Lojas lojas={lojasCadastradas} /> {/* Passe as lojas como prop */}
        <Footer />
      </>
    );
  };

export default ShoppingHomepage;