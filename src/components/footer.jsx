import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        <div className="footer-column">
          <h3 className="footer-title">Horários</h3>
          <div className="footer-item">
            <h4 className="footer-subtitle">Lojas</h4>
            <p className="footer-content">
              Seg - Sáb 10h às 22h<br/>
              Dom e feriados 14h às 20h<br/><br/>
            </p>
          </div>
          <div className="footer-item">
            <h4 className="footer-subtitle">Alimentação</h4>
            <p className="footer-content">
              Seg - Qui 10h às 22h<br/>
              Sex - Sáb 10h às 23h<br/>
              Dom e feriados 11h às 22h<br/><br/>
            </p>
          </div>
          <div className="footer-item">
            <h4 className="footer-subtitle">Escritório</h4>
            <p className="footer-content">Seg - Sex 07h às 19h</p>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Endereço</h3>
          <div className="footer-item">
            <h4 className="footer-subtitle">Shopping</h4>
            <p className="footer-content">
              Rua do Leonardo, 16 - Jardim Diego<br/><br/>
            </p>
          </div>
          <div className="footer-item">
            <h4 className="footer-subtitle">Escritório</h4>
            <p className="footer-content">
              Meu escritório é na praia e to sempre na área<br/><br/>
            </p>
          </div>
          <div className="footer-item">
            <h4 className="footer-subtitle">Mapa</h4>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Contatos</h3>
          <div className="footer-item">
            <p className="footer-content">(47) 1307-2002</p>
            <p className="footer-small-text">Seg - Sex 14h às 20h</p>
          </div>
          <div className="footer-item">
            <h4 className="footer-subtitle">Email</h4>
            <p className="footer-content link">contato@oasis.com</p>
          </div>
          <div className="footer-item">
            <h4 className="footer-subtitle">WhatsApp</h4>
            <p className="footer-content small-link">Converse com nossa IA</p>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Estacionamento</h3>
          <div className="footer-item">
            <p className="footer-content">
              Até 10 min. - isento<br/>
              De 10 até 30 min. - R$ 10,00<br/>
              De 31 até 60 min. - R$ 17,00<br/>
              2ª e 3ª hora - *Grátis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;