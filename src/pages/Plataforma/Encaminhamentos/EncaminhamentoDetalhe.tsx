import { useEffect, type JSX } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
    ArrowLeft,
    MapPin,
    Zap,
    Mic,
    CheckCircle,
    XCircle,
    Clock,
    Activity,
    MessageSquare,
    User,
    Stethoscope,
} from "lucide-react";
import { encaminhamentos } from "../../../data/encaminhamentosData";

// ─── Helpers ─────────────────────────────────────────────────

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

const iconeOrigem: Record<string, JSX.Element> = {
    paciente: <User size={14} className="text-blue-500" />,
    dentista: <Stethoscope size={14} className="text-emerald-500" />,
    ia: <Activity size={14} className="text-purple-500" />,
    atendente: <MessageSquare size={14} className="text-orange-500" />,
    sistema: <CheckCircle size={14} className="text-gray-400" />,
};

const corUrgencia = (nivel: number) => {
    if (nivel >= 4) return "text-red-600 bg-red-50 border-red-200";
    if (nivel >= 3) return "text-orange-600 bg-orange-50 border-orange-200";
    if (nivel >= 2) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-emerald-600 bg-emerald-50 border-emerald-200";
};

const labelUrgencia = (nivel: number) => {
    if (nivel >= 4) return "Crítico";
    if (nivel >= 3) return "Urgente";
    if (nivel >= 2) return "Moderado";
    return "Baixo";
};

// ─── Componente ───────────────────────────────────────────────

function EncaminhamentoDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const enc = encaminhamentos.find((e) => e.id === Number(id));

    useEffect(() => {
        document.title = enc
        ? `Encaminhamento #${enc.id} | NORA`
        : "Encaminhamento | NORA";
    }, [enc]);

    if (!enc) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <XCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">Encaminhamento não encontrado</p>
            <button
            onClick={() => navigate(-1)}
            className="text-[#1e88e5] text-sm bg-transparent border-none cursor-pointer hover:underline"
            >
            Voltar para Encaminhamentos
            </button>
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">

        {/* Voltar */}
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#888] hover:text-[#0a3d62] transition-colors duration-200 bg-transparent border-none cursor-pointer w-fit text-sm"
        >
            <ArrowLeft size={16} />
            Voltar
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
            <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-[#0a3d62] font-bold text-xl font-[Montserrat]">
                    Encaminhamento #{enc.id}
                </h1>
                {enc.matchAutomatico && (
                    <span className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-medium">
                    <Zap size={11} />
                    Match automático
                    </span>
                )}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[enc.prioridade]}`}>
                    {enc.prioridade}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatus[enc.status]}`}>
                    {enc.status}
                </span>
                </div>
                <p className="text-[#888] text-sm">
                Encaminhado em {enc.dataEncaminhamento} • Follow-up previsto: {enc.previsaoFollowUp}
                </p>
            </div>

            {/* Ações */}
            {enc.status === "ativo" && (
                <div className="flex gap-2 flex-wrap">
                <button className="
                    flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600
                    text-white text-sm font-semibold px-4 py-2 rounded-lg
                    transition-all duration-200 border-none cursor-pointer
                ">
                    <CheckCircle size={15} />
                    Concluir
                </button>
                <button className="
                    flex items-center gap-2 bg-[#f0f4f8] hover:bg-[#e0e8f0]
                    text-[#0a3d62] text-sm font-medium px-4 py-2 rounded-lg
                    transition-all duration-200 border-none cursor-pointer
                ">
                    Reencaminhar
                </button>
                </div>
            )}
            </div>

            {/* Observação */}
            {enc.observacao && (
            <div className="mt-4 pt-4 border-t border-[#f5f5f5]">
                <p className="text-xs text-[#888] uppercase tracking-wide font-semibold mb-1">Observação</p>
                <p className="text-sm text-[#555]">{enc.observacao}</p>
            </div>
            )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 desktop:grid-cols-2">

            {/* Card Paciente */}
            <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <User size={15} className="text-[#0a3d62]" />
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide">
                Paciente
                </h2>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#0a3d62] font-bold">{enc.paciente.nome.charAt(0)}</span>
                </div>
                <div>
                <p className="text-[#333] font-semibold text-sm">{enc.paciente.nome}</p>
                <p className="text-[#888] text-xs">{enc.paciente.idade} anos • {enc.paciente.bairro}</p>
                </div>
            </div>
            <div className="bg-[#f8fafc] rounded-lg p-3 mb-3">
                <p className="text-xs text-[#888] mb-1">Problema relatado</p>
                <p className="text-sm text-[#333]">{enc.paciente.problemaBucal}</p>
            </div>

            {/* Badge IA */}
            {enc.paciente.nivelUrgenciaIA !== undefined && (
                <div className={`rounded-lg border p-3 ${corUrgencia(enc.paciente.nivelUrgenciaIA)}`}>
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-xs font-semibold uppercase tracking-wide">
                        {labelUrgencia(enc.paciente.nivelUrgenciaIA)}
                    </p>
                    <p className="text-xs opacity-70 mt-0.5">Urgência prevista pela IA</p>
                    </div>
                    <span className="text-lg font-bold font-[Montserrat]">
                    {enc.paciente.confIA}%
                    </span>
                </div>
                <div className="mt-2 bg-white/50 rounded-full h-1.5 overflow-hidden">
                    <div
                    className="h-full rounded-full bg-current opacity-60"
                    style={{ width: `${enc.paciente.confIA}%` }}
                    />
                </div>
                </div>
            )}

            <Link
                to={`/plataforma/pacientes/${enc.paciente.id}`}
                className="mt-3 block text-center text-xs text-[#1e88e5] no-underline hover:underline"
            >
                Ver perfil completo →
            </Link>
            </div>

            {/* Card Dentista */}
            <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <Stethoscope size={15} className="text-[#0a3d62]" />
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide">
                Dentista
                </h2>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1e88e5]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#1e88e5] font-bold">
                    {enc.dentista.nome.replace("Dr. ", "").replace("Dra. ", "").charAt(0)}
                </span>
                </div>
                <div>
                <p className="text-[#333] font-semibold text-sm">{enc.dentista.nome}</p>
                <p className="text-[#888] text-xs">{enc.dentista.cro} • {enc.dentista.bairro}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
                {enc.dentista.especialidades.map((esp) => (
                <span key={esp} className="text-xs bg-[#f0f4f8] text-[#555] px-2 py-0.5 rounded-full">
                    {esp}
                </span>
                ))}
            </div>

            {enc.dentista.distanciaKm && (
                <div className="flex items-center gap-2 bg-[#f8fafc] rounded-lg p-3 mb-3">
                <MapPin size={14} className="text-[#1e88e5]" />
                <div>
                    <p className="text-xs text-[#888]">Distância do paciente</p>
                    <p className="text-sm font-semibold text-[#333]">{enc.dentista.distanciaKm} km</p>
                </div>
                <span className="ml-auto text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <Zap size={10} />
                    Match automático
                </span>
                </div>
            )}

            <Link
                to={`/plataforma/dentistas/${enc.dentista.id}`}
                className="mt-1 block text-center text-xs text-[#1e88e5] no-underline hover:underline"
            >
                Ver perfil completo →
            </Link>
            </div>
        </div>

        {/* Timeline de follow-ups */}
        <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-5">
            Histórico de Follow-ups
            </h2>

            <div className="relative">
            {/* Linha vertical da timeline */}
            <div className="absolute left-[17px] top-0 bottom-0 w-px bg-[#f0f0f0]" />

            <div className="flex flex-col gap-5">
                {enc.followUps.map((fu) => (
                <div key={fu.id} className="flex gap-4 relative">
                    {/* Ícone */}
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-[#f0f0f0] flex items-center justify-center flex-shrink-0 z-10">
                    {iconeOrigem[fu.origem]}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-medium text-[#333]">{fu.descricao}</p>
                        {fu.tipoMensagem === "audio" && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                            <Mic size={10} />
                            Áudio transcrito
                        </span>
                        )}
                    </div>

                    {/* Resumo da IA (transcrição do áudio do dentista) */}
                    {fu.resumoIA && (
                        <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mt-2">
                        <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">
                            Transcrição — Gemini STT
                        </p>
                        <p className="text-sm text-[#444] italic">"{fu.resumoIA}"</p>
                        </div>
                    )}

                    <div className="flex items-center gap-2 mt-1.5">
                        <Clock size={11} className="text-[#bbb]" />
                        <span className="text-xs text-[#bbb]">{fu.data}</span>
                        <span className="text-xs text-[#ddd]">•</span>
                        <span className="text-xs text-[#bbb] capitalize">{fu.origem}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}

export default EncaminhamentoDetalhe;