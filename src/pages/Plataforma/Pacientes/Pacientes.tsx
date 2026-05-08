import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search, Filter, UserPlus, ChevronRight } from "lucide-react";
import { pacientes, type Paciente } from "../../../data/pacientesData";

// ─── Helpers ─────────────────────────────────────────────────

const badgeStatus: Record<Paciente["status"], string> = {
    em_triagem: "bg-orange-100 text-orange-700",
    aprovada: "bg-emerald-100 text-emerald-700",
    encerrada: "bg-gray-100 text-gray-600",
    inelegivel: "bg-red-100 text-red-700",
};

const labelStatus: Record<Paciente["status"], string> = {
    em_triagem: "Em Triagem",
    aprovada: "Aprovada",
    encerrada: "Encerrada",
    inelegivel: "Inelegível",
};

const labelCanal: Record<Paciente["canalOrigem"], string> = {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    outro: "Outro",
};

// ─── Componente ───────────────────────────────────────────────

function Pacientes() {
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState<Paciente["status"] | "todos">("todos");

    useEffect(() => {
        document.title = "Pacientes | NORA";
    }, []);

    const pacientesFiltrados = pacientes.filter((p) => {
        const buscaOk =
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.cpf.includes(busca);
        const statusOk = filtroStatus === "todos" || p.status === filtroStatus;
        return buscaOk && statusOk;
    });

    return (
        <div className="flex flex-col gap-6">

            {/* Cabeçalho */}
            <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
                <div>
                <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">
                    Pacientes
                </h1>
                <p className="text-[#888] text-sm mt-0.5">
                    {pacientesFiltrados.length} paciente{pacientesFiltrados.length !== 1 ? "s" : ""} encontrado{pacientesFiltrados.length !== 1 ? "s" : ""}
                </p>
                </div>
                <button className="
                flex items-center gap-2 bg-[#1e88e5] hover:bg-[#1565c0]
                text-white text-sm font-semibold px-4 py-2.5 rounded-lg
                transition-all duration-200 shadow-sm w-fit
                ">
                <UserPlus size={16} />
                Novo Paciente
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-col gap-3 tablet:flex-row">
                {/* Busca */}
                <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou CPF..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="
                    w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#ddd]
                    bg-white text-sm text-[#333] placeholder:text-[#bbb]
                    outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200
                    "
                />
                </div>

                {/* Filtro status */}
                <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as Paciente["status"] | "todos")}
                    className="
                    pl-9 pr-8 py-2.5 rounded-lg border border-[#ddd]
                    bg-white text-sm text-[#333]
                    outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                    transition-all duration-200 appearance-none cursor-pointer
                    w-full tablet:w-auto
                    "
                >
                    <option value="todos">Todos os status</option>
                    <option value="em_triagem">Em Triagem</option>
                    <option value="aprovada">Aprovada</option>
                    <option value="encerrada">Encerrada</option>
                    <option value="inelegivel">Inelegível</option>
                </select>
                </div>
            </div>

            {/* Lista */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                {/* Header da tabela — só desktop */}
                <div className="hidden desktop:grid desktop:grid-cols-[1fr_120px_130px_110px_40px] gap-4 px-5 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Paciente</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Canal</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Cadastro</span>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-wide">Status</span>
                <span />
                </div>

                {/* Rows */}
                {pacientesFiltrados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                    <Search size={32} className="text-[#ddd] mb-3" />
                    <p className="text-[#999] text-sm">Nenhum paciente encontrado</p>
                    <p className="text-[#bbb] text-xs mt-1">Tente ajustar os filtros ou a busca</p>
                </div>
                ) : (
                <div className="divide-y divide-[#f5f5f5]">
                    {pacientesFiltrados.map((paciente) => (
                    <Link
                        key={paciente.id}
                        to={`/plataforma/pacientes/${paciente.id}`}
                        className="
                        flex flex-col gap-2 px-5 py-4 no-underline
                        hover:bg-[#f8fafc] transition-colors duration-150
                        desktop:grid desktop:grid-cols-[1fr_120px_130px_110px_40px]
                        desktop:items-center desktop:gap-4
                        "
                    >
                        {/* Nome e info */}
                        <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0a3d62] text-sm font-bold">
                            {paciente.nome.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="text-[#333] text-sm font-semibold">{paciente.nome}</p>
                            <p className="text-[#999] text-xs">{paciente.idade} anos • {paciente.bairro}</p>
                        </div>
                        </div>

                        {/* Canal */}
                        <span className="text-[#666] text-sm desktop:text-center">
                        {labelCanal[paciente.canalOrigem]}
                        </span>

                        {/* Data */}
                        <span className="text-[#999] text-xs">
                        {paciente.dataCadastro}
                        </span>

                        {/* Status */}
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${badgeStatus[paciente.status]}`}>
                        {labelStatus[paciente.status]}
                        </span>

                        {/* Seta */}
                        <ChevronRight size={16} className="text-[#ccc] hidden desktop:block" />
                    </Link>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default Pacientes;