import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usuario || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });
  
      const data = await response.json();
  
      Swal.fire({
        title: "Login feito!",
        text: `Bem-vindo(a), ${data.user.nome}`,
        icon: "success",
      }).then(() => {
        localStorage.setItem("tipoUsuario", data.user.tipo);
        if (data.user.tipo === "admin") {
          navigate("/testeADM");
        } else {
          navigate("/");
        }
      });
      
    } catch (error) {
      console.error(error);
      setErro("Erro na comunicação com o servidor.");
    }
  };
  

  return (
    <div className="login-container">
      <Link to="/">
        <img
          className="logo-login"
          src="./src/idVisual/logotipoPreto.svg"
          alt="Logo"
        />
      </Link>

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

          <div className="container-input">
      <h1 className="login-title">Login</h1>
      <p className="text-muted">Faça o seu login na nossa conta</p>

      {erro && <p style={{ color: "red", marginLeft: "15%" }}>{erro}</p>}

      <div className="input-group mb-3">
        <label className="label-input">Email ou nome de Usuário</label>
        <input
          type="text"
          className="input-user"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>

      <div className="input-group senha mb-3">
        <label className="label-input">Senha</label>
        <input
          type="password"
          className="input-password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      <div
  className="text mb-3"
  style={{ paddingTop: 15}}
>
        <Link to="/cadastro" className="cadastro-link">
          Não possui uma conta? Cadastre-se aqui!
        </Link>
      </div>
      </div>


      <button className="entrar-btn" onClick={handleLogin}>
        LogIn
      </button>
    </div>
    </div>
  );
}