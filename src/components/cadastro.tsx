import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setErro("");
    // Aqui você pode chamar a API de cadastro
    Swal.fire({
      title: "Parabéns!",
      text: "Cadastro feito com sucesso!",
      icon: "success",
    });
  };

  return (
    <div className="cadastro-container">
      <Link to="/">
        <img
          className="logo-cadastro"
          src="./src/idVisual/logotipoPreto.svg"
          alt="Logo"
        />
      </Link>

      <div className="imagem-container">
        <img
          src="./src/idVisual/fundoCadastro.png"
          alt="Imagem de fundo"
          className="imagem imagem-fundo"
        />
        <img
          src="./src/idVisual/cadastroSobreposta.jpg"
          alt="Imagem sobreposta"
          className="imagem imagem-topo"
        />
      </div>

      <div className="container-input-cadastro">
        <h1 className="cadastro-title">Cadastro</h1>
        <p className="text-muted">Crie sua conta gratuitamente</p>

        {erro && <p style={{ color: "red", marginLeft: "15%" }}>{erro}</p>}

        <div className="input-group mb-3">
          <label className="label-input">Nome Completo</label>
          <input
            type="text"
            className="input-nome"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <label className="label-input">Email</label>
          <input
            type="email"
            className="input-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group senha mb-3">
          <label className="label-input">Senha</label>
          <input
            type="password"
            className="input-password-cadastro"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="cadastrar-btn" onClick={handleCadastro}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}
