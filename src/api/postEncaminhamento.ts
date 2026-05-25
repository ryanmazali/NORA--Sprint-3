// src/api/postEncaminhamento.ts
import type { Encaminhamento } from "./types/encaminhamento.types";

export type EncaminhamentoPayload = {
    idPaciente: number;
    idDentista: number;
    prioridade: "baixa" | "media" | "alta" | "urgente";
    matchAuto: "N";
    obsEncam?: string;
};

async function postEncaminhamento(
    payload: EncaminhamentoPayload
): Promise<Encaminhamento> {
    const url = import.meta.env.VITE_API_URL;
    const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

    const response = await fetch(`${url}/encaminhamentos`, {
        method: "POST",
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

export default postEncaminhamento;
