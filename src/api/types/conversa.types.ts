export type Mensagem = {
  idMensagem: number;
  idConversa: number;
  enviadoPor: "usuario" | "nora_ia" | "externo";
  direcao: "entrada" | "saida";
  conteudo: string;
  tipoMensagem: "texto" | "audio" | "imagem" | "documento";
  dataEnvio?: string;
};

export type Conversa = {
  idConversa: number;
  canalConv: "telegram" | "whatsapp" | "instagram" | "facebook";
  contexto: "cadastro" | "acomp_paciente" | "acomp_dentista";
  tgThreadId?: string | null;
  idPessoa?: number | null;
  idPaciente?: number | null;
  idDentista?: number | null;
  sttsConv: "ativa" | "encerrada";
  naoLidas: number;
  ultimaMensagem?: string;
  ultimoHorario?: string;
  dadosPaciente?: { id: number; nome: string; telefone?: string } | null;
  dadosDentista?: { id: number; nome: string; telefone?: string } | null;
  mensagens?: Mensagem[];
};
