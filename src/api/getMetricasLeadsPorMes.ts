// src/api/getMetricasLeadsPorMes.ts
import type { LeadsPorMes } from "./types/metrica.types";

async function getMetricasLeadsPorMes(): Promise<LeadsPorMes> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/metricas/leads-por-mes`, {
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

  const data: LeadsPorMes = await response.json();
  return data;
}

export default getMetricasLeadsPorMes;
