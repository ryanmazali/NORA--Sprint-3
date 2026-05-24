// src/pages/Plataforma/Dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Clock, AlertCircle, Stethoscope, ArrowRight, Radio, GitMerge } from "lucide-react";
import getMetricasResumo from "../../../api/getMetricasResumo";
import getMetricasLeadsPorMes from "../../../api/getMetricasLeadsPorMes";
import getPessoas from "../../../api/getPessoas";
import type { MetricaResumo } from "../../../api/types/metrica.types";
import type { LeadsPorMes } from "../../../api/types/metrica.types";
import type { Pessoa } from "../../../api/types/pessoa.types";

type KpiCard = {
    label: string;
    valor: number | string;
    cor: "azul" | "laranja" | "vermelho" | "verde";
};

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
        <span className={`text-3xl font-bold font-[Montserrat] ${corValor[card.cor]}`}>
            {card.valor}
        </span>
        </div>
    );
}

const badgeStatus: Record<string, string> = {
    em_triagem: "bg-orange-100 text-orange-700",
    triagem: "bg-orange-100 text-orange-700",
    aprovada: "bg-emerald-100 text-emerald-700",
    encerrada: "bg-gray-100 text-gray-600",
    inelegivel: "bg-red-100 text-red-700",
    lead: "bg-blue-100 text-blue-700",
};

function Dashboard() {
    const navigate = useNavigate();
    const [resumo, setResumo] = useState<MetricaResumo | null>(null);
    const [leadsPorMes, setLeadsPorMes] = useState<LeadsPorMes | null>(null);
    const [pessoasRecentes, setPessoasRecentes] = useState<Pessoa[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function fetchDashboard() {
        setCarregando(true);

        try {
        const [resumoData, mesData, pessoasData] = await Promise.allSettled([
            getMetricasResumo(),
            getMetricasLeadsPorMes(),
            getPessoas(),
        ]);

        if (resumoData.status === "fulfilled") setResumo(resumoData.value);
        if (mesData.status === "fulfilled") setLeadsPorMes(mesData.value);
        if (pessoasData.status === "fulfilled") setPessoasRecentes(pessoasData.value.slice(0, 5));

        // Se a resposta principal falhar com 401, redireciona
        if (resumoData.status === "rejected" && resumoData.reason instanceof Error) {
            const parsedError = JSON.parse(resumoData.reason.message);
            if (parsedError.statusCode === 401) navigate("/login");
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        document.title = "Dashboard | NORA";
        fetchDashboard();
    }, []);

    const kpiCards: KpiCard[] = resumo
        ? [
            { label: "Total de Leads", valor: resumo.totalLeads, cor: "azul" },
            { label: "Aprovados", valor: resumo.totalAprovados, cor: "verde" },
            { label: "Encaminhamentos", valor: resumo.totalEncaminhamentos, cor: "laranja" },
            { label: "Dentistas Ativos", valor: resumo.totalDentistasAtivos, cor: "verde" },
        ]
        : [];

    return (
        <div className="flex flex-col gap-6">

        <div>
            <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">Dashboard</h1>
            <p className="text-[#888] text-sm mt-0.5">Visão geral da operação</p>
        </div>

        {/* KPIs */}
        {carregando ? (
            <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm h-24 animate-pulse bg-gray-100" />
            ))}
            </div>
        ) : (
            <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4">
            {kpiCards.map((card, i) => <CardKpi key={i} card={card} />)}
            </div>
        )}

        {/* Taxas */}
        {resumo && (
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide mb-3">Taxa de Aprovação</h2>
                <span className="text-3xl font-bold text-[#1e88e5] font-[Montserrat]">
                {(resumo.taxaAprovacao * 100).toFixed(1)}%
                </span>
                <div className="mt-3 h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div className="h-full bg-[#1e88e5] rounded-full" style={{ width: `${Math.min(resumo.taxaAprovacao * 100, 100)}%` }} />
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide mb-3">Taxa de Conclusão</h2>
                <span className="text-3xl font-bold text-emerald-500 font-[Montserrat]">
                {(resumo.taxaConclusao * 100).toFixed(1)}%
                </span>
                <div className="mt-3 h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(resumo.taxaConclusao * 100, 100)}%` }} />
                </div>
            </div>
            </div>
        )}

        {/* Leads por mês */}
        {leadsPorMes && (
            <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide mb-4">Leads por Mês</h2>
            <div className="flex items-end gap-2 overflow-x-auto pb-2">
                {Object.entries(leadsPorMes).map(([m, qtd]) => {
                const max = Math.max(...Object.values(leadsPorMes), 1);
                const h = Math.round((qtd / max) * 80);
                return (
                    <div key={m} className="flex flex-col items-center gap-1 flex-1 min-w-[36px]">
                    <span className="text-[#666] text-xs">{qtd}</span>
                    <div className="w-full bg-[#1e88e5] rounded-t-md" style={{ height: `${Math.max(h, qtd > 0 ? 4 : 0)}px` }} />
                    <span className="text-[#999] text-xs">{m}</span>
                    </div>
                );
                })}
            </div>
            </div>
        )}

        {/* Pessoas recentes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0]">
            <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Pessoas Recentes</h2>
            <Link to="/plataforma/pacientes" className="text-[#1e88e5] text-xs no-underline hover:underline">
                Ver todas →
            </Link>
            </div>
            {carregando ? (
            <div className="p-5 text-center text-[#bbb] text-sm">Carregando...</div>
            ) : pessoasRecentes.length === 0 ? (
            <div className="p-5 text-center text-[#bbb] text-sm">Nenhum dado disponível</div>
            ) : (
            <div className="divide-y divide-[#f5f5f5]">
                {pessoasRecentes.map((p) => (
                <Link
                    key={p.id}
                    to={`/plataforma/pacientes/${p.id}`}
                    className="flex items-center justify-between px-5 py-3 no-underline hover:bg-[#f8fafc] transition-colors duration-150"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0a3d62]/10 flex items-center justify-center">
                        <span className="text-[#0a3d62] text-sm font-bold">{p.nome.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="text-[#333] text-sm font-medium">{p.nome}</p>
                        <p className="text-[#999] text-xs">{p.dataCadastro ?? ""}</p>
                    </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatus[p.status ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                    {p.status ?? "—"}
                    </span>
                </Link>
                ))}
            </div>
            )}
        </div>

        {/* Acesso rápido */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
            {[
            { label: "Ver Pacientes", to: "/plataforma/pacientes", icon: <ArrowRight size={18} /> },
            { label: "Ver Dentistas", to: "/plataforma/dentistas", icon: <Stethoscope size={18} /> },
            { label: "Omnichannel", to: "/plataforma/omnichannel", icon: <Radio size={18} /> },
            { label: "Encaminhamentos", to: "/plataforma/encaminhamentos", icon: <GitMerge size={18} /> },
            { label: "Métricas", to: "/plataforma/metricas", icon: <AlertCircle size={18} /> },
            ].map((item) => (
            <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 bg-white rounded-xl shadow-sm px-5 py-4 no-underline text-[#0a3d62] hover:bg-[#f0f6ff] transition-colors duration-200 font-medium text-sm"
            >
                {item.icon}
                {item.label}
            </Link>
            ))}
        </div>
        </div>
    );
}

export default Dashboard;
