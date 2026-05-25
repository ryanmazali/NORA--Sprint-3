// src/api/deleteDentista.ts

async function deleteDentista(id: number): Promise<void> {
    const url = import.meta.env.VITE_API_URL;
    const token = JSON.parse(sessionStorage.getItem("nora_token") as string);

    const response = await fetch(`${url}/dentistas/${id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = {
        erro: errorData.erro ?? "Erro ao deletar dentista",
        statusCode: response.status,
        };
        throw new Error(JSON.stringify(errorMessage));
    }
}

export default deleteDentista;
