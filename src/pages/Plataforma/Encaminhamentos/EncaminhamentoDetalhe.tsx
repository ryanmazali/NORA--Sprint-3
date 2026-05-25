// src/pages/Plataforma/Encaminhamentos/EncaminhamentoDetalhe.tsx
import { useEffect, useState, type JSX } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
    ArrowLeft, MapPin, Zap, Mic, CheckCircle, XCircle,
    Clock, Activity, MessageSquare, User, Stethoscope, AlertCircle,
} from "lucide-react";
import getEncaminhamentoById from "../../../api/getEncaminhamentoById";
import putEncaminhamento from "../../../api/putEncaminhamento";
import type { Encaminhamento } from "../../../api/types/encaminhamento.types";

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
    const [enc, setEnc] = useState<Encaminhamento | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [atualizando, setAtualizando] = useState(false);
    const [mensagem, setMensagem] = useState<{ texto: string; sucesso: boolean } | null>(null);

    async function fetchEncaminhamento() {
        if (!id) return;
        setCarregando(true);

        try {
        const data = await getEncaminhamentoById(Number(id));
        setEnc(data);
        document.title = `Encaminhamento #${data.id} | NORA`;
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            if (parsedError.statusCode === 401) navigate("/login");
            else if (parsedError.statusCode === 404) setErro("Encaminhamento não encontrado.");
            else setErro("Erro ao carregar encaminhamento.");
        }
        document.title = "Encaminhamento | NORA";
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        fetchEncaminhamento();
    }, [id]);

    async function handleAtualizarStatus(
        status: "concluido" | "cancelado" | "reencaminhado"
    ) {
        if (!id) return;
        setAtualizando(true);
        setMensagem(null);

        try {
        await putEncaminhamento(Number(id), { status });
        setMensagem({ texto: `Encaminhamento marcado como ${status}.`, sucesso: true });
        await fetchEncaminhamento();
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            setMensagem({
            texto: parsedError.erro ?? "Erro ao atualizar encaminhamento.",
            sucesso: false,
            });
        }
        } finally {
        setAtualizando(false);
        }
    }

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    if (erro || !enc) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <XCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">{erro ?? "Encaminhamento não encontrado"}</p>
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

        {/* Mensagem de feedback */}
        {mensagem && (
            <div className={`px-4 py-3 rounded-lg text-sm border flex items-center gap-2 ${
            mensagem.sucesso
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
            {mensagem.sucesso
                ? <CheckCircle size={15} />
                : <AlertCircle size={15} />
            }
            {mensagem.texto}
            </div>
        )}

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
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[enc.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                    {enc.prioridade}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatus[enc.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {enc.status}
                </span>
                </div>
                <p className="text-[#888] text-sm">
                {enc.dataEncaminhamento ? `Encaminhado em ${enc.dataEncaminhamento}` : ""}
                {enc.previsaoFollowUp ? ` • Follow-up previsto: ${enc.previsaoFollowUp}` : ""}
                </p>
            </div>

            {/* Ações — só aparecem se ativo */}
            {enc.status === "ativo" && (
                <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => handleAtualizarStatus("concluido")}
                    disabled={atualizando}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CheckCircle size={15} />
                    {atualizando ? "Aguarde..." : "Concluir"}
                </button>
                <button
                    onClick={() => handleAtualizarStatus("reencaminhado")}
                    disabled={atualizando}
                    className="flex items-center gap-2 bg-[#f0f4f8] hover:bg-[#e0e8f0] text-[#0a3d62] text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
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

        {/* Grid paciente + dentista */}
        <div className="grid grid-cols-1 gap-4 desktop:grid-cols-2">

            {/* Card Paciente */}
            {enc.paciente && (
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
                    <p className="text-[#888] text-xs">
                    {enc.paciente.idade != null ? `${enc.paciente.idade} anos` : ""}
                    {enc.paciente.bairro ? ` • ${enc.paciente.bairro}` : ""}
                    </p>
                </div>
                </div>

                {enc.paciente.problemaBucal && (
                <div className="bg-[#f8fafc] rounded-lg p-3 mb-3">
                    <p className="text-xs text-[#888] mb-1">Problema relatado</p>
                    <p className="text-sm text-[#333]">{enc.paciente.problemaBucal}</p>
                </div>
                )}

                {enc.paciente.nivelUrgenciaIA != null && (
                <div className={`rounded-lg border p-3 mb-3 ${corUrgencia(enc.paciente.nivelUrgenciaIA)}`}>
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide">
                        {labelUrgencia(enc.paciente.nivelUrgenciaIA)}
                        </p>
                        <p className="text-xs opacity-70 mt-0.5">Urgência prevista pela IA</p>
                    </div>
                    <span className="text-lg font-bold font-[Montserrat]">
                        {enc.paciente.nivelUrgenciaIA.toFixed(1)}
                    </span>
                    </div>
                </div>
                )}

                <Link
                to={`/plataforma/pacientes/${enc.paciente.id}`}
                className="mt-1 block text-center text-xs text-[#1e88e5] no-underline hover:underline"
                >
                Ver perfil completo →
                </Link>
            </div>
            )}

            {/* Card Dentista */}
            {enc.dentista && (
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
                    <p className="text-[#888] text-xs">
                    {enc.dentista.cro ?? ""}
                    {enc.dentista.bairro ? ` • ${enc.dentista.bairro}` : ""}
                    </p>
                </div>
                </div>

                {enc.dentista.especialidades && enc.dentista.especialidades.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                    {enc.dentista.especialidades.map((esp) => (
                    <span key={esp} className="text-xs bg-[#f0f4f8] text-[#555] px-2 py-0.5 rounded-full">
                        {esp}
                    </span>
                    ))}
                </div>
                )}

                {enc.dentista.distanciaKm != null && (
                <div className="flex items-center gap-2 bg-[#f8fafc] rounded-lg p-3 mb-3">
                    <MapPin size={14} className="text-[#1e88e5]" />
                    <div>
                    <p className="text-xs text-[#888]">Distância do paciente</p>
                    <p className="text-sm font-semibold text-[#333]">{enc.dentista.distanciaKm} km</p>
                    </div>
                    {enc.matchAutomatico && (
                    <span className="ml-auto text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Zap size={10} />
                        Match automático
                    </span>
                    )}
                </div>
                )}

                <Link
                to={`/plataforma/dentistas/${enc.dentista.id}`}
                className="mt-1 block text-center text-xs text-[#1e88e5] no-underline hover:underline"
                >
                Ver perfil completo →
                </Link>
            </div>
            )}
        </div>

        {/* Timeline de follow-ups */}
        {enc.followUps && enc.followUps.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-5">
                Histórico de Follow-ups
            </h2>

            <div className="relative">
                <div className="absolute left-[17px] top-0 bottom-0 w-px bg-[#f0f0f0]" />
                <div className="flex flex-col gap-5">
                {enc.followUps.map((fu) => (
                    <div key={fu.id} className="flex gap-4 relative">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-[#f0f0f0] flex items-center justify-center flex-shrink-0 z-10">
                        {iconeOrigem[fu.origem ?? "sistema"] ?? iconeOrigem["sistema"]}
                    </div>
                    <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-medium text-[#333]">
                            {fu.descricao ?? fu.tipoEvento}
                        </p>
                        {fu.tipoEvento === "audio" && (
                            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                            <Mic size={10} />
                            Áudio transcrito
                            </span>
                        )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                        <Clock size={11} className="text-[#bbb]" />
                        <span className="text-xs text-[#bbb]">{fu.dataEvento ?? ""}</span>
                        {fu.origem && (
                            <>
                            <span className="text-xs text-[#ddd]">•</span>
                            <span className="text-xs text-[#bbb] capitalize">{fu.origem}</span>
                            </>
                        )}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        )}

        {/* Sem follow-ups */}
        {(!enc.followUps || enc.followUps.length === 0) && (
            <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-3">
                Histórico de Follow-ups
            </h2>
            <p className="text-[#bbb] text-sm">Nenhum follow-up registrado ainda.</p>
            </div>
        )}
        </div>
    );
}

export default EncaminhamentoDetalhe;
