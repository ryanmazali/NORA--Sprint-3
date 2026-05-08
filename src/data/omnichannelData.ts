export type CamadaConversa = "pretriagem" | "followup";
export type CanalConversa = "telegram" | "whatsapp" | "instagram" | "facebook";
export type RemetenteMensagem = "usuario" | "nora_ia" | "externo";
export type TipoMensagem = "texto" | "audio" | "transcricao";

export interface Mensagem {
    id: number;
    remetente: RemetenteMensagem;
    nomeRemetente: string;
    conteudo: string;
    tipo: TipoMensagem;
    horario: string;
    transcricao?: string;
}

export interface DadosPacienteConversa {
    id: number;
    nome: string;
    idade: number;
    bairro: string;
    telefone: string;
    email: string;
    problemaBucal: string;
    rendaFamiliar: string;
    nivelUrgenciaIA?: number;
    confIA?: number;
    status: "em_triagem" | "aprovada" | "encerrada" | "inelegivel";
}

export interface DadosDentistaConversa {
    id: number;
    nome: string;
    cro: string;
    telefone: string;
    email: string;
    especialidades: string[];
    pacientesAtivos: {
        id: number;
        nome: string;
        problema: string;
        status: string;
    }[];
}

export interface Conversa {
    id: number;
    camada: CamadaConversa;
    canal: CanalConversa;
    status: "aberta" | "encerrada";
    ultimaMensagem: string;
    ultimoHorario: string;
    naoLidas: number;
    mensagens: Mensagem[];
    dadosPaciente?: DadosPacienteConversa;
    dadosDentista?: DadosDentistaConversa;
}

export const conversas: Conversa[] = [
    // ─── Camada 1 — Leads em pré-triagem ─────────────────────
    {
        id: 1,
        camada: "pretriagem",
        canal: "telegram",
        status: "aberta",
        ultimaMensagem: "Estou com muita dor e inchação no rosto",
        ultimoHorario: "há 5 min",
        naoLidas: 3,
        dadosPaciente: {
        id: 1,
        nome: "Maria Silva",
        idade: 17,
        bairro: "Brás",
        telefone: "(11) 98765-4321",
        email: "maria.silva@email.com",
        problemaBucal: "Dor intensa e inchaço",
        rendaFamiliar: "Até 1 salário mínimo",
        nivelUrgenciaIA: 4.2,
        confIA: 91,
        status: "em_triagem",
        },
        mensagens: [
        {
            id: 1,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Olá! Sou a NORA, assistente da Turma do Bem. Vou te ajudar a iniciar seu cadastro. Pode me dizer seu nome completo?",
            tipo: "texto",
            horario: "13:10",
        },
        {
            id: 2,
            remetente: "externo",
            nomeRemetente: "Maria Silva",
            conteudo: "Oi, meu nome é Maria Silva",
            tipo: "texto",
            horario: "13:11",
        },
        {
            id: 3,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Olá Maria! Quantos anos você tem?",
            tipo: "texto",
            horario: "13:11",
        },
        {
            id: 4,
            remetente: "externo",
            nomeRemetente: "Maria Silva",
            conteudo: "17 anos",
            tipo: "texto",
            horario: "13:12",
        },
        {
            id: 5,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Entendido! Qual é o seu bairro e cidade?",
            tipo: "texto",
            horario: "13:12",
        },
        {
            id: 6,
            remetente: "externo",
            nomeRemetente: "Maria Silva",
            conteudo: "Brás, São Paulo",
            tipo: "texto",
            horario: "13:13",
        },
        {
            id: 7,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Qual problema bucal você está sentindo?",
            tipo: "texto",
            horario: "13:14",
        },
        {
            id: 8,
            remetente: "externo",
            nomeRemetente: "Maria Silva",
            conteudo: "Estou com muita dor e inchação no rosto",
            tipo: "texto",
            horario: "13:15",
        },
        ],
    },
    {
        id: 2,
        camada: "pretriagem",
        canal: "telegram",
        status: "aberta",
        ultimaMensagem: "Dor de dente há 3 dias",
        ultimoHorario: "há 23 min",
        naoLidas: 1,
        dadosPaciente: {
        id: 4,
        nome: "Pedro Oliveira",
        idade: 12,
        bairro: "Perdizes",
        telefone: "(11) 95555-4444",
        email: "pedro.oliveira@email.com",
        problemaBucal: "Dor de dente leve",
        rendaFamiliar: "1 a 3 salários mínimos",
        nivelUrgenciaIA: 1.5,
        confIA: 82,
        status: "em_triagem",
        },
        mensagens: [
        {
            id: 1,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Olá! Sou a NORA, assistente da Turma do Bem. Qual é o seu nome?",
            tipo: "texto",
            horario: "12:52",
        },
        {
            id: 2,
            remetente: "externo",
            nomeRemetente: "Pedro Oliveira",
            conteudo: "Pedro Oliveira",
            tipo: "texto",
            horario: "12:53",
        },
        {
            id: 3,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Olá Pedro! Pode me contar qual é o seu problema bucal?",
            tipo: "texto",
            horario: "12:53",
        },
        {
            id: 4,
            remetente: "externo",
            nomeRemetente: "Pedro Oliveira",
            conteudo: "Dor de dente há 3 dias",
            tipo: "texto",
            horario: "12:54",
        },
        ],
    },

    // ─── Camada 2 — Casos ativos (follow-up) ─────────────────
    {
        id: 3,
        camada: "followup",
        canal: "telegram",
        status: "aberta",
        ultimaMensagem: "Transcrição recebida — Gemini STT",
        ultimoHorario: "há 12 min",
        naoLidas: 0,
        dadosDentista: {
        id: 1,
        nome: "Dr. Carlos Mendes",
        cro: "CRO-SP 12345",
        telefone: "(11) 98888-7777",
        email: "carlos.mendes@email.com",
        especialidades: ["Clínica Geral", "Endodontia"],
        pacientesAtivos: [
            { id: 2, nome: "João Santos", problema: "Cárie com sangramento", status: "ativo" },
            { id: 4, nome: "Pedro Oliveira", problema: "Dor de dente leve", status: "ativo" },
        ],
        },
        mensagens: [
        {
            id: 1,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Olá Dr. Carlos! O paciente João Santos compareceu à consulta marcada?",
            tipo: "texto",
            horario: "13:00",
        },
        {
            id: 2,
            remetente: "externo",
            nomeRemetente: "Dr. Carlos Mendes",
            conteudo: "🎵 Nota de voz (0:24)",
            tipo: "audio",
            horario: "13:03",
            transcricao: "Sim, o João compareceu ontem. Realizei a limpeza e o tratamento da cárie. Ele está bem, sem dor. Retorno marcado para daqui 30 dias. Obrigado pela parceria com a Turma do Bem.",
        },
        {
            id: 3,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Perfeito Dr. Carlos! Registro atualizado. Obrigado pela dedicação! 🙏",
            tipo: "texto",
            horario: "13:03",
        },
        ],
    },
    {
        id: 4,
        camada: "followup",
        canal: "telegram",
        status: "aberta",
        ultimaMensagem: "Aguardando resposta do dentista",
        ultimoHorario: "há 1h",
        naoLidas: 0,
        dadosDentista: {
        id: 2,
        nome: "Dra. Ana Lima",
        cro: "CRO-SP 67890",
        telefone: "(11) 97777-6666",
        email: "ana.lima@email.com",
        especialidades: ["Cirurgia", "Traumatologia"],
        pacientesAtivos: [
            { id: 3, nome: "Ana Costa", problema: "Fratura dentária traumática", status: "ativo" },
        ],
        },
        mensagens: [
        {
            id: 1,
            remetente: "nora_ia",
            nomeRemetente: "NORA",
            conteudo: "Olá Dra. Ana! A paciente Ana Costa compareceu à consulta? Pode nos dar um breve retorno?",
            tipo: "texto",
            horario: "12:15",
        },
        ],
    },
];