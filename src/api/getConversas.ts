// src/api/getConversas.ts
import type { Conversa } from "./types/conversa.types";

export type FiltroCamada = "pretriagem" | "followup";
export type FiltroStatus = "aberta" | "encerrada";

async function getConversas(
  camada?: FiltroCamada,
  status?: FiltroStatus
): Promise<Conversa[]> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const params = new URLSearchParams();
  if (camada) params.append("camada", camada);
  if (status) params.append("status", status);
  const query = params.toString() ? `?${params.toString()}` : "";

  const response = await fetch(`${url}/conversas${query}`, {
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

  const data: Conversa[] = await response.json();
  return data;
}

export default getConversas;