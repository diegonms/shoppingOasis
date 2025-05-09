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

  useEffect(() => {
    setIsLoading(true);
    let endpoint = "";

    switch (activeSection) {
      case "users":
        endpoint = "/api/usuario";
        break;
      case "lojas":
        endpoint = "/api/loja?status=aprovado";
        break;
      case "eventos":
        endpoint = "/api/evento?status=aprovado";
        break;
      case "lojasPendentes":
        endpoint = "/api/loja?status=pendente";
        break;
      case "eventosPendentes":
        endpoint = "/api/evento?status=pendente";
        break;
      default:
        setData([]);
        setIsLoading(false);
        return;
    }

    fetch(`http://localhost:8080${endpoint}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
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
        setData(data.filter(item => item.id !== id));
        Swal.fire("Removido!", "O item foi excluído.", "success");
      }
    });
  };

  const handleApprove = (id) => {
    Swal.fire("Aprovado!", "O item foi aprovado e movido.", "success");
    setData(prev => prev.filter(item => item.id !== id));
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
                    <button className="btn-approve" onClick={() => handleApprove(item.id)}>
                      Aprovar
                    </button>
                  ) : (
                    <>
                      <button className="btn-edit" onClick={() => handleEdit(item)}>
                        {editingItem?.id === item.id ? "Salvar" : "Editar"}
                      </button>
                      {editingItem?.id === item.id ? (
                        <button className="btn-cancel" onClick={() => setEditingItem(null)}>
                          Cancelar
                        </button>
                      ) : (
                        <button className="btn-delete" onClick={() => handleDelete(item.id)}>
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
              <button className={activeSection === "dashboard" ? "active" : ""} onClick={() => setActiveSection("dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              <button className={activeSection === "users" ? "active" : ""} onClick={() => setActiveSection("users")}>
                Users
              </button>
            </li>
            <li>
              <button className={activeSection === "lojas" ? "active" : ""} onClick={() => setActiveSection("lojas")}>
                Lojas
              </button>
            </li>
            <li>
              <button className={activeSection === "eventos" ? "active" : ""} onClick={() => setActiveSection("eventos")}>
                Eventos
              </button>
            </li>
            <li>
              <button className={activeSection === "lojasPendentes" ? "active" : ""} onClick={() => setActiveSection("lojasPendentes")}>
                Lojas Pendentes
              </button>
            </li>
            <li>
              <button className={activeSection === "eventosPendentes" ? "active" : ""} onClick={() => setActiveSection("eventosPendentes")}>
                Eventos Pendentes
              </button>
            </li>
            <li>
              <button className="logout-buton" onClick={() => handleLogout()}>
                Sair
              </button>
            </li>
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
                <p>{data.length}</p>
              </div>
              <div className="stat-card">
                <h3>Lojas Ativas</h3>
                <p>-</p>
              </div>
              <div className="stat-card">
                <h3>Eventos Ativos</h3>
                <p>-</p>
              </div>
              <div className="stat-card">
                <h3>Pendentes</h3>
                <p>-</p>
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
