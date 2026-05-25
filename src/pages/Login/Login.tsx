// src/pages/Login/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Layers } from "lucide-react";
import postAuthLogin, { type LoginPayload } from "../../api/postAuthLogin";
import { useAuth } from "../../contexts/AuthContext";

interface LoginForm {
    email: string;
    senha: string;
}

function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erroServidor, setErroServidor] = useState<string | null>(null);
    const navigate = useNavigate();
    const { recarregarSessao } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    async function fetchLogin(payload: LoginPayload) {
        setCarregando(true);
        setErroServidor(null);

        try {
        await postAuthLogin(payload);
        recarregarSessao();
        navigate("/plataforma/dashboard", { replace: true });
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 401) {
            setErroServidor("E-mail ou senha incorretos. Por favor, tente novamente.");
            } else if (parsedError.statusCode === 500) {
            setErroServidor("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            } else {
            setErroServidor(parsedError.erro ?? "Erro ao conectar com o servidor.");
            }
        }
        } finally {
        setCarregando(false);
        }
    }

    const onSubmit = (data: LoginForm) => {
        fetchLogin({ email: data.email, senha: data.senha });
    };

    return (
        <div className="min-h-screen bg-[#0a3d62] flex items-center justify-center px-4">
        <div className="w-full max-w-[400px]">

            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-2">
                <Layers size={28} className="text-white" />
                <span className="text-white font-bold text-2xl font-[Montserrat] tracking-wide">
                NORA
                </span>
            </div>
            <p className="text-white/60 text-sm text-center">
                Acesse a plataforma de gestão
            </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-8">

            <h1 className="text-[#0a3d62] font-bold text-xl font-[Montserrat] mb-1">
                Bem-vindo de volta
            </h1>
            <p className="text-[#666] text-sm mb-6">
                Entre com suas credenciais para continuar
            </p>

            {/* Erro do servidor */}
            {erroServidor && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {erroServidor}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>

                {/* Email */}
                <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[#333] text-sm font-medium">
                    E-mail
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    className={`
                    w-full px-4 py-3 rounded-lg border text-sm
                    outline-none transition-all duration-200
                    placeholder:text-[#bbb] text-[#333]
                    focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    ${errors.email ? "border-red-400 bg-red-50" : "border-[#ddd] bg-[#fafafa]"}
                    `}
                    {...register("email", {
                    required: "E-mail obrigatório",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "E-mail inválido",
                    },
                    })}
                />
                {errors.email && (
                    <span className="text-red-500 text-xs mt-0.5">{errors.email.message}</span>
                )}
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-1">
                <label htmlFor="senha" className="text-[#333] text-sm font-medium">
                    Senha
                </label>
                <div className="relative">
                    <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`
                        w-full px-4 py-3 pr-11 rounded-lg border text-sm
                        outline-none transition-all duration-200
                        placeholder:text-[#bbb] text-[#333]
                        focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                        ${errors.senha ? "border-red-400 bg-red-50" : "border-[#ddd] bg-[#fafafa]"}
                    `}
                    {...register("senha", {
                        required: "Senha obrigatória",
                        minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                    })}
                    />
                    <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#999] hover:text-[#333] transition-colors duration-200 p-1"
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                    {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.senha && (
                    <span className="text-red-500 text-xs mt-0.5">{errors.senha.message}</span>
                )}
                </div>

                {/* Submit */}
                <button
                type="submit"
                disabled={carregando}
                className="
                    w-full bg-[#1e88e5] hover:bg-[#1565c0]
                    text-white font-semibold text-sm
                    py-3 rounded-lg mt-1
                    transition-all duration-300
                    disabled:opacity-60 disabled:cursor-not-allowed
                    shadow-md hover:shadow-lg
                "
                >
                {carregando ? (
                    <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Entrando...
                    </span>
                ) : (
                    "Entrar"
                )}
                </button>
            </form>
            </div>

            <p className="text-center mt-6 text-white/50 text-sm">
            <a href="/" className="text-white/70 hover:text-white underline transition-colors duration-200">
                ← Voltar ao site
            </a>
            </p>
        </div>
        </div>
    );
}

export default Login;