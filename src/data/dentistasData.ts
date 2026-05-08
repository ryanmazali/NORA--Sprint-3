// src/data/dentistasData.ts

export interface Dentista {
    id: number;
    nome: string;
    cro: string;
    telefone: string;
    email: string;
    cep: string;
    bairro: string;
    cidade: string;
    uf: string;
    capMensal: number;
    encaminhamentosAtivos: number;
    status: "ativo" | "inativo" | "suspenso";
    dataCredenciamento: string;
    especialidades: string[];
    encaminhamentos: EncaminhamentoDentista[];
}

export interface EncaminhamentoDentista {
    id: number;
    paciente: string;
    data: string;
    prioridade: "baixa" | "media" | "alta" | "urgente";
    status: "ativo" | "concluido" | "cancelado" | "reencaminhado";
}

export const dentistas: Dentista[] = [
    {
        id: 1,
        nome: "Dr. Carlos Mendes",
        cro: "CRO-SP 12345",
        telefone: "(11) 98888-7777",
        email: "carlos.mendes@email.com",
        cep: "01310-000",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        uf: "SP",
        capMensal: 4,
        encaminhamentosAtivos: 2,
        status: "ativo",
        dataCredenciamento: "15/01/2024",
        especialidades: ["Clínica Geral", "Endodontia"],
        encaminhamentos: [
        { id: 1, paciente: "João Santos", data: "09/05/2025", prioridade: "media", status: "ativo" },
        { id: 2, paciente: "Pedro Oliveira", data: "07/05/2025", prioridade: "baixa", status: "ativo" },
        ],
    },
    {
        id: 2,
        nome: "Dra. Ana Lima",
        cro: "CRO-SP 67890",
        telefone: "(11) 97777-6666",
        email: "ana.lima@email.com",
        cep: "04038-000",
        bairro: "Vila Clementino",
        cidade: "São Paulo",
        uf: "SP",
        capMensal: 3,
        encaminhamentosAtivos: 1,
        status: "ativo",
        dataCredenciamento: "20/03/2024",
        especialidades: ["Cirurgia", "Traumatologia"],
        encaminhamentos: [
        { id: 3, paciente: "Ana Costa", data: "08/05/2025", prioridade: "urgente", status: "ativo" },
        ],
    },
    {
        id: 3,
        nome: "Dr. Roberto Souza",
        cro: "CRO-SP 11223",
        telefone: "(11) 96666-5555",
        email: "roberto.souza@email.com",
        cep: "02010-000",
        bairro: "Santana",
        cidade: "São Paulo",
        uf: "SP",
        capMensal: 5,
        encaminhamentosAtivos: 0,
        status: "ativo",
        dataCredenciamento: "10/06/2023",
        especialidades: ["Ortodontia", "Clínica Geral"],
        encaminhamentos: [],
    },
    {
        id: 4,
        nome: "Dra. Fernanda Castro",
        cro: "CRO-SP 44556",
        telefone: "(11) 95555-4444",
        email: "fernanda.castro@email.com",
        cep: "05010-000",
        bairro: "Perdizes",
        cidade: "São Paulo",
        uf: "SP",
        capMensal: 3,
        encaminhamentosAtivos: 3,
        status: "ativo",
        dataCredenciamento: "05/09/2023",
        especialidades: ["Pediatria", "Clínica Geral"],
        encaminhamentos: [],
    },
    {
        id: 5,
        nome: "Dr. Marcos Pereira",
        cro: "CRO-SP 77889",
        telefone: "(11) 94444-3333",
        email: "marcos.pereira@email.com",
        cep: "08210-000",
        bairro: "Zona Leste",
        cidade: "São Paulo",
        uf: "SP",
        capMensal: 4,
        encaminhamentosAtivos: 1,
        status: "inativo",
        dataCredenciamento: "12/02/2023",
        especialidades: ["Periodontia"],
        encaminhamentos: [],
    },
];