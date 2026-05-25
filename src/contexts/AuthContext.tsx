// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ─── Tipos ────────────────────────────────────────────────────

export type UsuarioSessao = {
    nome: string;
    perfil: string;
};

type AuthContextType = {
    usuario: UsuarioSessao | null;
    autenticado: boolean;
    logout: () => void;
    recarregarSessao: () => void;
};

// ─── Context ──────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
    usuario: null,
    autenticado: false,
    logout: () => {},
    recarregarSessao: () => {},
});

// ─── Provider ─────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);
    const [autenticado, setAutenticado] = useState(false);

    function recarregarSessao() {
        const token = sessionStorage.getItem("nora_token");
        const raw = sessionStorage.getItem("nora_usuario");

        if (token && raw) {
        try {
            const u: UsuarioSessao = JSON.parse(raw);
            setUsuario(u);
            setAutenticado(true);
        } catch {
            setUsuario(null);
            setAutenticado(false);
        }
        } else {
        setUsuario(null);
        setAutenticado(false);
        }
    }

    function logout() {
        sessionStorage.removeItem("nora_token");
        sessionStorage.removeItem("nora_usuario");
        setUsuario(null);
        setAutenticado(false);
        window.location.href = "/login";
    }

    useEffect(() => {
        recarregarSessao();
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, autenticado, logout, recarregarSessao }}>
        {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}