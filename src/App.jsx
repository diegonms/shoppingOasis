import { Routes, Route } from "react-router-dom";
import Cadastro from "./components/cadastro";
import HomePage from "./components/HomePage";
import Login from "./components/login";
import CadastroNegocio from './components/cadastroNegocio';
import CadastroEvento from './components/cadastroEvento';
import TrabalheConosco from "./components/trabalheConosco";
import PaginaLojas from "./components/paginaLojas";
import PaginaEventos from "./components/paginaEventos";
import PaginaAdm from "./components/paginaAdm";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import TesteADM from "./components/paginaAdm";
import Usuario from "./components/usuario";
import PrivateRouteUser from './components/PrivateRouteUser'; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paginalojas" element={<PaginaLojas />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastroNegocio" element={<CadastroNegocio />} />
      <Route path="/cadastroEvento" element={<CadastroEvento />} />
      <Route path="/trabalheConosco" element ={<TrabalheConosco />} />
      <Route path="/paginaeventos" element ={<PaginaEventos />} />

      <Route
        path="/testeADM"
        element={
        <PrivateRouteAdmin>
          <TesteADM />
        </PrivateRouteAdmin>
  }
/>
      <Route
        path="/usuario"
        element={
          <PrivateRouteUser>
            <Usuario/>
          </PrivateRouteUser>
        }
/>
    </Routes>
  );
}

export default App;