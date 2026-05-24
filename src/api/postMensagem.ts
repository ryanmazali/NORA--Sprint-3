// src/api/postMensagem.ts
import type { Mensagem } from "./types/conversa.types";

export type MensagemPayload = {
  idConversa: number;
  enviadoPor: "usuario" | "nora_ia" | "externo";
  direcao: "entrada" | "saida";
  conteudo: string;
  tipoMensagem?: "texto" | "audio" | "imagem" | "documento";
};

async function postMensagem(payload: MensagemPayload): Promise<Mensagem> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/mensagens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tipoMensagem: "texto", ...payload }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = {
      erro: errorData.erro,
      statusCode: response.status,
    };
    throw new Error(JSON.stringify(errorMessage));
  }

  const data: Mensagem = await response.json();
  return data;
}

export default postMensagem;
