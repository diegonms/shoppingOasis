import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../style.css";

export default function HomePage() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/public/imagens/joaopedro.png"
              alt="Logo"
              className="logo-navbar"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {""}
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Início
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Lojas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Eventos
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mais
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Horários
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Contato
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sobre
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        id="carouselEventosLojas"
        className="carousel slide mt-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/imagens/evento1.jpeg"
              className="d-block w-100"
              alt="Evento 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/imagens/propaganda1.jpeg"
              className="d-block w-100"
              alt="Loja 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/imagens/evento2.jpeg"
              className="d-block w-100"
              alt="Evento 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/imagens/propaganda2.png"
              className="d-block w-100"
              alt="Loja 2"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselEventosLojas"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselEventosLojas"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
}
