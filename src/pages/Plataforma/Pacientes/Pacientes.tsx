// src/pages/Plataforma/Pacientes/Pacientes.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Filter, AlertCircle } from "lucide-react";
import getPessoas from "../../../api/getPessoas";
import type { Pessoa } from "../../../api/types/pessoa.types";

const badgeStatus: Record<string, string> = {
    em_triagem: "bg-orange-100 text-orange-700",
    triagem: "bg-orange-100 text-orange-700",
    aprovada: "bg-emerald-100 text-emerald-700",
    encerrada: "bg-gray-100 text-gray-600",
    inelegivel: "bg-red-100 text-red-700",
    lead: "bg-blue-100 text-blue-700",
};

const labelStatus: Record<string, string> = {
    em_triagem: "Em Triagem",
    triagem: "Em Triagem",
    aprovada: "Aprovada",
    encerrada: "Encerrada",
    inelegivel: "Inelegível",
    lead: "Lead",
};

const labelCanal: Record<string, string> = {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    outro: "Outro",
};

function Pacientes() {
    const navigate = useNavigate();
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos");

    async function fetchPessoas() {
        setCarregando(true);

        try {
        const response = await getPessoas();
        setPessoas(response);
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 401) {
            navigate("/login");
            } else if (parsedError.statusCode === 500) {
            setErro("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            } else {
            setErro(parsedError.erro ?? "Erro ao carregar pacientes.");
            }
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        document.title = "Pacientes | NORA";
        fetchPessoas();
    }, []);

    const pessoasFiltradas = pessoas.filter((p) => {
        const buscaOk =
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (p.cpf ?? "").includes(busca);
        const statusOk = filtroStatus === "todos" || (p.status ?? "") === filtroStatus;
        return buscaOk && statusOk;
    });

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#666] text-sm">Carregando pacientes...</p>
            </div>
        </div>
        );
    }

    if (erro) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
            <AlertCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">Erro ao carregar</p>
            <p className="text-[#888] text-sm">{erro}</p>
            <button onClick={fetchPessoas} className="text-[#1e88e5] text-sm hover:underline">
            Tentar novamente
            </button>
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
            <div>
            <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">Pacientes</h1>
            <p className="text-[#888] text-sm mt-0.5">
                {pessoasFiltradas.length} pessoa{pessoasFiltradas.length !== 1 ? "s" : ""} encontrada{pessoasFiltradas.length !== 1 ? "s" : ""}
            </p>
            </div>
        </div>

        <div className="flex flex-col gap-3 tablet:flex-row">
            <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
            <input
                type="text"
                placeholder="Buscar por nome ou CPF..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#ddd] bg-white text-sm text-[#333] placeholder:text-[#bbb] outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20 transition-all duration-200"
            />
            </div>
            <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
            <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="pl-9 pr-8 py-2.5 rounded-lg border border-[#ddd] bg-white text-sm text-[#333] outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20 transition-all duration-200 appearance-none cursor-pointer w-full tablet:w-auto"
            >
                <option value="todos">Todos os status</option>
                <option value="em_triagem">Em Triagem</option>
                <option value="aprovada">Aprovada</option>
                <option value="encerrada">Encerrada</option>
                <option value="inelegivel">Inelegível</option>
                <option value="lead">Lead</option>
            </select>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden desktop:grid desktop:grid-cols-[1fr_120px_130px_110px_40px] gap-4 px-5 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
            <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Pessoa</span>
            <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Canal</span>
            <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Cadastro</span>
            <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Status</span>
            <span />
            </div>

            {pessoasFiltradas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <Search size={32} className="text-[#ddd] mb-3" />
                <p className="text-[#999] text-sm">Nenhuma pessoa encontrada</p>
                <p className="text-[#bbb] text-xs mt-1">Tente ajustar os filtros ou a busca</p>
            </div>
            ) : (
            <div className="divide-y divide-[#f5f5f5]">
                {pessoasFiltradas.map((pessoa) => (
                <Link
                    key={pessoa.id}
                    to={`/plataforma/pacientes/${pessoa.id}`}
                    className="flex flex-col gap-2 px-5 py-4 no-underline hover:bg-[#f8fafc] transition-colors duration-150 desktop:grid desktop:grid-cols-[1fr_120px_130px_110px_40px] desktop:items-center desktop:gap-4"
                >
                    <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0a3d62] text-sm font-bold">{pessoa.nome.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="text-[#333] text-sm font-semibold">{pessoa.nome}</p>
                        <p className="text-[#999] text-xs">
                        {pessoa.idade != null ? `${pessoa.idade} anos` : ""}
                        {pessoa.bairro ? ` • ${pessoa.bairro}` : ""}
                        </p>
                    </div>
                    </div>
                    <span className="text-[#666] text-sm desktop:text-center">
                    {labelCanal[pessoa.canalOrigem ?? ""] ?? pessoa.canalOrigem ?? "—"}
                    </span>
                    <span className="text-[#999] text-xs">{pessoa.dataCadastro ?? "—"}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${badgeStatus[pessoa.status ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                    {labelStatus[pessoa.status ?? ""] ?? pessoa.status ?? "—"}
                    </span>
                    <span className="text-[#ccc] hidden desktop:block">›</span>
                </Link>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}

export default Pacientes;
