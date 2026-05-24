export type EncaminhamentoDentista = {
  id: number;
  paciente?: {
    id: number;
    nome: string;
    idade?: number;
    bairro?: string;
    problemaBucal?: string;
    nivelUrgenciaIA?: number | null;
  };
  prioridade: "baixa" | "media" | "alta" | "urgente";
  status: "ativo" | "concluido" | "cancelado" | "reencaminhado";
  dataEncaminhamento?: string;
  previsaoFollowUp?: string;
  matchAutomatico?: boolean;
};

export type Dentista = {
  id: number;
  nome: string;
  cro?: string;
  telefone?: string;
  email?: string;
  cep?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  capMensal?: number;
  encaminhamentosAtivos?: number;
  status: "ativo" | "inativo";
  dataCredenciamento?: string;
  especialidades?: string[];
  encaminhamentos?: EncaminhamentoDentista[];
};
