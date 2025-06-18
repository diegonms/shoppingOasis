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
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    lojasAtivas: 0,
    eventosAtivos: 0,
    pendentes: 0,
});

useEffect(() => {
  const fetchStats = async () => {
      try {
          const [usuariosRes, lojasRes, eventosRes, pendentesRes] = await Promise.all([
              fetch("http://localhost:8080/api/stats/usuarios").then(res => res.json()),
              fetch("http://localhost:8080/api/stats/lojas").then(res => res.json()),
              fetch("http://localhost:8080/api/stats/eventos").then(res => res.json()),
              fetch("http://localhost:8080/api/stats/pendentes").then(res => res.json()),
          ]);

          setStats({
              totalUsuarios: usuariosRes.total,
              lojasAtivas: lojasRes.total,
              eventosAtivos: eventosRes.total,
              pendentes: pendentesRes.lojasPendentes + pendentesRes.eventosPendentes,
          });
      } catch (error) {
          console.error("Erro ao buscar estatísticas:", error);
      }
  };

  fetchStats();
}, []);

  useEffect(() => {
    setIsLoading(true);
    let endpoint = "";

    switch (activeSection) {
      case "users":
        endpoint = "/api/usuario";
        break;
      case "lojas":
        endpoint = "/api/loja";
        break;
      case "eventos":
        endpoint = "/api/evento";
        break;
      case "lojasPendentes":
        endpoint = "/api/loja/pendente";
        break;
      case "eventosPendentes":
        endpoint = "/api/evento/pendente";
        break;
      default:
        setData([]);
        setIsLoading(false);
        return;
    }
    

    fetch(`http://localhost:8080${endpoint}`)
      .then(res => res.json())
      .then(json => {
        console.log("Dados recebidos:", json);
        if (!Array.isArray(json)) {
          setData([]);
        } else {
          setData(json);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [activeSection]);

  const handleEdit = (item) => {
    setEditingItem(item);
    // Remove 'senha' from formData to avoid editing or sending it
    const { senha, ...rest } = item;
    setFormData(rest);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (activeSection === "users") {
      fetch(`http://localhost:8080/api/usuario/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(() => {
          setData(data.filter(item => item.id !== id));
          Swal.fire("Removido!", "O usuário foi excluído do banco de dados.", "success");
        })
        .catch(() => {
          Swal.fire("Erro!", "Não foi possível excluir o usuário.", "error");
        });
    } else if (activeSection === "lojas" || activeSection === "lojasPendentes") {
      fetch(`http://localhost:8080/api/loja/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(() => {
          setData(data.filter(item => item.id !== id));
          Swal.fire("Removido!", "A loja foi excluída do banco de dados.", "success");
        })
        .catch(() => {
          Swal.fire("Erro!", "Não foi possível excluir a loja.", "error");
        });
    } else {
      setData(data.filter(item => item.id !== id));
      Swal.fire("Removido!", "O item foi excluído.", "success");
    }
  };

 const handleSave = (id) => {
  if (activeSection === "users" && editingItem) {
    const { senha, ...userData } = formData;
    const payload = {
      ...userData,
      senhaAtual: "admin" // TODO: peça ao usuário a senha atual de forma segura
    };

    fetch(`http://localhost:8080/api/usuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar");
        return res.json();
      })
      .then(() => {
        setData(data.map(item => (item.id === editingItem.id ? { ...item, ...userData } : item)));
        Swal.fire("Sucesso!", "Usuário editado no banco de dados.", "success");
        setEditingItem(null);
      })
      .catch(() => {
        Swal.fire("Erro!", "Não foi possível editar o usuário.", "error");
      });
  } else if ((activeSection === "lojas" || activeSection === "lojasPendentes") && editingItem) {
    // Garante que todos os campos necessários sejam enviados
    const lojaAntiga = data.find(item => item.id === editingItem.id) || {};
    const lojaData = {
      nome_negocio: formData.nome_negocio ?? lojaAntiga.nome_negocio ?? '',
      cnpj: formData.cnpj ?? lojaAntiga.cnpj ?? '',
      telefone: formData.telefone ?? lojaAntiga.telefone ?? '',
      email: formData.email ?? lojaAntiga.email ?? '',
      descricao: formData.descricao ?? lojaAntiga.descricao ?? '',
      categoria: formData.categoria ?? lojaAntiga.categoria ?? '',
      status: formData.status ?? lojaAntiga.status ?? ''
    };
    fetch(`http://localhost:8080/api/loja/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lojaData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar");
        return res.json();
      })
      .then(() => {
        setData(data.map(item => (item.id === editingItem.id ? { ...item, ...lojaData } : item)));
        Swal.fire("Sucesso!", "Loja editada no banco de dados.", "success");
        setEditingItem(null);
      })
      .catch(() => {
        Swal.fire("Erro!", "Não foi possível editar a loja.", "error");
      });
  } else if ((activeSection === "eventos" || activeSection === "eventosPendentes") && editingItem) {
    // Garante que todos os campos necessários sejam enviados
    const eventoAntigo = data.find(item => item.id === editingItem.id) || {};
    const eventoData = {
      nome_evento: formData.nome_evento ?? eventoAntigo.nome_evento ?? '',
      email_contato: formData.email_contato ?? eventoAntigo.email_contato ?? '',
      data_inicio: formData.data_inicio ?? eventoAntigo.data_inicio ?? '',
      data_fim: formData.data_fim ?? eventoAntigo.data_fim ?? '',
      descricao: formData.descricao ?? eventoAntigo.descricao ?? '',
      status: formData.status ?? eventoAntigo.status ?? ''
    };
    fetch(`http://localhost:8080/api/evento/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventoData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar");
        return res.json();
      })
      .then(() => {
        setData(data.map(item => (item.id === editingItem.id ? { ...item, ...eventoData } : item)));
        Swal.fire("Sucesso!", "Evento editado no banco de dados.", "success");
        setEditingItem(null);
      })
      .catch(() => {
        Swal.fire("Erro!", "Não foi possível editar o evento.", "error");
      });
  } else {
    Swal.fire("Sucesso!", "Alterações salvas com sucesso.", "success");
    setEditingItem(null);
  }
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

  const handleApproveLoja = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/loja/aprovar/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Erro ao aprovar loja');
      Swal.fire("Aprovado!", "A loja foi aprovada com sucesso.", "success");
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      Swal.fire("Erro!", "Não foi possível aprovar a loja.", "error");
    }
  };

  const handleApproveEvento = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/evento/aprovar/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Erro ao aprovar evento');
      Swal.fire("Aprovado!", "O evento foi aprovado com sucesso.", "success");
      // Refaz o fetch dos eventos pendentes para garantir atualização
      if (activeSection === "eventosPendentes") {
        setIsLoading(true);
        fetch('http://localhost:8080/api/evento/pendente')
          .then(res => res.json())
          .then(json => {
            setData(Array.isArray(json) ? json : []);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      } else {
        setData(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      Swal.fire("Erro!", "Não foi possível aprovar o evento.", "error");
    }
  };


  const renderTable = () => {
    if (isLoading) return <div className="loading">Carregando...</div>;
    if (!Array.isArray(data)) return <div className="no-data">Erro ao carregar dados.</div>;
    if (data.length === 0) return <div className="no-data">Nenhum dado encontrado.</div>;

    const columns = Object.keys(data[0]).filter(col => col !== 'imagem_base64' && col !== 'imagem_blob');
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
                      // Do not allow editing or showing the password field
                      col === 'senha' ? (
                        <span>******</span>
                      ) : col === 'status' && (activeSection === 'lojas' || activeSection === 'lojasPendentes' || activeSection === 'eventos' || activeSection === 'eventosPendentes') ? (
                        <select
                          name="status"
                          value={formData.status || ''}
                          onChange={handleInputChange}
                        >
                          <option value="pendente">pendente</option>
                          <option value="aprovado">aprovado</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={col}
                          value={typeof formData[col] === 'object' && formData[col] !== null ? JSON.stringify(formData[col]) : formData[col] || ""}
                          onChange={handleInputChange}
                        />
                      )
                    ) : (
                      col === 'senha'
                        ? '******'
                        : (typeof item[col] === 'object' && item[col] !== null
                            ? JSON.stringify(item[col])
                            : item[col])
                    )}
                  </td>
                ))}
                <td className="actions">
                  {isPending ? (
                    <button className="btn-approve" onClick={() => handleApproveLoja(item.id)}>
                      Aprovar
                    </button>
                  ) : activeSection === "eventosPendentes" ? (
                    <button className="btn-approve" onClick={() => handleApproveEvento(item.id)}>
                      Aprovar
                    </button>
                  ) : (
                    <>
                      <button className="btn-edit" onClick={() =>
  editingItem?.id === item.id ? handleSave(item.id) : handleEdit(item)
}>
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
                <p>{stats.totalUsuarios}</p>
              </div>
              <div className="stat-card">
                <h3>Lojas Ativas</h3>
                <p>{stats.lojasAtivas}</p>
              </div>
              <div className="stat-card">
                <h3>Eventos Ativos</h3>
                <p>{stats.eventosAtivos}</p>
              </div>
              <div className="stat-card">
                <h3>Pendentes</h3>
                <p>{stats.pendentes}</p>
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
