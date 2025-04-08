import { Routes, Route } from "react-router-dom";
import Cadastro from "./components/cadastro";
import HomePage from "./components/HomePage";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
