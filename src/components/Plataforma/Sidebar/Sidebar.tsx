// src/components/Plataforma/Sidebar/Sidebar.tsx

import { NavLink } from "react-router";
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    ArrowRightLeft,
    MessageSquare,
    BarChart3,
    X,
    Layers,
} from "lucide-react";

interface SidebarProps {
    aberta: boolean;
    onFechar: () => void;
}

const navItems = [
    { to: "/plataforma/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/plataforma/pacientes", icon: Users, label: "Pacientes" },
    { to: "/plataforma/dentistas", icon: Stethoscope, label: "Dentistas" },
    { to: "/plataforma/encaminhamentos", icon: ArrowRightLeft, label: "Encaminhamentos" },
    { to: "/plataforma/omnichannel", icon: MessageSquare, label: "Omnichannel" },
    { to: "/plataforma/metricas", icon: BarChart3, label: "Métricas" },
];

function Sidebar({ aberta, onFechar }: SidebarProps) {
    return (
        <aside
        className={`
            fixed top-0 left-0 h-full w-[240px] z-[50]
            bg-[#0a3d62] flex flex-col
            transition-transform duration-300 ease-in-out
            ${aberta ? "translate-x-0" : "-translate-x-full"}
            desktop:relative desktop:translate-x-0 desktop:z-auto desktop:flex-shrink-0
        `}
        >
            {/* Header da sidebar */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                <Layers size={22} className="text-white" />
                <span className="text-white font-bold text-lg font-[Montserrat] tracking-wide">
                    NORA
                </span>
                </div>

                {/* Botão fechar — só no mobile/tablet */}
                <button
                onClick={onFechar}
                className="desktop:hidden bg-transparent border-none text-white/70 hover:text-white cursor-pointer transition-colors duration-200 p-1"
                aria-label="Fechar menu"
                >
                <X size={20} />
                </button>
            </div>

            {/* Navegação */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="list-none p-0 m-0 flex flex-col gap-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <li key={to}>
                    <NavLink
                        to={to}
                        onClick={onFechar}
                        className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg no-underline
                        text-sm font-medium transition-all duration-200
                        ${isActive
                            ? "bg-white/15 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }
                        `}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </NavLink>
                    </li>
                ))}
                </ul>
            </nav>

            {/* Rodapé da sidebar */}
            <div className="px-5 py-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">AN</span>
                </div>
                <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">Ana Nora</p>
                    <p className="text-white/50 text-xs truncate">atendente</p>
                </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;