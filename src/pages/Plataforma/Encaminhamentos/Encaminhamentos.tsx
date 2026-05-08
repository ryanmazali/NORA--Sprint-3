import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    Search,
    ArrowRightLeft,
    ChevronRight,
    MapPin,
    Zap,
    Mic,
    AlertCircle,
} from "lucide-react";
import { encaminhamentos, type Encaminhamento } from "../../../data/encaminhamentosData";

// ─── Helpers ─────────────────────────────────────────────────

const badgePrioridade: Record<Encaminhamento["prioridade"], string> = {
    baixa: "bg-gray-100 text-gray-600",
    media: "bg-blue-100 text-blue-700",
    alta: "bg-orange-100 text-orange-700",
    urgente: "bg-red-100 text-red-700",
};

const badgeStatus: Record<Encaminhamento["status"], string> = {
    ativo: "bg-blue-100 text-blue-700",
    concluido: "bg-emerald-100 text-emerald-700",
    cancelado: "bg-gray-100 text-gray-600",
    reencaminhado: "bg-orange-100 text-orange-700",
};

const labelStatus: Record<Encaminhamento["status"], string> = {
    ativo: "Ativo",
    concluido: "Concluído",
    cancelado: "Cancelado",
    reencaminhado: "Reencaminhado",
};

const labelPrioridade: Record<Encaminhamento["prioridade"], string> = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
    urgente: "Urgente",
};

const corUrgencia = (nivel: number) => {
    if (nivel >= 4) return "text-red-600";
    if (nivel >= 3) return "text-orange-500";
    if (nivel >= 2) return "text-blue-600";
    return "text-emerald-600";
};

// ─── Componente ───────────────────────────────────────────────

function Encaminhamentos() {
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState<Encaminhamento["status"] | "todos">("todos");
    const [filtroPrioridade, setFiltroPrioridade] = useState<Encaminhamento["prioridade"] | "todos">("todos");

    useEffect(() => {
        document.title = "Encaminhamentos | NORA";
    }, []);

    const filtrados = encaminhamentos.filter((e) => {
        const buscaOk =
        e.paciente.nome.toLowerCase().includes(busca.toLowerCase()) ||
        e.dentista.nome.toLowerCase().includes(busca.toLowerCase());
        const statusOk = filtroStatus === "todos" || e.status === filtroStatus;
        const priorOk = filtroPrioridade === "todos" || e.prioridade === filtroPrioridade;
        return buscaOk && statusOk && priorOk;
    });

    return (
        <div className="flex flex-col gap-6">

            {/* Cabeçalho */}
            <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
                <div>
                <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">
                    Encaminhamentos
                </h1>
                <p className="text-[#888] text-sm mt-0.5">
                    {filtrados.length} encaminhamento{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
                </p>
                </div>
                <button className="
                flex items-center gap-2 bg-[#1e88e5] hover:bg-[#1565c0]
                text-white text-sm font-semibold px-4 py-2.5 rounded-lg
                transition-all duration-200 shadow-sm w-fit border-none cursor-pointer
                ">
                <ArrowRightLeft size={16} />
                Novo Encaminhamento
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-col gap-3 tablet:flex-row">
                <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                <input
                    type="text"
                    placeholder="Buscar por paciente ou dentista..."
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
                onChange={(e) => setFiltroStatus(e.target.value as Encaminhamento["status"] | "todos")}
                className="
                    px-3 py-2.5 rounded-lg border border-[#ddd] bg-white
                    text-sm text-[#333] outline-none cursor-pointer
                    focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200 w-full tablet:w-auto
                "
                >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
                <option value="reencaminhado">Reencaminhado</option>
                </select>

                <select
                value={filtroPrioridade}
                onChange={(e) => setFiltroPrioridade(e.target.value as Encaminhamento["prioridade"] | "todos")}
                className="
                    px-3 py-2.5 rounded-lg border border-[#ddd] bg-white
                    text-sm text-[#333] outline-none cursor-pointer
                    focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200 w-full tablet:w-auto
                "
                >
                <option value="todos">Todas as prioridades</option>
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
                </select>
            </div>

            {/* Lista */}
            <div className="flex flex-col gap-3">
                {filtrados.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-16 text-center px-4">
                    <AlertCircle size={32} className="text-[#ddd] mb-3" />
                    <p className="text-[#999] text-sm">Nenhum encaminhamento encontrado</p>
                    <p className="text-[#bbb] text-xs mt-1">Tente ajustar os filtros ou a busca</p>
                </div>
                ) : (
                filtrados.map((enc) => (
                    <Link
                    key={enc.id}
                    to={`/plataforma/encaminhamentos/${enc.id}`}
                    className="
                        bg-white rounded-xl shadow-sm p-5 no-underline
                        hover:shadow-md transition-all duration-200
                        border border-transparent hover:border-[#e8eef3]
                        flex flex-col gap-4
                    "
                    >
                    {/* Topo — paciente e badges */}
                    <div className="flex flex-col gap-2 tablet:flex-row tablet:items-start tablet:justify-between">
                        <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0a3d62] text-sm font-bold">
                            {enc.paciente.nome.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="text-[#333] text-sm font-semibold">{enc.paciente.nome}</p>
                            <p className="text-[#999] text-xs">
                            {enc.paciente.idade} anos • {enc.paciente.bairro}
                            </p>
                        </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                        {enc.matchAutomatico && (
                            <span className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                            <Zap size={10} />
                            Match automático
                            </span>
                        )}
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[enc.prioridade]}`}>
                            {labelPrioridade[enc.prioridade]}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatus[enc.status]}`}>
                            {labelStatus[enc.status]}
                        </span>
                        </div>
                    </div>

                    {/* Meio — conexão paciente ↔ dentista */}
                    <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center tablet:gap-4 bg-[#f8fafc] rounded-lg p-3">
                        {/* IA urgência */}
                        {enc.paciente.nivelUrgenciaIA !== undefined && (
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[#888]">IA:</span>
                            <span className={`font-bold ${corUrgencia(enc.paciente.nivelUrgenciaIA)}`}>
                            {enc.paciente.nivelUrgenciaIA.toFixed(1)}
                            </span>
                            <span className="text-[#bbb]">({enc.paciente.confIA}%)</span>
                        </div>
                        )}

                        <div className="hidden tablet:block text-[#ddd]">•</div>

                        {/* Dentista */}
                        <div className="flex items-center gap-1.5 text-xs text-[#555]">
                        <span className="text-[#888]">Dentista:</span>
                        <span className="font-medium">{enc.dentista.nome}</span>
                        {enc.dentista.distanciaKm && (
                            <span className="flex items-center gap-0.5 text-[#bbb]">
                            <MapPin size={10} />
                            {enc.dentista.distanciaKm} km
                            </span>
                        )}
                        </div>

                        <div className="hidden tablet:block text-[#ddd]">•</div>

                        {/* Problema */}
                        <p className="text-xs text-[#888] truncate">
                        {enc.paciente.problemaBucal}
                        </p>
                    </div>

                    {/* Rodapé — datas e último follow-up */}
                    <div className="flex flex-col gap-1 tablet:flex-row tablet:items-center tablet:justify-between">
                        <div className="flex gap-4 text-xs text-[#888]">
                        <span>Encaminhado em: <span className="text-[#555] font-medium">{enc.dataEncaminhamento}</span></span>
                        <span>Follow-up previsto: <span className="text-[#555] font-medium">{enc.previsaoFollowUp}</span></span>
                        </div>

                        {/* Último follow-up com STT */}
                        {enc.followUps.some((f) => f.tipoMensagem === "audio") && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <Mic size={12} />
                            Áudio transcrito pela IA
                        </span>
                        )}

                        <ChevronRight size={15} className="text-[#ccc] hidden tablet:block" />
                    </div>
                    </Link>
                ))
                )}
            </div>
        </div>
    );
}

export default Encaminhamentos;