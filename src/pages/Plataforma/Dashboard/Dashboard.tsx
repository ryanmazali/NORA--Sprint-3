import { useEffect } from "react";
import { Link } from "react-router";
import {
    Clock,
    AlertCircle,
    Stethoscope,
    Plus,
    ArrowRight,
    Bell,
    FileDown,
    CheckCircle,
    Radio,
    GitMerge,
} from "lucide-react";
import {
    kpiCards,
    casosRecentes,
    atividadesIA,
    type KpiCard,
    type CasoRecente,
    type AtividadeIA,
} from "../../../data/dashboardData";

// ─── KPI Card ────────────────────────────────────────────────
const iconeKpi = {
    azul: <ArrowRight size={22} className="text-[#1e88e5]" />,
    laranja: <Clock size={22} className="text-[rgb(226,122,31)]" />,
    vermelho: <AlertCircle size={22} className="text-red-500" />,
    verde: <Stethoscope size={22} className="text-emerald-500" />,
};

const corBorda = {
    azul: "border-l-[#1e88e5]",
    laranja: "border-l-[rgb(226,122,31)]",
    vermelho: "border-l-red-500",
    verde: "border-l-emerald-500",
};

const corValor = {
    azul: "text-[#1e88e5]",
    laranja: "text-[rgb(226,122,31)]",
    vermelho: "text-red-500",
    verde: "text-emerald-500",
};

function CardKpi({ card }: { card: KpiCard }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${corBorda[card.cor]} flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
                <span className="text-[#666] text-sm font-medium">{card.label}</span>
                {iconeKpi[card.cor]}
            </div>
            <div className="flex items-end gap-2">
                <span className={`text-3xl font-bold font-[Montserrat] ${corValor[card.cor]}`}>
                {card.valor}
                </span>
                {card.variacao && (
                <span className="text-emerald-500 text-xs font-medium mb-1">
                    {card.variacao}
                </span>
                )}
            </div>
        </div>
    );
}

const badgeStatus: Record<CasoRecente["status"], string> = {
    Aguardando: "bg-orange-100 text-orange-700",
    "Em Andamento": "bg-blue-100 text-blue-700",
    Concluído: "bg-emerald-100 text-emerald-700",
    Urgente: "bg-red-100 text-red-700",
};

// ─── Ícone de atividade ───────────────────────────────────────
function IconeAtividade({ tipo }: { tipo: AtividadeIA["tipo"] }) {
    const base = "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0";
    if (tipo === "triagem") return <div className={`${base} bg-blue-100`}><CheckCircle size={15} className="text-blue-600" /></div>;
    if (tipo === "followup") return <div className={`${base} bg-orange-100`}><Radio size={15} className="text-orange-600" /></div>;
    return <div className={`${base} bg-emerald-100`}><GitMerge size={15} className="text-emerald-600" /></div>;
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard() {
    useEffect(() => {
        document.title = "Dashboard | NORA";
    }, []);

    return (
        <div className="flex flex-col gap-6">

            {/* Cabeçalho */}
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">
                    Dashboard
                </h1>
                <p className="text-[#888] text-sm mt-0.5">
                    Visão geral da operação da ONG
                </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
                {kpiCards.map((card) => (
                <CardKpi key={card.id} card={card} />
                ))}
            </div>

            {/* Acesso Rápido */}
            <div>
                <h2 className="text-[#0a3d62] font-semibold text-base font-[Montserrat] mb-3">
                Acesso Rápido
                </h2>
                <div className="grid grid-cols-2 gap-3 tablet:grid-cols-4">
                <Link
                    to="/plataforma/pacientes"
                    className="
                    bg-white rounded-xl shadow-sm p-4 no-underline
                    flex flex-col items-center gap-2 text-center
                    border border-transparent hover:border-[#1e88e5]
                    transition-all duration-200 hover:shadow-md group
                    "
                >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <Plus size={18} className="text-[#1e88e5]" />
                    </div>
                    <span className="text-[#333] text-xs font-medium">Nova Triagem</span>
                </Link>

                <Link
                    to="/plataforma/encaminhamentos"
                    className="
                    bg-white rounded-xl shadow-sm p-4 no-underline
                    flex flex-col items-center gap-2 text-center
                    border border-transparent hover:border-[rgb(226,122,31)]
                    transition-all duration-200 hover:shadow-md group
                    "
                >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-200">
                    <ArrowRight size={18} className="text-[rgb(226,122,31)]" />
                    </div>
                    <span className="text-[#333] text-xs font-medium">Encaminhar Paciente</span>
                </Link>

                <Link
                    to="/plataforma/omnichannel"
                    className="
                    bg-white rounded-xl shadow-sm p-4 no-underline
                    flex flex-col items-center gap-2 text-center
                    border border-transparent hover:border-emerald-500
                    transition-all duration-200 hover:shadow-md group
                    "
                >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-200">
                    <Bell size={18} className="text-emerald-600" />
                    </div>
                    <span className="text-[#333] text-xs font-medium">Ver Follow-ups</span>
                </Link>

                <button
                    className="
                    bg-white rounded-xl shadow-sm p-4
                    flex flex-col items-center gap-2 text-center
                    border border-transparent hover:border-[#0a3d62]
                    transition-all duration-200 hover:shadow-md group cursor-pointer
                    "
                >
                    <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center group-hover:bg-[#e0e8f0] transition-colors duration-200">
                    <FileDown size={18} className="text-[#0a3d62]" />
                    </div>
                    <span className="text-[#333] text-xs font-medium">Exportar Relatório</span>
                </button>
                </div>
            </div>

            {/* Grid inferior — Casos Recentes + Atividade da IA */}
            <div className="grid grid-cols-1 gap-4 desktop:grid-cols-[1fr_360px]">

                {/* Casos Recentes */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[#0a3d62] font-semibold text-base font-[Montserrat]">
                    Casos Recentes
                    </h2>
                    <Link
                    to="/plataforma/pacientes"
                    className="text-[#1e88e5] text-xs font-medium no-underline hover:underline"
                    >
                    Ver todos
                    </Link>
                </div>

                {/* Tabela mobile-friendly */}
                <div className="flex flex-col gap-2">
                    {casosRecentes.map((caso) => (
                    <Link
                        key={caso.id}
                        to={`/plataforma/pacientes/${caso.id}`}
                        className="
                        flex items-center justify-between
                        px-3 py-3 rounded-lg no-underline
                        hover:bg-[#f4f7fa] transition-colors duration-150
                        border border-transparent hover:border-[#e8eef3]
                        "
                    >
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0a3d62] text-xs font-bold">
                            {caso.nome.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="text-[#333] text-sm font-medium">{caso.nome}</p>
                            <p className="text-[#999] text-xs">{caso.data}</p>
                        </div>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatus[caso.status]}`}>
                        {caso.status}
                        </span>
                    </Link>
                    ))}
                </div>
                </div>

                {/* Atividade da IA */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-base font-[Montserrat] mb-4">
                    Atividade da IA
                </h2>
                <div className="flex flex-col gap-3">
                    {atividadesIA.map((ativ) => (
                    <div key={ativ.id} className="flex items-start gap-3">
                        <IconeAtividade tipo={ativ.tipo} />
                        <div className="min-w-0">
                        <p className="text-[#333] text-sm font-medium">{ativ.descricao}</p>
                        <p className="text-[#888] text-xs truncate">{ativ.pessoa}</p>
                        <p className="text-[#bbb] text-xs mt-0.5">{ativ.tempo}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;