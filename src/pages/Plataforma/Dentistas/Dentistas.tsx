// src/pages/Plataforma/Dentistas/Dentistas.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search, UserPlus, ChevronRight, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { dentistas, type Dentista } from "../../../data/dentistasData";

// ─── Helpers ─────────────────────────────────────────────────

const badgeStatus: Record<Dentista["status"], string> = {
  ativo: "bg-emerald-100 text-emerald-700",
  inativo: "bg-gray-100 text-gray-600",
  suspenso: "bg-red-100 text-red-700",
};

const labelStatus: Record<Dentista["status"], string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  suspenso: "Suspenso",
};

function DisponibilidadeIndicador({ cap, ativos }: { cap: number; ativos: number }) {
  const vagas = cap - ativos;
  const disponivel = vagas > 0;

  return (
    <div className="flex items-center gap-1.5">
      {disponivel ? (
        <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
      ) : (
        <XCircle size={14} className="text-red-500 flex-shrink-0" />
      )}
      <span className={`text-xs font-medium ${disponivel ? "text-emerald-600" : "text-red-600"}`}>
        {disponivel ? `${vagas} vaga${vagas > 1 ? "s" : ""}` : "Sem vagas"}
      </span>
    </div>
  );
}

// ─── Componente ───────────────────────────────────────────────

function Dentistas() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<Dentista["status"] | "todos">("todos");
  const [filtroDisponivel, setFiltroDisponivel] = useState<"todos" | "disponivel">("todos");

  useEffect(() => {
    document.title = "Dentistas | NORA";
  }, []);

  const dentistasFiltrados = dentistas.filter((d) => {
    const buscaOk =
      d.nome.toLowerCase().includes(busca.toLowerCase()) ||
      d.cro.toLowerCase().includes(busca.toLowerCase());
    const statusOk = filtroStatus === "todos" || d.status === filtroStatus;
    const dispOk = filtroDisponivel === "todos" || d.encaminhamentosAtivos < d.capMensal;
    return buscaOk && statusOk && dispOk;
  });

    return (
        <div className="flex flex-col gap-6">

            {/* Cabeçalho */}
            <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
                <div>
                <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">
                    Dentistas
                </h1>
                <p className="text-[#888] text-sm mt-0.5">
                    {dentistasFiltrados.length} dentista{dentistasFiltrados.length !== 1 ? "s" : ""} encontrado{dentistasFiltrados.length !== 1 ? "s" : ""}
                </p>
                </div>
                <button className="
                flex items-center gap-2 bg-[#1e88e5] hover:bg-[#1565c0]
                text-white text-sm font-semibold px-4 py-2.5 rounded-lg
                transition-all duration-200 shadow-sm w-fit border-none cursor-pointer
                ">
                <UserPlus size={16} />
                Novo Dentista
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-col gap-3 tablet:flex-row">
                <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou CRO..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="
                    w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#ddd]
                    bg-white text-sm text-[#333] placeholder:text-[#bbb]
                    outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200
                    "
                />
                </div>

                <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as Dentista["status"] | "todos")}
                className="
                    px-3 py-2.5 rounded-lg border border-[#ddd] bg-white
                    text-sm text-[#333] outline-none
                    focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200 cursor-pointer w-full tablet:w-auto
                "
                >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="suspenso">Suspenso</option>
                </select>

                <select
                value={filtroDisponivel}
                onChange={(e) => setFiltroDisponivel(e.target.value as "todos" | "disponivel")}
                className="
                    px-3 py-2.5 rounded-lg border border-[#ddd] bg-white
                    text-sm text-[#333] outline-none
                    focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200 cursor-pointer w-full tablet:w-auto
                "
                >
                <option value="todos">Todos</option>
                <option value="disponivel">Com vagas</option>
                </select>
            </div>

            {/* Lista */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                {/* Header tabela — desktop */}
                <div className="hidden desktop:grid desktop:grid-cols-[1fr_140px_140px_120px_100px_40px] gap-4 px-5 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Dentista</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Especialidades</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Disponibilidade</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Credenciado em</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Status</span>
                <span />
                </div>

                {dentistasFiltrados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                    <AlertCircle size={32} className="text-[#ddd] mb-3" />
                    <p className="text-[#999] text-sm">Nenhum dentista encontrado</p>
                    <p className="text-[#bbb] text-xs mt-1">Tente ajustar os filtros ou a busca</p>
                </div>
                ) : (
                <div className="divide-y divide-[#f5f5f5]">
                    {dentistasFiltrados.map((dentista) => (
                    <Link
                        key={dentista.id}
                        to={`/plataforma/dentistas/${dentista.id}`}
                        className="
                        flex flex-col gap-3 px-5 py-4 no-underline
                        hover:bg-[#f8fafc] transition-colors duration-150
                        desktop:grid desktop:grid-cols-[1fr_140px_140px_120px_100px_40px]
                        desktop:items-center desktop:gap-4
                        "
                    >
                        {/* Nome */}
                        <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1e88e5]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#1e88e5] text-sm font-bold">
                            {dentista.nome.replace("Dr. ", "").replace("Dra. ", "").charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="text-[#333] text-sm font-semibold">{dentista.nome}</p>
                            <p className="text-[#999] text-xs">{dentista.cro}</p>
                        </div>
                        </div>

                        {/* Especialidades */}
                        <div className="flex flex-wrap gap-1">
                        {dentista.especialidades.slice(0, 2).map((esp) => (
                            <span key={esp} className="text-xs bg-[#f0f4f8] text-[#555] px-2 py-0.5 rounded-full">
                            {esp}
                            </span>
                        ))}
                        </div>

                        {/* Disponibilidade */}
                        <div className="flex flex-col gap-1">
                        <DisponibilidadeIndicador cap={dentista.capMensal} ativos={dentista.encaminhamentosAtivos} />
                        <span className="text-xs text-[#bbb]">
                            {dentista.encaminhamentosAtivos}/{dentista.capMensal} ativos
                        </span>
                        </div>

                        {/* Data */}
                        <span className="text-[#999] text-xs">{dentista.dataCredenciamento}</span>

                        {/* Status */}
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${badgeStatus[dentista.status]}`}>
                        {labelStatus[dentista.status]}
                        </span>

                        {/* Seta */}
                        <ChevronRight size={16} className="text-[#ccc] hidden desktop:block" />
                    </Link>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default Dentistas;