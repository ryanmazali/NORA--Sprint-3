export interface KpiCard {
    id: number;
    label: string;
    valor: number;
    variacao?: string; // ex: "+3 hoje"
    cor: "azul" | "laranja" | "vermelho" | "verde";
}

export interface CasoRecente {
    id: number;
    nome: string;
    data: string;
    status: "Aguardando" | "Em Andamento" | "Concluído" | "Urgente";
}

export interface AtividadeIA {
    id: number;
    tipo: "triagem" | "followup" | "match";
    descricao: string;
    pessoa: string;
    tempo: string;
}

export const kpiCards: KpiCard[] = [
    { id: 1, label: "Novos Leads Hoje", valor: 12, variacao: "+3 hoje", cor: "azul" },
    { id: 2, label: "Aguardando Encaminhamento", valor: 8, variacao: undefined, cor: "laranja" },
    { id: 3, label: "Follow-ups Pendentes", valor: 5, variacao: undefined, cor: "vermelho" },
    { id: 4, label: "Dentistas Ativos", valor: 43, variacao: undefined, cor: "verde" },
];

export const casosRecentes: CasoRecente[] = [
    { id: 1, nome: "Maria Silva", data: "10/05/2025", status: "Aguardando" },
    { id: 2, nome: "João Santos", data: "09/05/2025", status: "Em Andamento" },
    { id: 3, nome: "Ana Costa", data: "08/05/2025", status: "Concluído" },
    { id: 4, nome: "Pedro Oliveira", data: "10/05/2025", status: "Aguardando" },
    { id: 5, nome: "Lucas Ferreira", data: "07/05/2025", status: "Urgente" },
];

export const atividadesIA: AtividadeIA[] = [
    { id: 1, tipo: "triagem", descricao: "Pré-triagem realizada", pessoa: "Lucas Ferreira", tempo: "há 5 min" },
    { id: 2, tipo: "followup", descricao: "Follow-up enviado", pessoa: "Dr. Carlos Mendes", tempo: "há 12 min" },
    { id: 3, tipo: "match", descricao: "Match sugerido", pessoa: "Beatriz Alves", tempo: "há 23 min" },
    { id: 4, tipo: "triagem", descricao: "Pré-triagem realizada", pessoa: "Rafael Costa", tempo: "há 1h" },
    { id: 5, tipo: "followup", descricao: "Follow-up enviado", pessoa: "Dra. Ana Lima", tempo: "há 2h" },
];