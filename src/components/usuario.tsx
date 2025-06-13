import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function Usuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("idUsuario"); 
    if (!id) return;

    fetch(`http://localhost:8080/api/usuario/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIdUsuario(data.id);
        setNome(data.nome || "");
        setEmail(data.email || "");
        setSenha(data.senha || "");
        setNovaSenha("");
        setConfirmarNovaSenha("");
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
    if (!nome || !email) {
      setErro("Preencha nome e email.");
      return;
    }
    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }
    // Sempre exige senha atual para qualquer alteração
    if (!senhaAtual) {
      setErro("Informe a senha atual para atualizar seus dados.");
      return;
    }
    // Só exige nova senha e confirmação se o usuário quiser trocar a senha
    if (novaSenha || confirmarNovaSenha) {
      if (!novaSenha || !confirmarNovaSenha) {
        setErro("Preencha a nova senha e a confirmação para alterar a senha.");
        return;
      }
      if (novaSenha.length < 6) {
        setErro("A nova senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (novaSenha !== confirmarNovaSenha) {
        setErro("A nova senha e a confirmação não coincidem.");
        return;
      }
    }
    setErro("");
    try {
      let body;
      if (novaSenha && confirmarNovaSenha) {
        body = JSON.stringify({ nome, email, senha: novaSenha, senhaAtual });
      } else {
        body = JSON.stringify({ nome, email, senhaAtual });
      }
      const response = await fetch(`http://localhost:8080/api/usuario/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (response.ok) {
        Swal.fire({
          title: "Sucesso!",
          text: "Dados atualizados com sucesso!",
          icon: "success",
        }).then(() => {
          navigate("/");
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
          <label className="label-input">Senha Atual</label>
          <input type="password" className="input-password-cadastro" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
        </div>

        <div className="input-group senha mb-3">
          <label className="label-input">Nova Senha</label>
          <input type="password" className="input-password-cadastro" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
        </div>

        <div className="input-group senha mb-3">
          <label className="label-input">Confirmar Nova Senha</label>
          <input type="password" className="input-password-cadastro" value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} />
        </div>

        <button className="cadastrar-btn" onClick={handleSalvar}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
