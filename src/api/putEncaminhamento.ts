// src/api/putEncaminhamento.ts
import type { Encaminhamento } from "./types/encaminhamento.types";

export type UpdateEncaminhamentoPayload = {
  status: "ativo" | "concluido" | "cancelado" | "reencaminhado";
  obsEncam?: string;
};

async function putEncaminhamento(
  id: number,
  payload: UpdateEncaminhamentoPayload
): Promise<Encaminhamento> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/encaminhamentos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = {
      erro: errorData.erro,
      statusCode: response.status,
    };
    throw new Error(JSON.stringify(errorMessage));
  }

  const data: Encaminhamento = await response.json();
  return data;
}

export default putEncaminhamento;
