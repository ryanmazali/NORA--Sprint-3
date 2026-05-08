// src/components/Plataforma/TopBar/TopBar.tsx

import { Menu } from "lucide-react";

interface TopBarProps {
    onAbrirSidebar: () => void;
}

function TopBar({ onAbrirSidebar }: TopBarProps) {
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

            {/* Logo/nome centralizado */}
            <span className="text-white font-bold text-base font-[Montserrat] tracking-wide">
                NORA
            </span>

            {/* Espaço direito para balancear */}
            <div className="w-8" />
        </header>
    );
}

export default TopBar;