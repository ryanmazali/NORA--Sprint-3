// src/api/getMensagens.ts
import type { Mensagem } from "./types/conversa.types";

async function getMensagens(idConversa: number): Promise<Mensagem[]> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/conversas/${idConversa}/mensagens`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = {
      erro: errorData.erro,
      statusCode: response.status,
    };
    throw new Error(JSON.stringify(errorMessage));
  }

  const data: Mensagem[] = await response.json();
  return data;
}

export default getMensagens;
