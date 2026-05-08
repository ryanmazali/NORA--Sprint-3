export interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    dataNascimento: string;
    idade: number;
    sexo: "M" | "F";
    cep: string;
    bairro: string;
    cidade: string;
    uf: string;
    canalOrigem: "telegram" | "whatsapp" | "instagram" | "facebook" | "outro";
    dataCadastro: string;
    status: "em_triagem" | "aprovada" | "encerrada" | "inelegivel";
    problemaBucal: string;
    rendaFamiliar: "ate_1sm" | "1_3sm" | "acima_3sm";
    nivelUrgenciaIA?: number;
    confIA?: number;
    triagens: TriagemResumo[];
    encaminhamentos: EncaminhamentoResumo[];
}

export interface TriagemResumo {
    id: number;
    data: string;
    elegibilidade: "elegivel" | "inelegivel" | "pendente";
    prioridade: "baixa" | "media" | "alta" | "urgente";
    status: "em_analise" | "aprovada" | "encerrada" | "inativa";
    decisao?: "aprovado" | "encerrado" | "reanalise";
}

export interface EncaminhamentoResumo {
    id: number;
    dentista: string;
    data: string;
    prioridade: "baixa" | "media" | "alta" | "urgente";
    status: "ativo" | "concluido" | "cancelado" | "reencaminhado";
}

export const pacientes: Paciente[] = [
    {
        id: 1,
        nome: "Maria Silva",
        cpf: "123.456.789-00",
        telefone: "(11) 98765-4321",
        email: "maria.silva@email.com",
        dataNascimento: "12/03/2008",
        idade: 17,
        sexo: "F",
        cep: "03310-000",
        bairro: "Brás",
        cidade: "São Paulo",
        uf: "SP",
        canalOrigem: "telegram",
        dataCadastro: "10/05/2025",
        status: "em_triagem",
        problemaBucal: "Dor intensa e inchaço",
        rendaFamiliar: "ate_1sm",
        nivelUrgenciaIA: 4.2,
        confIA: 91,
        triagens: [
        { id: 1, data: "10/05/2025", elegibilidade: "elegivel", prioridade: "alta", status: "em_analise" },
        ],
        encaminhamentos: [],
    },
    {
        id: 2,
        nome: "João Santos",
        cpf: "987.654.321-00",
        telefone: "(11) 91234-5678",
        email: "joao.santos@email.com",
        dataNascimento: "05/07/2010",
        idade: 14,
        sexo: "M",
        cep: "04310-000",
        bairro: "Vila Mariana",
        cidade: "São Paulo",
        uf: "SP",
        canalOrigem: "whatsapp",
        dataCadastro: "09/05/2025",
        status: "aprovada",
        problemaBucal: "Cárie com sangramento",
        rendaFamiliar: "1_3sm",
        nivelUrgenciaIA: 2.8,
        confIA: 87,
        triagens: [
        { id: 2, data: "09/05/2025", elegibilidade: "elegivel", prioridade: "media", status: "aprovada", decisao: "aprovado" },
        ],
        encaminhamentos: [
        { id: 1, dentista: "Dr. Carlos Mendes", data: "09/05/2025", prioridade: "media", status: "ativo" },
        ],
    },
    {
        id: 3,
        nome: "Ana Costa",
        cpf: "456.789.123-00",
        telefone: "(11) 97777-6666",
        email: "ana.costa@email.com",
        dataNascimento: "20/01/2008",
        idade: 17,
        sexo: "F",
        cep: "08210-000",
        bairro: "Zona Leste",
        cidade: "São Paulo",
        uf: "SP",
        canalOrigem: "telegram",
        dataCadastro: "08/05/2025",
        status: "aprovada",
        problemaBucal: "Fratura dentária traumática",
        rendaFamiliar: "ate_1sm",
        nivelUrgenciaIA: 4.8,
        confIA: 96,
        triagens: [
        { id: 3, data: "08/05/2025", elegibilidade: "elegivel", prioridade: "urgente", status: "aprovada", decisao: "aprovado" },
        ],
        encaminhamentos: [
        { id: 2, dentista: "Dra. Ana Lima", data: "08/05/2025", prioridade: "urgente", status: "ativo" },
        ],
    },
    {
        id: 4,
        nome: "Pedro Oliveira",
        cpf: "321.654.987-00",
        telefone: "(11) 95555-4444",
        email: "pedro.oliveira@email.com",
        dataNascimento: "15/09/2012",
        idade: 12,
        sexo: "M",
        cep: "05010-000",
        bairro: "Perdizes",
        cidade: "São Paulo",
        uf: "SP",
        canalOrigem: "instagram",
        dataCadastro: "10/05/2025",
        status: "em_triagem",
        problemaBucal: "Dor de dente leve",
        rendaFamiliar: "1_3sm",
        nivelUrgenciaIA: 1.5,
        confIA: 82,
        triagens: [
        { id: 4, data: "10/05/2025", elegibilidade: "pendente", prioridade: "baixa", status: "em_analise" },
        ],
        encaminhamentos: [],
    },
    {
        id: 5,
        nome: "Lucas Ferreira",
        cpf: "654.321.098-00",
        telefone: "(11) 93333-2222",
        email: "lucas.ferreira@email.com",
        dataNascimento: "30/11/2007",
        idade: 17,
        sexo: "M",
        cep: "02010-000",
        bairro: "Santana",
        cidade: "São Paulo",
        uf: "SP",
        canalOrigem: "telegram",
        dataCadastro: "07/05/2025",
        status: "em_triagem",
        problemaBucal: "Sangramento gengival constante",
        rendaFamiliar: "ate_1sm",
        nivelUrgenciaIA: 3.9,
        confIA: 88,
        triagens: [
        { id: 5, data: "07/05/2025", elegibilidade: "elegivel", prioridade: "alta", status: "em_analise" },
        ],
        encaminhamentos: [],
    },
];