import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login">
        <img
          className="logo-login"
          src="../idVisual/logotipoPreto.svg"
          alt="Logo"
        />
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
              className="input-password "
              placeholder="Senha"
              aria-label="Senha"
              aria-describedby="basic-addon2"
            />
          </div>

          <button className="entrar-btn">LogIn</button>
        </div>
      </div>
    </div>
  );
}
