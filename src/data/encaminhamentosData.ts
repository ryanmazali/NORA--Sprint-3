export interface Encaminhamento {
    id: number;
    paciente: {
        id: number;
        nome: string;
        idade: number;
        bairro: string;
        problemaBucal: string;
        nivelUrgenciaIA?: number;
        confIA?: number;
    };
    dentista: {
        id: number;
        nome: string;
        cro: string;
        bairro: string;
        especialidades: string[];
        distanciaKm?: number;
    };
    prioridade: "baixa" | "media" | "alta" | "urgente";
    status: "ativo" | "concluido" | "cancelado" | "reencaminhado";
    dataEncaminhamento: string;
    previsaoFollowUp: string;
    observacao?: string;
    matchAutomatico: boolean;
    followUps: FollowUp[];
}

export interface FollowUp {
    id: number;
    data: string;
    tipo: "primeira_consulta" | "atualizacao" | "followup" | "conclusao" | "abandono";
    origem: "paciente" | "dentista" | "ia" | "atendente" | "sistema";
    descricao: string;
    resumoIA?: string;
    tipoMensagem?: "texto" | "audio";
}

export const encaminhamentos: Encaminhamento[] = [
    {
        id: 1,
        paciente: {
        id: 2,
        nome: "João Santos",
        idade: 14,
        bairro: "Vila Mariana",
        problemaBucal: "Cárie com sangramento",
        nivelUrgenciaIA: 2.8,
        confIA: 87,
        },
        dentista: {
        id: 1,
        nome: "Dr. Carlos Mendes",
        cro: "CRO-SP 12345",
        bairro: "Bela Vista",
        especialidades: ["Clínica Geral", "Endodontia"],
        distanciaKm: 2.3,
        },
        prioridade: "media",
        status: "ativo",
        dataEncaminhamento: "09/05/2025",
        previsaoFollowUp: "30/05/2025",
        matchAutomatico: true,
        followUps: [
        {
            id: 1,
            data: "09/05/2025",
            tipo: "primeira_consulta",
            origem: "sistema",
            descricao: "Encaminhamento criado automaticamente via match geográfico.",
        },
        ],
    },
    {
        id: 2,
        paciente: {
        id: 3,
        nome: "Ana Costa",
        idade: 17,
        bairro: "Zona Leste",
        problemaBucal: "Fratura dentária traumática",
        nivelUrgenciaIA: 4.8,
        confIA: 96,
        },
        dentista: {
        id: 2,
        nome: "Dra. Ana Lima",
        cro: "CRO-SP 67890",
        bairro: "Vila Clementino",
        especialidades: ["Cirurgia", "Traumatologia"],
        distanciaKm: 4.1,
        },
        prioridade: "urgente",
        status: "ativo",
        dataEncaminhamento: "08/05/2025",
        previsaoFollowUp: "29/05/2025",
        observacao: "Paciente relatou dor intensa. Atendimento prioritário.",
        matchAutomatico: true,
        followUps: [
        {
            id: 2,
            data: "08/05/2025",
            tipo: "primeira_consulta",
            origem: "sistema",
            descricao: "Encaminhamento criado com prioridade urgente.",
        },
        {
            id: 3,
            data: "10/05/2025",
            tipo: "atualizacao",
            origem: "ia",
            descricao: "Follow-up automático enviado ao dentista via bot.",
            resumoIA: "Dentista confirmou que atendeu a paciente. Consulta realizada com sucesso.",
            tipoMensagem: "audio",
        },
        ],
    },
    {
        id: 3,
        paciente: {
        id: 4,
        nome: "Pedro Oliveira",
        idade: 12,
        bairro: "Perdizes",
        problemaBucal: "Dor de dente leve",
        nivelUrgenciaIA: 1.5,
        confIA: 82,
        },
        dentista: {
        id: 1,
        nome: "Dr. Carlos Mendes",
        cro: "CRO-SP 12345",
        bairro: "Bela Vista",
        especialidades: ["Clínica Geral"],
        distanciaKm: 1.8,
        },
        prioridade: "baixa",
        status: "ativo",
        dataEncaminhamento: "07/05/2025",
        previsaoFollowUp: "28/05/2025",
        matchAutomatico: true,
        followUps: [
        {
            id: 4,
            data: "07/05/2025",
            tipo: "primeira_consulta",
            origem: "sistema",
            descricao: "Encaminhamento criado automaticamente.",
        },
        ],
    },
];