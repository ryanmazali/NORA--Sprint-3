// src/api/getEncaminhamentos.ts
import type { Encaminhamento } from "./types/encaminhamento.types";

async function getEncaminhamentos(): Promise<Encaminhamento[]> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/encaminhamentos`, {
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

  const data: Encaminhamento[] = await response.json();
  return data;
}

export default getEncaminhamentos;
