export type MetricaResumo = {
  totalLeads: number;
  totalAprovados: number;
  totalEncaminhamentos: number;
  totalDentistasAtivos: number;
  taxaAprovacao: number;
  taxaConclusao: number;
};

export type TriagensPorStatus = {
  em_analise: number;
  aprovada: number;
  encerrada: number;
  inativa: number;
};

export type EncaminhamentosPorPrioridade = {
  baixa: number;
  media: number;
  alta: number;
  urgente: number;
};

export type LeadsPorCanal = {
  telegram: number;
  whatsapp: number;
  instagram: number;
  facebook: number;
  outro: number;
};

export type LeadsPorMes = {
  Jan: number; Fev: number; Mar: number; Abr: number;
  Mai: number; Jun: number; Jul: number; Ago: number;
  Set: number; Out: number; Nov: number; Dez: number;
};
