import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logoNora from "../../assets/nora-1.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projeto", label: "Sobre o Projeto" },
  { to: "/faq", label: "Dúvidas Frequentes" },
  { to: "/contato", label: "Contato NORA" },
  { to: "/colaboradores", label: "Quem Somos" },
  { to: "/sobre-ong", label: "Sobre a Turma do Bem" },
];

export const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="w-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.1)] border-b border-[#e0e0e0] relative z-50">
      <div className="flex items-center justify-between px-5 py-3 max-w-[1300px] mx-auto">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-[#0a3d62] font-bold text-xl font-[Montserrat]">NORA</span>
        </Link>

        {/* Links — desktop */}
        <nav className="hidden desktop:flex items-center gap-7">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="
                relative text-[#222] text-[0.9rem] font-medium no-underline
                transition-colors duration-300 hover:text-[#0a3d62]
                after:content-[''] after:absolute after:bottom-[-3px] after:left-0
                after:w-0 after:h-[2px] after:bg-[#0a3d62]
                after:transition-[width] after:duration-300 hover:after:w-full
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Direita — desktop: botão Acessar Plataforma */}
        <div className="hidden desktop:flex items-center">
          <Link
            to="/login"
            className="
              bg-[#1e88e5] text-white text-[0.9rem] font-semibold
              px-5 py-2 rounded-md no-underline
              transition-all duration-300 hover:bg-[#1565c0]
              shadow-sm
            "
          >
            Acessar Plataforma
          </Link>
        </div>

        {/* Botão hambúrguer — mobile */}
        <button
          className="desktop:hidden bg-transparent border-none text-[#0a3d62] cursor-pointer z-[1001] p-1"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar Menu" : "Abrir Menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay mobile */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/40 z-[999] desktop:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Menu lateral mobile */}
      <nav
        className={`
          fixed top-0 right-0 h-full w-[280px] bg-white z-[1000]
          shadow-[-4px_0_10px_rgba(0,0,0,0.15)]
          transition-transform duration-300 ease-in-out flex flex-col
          ${menuAberto ? "translate-x-0" : "translate-x-full"}
          desktop:hidden
        `}
      >
        {/* Cabeçalho do menu mobile */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e0e0e0]">
          <span className="text-[#0a3d62] font-bold text-lg font-[Montserrat]">NORA</span>
          <button
            className="bg-transparent border-none text-[#0a3d62] cursor-pointer"
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links mobile */}
        <ul className="flex flex-col gap-1 pt-4 px-4 pb-4 list-none flex-1">
          {navLinks.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setMenuAberto(false)}
                className="
                  block px-3 py-3 rounded-md no-underline
                  text-[#333] text-[0.95rem] font-medium
                  transition-all duration-200
                  hover:bg-[#f0f8ff] hover:text-[#0a3d62]
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botão Acessar Plataforma — fim do menu mobile */}
        <div className="px-4 pb-8 pt-2 border-t border-[#e0e0e0]">
          <Link
            to="/login"
            onClick={() => setMenuAberto(false)}
            className="
              block w-full text-center no-underline
              bg-[#1e88e5] text-white
              px-5 py-3 rounded-md
              text-[0.95rem] font-semibold
              transition-all duration-300 hover:bg-[#1565c0]
              shadow-md
            "
          >
            Acessar Plataforma
          </Link>
        </div>
      </nav>
    </header>
  );
};