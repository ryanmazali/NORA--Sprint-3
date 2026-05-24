// src/api/getDentistaById.ts
import type { Dentista } from "./types/dentista.types";

async function getDentistaById(id: number): Promise<Dentista> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/dentistas/${id}`, {
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

  const data: Dentista = await response.json();
  return data;
}

export default getDentistaById;
