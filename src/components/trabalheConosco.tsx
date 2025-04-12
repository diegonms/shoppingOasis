import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style-cad-lojas.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

export default function TrabalheConosco() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: "",
    pretensaoSalarial: "",
    curriculo: null
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nomeCompleto || !formData.cpf || !formData.email || !formData.telefone || !formData.curriculo) {
      setErro("Preencha todos os campos obrigatórios");
      return;
    }

    setErro("");
    Swal.fire({
      title: "Candidatura enviada!",
      text: "Agradecemos seu interesse. Analisaremos seu currículo e entraremos em contato.",
      icon: "success"
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
          src="./src/idVisual/fundoTrabalheConosco.png"
          alt="Imagem de fundo"
          className="imagem imagem-fundo"
        />
      </div>

      <div className="container-input-cadastro">
        <h1 className="cadastro-title">Trabalhe Conosco</h1>
        <p className="text-muted">Envie seu currículo e venha fazer parte do nosso time</p>

        {erro && <p style={{ color: "red", marginLeft: "15%" }}>{erro}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label className="label-input">Nome Completo*</label>
            <input
              type="text"
              name="nomeCompleto"
              className="input-nome"
              placeholder="Digite seu nome completo"
              value={formData.nomeCompleto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">CPF*</label>
            <InputMask
              type="text"
              name="cpf"
              className="input-nome"
              mask="999.999.999-99"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Email*</label>
            <input
              type="email"
              name="email"
              className="input-nome"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Telefone*</label>
            <InputMask
              type="tel"
              name="telefone"
              className="input-nome"
              mask="(99) 99999-9999"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Pretensão Salarial</label>
            <InputMask
              type="text"
              name="pretensaoSalarial"
              className="input-nome"
              mask="R$ 999.999,99"
              maskChar={null}
              placeholder="R$ 0.000,00"
              value={formData.pretensaoSalarial}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Currículo*</label>
            <input
              type="file"
              name="curriculo"
              className="input-nome"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required
            />
            <small className="text-muted">Aceitamos PDF, DOC e DOCX</small>
          </div>

          <button 
            type="submit" 
            className="cadastrar-btn"
            style={{ backgroundColor: '#001219' }}
          >
            Enviar Candidatura
          </button>
        </form>
      </div>
    </div>
  );
}