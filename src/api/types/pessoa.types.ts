// src/api/types/pessoa.types.ts

export type TriagemResumo = {
  id: number;
  elegibilidade: "elegivel" | "inelegivel" | "pendente";
  prioridade: "baixa" | "media" | "alta" | "urgente";
  // backend retorna "statusTriagem" mas pode vir como "status" também
  status?: "em_analise" | "aprovada" | "encerrada" | "inativa";
  statusTriagem?: "em_analise" | "aprovada" | "encerrada" | "inativa";
  decisao?: "aprovado" | "encerrado" | "reanalise" | null;
  problemaBucal?: string;
  rendaFamiliar?: string;
  nivelUrgenciaIA?: number | null;
  confiancaIA?: number | null;
  dataTriagem?: string;
  pessoaId?: number;
};

export type EncaminhamentoResumo = {
  id: number;
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
  matchAutomatico?: boolean;
  observacao?: string | null;
};

export type Pessoa = {
  id: number;
  nome: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  dataNascimento?: string;
  idade?: number;
  sexo?: "M" | "F";
  cep?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  canalOrigem?: "telegram" | "whatsapp" | "instagram" | "facebook" | "outro";
  dataCadastro?: string;
  status?: string;
  problemaBucal?: string;
  rendaFamiliar?: "ate_1sm" | "1_3sm" | "acima_3sm";
  nivelUrgenciaIA?: number | null;
  confIA?: number | null;
  triagens: TriagemResumo[];
  encaminhamentos: EncaminhamentoResumo[];
};