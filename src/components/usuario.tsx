import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Usuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("idUsuario"); // Certifique-se de salvar isso no login
    if (!id) return;

    fetch(`http://localhost:8080/api/usuario/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIdUsuario(data.id);
        setNome(data.nome || "");
        setEmail(data.email || "");
        setSenha(data.senha || "");
        setConfirmarSenha(data.senha || "");
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setErro("Erro ao carregar seus dados.");
      });
  }, []);

  // Validar email
  const validarEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Atualizar dados
  const handleSalvar = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
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

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");

    try {
      const response = await fetch(`http://localhost:8080/api/usuario/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Sucesso!",
          text: "Dados atualizados com sucesso!",
          icon: "success",
        });
      } else {
        const data = await response.json();
        setErro(data.error || "Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <Link to="/">
        <img className="logo-cadastro" src="./src/idVisual/logotipoPreto.svg" alt="Logo" />
      </Link>

      <div className="imagem-container">
        <img src="./src/idVisual/usuarioBaixo.png" alt="Imagem de fundo" className="imagem imagem-fundo" />
        <img src="./src/idVisual/usuarioCima.jpg" alt="Imagem sobreposta" className="imagem imagem-topo" />
      </div>

      <div className="container-input-cadastro">
        <h1 className="cadastro-title">Tela de Usuário</h1>
        <p className="text-muted">Altere os seus dados!</p>

        {erro && <p style={{ color: "red", marginLeft: "15%" }}>{erro}</p>}

        <div className="input-group mb-3">
          <label className="label-input">Nome Completo</label>
          <input type="text" className="input-nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="input-group mb-3">
          <label className="label-input">Email</label>
          <input type="email" className="input-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-group senha mb-3">
          <label className="label-input">Senha</label>
          <input type="password" className="input-password-cadastro" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <div className="input-group senha mb-3">
          <label className="label-input">Confirmar Senha</label>
          <input type="password" className="input-password-cadastro" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        </div>

        <button className="cadastrar-btn" onClick={handleSalvar}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
