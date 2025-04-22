import React, { useState, useEffect } from "react";
import "./style-admin.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const navigate = useNavigate (); 
    const [activeSection, setActiveSection] = useState("dashboard");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

  // Simulação de dados - substituir por chamadas à API real
  const mockData = {
    dashboard: [],
    users: []
  };

  useEffect(() => {
    const fetchData = async () =>{
      setIsLoading(true);
      try {
        const response = await fetch('./public/index.js/${activeSection}');
        if (!response.ok) {
          throw new Error ('Erro na requisição');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log('Erro ao buscar dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData ();
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
    const handleLogout = () => {
        navigate ("/");
    }

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
            <h1>Bem vindo Sr. Admin</h1>
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