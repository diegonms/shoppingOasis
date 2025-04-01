import React, { useState } from "react";
import "./style.css";
const lojas = [
  { nome: "Loja 1", imagem: "https://placehold.co/300x200?text=Loja+1" },
  { nome: "Loja 2", imagem: "https://placehold.co/300x200?text=Loja+2" },
  { nome: "Loja 3", imagem: "https://placehold.co/300x200?text=Loja+3" },
  { nome: "Loja 4", imagem: "https://placehold.co/300x200?text=Loja+4" },
  { nome: "Loja 5", imagem: "https://placehold.co/300x200?text=Loja+5" },
  { nome: "Loja 6", imagem: "https://placehold.co/300x200?text=Loja+6" },
  { nome: "Loja 7", imagem: "https://placehold.co/300x200?text=Loja+7" },
];

const Header = () => (
  <div className="header">
    <div className="nav-menu">
      <div>Início</div>
      <div>Lojas</div>
      <div>Eventos</div>
      <div>Cinema</div>
      <div>Cliente</div>
    </div>
    <div className="logo"></div>
  </div>
);

const Banner = () => (
  <img src="https://placehold.co/1440x480" alt="Banner" className="banner" />
);

const Eventos = () => (
  <div>
    <h2 className="titulo">Eventos recomendados</h2>
    <div className="eventos-container">
      {[1, 2].map((e) => (
        <div key={e} className="evento-card">
          <div className="evento-info">
            <div className="evento-data">18/10 - 21/10</div>
            <div className="evento-nome">Evento XX</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CarrosselLojas = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const next = () => {
    setCarouselIndex((prev) => (prev + 1) % lojas.length);
  };

  const prev = () => {
    setCarouselIndex((prev) => (prev - 1 + lojas.length) % lojas.length);
  };

  return (
    <div>
      <h2 className="titulo">Conheça nossas lojas</h2>
      <div className="carrossel-container">
        <button onClick={prev}>Anterior</button>
        <div className="carrossel-item">
          <img
            src={lojas[carouselIndex].imagem}
            alt={lojas[carouselIndex].nome}
            className="carrossel-imagem"
          />
          <div className="carrossel-legenda">{lojas[carouselIndex].nome}</div>
        </div>
        <button onClick={next}>Próximo</button>
      </div>
    </div>
  );
};

const Rodape = () => (
  <div className="rodape">
    <div className="rodape-content">
      <div>
        <h4>Horários</h4>
        <p>Lojas: Seg - Sáb 10h às 22h | Dom 14h às 20h</p>
        <p>
          Alimentação: Seg - Qui 10h às 22h | Sex - Sáb 10h às 23h | Dom 11h às
          22h
        </p>
        <p>Escritório: Seg - Sex 07h às 19h</p>
      </div>
      <div>
        <h4>Endereço</h4>
        <p>Rua do Leonardo, 16 - Jardim Diego</p>
        <h4>Escritório</h4>
        <p>Meu escritório é na praia e tô sempre na área</p>
        <h4>Mapa</h4>
      </div>
      <div>
        <h4>Contatos</h4>
        <p>(47) 1307-2002</p>
        <p>Email: contato@oasis.com</p>
        <p>WhatsApp: Converse com nossa IA</p>
      </div>
      <div>
        <h4>Estacionamento</h4>
        <p>Até 10 min. - isento</p>
        <p>10 até 30 min. - R$ 10,00</p>
        <p>31 até 60 min. - R$ 17,00</p>
        <p>2ª e 3ª hora - Grátis</p>
      </div>
    </div>
  </div>
);

const ShoppingHomepage = () => {
  return (
    <div className="container">
      <Header />
      <Banner />
      <Eventos />
      <CarrosselLojas />
      <Rodape />
    </div>
  );
};

export default ShoppingHomepage;
