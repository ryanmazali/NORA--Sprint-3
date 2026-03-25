import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./components/Layouts/MainLayout/MainLayout"

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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;