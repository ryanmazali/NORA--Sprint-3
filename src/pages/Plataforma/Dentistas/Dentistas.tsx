// src/pages/Plataforma/Dentistas/Dentistas.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, AlertCircle, ChevronRight } from "lucide-react";
import getDentistas from "../../../api/getDentistas";
import type { Dentista } from "../../../api/types/dentista.types";

const badgeStatus: Record<string, string> = {
    ativo: "bg-emerald-100 text-emerald-700",
    inativo: "bg-gray-100 text-gray-600",
};

function Dentistas() {
    const navigate = useNavigate();
    const [dentistas, setDentistas] = useState<Dentista[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos");

    async function fetchDentistas() {
        setCarregando(true);

        try {
        const response = await getDentistas();
        setDentistas(response);
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 401) {
            navigate("/login");
            } else if (parsedError.statusCode === 500) {
            setErro("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            } else {
            setErro(parsedError.erro ?? "Erro ao carregar dentistas.");
            }
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        document.title = "Dentistas | NORA";
        fetchDentistas();
    }, []);

    const filtrados = dentistas.filter((d) => {
        const buscaOk =
        d.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (d.cro ?? "").toLowerCase().includes(busca.toLowerCase());
        const statusOk = filtroStatus === "todos" || d.status === filtroStatus;
        return buscaOk && statusOk;
    });

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    if (erro) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
            <AlertCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">Erro ao carregar dentistas</p>
            <p className="text-[#888] text-sm">{erro}</p>
            <button onClick={fetchDentistas} className="text-[#1e88e5] text-sm hover:underline">
            Tentar novamente
            </button>
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
            <div>
            <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">Dentistas</h1>
            <p className="text-[#888] text-sm mt-0.5">{filtrados.length} dentista{filtrados.length !== 1 ? "s" : ""}</p>
            </div>
        </div>

        <div className="flex flex-col gap-3 tablet:flex-row">
            <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
            <input
                type="text"
                placeholder="Buscar por nome ou CRO..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#ddd] bg-white text-sm text-[#333] placeholder:text-[#bbb] outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20 transition-all duration-200"
            />
            </div>
            <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#ddd] bg-white text-sm text-[#333] outline-none focus:border-[#1e88e5] transition-all duration-200 cursor-pointer"
            >
            <option value="todos">Todos</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
            </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <Search size={32} className="text-[#ddd] mb-3" />
                <p className="text-[#999] text-sm">Nenhum dentista encontrado</p>
            </div>
            ) : (
            <div className="divide-y divide-[#f5f5f5]">
                {filtrados.map((d) => (
                <Link
                    key={d.id}
                    to={`/plataforma/dentistas/${d.id}`}
                    className="flex items-center gap-4 px-5 py-4 no-underline hover:bg-[#f8fafc] transition-colors duration-150"
                >
                    <div className="w-9 h-9 rounded-full bg-[#1e88e5]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1e88e5] text-sm font-bold">{d.nome.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="text-[#333] text-sm font-semibold">{d.nome}</p>
                    <p className="text-[#999] text-xs">
                        {d.cro ?? ""}
                        {d.bairro ? ` • ${d.bairro}` : ""}
                    </p>
                    {d.especialidades && d.especialidades.length > 0 && (
                        <p className="text-[#aaa] text-xs mt-0.5">{d.especialidades.join(", ")}</p>
                    )}
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="text-center hidden tablet:block">
                        <p className="text-[#333] font-semibold text-sm">{d.encaminhamentosAtivos ?? 0}/{d.capMensal ?? "?"}</p>
                        <p className="text-[#bbb] text-xs">vagas</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeStatus[d.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {d.status}
                    </span>
                    <ChevronRight size={16} className="text-[#ccc]" />
                    </div>
                </Link>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}

export default Dentistas;
