// src/api/getMetricasEncaminhamentosPorPrioridade.ts
import type { EncaminhamentosPorPrioridade } from "./types/metrica.types";

async function getMetricasEncaminhamentosPorPrioridade(): Promise<EncaminhamentosPorPrioridade> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/metricas/encaminhamentos-por-prioridade`, {
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

  const data: EncaminhamentosPorPrioridade = await response.json();
  return data;
}

export default getMetricasEncaminhamentosPorPrioridade;
