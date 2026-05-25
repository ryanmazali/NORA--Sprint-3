// src/api/types/conversa.types.ts

export type Mensagem = {
  idMensagem: number;
  idConversa: number;
  enviadoPor: "usuario" | "nora_ia" | "externo";
  direcao: "entrada" | "saida";
  conteudo: string;
  tipoMensagem: "texto" | "audio" | "imagem" | "documento";
  dataEnvio?: string;
};

export type DadosPessoa = {
  id: number;
  nome: string;
  telefone?: string;
};

export type DadosDentista = {
  id: number;
  nome: string;
  cro?: string;
  telefone?: string;
};

export type Conversa = {
  id: number;
  camada: "pretriagem" | "followup";
  canal: "telegram" | "whatsapp" | "instagram" | "facebook";
  status: "aberta" | "encerrada";
  naoLidas: number;
  ultimaMensagem?: string | null;
  ultimoHorario?: string | null;
  dadosPaciente?: DadosPessoa | null;
  dadosDentista?: DadosDentista | null;
  mensagens?: Mensagem[];
};
