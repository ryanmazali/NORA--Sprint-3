// src/App.tsx

import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./components/Layouts/MainLayout/MainLayout";
import PlataformaLayout from "./components/Plataforma/PlataformaLayoyt/PlataformaLayout";

// ─── Site Institucional ───────────────────────────────────────
const Home = lazy(() => import("./pages/Home/Home"));
const Projeto = lazy(() => import("./pages/Projeto/Projeto"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Contato = lazy(() => import("./pages/Contato/Contato"));
const Colaboradores = lazy(() => import("./pages/Colaboradores/Colaboradores"));
const ColaboradorDetalhe = lazy(() => import("./pages/Colaboradores/ColaboradorDetalhe"));
const SobreOng = lazy(() => import("./pages/SobreOng/SobreOng"));
const SorrisoDoBem = lazy(() => import("./pages/SorrisoDoBem/SorrisoDoBem"));
const Megatriagens = lazy(() => import("./pages/Megatriagens/Megatriagens"));
const MelhorDentista = lazy(() => import("./pages/MelhorDentista/MelhorDentista"));

// ─── Autenticação ─────────────────────────────────────────────
const Login = lazy(() => import("./pages/Login/Login"));

// ─── Plataforma Interna ───────────────────────────────────────
const Dashboard = lazy(() => import("./pages/Plataforma/Dashboard/Dashboard"));
const Pacientes = lazy(() => import("./pages/Plataforma/Pacientes/Pacientes"));
const PacienteDetalhe = lazy(() => import("./pages/Plataforma/Pacientes/PacienteDetalhe"));
const Dentistas = lazy(() => import("./pages/Plataforma/Dentistas/Dentistas"));
const DentistaDetalhe = lazy(() => import("./pages/Plataforma/Dentistas/DentistaDetalhe"));
const Encaminhamentos = lazy(() => import("./pages/Plataforma/Encaminhamentos/Encaminhamentos"));
const Omnichannel = lazy(() => import("./pages/Plataforma/Omnichannel/Omnichannel"));
const OmnichannelDetalhe = lazy(() => import("./pages/Plataforma/Omnichannel/OmnichannelDetalhe"));
const Metricas = lazy(() => import("./pages/Plataforma/Metricas/Metricas"));

// ─── Loading global ───────────────────────────────────────────
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f4f7fa]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
      <p className="text-[#0a3d62] text-sm font-medium font-[Poppins]">Carregando...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>

          {/* Site institucional — com Navbar e Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="projeto" element={<Projeto />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contato" element={<Contato />} />
            <Route path="colaboradores" element={<Colaboradores />} />
            <Route path="colaboradores/:id" element={<ColaboradorDetalhe />} />
            <Route path="sobre-ong" element={<SobreOng />} />
            <Route path="sorriso-do-bem" element={<SorrisoDoBem />} />
            <Route path="megatriagens" element={<Megatriagens />} />
            <Route path="melhor-dentista" element={<MelhorDentista />} />
          </Route>

          {/* Login — tela própria, sem Navbar/Footer */}
          <Route path="login" element={<Login />} />

          {/* Plataforma interna — com Sidebar e TopBar */}
          <Route path="plataforma" element={<PlataformaLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="pacientes/:id" element={<PacienteDetalhe />} />
            <Route path="dentistas" element={<Dentistas />} />
            <Route path="dentistas/:id" element={<DentistaDetalhe />} />
            <Route path="encaminhamentos" element={<Encaminhamentos />} />
            <Route path="omnichannel" element={<Omnichannel />} />
            <Route path="omnichannel/:id" element={<OmnichannelDetalhe />} />
            <Route path="metricas" element={<Metricas />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;