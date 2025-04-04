import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function Login() {
  return (
    <div className="login-container">
      <img
        className="logo-login"
        src="./src/idVisual/logotipoPreto.svg"
        alt="Logo"
      />

      {/* IMAGENS FUNDO E SOBREPOSIÇÃO */}
      <div className="imagem-container">
        <img
          src="./src/idVisual/fundoLogin.png"
          alt="Imagem de fundo"
          className="imagem imagem-fundo"
        />
        <img
          src="./src/idVisual/fotoSobreposta.jpg"
          alt="Imagem sobreposta"
          className="imagem imagem-topo"
        />
      </div>

      {/* FORMULÁRIO */}
      <div className="container-input">
        <h1 className="login-title">Login</h1>
        <p className="text-muted">Faça o seu login na nossa conta</p>

        <div className="input-group mb-3">
          <label className="label-input">Email ou nome de Usuário</label>
          <input
            type="text"
            className="input-user"
            placeholder="Usuário"
            aria-label="Usuário"
            aria-describedby="basic-addon2"
          />
        </div>

        <div className="input-group senha mb-3">
          <label className="label-input">Senha</label>
          <input
            type="password"
            className="input-password"
            placeholder="Senha"
            aria-label="Senha"
            aria-describedby="basic-addon2"
          />
        </div>

        <button className="entrar-btn">LogIn</button>
      </div>
    </div>
  );
}
