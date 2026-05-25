// src/components/Plataforma/TopBar/TopBar.tsx
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

interface TopBarProps {
    onAbrirSidebar: () => void;
}

function TopBar({ onAbrirSidebar }: TopBarProps) {
    const { usuario, logout } = useAuth();

    // Iniciais do nome para o avatar
    const iniciais = usuario?.nome
        ? usuario.nome
            .split(" ")
            .slice(0, 2)
            .map((n) => n.charAt(0).toUpperCase())
            .join("")
        : "?";

    return (
        <header className="
        desktop:hidden
        flex items-center justify-between
        px-4 py-3
        bg-[#0a3d62]
        shadow-md flex-shrink-0
        ">
        {/* Botão hambúrguer */}
        <button
            onClick={onAbrirSidebar}
            className="bg-transparent border-none text-white cursor-pointer p-1"
            aria-label="Abrir menu"
        >
            <Menu size={24} />
        </button>

        {/* Logo centralizado */}
        <span className="text-white font-bold text-base font-[Montserrat] tracking-wide">
            NORA
        </span>

        {/* Avatar + logout */}
        <div className="flex items-center gap-2">
            {usuario && (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{iniciais}</span>
                </div>
            </div>
            )}
            <button
            onClick={logout}
            className="bg-transparent border-none text-white/70 hover:text-white cursor-pointer p-1 transition-colors duration-200"
            aria-label="Sair"
            title="Sair"
            >
            <LogOut size={20} />
            </button>
        </div>
        </header>
    );
}

export default TopBar;