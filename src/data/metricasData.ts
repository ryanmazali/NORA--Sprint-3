export interface MetricaResumo {
    totalLeads: number;
    totalAprovados: number;
    totalEncaminhamentos: number;
    totalDentistasAtivos: number;
    taxaAprovacao: number;
    taxaConclusao: number;
}

export interface TriagemPorStatus {
    status: string;
    quantidade: number;
    cor: string;
}

export interface EncaminhamentoPorPrioridade {
    prioridade: string;
    quantidade: number;
    cor: string;
}

export interface LeadsPorCanal {
    canal: string;
    quantidade: number;
    cor: string;
}

export interface LeadsPorMes {
    mes: string;
    leads: number;
    aprovados: number;
}

export interface RegiaoImpacto {
    bairro: string;
    total: number;
    aprovados: number;
}

export const metricaResumo: MetricaResumo = {
    totalLeads: 48,
    totalAprovados: 31,
    totalEncaminhamentos: 28,
    totalDentistasAtivos: 43,
    taxaAprovacao: 64.6,
    taxaConclusao: 89.3,
};

export const triagensPorStatus: TriagemPorStatus[] = [
    { status: "Em Análise", quantidade: 12, cor: "#1e88e5" },
    { status: "Aprovada", quantidade: 31, cor: "#10b981" },
    { status: "Encerrada", quantidade: 4, cor: "#6b7280" },
    { status: "Inelegível", quantidade: 1, cor: "#ef4444" },
];

export const encaminhamentosPorPrioridade: EncaminhamentoPorPrioridade[] = [
    { prioridade: "Urgente", quantidade: 5, cor: "#ef4444" },
    { prioridade: "Alta", quantidade: 8, cor: "#f97316" },
    { prioridade: "Média", quantidade: 11, cor: "#1e88e5" },
    { prioridade: "Baixa", quantidade: 4, cor: "#6b7280" },
];

export const leadsPorCanal: LeadsPorCanal[] = [
    { canal: "Telegram", quantidade: 32, cor: "#0a3d62" },
    { canal: "WhatsApp", quantidade: 10, cor: "#10b981" },
    { canal: "Instagram", quantidade: 4, cor: "#f97316" },
    { canal: "Outros", quantidade: 2, cor: "#6b7280" },
];

export const leadsPorMes: LeadsPorMes[] = [
    { mes: "Jan", leads: 5, aprovados: 3 },
    { mes: "Fev", leads: 7, aprovados: 5 },
    { mes: "Mar", leads: 6, aprovados: 4 },
    { mes: "Abr", leads: 9, aprovados: 6 },
    { mes: "Mai", leads: 12, aprovados: 8 },
    { mes: "Jun", leads: 9, aprovados: 5 },
];

export const regioesMaisAtendidas: RegiaoImpacto[] = [
    { bairro: "Zona Leste", total: 14, aprovados: 10 },
    { bairro: "Brás", total: 9, aprovados: 6 },
    { bairro: "Vila Mariana", total: 7, aprovados: 5 },
    { bairro: "Perdizes", total: 6, aprovados: 4 },
    { bairro: "Santana", total: 5, aprovados: 3 },
    { bairro: "Outros", total: 7, aprovados: 3 },
];