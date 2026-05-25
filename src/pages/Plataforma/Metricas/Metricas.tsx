// src/pages/Plataforma/Metricas/Metricas.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getMetricasResumo from "../../../api/getMetricasResumo";
import getMetricasTriagensPorStatus from "../../../api/getMetricasTriagensPorStatus";
import getMetricasEncaminhamentosPorPrioridade from "../../../api/getMetricasEncaminhamentosPorPrioridade";
import getMetricasLeadsPorCanal from "../../../api/getMetricasLeadsPorCanal";
import getMetricasLeadsPorMes from "../../../api/getMetricasLeadsPorMes";
import getMetricasRegioes from "../../../api/getMetricasRegioes";
import type {
    MetricaResumo,
    TriagensPorStatus,
    EncaminhamentosPorPrioridade,
    LeadsPorCanal,
    LeadsPorMes,
} from "../../../api/types/metrica.types";

function BarraProgresso({ label, valor, total, cor }: {
    label: string; valor: number; total: number; cor: string;
}) {
    const pct = total > 0 ? Math.round((valor / total) * 100) : 0;
    return (
        <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-sm">
            <span className="text-[#555]">{label}</span>
            <span className="font-semibold text-[#333]">
            {valor} <span className="text-[#aaa] font-normal text-xs">({pct}%)</span>
            </span>
        </div>
        <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: cor }} />
        </div>
        </div>
    );
}

function Metricas() {
    const navigate = useNavigate();
    const [resumo, setResumo] = useState<MetricaResumo | null>(null);
    const [triagens, setTriagens] = useState<TriagensPorStatus | null>(null);
    const [encPrioridade, setEncPrioridade] = useState<EncaminhamentosPorPrioridade | null>(null);
    const [canal, setCanal] = useState<LeadsPorCanal | null>(null);
    const [mes, setMes] = useState<LeadsPorMes | null>(null);
    const [regioes, setRegioes] = useState<Record<string, number> | null>(null);
    const [carregando, setCarregando] = useState(true);

    async function fetchMetricas() {
        setCarregando(true);

        try {
        const [r, t, ep, c, m, rg] = await Promise.allSettled([
            getMetricasResumo(),
            getMetricasTriagensPorStatus(),
            getMetricasEncaminhamentosPorPrioridade(),
            getMetricasLeadsPorCanal(),
            getMetricasLeadsPorMes(),
            getMetricasRegioes(),
        ]);

        if (r.status === "fulfilled") setResumo(r.value);
        if (t.status === "fulfilled") setTriagens(t.value);
        if (ep.status === "fulfilled") setEncPrioridade(ep.value);
        if (c.status === "fulfilled") setCanal(c.value);
        if (m.status === "fulfilled") setMes(m.value);
        if (rg.status === "fulfilled") setRegioes(rg.value);

        // Redireciona se não autenticado
        if (r.status === "rejected" && r.reason instanceof Error) {
            const parsedError = JSON.parse(r.reason.message);
            if (parsedError.statusCode === 401) navigate("/login");
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        document.title = "Métricas | NORA";
        fetchMetricas();
    }, []);

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

        <div>
            <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">Métricas</h1>
            <p className="text-[#888] text-sm mt-0.5">Indicadores consolidados da operação</p>
        </div>

        {/* KPI resumo */}
        {resumo && (
            <div className="grid grid-cols-2 desktop:grid-cols-3 gap-4">
            {[
                { label: "Total de Leads", valor: resumo.totalLeads, cor: "#1e88e5" },
                { label: "Aprovados", valor: resumo.totalAprovados, cor: "#10b981" },
                { label: "Encaminhamentos", valor: resumo.totalEncaminhamentos, cor: "#f97316" },
                { label: "Dentistas Ativos", valor: resumo.totalDentistasAtivos, cor: "#10b981" },
                { label: "Taxa de Aprovação", valor: `${(resumo.taxaAprovacao * 100).toFixed(1)}%`, cor: "#1e88e5" },
                { label: "Taxa de Conclusão", valor: `${(resumo.taxaConclusao * 100).toFixed(1)}%`, cor: "#10b981" },
            ].map((kpi, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-1">
                <p className="text-[#888] text-xs font-medium">{kpi.label}</p>
                <p className="font-bold text-2xl font-[Montserrat]" style={{ color: kpi.cor }}>{kpi.valor}</p>
                </div>
            ))}
            </div>
        )}

        {/* Leads por mês */}
        {mes && (
            <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide mb-4">Leads por Mês</h2>
            <div className="flex items-end gap-1.5 overflow-x-auto pb-2">
                {Object.entries(mes).map(([m, qtd]) => {
                const max = Math.max(...Object.values(mes), 1);
                const h = Math.round((qtd / max) * 100);
                return (
                    <div key={m} className="flex flex-col items-center gap-1 flex-1 min-w-[32px]">
                    <span className="text-[#666] text-xs">{qtd}</span>
                    <div className="w-full bg-[#1e88e5] rounded-t-md" style={{ height: `${Math.max(h, qtd > 0 ? 4 : 0)}px` }} />
                    <span className="text-[#aaa] text-[10px]">{m}</span>
                    </div>
                );
                })}
            </div>
            </div>
        )}

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">

            {/* Triagens por status */}
            {triagens && (
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
                <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Triagens por Status</h2>
                {(() => {
                const total = Object.values(triagens).reduce((a, b) => a + b, 0);
                return [
                    { label: "Em Análise", valor: triagens.em_analise, cor: "#1e88e5" },
                    { label: "Aprovada", valor: triagens.aprovada, cor: "#10b981" },
                    { label: "Encerrada", valor: triagens.encerrada, cor: "#6b7280" },
                    { label: "Inativa", valor: triagens.inativa, cor: "#ef4444" },
                ].map((item) => <BarraProgresso key={item.label} {...item} total={total} />);
                })()}
            </div>
            )}

            {/* Encaminhamentos por prioridade */}
            {encPrioridade && (
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
                <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Encaminhamentos por Prioridade</h2>
                {(() => {
                const total = Object.values(encPrioridade).reduce((a, b) => a + b, 0);
                return [
                    { label: "Urgente", valor: encPrioridade.urgente, cor: "#ef4444" },
                    { label: "Alta", valor: encPrioridade.alta, cor: "#f97316" },
                    { label: "Média", valor: encPrioridade.media, cor: "#1e88e5" },
                    { label: "Baixa", valor: encPrioridade.baixa, cor: "#6b7280" },
                ].map((item) => <BarraProgresso key={item.label} {...item} total={total} />);
                })()}
            </div>
            )}

            {/* Leads por canal */}
            {canal && (
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
                <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Leads por Canal</h2>
                {(() => {
                const total = Object.values(canal).reduce((a, b) => a + b, 0);
                return [
                    { label: "Telegram", valor: canal.telegram, cor: "#0a3d62" },
                    { label: "WhatsApp", valor: canal.whatsapp, cor: "#10b981" },
                    { label: "Instagram", valor: canal.instagram, cor: "#f97316" },
                    { label: "Facebook", valor: canal.facebook, cor: "#1e88e5" },
                    { label: "Outro", valor: canal.outro, cor: "#6b7280" },
                ].map((item) => <BarraProgresso key={item.label} {...item} total={total} />);
                })()}
            </div>
            )}

            {/* Regiões */}
            {regioes && (
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
                <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Regiões Mais Atendidas</h2>
                {Object.entries(regioes)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([bairro, total]) => (
                    <div key={bairro} className="flex items-center justify-between text-sm">
                    <span className="text-[#555]">{bairro}</span>
                    <span className="font-semibold text-[#333]">{total}</span>
                    </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}

export default Metricas;
