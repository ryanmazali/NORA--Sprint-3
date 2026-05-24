// src/api/getPessoaById.ts
import type { Pessoa } from "./types/pessoa.types";

async function getPessoaById(id: number): Promise<Pessoa> {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

  const response = await fetch(`${url}/pessoas/${id}`, {
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

  const data: Pessoa = await response.json();
  return data;
}

export default getPessoaById;
