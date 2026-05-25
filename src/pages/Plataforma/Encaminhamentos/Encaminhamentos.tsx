// src/pages/Plataforma/Encaminhamentos/Encaminhamentos.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertCircle, ChevronRight } from "lucide-react";
import getEncaminhamentos from "../../../api/getEncaminhamentos";
import type { Encaminhamento } from "../../../api/types/encaminhamento.types";

const badgePrioridade: Record<string, string> = {
    baixa: "bg-gray-100 text-gray-600",
    media: "bg-blue-100 text-blue-700",
    alta: "bg-orange-100 text-orange-700",
    urgente: "bg-red-100 text-red-700",
};

const badgeStatus: Record<string, string> = {
    ativo: "bg-blue-100 text-blue-700",
    concluido: "bg-emerald-100 text-emerald-700",
    cancelado: "bg-gray-100 text-gray-600",
    reencaminhado: "bg-orange-100 text-orange-700",
};

function Encaminhamentos() {
    const navigate = useNavigate();
    const [encaminhamentos, setEncaminhamentos] = useState<Encaminhamento[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [filtroStatus, setFiltroStatus] = useState("todos");

    async function fetchEncaminhamentos() {
        setCarregando(true);

        try {
        const response = await getEncaminhamentos();
        setEncaminhamentos(response);
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 401) {
            navigate("/login");
            } else if (parsedError.statusCode === 500) {
            setErro("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            } else {
            setErro(parsedError.erro ?? "Erro ao carregar encaminhamentos.");
            }
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        document.title = "Encaminhamentos | NORA";
        fetchEncaminhamentos();
    }, []);

    const filtrados = encaminhamentos.filter((e) =>
        filtroStatus === "todos" || e.status === filtroStatus
    );

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
            <p className="text-[#333] font-medium">Erro ao carregar encaminhamentos</p>
            <p className="text-[#888] text-sm">{erro}</p>
            <button onClick={fetchEncaminhamentos} className="text-[#1e88e5] text-sm hover:underline">
            Tentar novamente
            </button>
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
            <div>
            <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">Encaminhamentos</h1>
            <p className="text-[#888] text-sm mt-0.5">{filtrados.length} encaminhamento{filtrados.length !== 1 ? "s" : ""}</p>
            </div>
            <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#ddd] bg-white text-sm text-[#333] outline-none focus:border-[#1e88e5] cursor-pointer w-fit"
            >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
            <option value="reencaminhado">Reencaminhado</option>
            </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
                <p className="text-[#999] text-sm">Nenhum encaminhamento encontrado</p>
            </div>
            ) : (
            <div className="divide-y divide-[#f5f5f5]">
                {filtrados.map((enc) => (
                <Link
                    key={enc.id}
                    to={`/plataforma/encaminhamentos/${enc.id}`}
                    className="flex items-center gap-4 px-5 py-4 no-underline hover:bg-[#f8fafc] transition-colors duration-150"
                >
                    <div className="flex-1 min-w-0">
                    <p className="text-[#333] text-sm font-semibold truncate">
                        {enc.paciente?.nome ?? `Encaminhamento #${enc.id}`}
                    </p>
                    <p className="text-[#999] text-xs mt-0.5">
                        → {enc.dentista?.nome ?? "Dentista não atribuído"}
                        {enc.dataEncaminhamento ? ` • ${enc.dataEncaminhamento}` : ""}
                    </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[enc.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                        {enc.prioridade}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatus[enc.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {enc.status}
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

export default Encaminhamentos;
