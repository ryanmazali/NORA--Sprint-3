export type LoginPayload = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  token: string;
  nome: string;
  perfil: string;
};

async function postAuthLogin(payload: LoginPayload): Promise<LoginResponse> {
  const url = import.meta.env.VITE_API_URL;

  const response = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
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

  const data: LoginResponse = await response.json();
  sessionStorage.setItem("nora_token", JSON.stringify(data.token));
  sessionStorage.setItem("nora_usuario", JSON.stringify({ nome: data.nome, perfil: data.perfil }));
  return data;
}

export default postAuthLogin;
