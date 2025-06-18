import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style-cad-lojas.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

export default function CadastroEventos() {
  const [formData, setFormData] = useState({
    nomeEvento: "",
    email: "", // Added email field
    dataInicio: "",
    dataFim: "",
    horarioInicio: "",
    horarioFim: "",
    piso: "",
    tipoEvento: "",
    imagem: null
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  function formatDateToISO(dateStr: string): string {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nomeEvento || !formData.dataInicio || !formData.horarioInicio || !formData.email) {
      setErro("Preencha os campos obrigatórios");
      return;
    }
    setErro("");
    let imagem_base64: string | null = null;
    if (formData.imagem) {
      imagem_base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result === "string") {
            resolve(result.split(',')[1]);
          } else {
            reject(new Error("Erro ao ler imagem"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(formData.imagem);
      });
    }
    try {
      const mappedData = {
        nome_evento: formData.nomeEvento,
        email_contato: formData.email,
        data_inicio: formatDateToISO(formData.dataInicio),
        data_fim: formatDateToISO(formData.dataFim),
        horario_inicio: formData.horarioInicio,
        horario_fim: formData.horarioFim,
        piso: formData.piso,
        tipo_evento: formData.tipoEvento,
        descricao: "", // Adapte se quiser um campo de descrição
        status: "pendente",
        ...(imagem_base64 && { imagem_base64 })
      };
      const response = await fetch('http://localhost:8080/api/evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedData)
      });
      if (response.ok) {
        Swal.fire({
          title: "Solicitação enviada!",
          text: "Nossos representantes entrarão em contato em breve.",
          icon: "success"
        });
      } else {
        const data = await response.json();
        setErro(data.error || "Erro ao cadastrar evento.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
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
          src="./src/idVisual/fundoCadEventos.png"
          alt="Imagem de fundo"
          className="imagem imagem-fundo"
        />
      </div>

      <div className="container-input-cadastro">
        <h1 className="cadastro-title">Faça seu evento conosco</h1>
        <p className="text-muted">Nosso representante irá entrar em contato com você</p>

        {erro && <p style={{ color: "red", marginLeft: "15%" }}>{erro}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label className="label-input">Nome do seu evento*</label>
            <input
              type="text"
              name="nomeEvento"
              className="input-nome"
              placeholder="Digite o nome do evento"
              value={formData.nomeEvento}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Email para contato*</label>
            <input
              type="email"
              name="email"
              className="input-nome"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Data de início*</label>
            <InputMask
              type="text"
              name="dataInicio"
              className="input-nome"
              mask="99/99/9999"
              placeholder="DD/MM/AAAA"
              value={formData.dataInicio}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Data de fim</label>
            <InputMask
              type="text"
              name="dataFim"
              className="input-nome"
              mask="99/99/9999"
              placeholder="DD/MM/AAAA"
              value={formData.dataFim}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Horário início*</label>
            <InputMask
              type="text"
              name="horarioInicio"
              className="input-nome"
              mask="99:99"
              placeholder="HH:MM"
              value={formData.horarioInicio}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Horário de fim</label>
            <InputMask
              type="text"
              name="horarioFim"
              className="input-nome"
              mask="99:99"
              placeholder="HH:MM"
              value={formData.horarioFim}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Piso solicitado</label>
            <select
              name="piso"
              className="input-nome"
              value={formData.piso}
              onChange={handleChange}
            >
              <option value="">Selecione um piso</option>
              <option value="1">Piso 1</option>
              <option value="2">Piso 2</option>
              <option value="3">Piso 3</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Tipo do evento</label>
            <select
              name="tipoEvento"
              className="input-nome"
              value={formData.tipoEvento}
              onChange={handleChange}
            >
              <option value="">Selecione o tipo</option>
              <option value="cultural">Cultural</option>
              <option value="comercial">Comercial</option>
              <option value="educacional">Educacional</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Imagem do evento</label>
            <input
              type="file"
              name="imagem"
              className="input-nome"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <button 
            type="submit" 
            className="cadastrar-btn"
            style={{ backgroundColor: '#001219' }}
          >
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}
