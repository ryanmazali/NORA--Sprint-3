// src/api/getMetricasResumo.ts
import type { MetricaResumo } from "./types/metrica.types";

async function getMetricasResumo(): Promise<MetricaResumo> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/metricas/resumo`, {
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

  const data: MetricaResumo = await response.json();
  return data;
}

export default getMetricasResumo;
