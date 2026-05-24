// src/api/getMetricasLeadsPorCanal.ts
import type { LeadsPorCanal } from "./types/metrica.types";

async function getMetricasLeadsPorCanal(): Promise<LeadsPorCanal> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/metricas/leads-por-canal`, {
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

  const data: LeadsPorCanal = await response.json();
  return data;
}

export default getMetricasLeadsPorCanal;
