import React from "react";

export default function HomePage() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/public/imagens/joaopedro.png"
              alt="Logo"
              className="logo-navbar"
              style={{ width: "50px" }}
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
            {"ola"}
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
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
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
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
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/imagens/propaganda1.jpeg"
              className="d-block w-100"
              alt="Loja 1"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/imagens/evento2.jpeg"
              className="d-block w-100"
              alt="Evento 2"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/imagens/propaganda2.png"
              className="d-block w-100"
              alt="Loja 2"
              style={{ height: "400px", objectFit: "cover" }}
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
