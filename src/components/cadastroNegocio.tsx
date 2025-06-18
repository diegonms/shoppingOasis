import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style-cad-lojas.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

export default function CadastroNegocio() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const userId = usuario?.id;

  const [formData, setFormData] = useState({
    nomeNegocio: "",
    cnpj: "",
    telefone: "",
    email: "",
    descricao: "",
    categoria: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nomeNegocio || !formData.cnpj || !formData.email) {
      setErro("Preencha os campos obrigatórios");
      return;
    }

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

    const dataToSend = {
      nome_negocio: formData.nomeNegocio,
      cnpj: formData.cnpj,
      telefone: formData.telefone,
      email: formData.email,
      descricao: formData.descricao,
      categoria: formData.categoria,
      ...(imagem_base64 && { imagem_base64 }),
      id_usuario_solicitante: userId || 1
    };

    try {
      const response = await fetch('http://localhost:8080/api/loja', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        Swal.fire("Solicitação enviada!", "Em breve entraremos em contato.", "success");
      } else {
        const err = await response.json();
        setErro(err.error || "Erro ao cadastrar.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <Link to="/">
        <img className="logo-cadastro" src="./src/idVisual/logotipoPreto.svg" alt="Logo" />
      </Link>

      <div className="imagem-container">
        <img src="./src/idVisual/fundoCadLojas.png" alt="Imagem de fundo" className="imagem imagem-fundo" />
      </div>

      <div className="container-input-cadastro">
        <h1 className="cadastro-title">Solicite um cadastro</h1>
        <p className="text-muted">Nossos representantes entrarão em contato com você</p>

        {erro && <p style={{ color: "red", marginLeft: "15%" }}>{erro}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label className="label-input">Nome do seu negócio*</label>
            <input type="text" name="nomeNegocio" className="input-nome" placeholder="Digite o nome do negócio" value={formData.nomeNegocio} onChange={handleChange} />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">CNPJ*</label>
            <InputMask type="text" name="cnpj" className="input-nome" mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={handleChange} />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Telefone</label>
            <InputMask type="tel" name="telefone" className="input-nome" mask="(99) 99999-9999" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleChange} />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Email*</label>
            <input type="email" name="email" className="input-email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Sua melhor cenário!</label>
            <textarea name="descricao" className="input-nome" placeholder="Descreva seu negócio" value={formData.descricao} onChange={handleChange} style={{ height: '100px' }} />
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Categoria</label>
            <select name="categoria" className="input-nome" value={formData.categoria} onChange={handleChange}>
              <option value="">Escolha uma categoria</option>
              <option value="restaurante">Restaurante</option>
              <option value="varejo">Varejo</option>
              <option value="servicos">Serviços</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <label className="label-input">Imagem</label>
            <input type="file" name="imagem" className="input-nome" onChange={handleChange} accept="image/*" />
          </div>

          <button type="submit" className="cadastrar-btn" style={{ backgroundColor: '#001219' }}>
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}
