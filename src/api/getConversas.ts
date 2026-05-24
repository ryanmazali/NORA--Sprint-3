// src/api/getConversas.ts
import type { Conversa } from "./types/conversa.types";

export type FiltroContexto = "cadastro" | "acomp_paciente" | "acomp_dentista";
export type FiltroStatus = "ativa" | "encerrada";

async function getConversas(
  contexto?: FiltroContexto,
  stts?: FiltroStatus
): Promise<Conversa[]> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const params = new URLSearchParams();
  if (contexto) params.append("contexto", contexto);
  if (stts) params.append("stts", stts);
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
