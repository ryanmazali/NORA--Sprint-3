import { useEffect } from "react";
import {
    Users,
    CheckCircle,
    ArrowRightLeft,
    Stethoscope,
    TrendingUp,
    Award,
} from "lucide-react";
import {
    metricaResumo,
    triagensPorStatus,
    encaminhamentosPorPrioridade,
    leadsPorCanal,
    leadsPorMes,
    regioesMaisAtendidas,
} from "../../../data/metricasData";

// ─── KPI Card ─────────────────────────────────────────────────

interface KpiProps {
    label: string;
    valor: string | number;
    sub?: string;
    icon: React.ReactNode;
    cor: string;
}

function KpiCard({ label, valor, sub, icon, cor }: KpiProps) {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${cor} flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
                <span className="text-[#888] text-sm font-medium">{label}</span>
                {icon}
            </div>
            <div>
                <p className="text-3xl font-bold text-[#0a3d62] font-[Montserrat]">{valor}</p>
                {sub && <p className="text-xs text-[#888] mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

// ─── Barra horizontal simples ─────────────────────────────────

function BarraHorizontal({
    label,
    valor,
    total,
    cor,
    extra,
}: {
    label: string;
    valor: number;
    total: number;
    cor: string;
    extra?: string;
}) {
  const pct = Math.round((valor / total) * 100);

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-[#555] font-medium">{label}</span>
                <div className="flex items-center gap-2">
                {extra && <span className="text-[#bbb]">{extra}</span>}
                <span className="text-[#333] font-semibold">{valor}</span>
                <span className="text-[#bbb]">({pct}%)</span>
                </div>
            </div>
            <div className="w-full bg-[#f0f0f0] rounded-full h-2 overflow-hidden">
                <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: cor }}
                />
            </div>
            </div>
    );
}

// ─── Gráfico de barras verticais simples ──────────────────────

function GraficoBarras() {
    const maxLeads = Math.max(...leadsPorMes.map((m) => m.leads));

        return (
            <div className="flex items-end justify-between gap-2 h-[140px] px-2">
            {leadsPorMes.map((mes) => {
                const hLeads = Math.round((mes.leads / maxLeads) * 100);
                const hAprov = Math.round((mes.aprovados / maxLeads) * 100);

                return (
                <div key={mes.mes} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: "110px" }}>
                    {/* Barra leads */}
                    <div
                        className="rounded-t-sm bg-[#0a3d62]/20 w-3 transition-all duration-700"
                        style={{ height: `${hLeads}%` }}
                        title={`Leads: ${mes.leads}`}
                    />
                    {/* Barra aprovados */}
                    <div
                        className="rounded-t-sm bg-[#1e88e5] w-3 transition-all duration-700"
                        style={{ height: `${hAprov}%` }}
                        title={`Aprovados: ${mes.aprovados}`}
                    />
                    </div>
                    <span className="text-[10px] text-[#888]">{mes.mes}</span>
                </div>
                );
            })}
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────

function Metricas() {
    useEffect(() => {
        document.title = "Métricas | NORA";
    }, []);

    const totalTriagens = triagensPorStatus.reduce((a, t) => a + t.quantidade, 0);
    const totalEncam = encaminhamentosPorPrioridade.reduce((a, e) => a + e.quantidade, 0);
    const totalCanais = leadsPorCanal.reduce((a, c) => a + c.quantidade, 0);
    const totalRegioes = regioesMaisAtendidas.reduce((a, r) => a + r.total, 0);

    return (
        <div className="flex flex-col gap-6">

            {/* Cabeçalho */}
            <div>
                <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">
                Métricas
                </h1>
                <p className="text-[#888] text-sm mt-0.5">
                Impacto e operação da ONG Turma do Bem
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
                <KpiCard
                label="Total de Leads"
                valor={metricaResumo.totalLeads}
                sub="pacientes cadastrados"
                icon={<Users size={20} className="text-[#0a3d62]" />}
                cor="border-l-[#0a3d62]"
                />
                <KpiCard
                label="Aprovados"
                valor={metricaResumo.totalAprovados}
                sub={`${metricaResumo.taxaAprovacao}% de taxa de aprovação`}
                icon={<CheckCircle size={20} className="text-emerald-500" />}
                cor="border-l-emerald-500"
                />
                <KpiCard
                label="Encaminhamentos"
                valor={metricaResumo.totalEncaminhamentos}
                sub={`${metricaResumo.taxaConclusao}% concluídos`}
                icon={<ArrowRightLeft size={20} className="text-[#1e88e5]" />}
                cor="border-l-[#1e88e5]"
                />
                <KpiCard
                label="Dentistas Ativos"
                valor={metricaResumo.totalDentistasAtivos}
                sub="voluntários na rede"
                icon={<Stethoscope size={20} className="text-orange-500" />}
                cor="border-l-orange-500"
                />
                <KpiCard
                label="Taxa de Aprovação"
                valor={`${metricaResumo.taxaAprovacao}%`}
                sub="leads aprovados no programa"
                icon={<TrendingUp size={20} className="text-purple-500" />}
                cor="border-l-purple-500"
                />
                <KpiCard
                label="Taxa de Conclusão"
                valor={`${metricaResumo.taxaConclusao}%`}
                sub="encaminhamentos concluídos"
                icon={<Award size={20} className="text-amber-500" />}
                cor="border-l-amber-500"
                />
            </div>

            {/* Grid de gráficos */}
            <div className="grid grid-cols-1 gap-4 desktop:grid-cols-2">

                {/* Leads por mês */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide">
                    Leads por Mês
                    </h2>
                    <div className="flex items-center gap-3 text-[10px] text-[#888]">
                    <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#0a3d62]/20 inline-block" />
                        Leads
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#1e88e5] inline-block" />
                        Aprovados
                    </span>
                    </div>
                </div>
                <GraficoBarras />
                </div>

                {/* Triagens por status */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Triagens por Status
                </h2>
                <div className="flex flex-col gap-3">
                    {triagensPorStatus.map((t) => (
                    <BarraHorizontal
                        key={t.status}
                        label={t.status}
                        valor={t.quantidade}
                        total={totalTriagens}
                        cor={t.cor}
                    />
                    ))}
                </div>
                <p className="text-xs text-[#bbb] mt-4 text-right">Total: {totalTriagens} triagens</p>
                </div>

                {/* Encaminhamentos por prioridade */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Encaminhamentos por Prioridade
                </h2>
                <div className="flex flex-col gap-3">
                    {encaminhamentosPorPrioridade.map((e) => (
                    <BarraHorizontal
                        key={e.prioridade}
                        label={e.prioridade}
                        valor={e.quantidade}
                        total={totalEncam}
                        cor={e.cor}
                    />
                    ))}
                </div>
                <p className="text-xs text-[#bbb] mt-4 text-right">Total: {totalEncam} encaminhamentos</p>
                </div>

                {/* Canal de origem */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Leads por Canal
                </h2>
                <div className="flex flex-col gap-3">
                    {leadsPorCanal.map((c) => (
                    <BarraHorizontal
                        key={c.canal}
                        label={c.canal}
                        valor={c.quantidade}
                        total={totalCanais}
                        cor={c.cor}
                    />
                    ))}
                </div>
                <p className="text-xs text-[#bbb] mt-4 text-right">Total: {totalCanais} leads</p>
                </div>
            </div>

            {/* Regiões mais atendidas */}
            <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                Regiões Mais Atendidas
                </h2>
                <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 desktop:grid-cols-3">
                {regioesMaisAtendidas.map((r, i) => (
                    <div
                    key={r.bairro}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#f8fafc] border border-[#eee]"
                    >
                    <div className="w-8 h-8 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0a3d62] text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#333] truncate">{r.bairro}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 bg-[#e0e0e0] rounded-full h-1.5 overflow-hidden">
                            <div
                            className="h-full rounded-full bg-[#1e88e5]"
                            style={{ width: `${Math.round((r.aprovados / r.total) * 100)}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-[#888] flex-shrink-0">
                            {r.aprovados}/{r.total}
                        </span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <p className="text-xs text-[#bbb] mt-4 text-right">
                Total de pacientes: {totalRegioes}
                </p>
            </div>

            {/* Nota sobre dados */}
            <div className="bg-[#f0f4f8] rounded-xl p-4">
                <p className="text-xs text-[#888] text-center leading-relaxed">
                Os dados exibidos são alimentados pelo banco Oracle via API Quarkus.
                Quando o backend estiver conectado, as métricas serão atualizadas em tempo real.
                </p>
            </div>

        </div>
    );
}

export default Metricas;