import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logoNora from "../../assets/nora-1.png";

export const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projeto", label: "Sobre o Projeto" },
    { to: "/faq", label: "Dúvidas Frequentes" },
    { to: "/contato", label: "Contato NORA" },
    { to: "/colaboradores", label: "Quem Somos" },
    { to: "/sobre-ong", label: "Sobre a Turma do Bem" },
  ];

  return (
    <header className="w-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.1)] border-b border-[#e0e0e0]">
      <div className="flex justify-between items-center px-5 py-[10px] max-w-[1300px] mx-auto">
        <Link to="/">
          <img
            src={logoNora}
            alt="Logo NORA"
            className="w-[110px] h-[110px] object-contain mr-20"
          />
        </Link>

        <nav
          className={`
                    fixed top-0 right-0 h-full w-[280px] bg-white z-[1000]
                    shadow-[-4px_0_10px_rgba(0,0,0,0.1)]
                    transition-transform duration-300 ease-in-out
                    ${menuAberto ? "translate-x-0" : "translate-x-full"}
                    desktop:static desktop:h-auto desktop:w-auto desktop:bg-transparent
                    desktop:shadow-none desktop:translate-x-0 desktop:transition-none
                `}
        >
          <ul
            className="
                        flex flex-col items-start gap-6 pt-20 px-[30px] pb-[30px] list-none
                        desktop:flex-row desktop:items-center desktop:gap-8 desktop:p-0 desktop:pt-0
                    "
          >
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuAberto(false)}
                  className="
                                        relative no-underline text-[#222] text-[0.95rem] 
                                        font-medium transition-colors duration-300 
                                        hover:text-[rgb(226,122,31)] 
                                        after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] 
                                        after:bg-[rgb(226,122,31)] after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://paybox.doare.org/paybox?payboxId=83fed202-df0f-4665-9c74-688a834028d4"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuAberto(false)}
                className="
                                    relative no-underline text-[#222] text-[0.95rem] font-medium
                                    transition-colors duration-300
                                    hover:text-[rgb(226,122,31)]
                                    after:content-[''] after:absolute after:bottom-[-3px] after:left-0
                                    after:w-0 after:h-[2px] after:bg-[rgb(226,122,31)]
                                    after:transition-[width] after:duration-300
                                    hover:after:w-full
                                "
              >
                Faça sua doação
              </a>
            </li>
          </ul>
        </nav>
        {menuAberto && (
          <div
            className="fixed inset-0 bg-black/40 z-[999] desktop:hidden"
            onClick={() => setMenuAberto(false)}
          />
        )}
        <button
          className="desktop:hidden bg-transparent border-none text-[#0a3d62] cursor-pointer z-[1001]"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar Menu" : "Abrir Menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};
