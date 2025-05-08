import React, { useState, useEffect } from "react";
import "./style-admin.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
const [activeSection, setActiveSection] = useState("dashboard");
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [editingItem, setEditingItem] = useState(null);
const [formData, setFormData] = useState({});
const navigate = useNavigate();


// Simulação de dados - substituir por chamadas à API real
const mockData = {
  dashboard: [],
  users: [
    { id: 1, name: "Admin", email: "admin@oasis.com", role: "admin" },
    { id: 2, name: "João Silva", email: "joao@email.com", role: "user" },
    { id: 3, name: "Maria Souza", email: "maria@email.com", role: "user" }
  ],
  lojas: [
    { id: 1, nome: "Aquazero", categoria: "Bem-estar", status: "aprovado" },
    { id: 2, nome: "Aldeia Coworking", categoria: "Escritórios", status: "aprovado" }
  ],
  eventos: [
    { id: 1, nome: "Feira de Artesanato", data: "25/10 - 28/10", status: "aprovado" }
  ],
  lojasPendentes: [
    { id: 3, nome: "Loja Nova", categoria: "Varejo", status: "pendente" }
  ],
  eventosPendentes: [
    { id: 2, nome: "Workshop Gastronomia", data: "30/10", status: "pendente" }
  ]
};

useEffect(() => {
  setIsLoading(true);
  // Simulando chamada à API
  setTimeout(() => {
    setData(mockData[activeSection] || []);
    setIsLoading(false);
  }, 500);
}, [activeSection]);

const handleEdit = (item) => {
  setEditingItem(item);
  setFormData(item);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSave = () => {
  // Simulando atualização
  Swal.fire("Sucesso!", "Alterações salvas com sucesso.", "success");
  setEditingItem(null);
};

const handleLogout = () => {
  Swal.fire({
    title: "Tem certeza que deseja sair?",
    text: "Você será redirecionado para a página inicial.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, sair",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Sessão encerrada",
        text: "Você saiu do painel administrativo.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate("/");
      });
    }
  });
};


const handleDelete = (id) => {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja remover este item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, remover",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      // Simulando exclusão
      setData(data.filter(item => item.id !== id));
      Swal.fire("Removido!", "O item foi excluído.", "success");
    }
  });
};

const handleApprove = (id) => {
  // Simulando aprovação
  const item = data.find(item => item.id === id);
  if (activeSection === "lojasPendentes") {
    setData(data.filter(item => item.id !== id));
    setData(prev => [...mockData.lojas, { ...item, status: "aprovado" }]);
  } else if (activeSection === "eventosPendentes") {
    setData(data.filter(item => item.id !== id));
    setData(prev => [...mockData.eventos, { ...item, status: "aprovado" }]);
  }
  Swal.fire("Aprovado!", "O item foi aprovado e movido.", "success");
};

const renderTable = () => {
  if (isLoading) return <div className="loading">Carregando...</div>;
  if (data.length === 0) return <div className="no-data">Nenhum dado encontrado.</div>;

  const columns = Object.keys(data[0]);
  const isPending = activeSection.includes("Pendentes");

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {columns.map(col => (
                <td key={`${item.id}-${col}`}>
                  {editingItem?.id === item.id ? (
                    <input
                      type="text"
                      name={col}
                      value={formData[col] || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item[col]
                  )}
                </td>
              ))}
              <td className="actions">
                {isPending ? (
                  <button 
                    className="btn-approve"
                    onClick={() => handleApprove(item.id)}
                  >
                    Aprovar
                  </button>
                ) : (
                  <>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      {editingItem?.id === item.id ? "Salvar" : "Editar"}
                    </button>
                    {editingItem?.id === item.id ? (
                      <button 
                        className="btn-cancel"
                        onClick={() => setEditingItem(null)}
                      >
                        Cancelar
                      </button>
                    ) : (
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Remover
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

return (
  <div className="admin-panel">
    <aside className="sidebar">
      <h2 className="admin-title">Admin Oasis</h2>
      <nav>
        <ul>
          <li>
            <button 
              className={activeSection === "dashboard" ? "active" : ""}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              className={activeSection === "users" ? "active" : ""}
              onClick={() => setActiveSection("users")}
            >
              Users
            </button>
          </li>
          <li>
            <button 
              className={activeSection === "lojas" ? "active" : ""}
              onClick={() => setActiveSection("lojas")}
            >
              Lojas
            </button>
          </li>
          <li>
            <button 
              className={activeSection === "eventos" ? "active" : ""}
              onClick={() => setActiveSection("eventos")}
            >
              Eventos
            </button>
          </li>
          <li>
            <button 
              className={activeSection === "lojasPendentes" ? "active" : ""}
              onClick={() => setActiveSection("lojasPendentes")}
            >
              Lojas Pendentes
            </button>
          </li>
          <li>
            <button 
              className={activeSection === "eventosPendentes" ? "active" : ""}
              onClick={() => setActiveSection("eventosPendentes")}
            >
              Eventos Pendentes
            </button>
          </li>
          <li>
              <button
              className="logout-buton"
              onClick={ () => handleLogout()} 
              >
              Sair
              </button></li>
        </ul>
      </nav>
    </aside>
    
    <main className="content">
      <h1 className="section-title">
        {activeSection === "dashboard" && "Dashboard"}
        {activeSection === "users" && "Users"}
        {activeSection === "lojas" && "Lojas"}
        {activeSection === "eventos" && "Eventos"}
        {activeSection === "lojasPendentes" && "Lojas Pendentes"}
        {activeSection === "eventosPendentes" && "Eventos Pendentes"}
      </h1>

      {activeSection === "dashboard" ? (
        <div className="dashboard-content">
          <p>Bem-vindo ao painel administrativo do Shopping Oasis.</p>
          <div className="stats">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{mockData.users.length}</p>
            </div>
            <div className="stat-card">
              <h3>Lojas Ativas</h3>
              <p>{mockData.lojas.length}</p>
            </div>
            <div className="stat-card">
              <h3>Eventos Ativos</h3>
              <p>{mockData.eventos.length}</p>
            </div>
            <div className="stat-card">
              <h3>Pendentes</h3>
              <p>{mockData.lojasPendentes.length + mockData.eventosPendentes.length}</p>
            </div>
          </div>
        </div>
      ) : (
        renderTable()
      )}
    </main>
  </div>
);
};

export default AdminPanel;