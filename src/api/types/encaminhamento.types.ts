export type FollowUp = {
  id: number;
  tipoEvento: string;
  descricao?: string;
  origem?: string;
  dataEvento?: string;
};

export type Encaminhamento = {
  id: number;
  paciente?: {
    id: number;
    nome: string;
    idade?: number;
    bairro?: string;
    problemaBucal?: string;
    nivelUrgenciaIA?: number | null;
  };
  dentista?: {
    id: number;
    nome: string;
    cro?: string;
    bairro?: string;
    especialidades?: string[];
    distanciaKm?: number | null;
  };
  prioridade: "baixa" | "media" | "alta" | "urgente";
  status: "ativo" | "concluido" | "cancelado" | "reencaminhado";
  dataEncaminhamento?: string;
  previsaoFollowUp?: string;
  observacao?: string | null;
  matchAutomatico?: boolean;
  followUps?: FollowUp[];
};
