// src/pages/Plataforma/Omnichannel/OmnichannelDetalhe.tsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
    ArrowLeft, Send, Mic, Activity, Phone,
    Stethoscope, CheckCircle, XCircle, User, AlertCircle,
} from "lucide-react";
import getConversaById from "../../../api/getConversaById";
import getMensagens from "../../../api/getMensagens";
import postMensagem from "../../../api/postMensagem";
import postAprovarTriagem from "../../../api/postAprovarTriagem";
import getPessoaById from "../../../api/getPessoaById";
import type { Conversa, Mensagem } from "../../../api/types/conversa.types";
import type { Pessoa } from "../../../api/types/pessoa.types";

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

const labelCanal: Record<string, string> = {
    telegram: "Telegram", whatsapp: "WhatsApp",
    instagram: "Instagram", facebook: "Facebook",
};

const labelRenda: Record<string, string> = {
    ate_1sm: "Até 1 SM",
    "1_3sm": "1 a 3 SM",
    acima_3sm: "Acima de 3 SM",
};

function BolhaMensagem({ msg }: { msg: Mensagem }) {
    const isNora = msg.enviadoPor === "nora_ia";
    const isAtendente = msg.enviadoPor === "usuario";

    return (
        <div className={`flex flex-col gap-1 ${isNora || isAtendente ? "items-end" : "items-start"}`}>
        <span className="text-[10px] text-[#bbb] px-1">
            {isNora ? "NORA IA" : isAtendente ? "Você" : msg.enviadoPor}
        </span>
        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isNora ? "bg-[#0a3d62] text-white rounded-br-sm"
            : isAtendente ? "bg-[#1e88e5] text-white rounded-br-sm"
            : "bg-white text-[#333] rounded-bl-sm shadow-sm border border-[#f0f0f0]"
        }`}>
            {msg.conteudo}
        </div>
        {msg.tipoMensagem === "audio" && (
            <div className="max-w-[75%] bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mt-1">
            <div className="flex items-center gap-1.5 mb-2">
                <Mic size={12} className="text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                Transcrição — Gemini STT
                </span>
            </div>
            <p className="text-sm text-[#444] italic leading-relaxed">"{msg.conteudo}"</p>
            </div>
        )}
        {msg.dataEnvio && (
            <span className="text-[10px] text-[#bbb] px-1">{msg.dataEnvio}</span>
        )}
        </div>
    );
}

type PainelPacienteProps = {
    conversa: Conversa;
    onAprovar: () => void;
    aprovando: boolean;
    mensagemAcao: { texto: string; sucesso: boolean } | null;
};

function PainelPaciente({ conversa, onAprovar, aprovando, mensagemAcao }: PainelPacienteProps) {
    const p = conversa.dadosPaciente;
    const [pessoaCompleta, setPessoaCompleta] = useState<Pessoa | null>(null);

    useEffect(() => {
        if (!p?.id) return;
        getPessoaById(p.id)
        .then(setPessoaCompleta)
        .catch(() => {/* silencia erro — painel ainda funciona sem dados completos */});
    }, [p?.id]);

    if (!p) return null;

    const nivelIA = pessoaCompleta?.nivelUrgenciaIA;
    const confIA = pessoaCompleta?.confIA;

    return (
        <div className="flex flex-col gap-4">
        {mensagemAcao && (
            <div className={`px-3 py-2 rounded-lg text-xs border flex items-center gap-2 ${
            mensagemAcao.sucesso
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
            {mensagemAcao.sucesso ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
            {mensagemAcao.texto}
            </div>
        )}

        {/* Dados do paciente */}
        <div>
            <div className="flex items-center gap-2 mb-3">
            <User size={14} className="text-[#0a3d62]" />
            <h3 className="text-[#0a3d62] text-xs font-semibold uppercase tracking-wide font-[Montserrat]">
                Dados do Paciente
            </h3>
            </div>
            <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#0a3d62] font-bold">{p.nome.charAt(0)}</span>
            </div>
            <div>
                <p className="text-[#333] font-semibold text-sm">{p.nome}</p>
                <p className="text-[#888] text-xs">
                {pessoaCompleta?.idade != null ? `${pessoaCompleta.idade} anos` : ""}
                {pessoaCompleta?.bairro ? ` • ${pessoaCompleta.bairro}` : ""}
                </p>
            </div>
            </div>
            {p.telefone && (
            <div className="flex items-center gap-2 text-xs text-[#666] mb-1">
                <Phone size={11} className="text-[#bbb] flex-shrink-0" />
                {p.telefone}
            </div>
            )}
            {pessoaCompleta?.rendaFamiliar && (
            <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-[#888]">Renda familiar</span>
                <span className="text-[#333] font-medium">
                {labelRenda[pessoaCompleta.rendaFamiliar] ?? pessoaCompleta.rendaFamiliar}
                </span>
            </div>
            )}
        </div>

        {/* Sintomas */}
        {pessoaCompleta?.problemaBucal && (
            <div className="pt-3 border-t border-[#f5f5f5]">
            <p className="text-xs text-[#888] uppercase tracking-wide font-semibold mb-2">
                Sintomas Relatados
            </p>
            <p className="text-sm text-[#333] bg-[#f8fafc] rounded-lg p-2.5">
                {pessoaCompleta.problemaBucal}
            </p>
            </div>
        )}

        {/* Análise da IA */}
        {nivelIA != null && (
            <div className="pt-3 border-t border-[#f5f5f5]">
            <div className="flex items-center gap-2 mb-2">
                <Activity size={13} className="text-[#0a3d62]" />
                <p className="text-xs text-[#888] uppercase tracking-wide font-semibold">
                Análise da IA
                </p>
            </div>
            <div className={`rounded-lg border p-3 ${corUrgencia(nivelIA)}`}>
                <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wide">
                    {labelUrgencia(nivelIA)}
                </span>
                <span className="text-sm font-bold font-[Montserrat]">
                    {nivelIA.toFixed(1)}
                </span>
                </div>
                <p className="text-xs opacity-70">Nível de urgência previsto</p>
                {confIA != null && (
                <>
                    <div className="mt-2 bg-white/50 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-current opacity-60"
                        style={{ width: `${Math.min(confIA * (confIA <= 1 ? 100 : 1), 100)}%` }}
                    />
                    </div>
                    <p className="text-[10px] opacity-70 mt-1">
                    Confiança: {(confIA * (confIA <= 1 ? 100 : 1)).toFixed(0)}%
                    </p>
                </>
                )}
            </div>
            </div>
        )}

        {/* Ações */}
        <div className="pt-3 border-t border-[#f5f5f5] flex flex-col gap-2">
            <button
            onClick={onAprovar}
            disabled={aprovando}
            className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {aprovando ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Aprovando...</>
            ) : (
                <><CheckCircle size={15} />Aprovar e Encaminhar</>
            )}
            </button>
            <Link
            to={`/plataforma/pacientes/${p.id}`}
            className="text-center text-xs text-[#1e88e5] no-underline hover:underline mt-1"
            >
            Ver perfil completo →
            </Link>
        </div>
        </div>
    );
}

function PainelDentista({ conversa }: { conversa: Conversa }) {
    const d = conversa.dadosDentista;
    if (!d) return null;

    return (
        <div className="flex flex-col gap-4">
        <div>
            <div className="flex items-center gap-2 mb-3">
            <Stethoscope size={14} className="text-[#0a3d62]" />
            <h3 className="text-[#0a3d62] text-xs font-semibold uppercase tracking-wide font-[Montserrat]">
                Dados do Dentista
            </h3>
            </div>
            <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#1e88e5]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#1e88e5] font-bold">
                {d.nome.replace("Dr. ", "").replace("Dra. ", "").charAt(0)}
                </span>
            </div>
            <div>
                <p className="text-[#333] font-semibold text-sm">{d.nome}</p>
                {d.cro && <p className="text-[#888] text-xs">{d.cro}</p>}
            </div>
            </div>
            {d.telefone && (
            <div className="flex items-center gap-2 text-xs text-[#666] mb-1">
                <Phone size={11} className="text-[#bbb] flex-shrink-0" />
                {d.telefone}
            </div>
            )}
        </div>
        <Link
            to={`/plataforma/dentistas/${d.id}`}
            className="text-center text-xs text-[#1e88e5] no-underline hover:underline"
        >
            Ver perfil completo →
        </Link>
        </div>
    );
}

function OmnichannelDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [conversa, setConversa] = useState<Conversa | null>(null);
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [inputMsg, setInputMsg] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [erroEnvio, setErroEnvio] = useState<string | null>(null);
    const [aprovando, setAprovando] = useState(false);
    const [mensagemAcao, setMensagemAcao] = useState<{ texto: string; sucesso: boolean } | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    async function fetchConversa() {
        if (!id) return;
        setCarregando(true);
        try {
        const [convData, msgsData] = await Promise.all([
            getConversaById(Number(id)),
            getMensagens(Number(id)),
        ]);
        setConversa(convData);
        setMensagens(msgsData);
        document.title = `Chat | NORA`;
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            if (parsedError.statusCode === 401) navigate("/login");
            else if (parsedError.statusCode === 404) setErro("Conversa não encontrada.");
            else setErro("Erro ao carregar conversa.");
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => { fetchConversa(); }, [id]);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [mensagens]);

    async function enviarMensagem() {
        if (!inputMsg.trim() || !id) return;
        setEnviando(true);
        setErroEnvio(null);
        try {
        const msg = await postMensagem({
            idConversa: Number(id),
            enviadoPor: "usuario",
            direcao: "saida",
            conteudo: inputMsg.trim(),
            tipoMensagem: "texto",
        });
        setMensagens((prev) => [...prev, msg]);
        setInputMsg("");
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            setErroEnvio(parsedError.erro ?? "Erro ao enviar mensagem.");
        }
        } finally {
        setEnviando(false);
        }
    }

    async function handleAprovar() {
        if (!conversa?.dadosPaciente?.id) return;
        setAprovando(true);
        setMensagemAcao(null);
        try {
        await postAprovarTriagem(conversa.dadosPaciente.id);
        setMensagemAcao({ texto: "Triagem aprovada! Encaminhamento criado.", sucesso: true });
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            if (parsedError.statusCode === 409) {
            setMensagemAcao({ texto: "Triagem já foi aprovada anteriormente.", sucesso: false });
            } else if (parsedError.statusCode === 422) {
            setMensagemAcao({ texto: "Nenhum dentista disponível no momento.", sucesso: false });
            } else {
            setMensagemAcao({ texto: parsedError.erro ?? "Erro ao aprovar triagem.", sucesso: false });
            }
        }
        } finally {
        setAprovando(false);
        }
    }

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    if (erro || !conversa) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <XCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">{erro ?? "Conversa não encontrada"}</p>
            <button onClick={() => navigate(-1)} className="text-[#1e88e5] text-sm bg-transparent border-none cursor-pointer hover:underline">
            Voltar
            </button>
        </div>
        );
    }

    const nomeConversa =
        conversa.dadosPaciente?.nome ??
        conversa.dadosDentista?.nome ??
        `Conversa #${conversa.id}`;

    const isDentista = conversa.camada === "followup" && !!conversa.dadosDentista;

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] desktop:h-[calc(100vh-theme(spacing.12))]">

        <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#888] hover:text-[#0a3d62] transition-colors duration-200 bg-transparent border-none cursor-pointer text-sm">
            <ArrowLeft size={16} />
            </button>
            <div>
            <h1 className="text-[#0a3d62] font-bold text-lg font-[Montserrat]">{nomeConversa}</h1>
            <p className="text-[#888] text-xs">
                {conversa.camada === "pretriagem" ? "Pré-triagem via" : "Follow-up via"}{" "}
                {labelCanal[conversa.canal] ?? conversa.canal}
            </p>
            </div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">

            <div className="flex flex-col flex-1 min-w-0 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#f8fafc]">
                {mensagens.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-[#bbb] text-sm">Nenhuma mensagem ainda</p>
                </div>
                ) : (
                mensagens.map((msg) => <BolhaMensagem key={msg.idMensagem} msg={msg} />)
                )}
                <div ref={bottomRef} />
            </div>

            {erroEnvio && (
                <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle size={12} />{erroEnvio}
                </div>
            )}

            <div className="flex items-center gap-2 px-4 py-3 border-t border-[#f0f0f0] bg-white">
                <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviarMensagem()}
                placeholder={conversa.status === "encerrada" ? "Conversa encerrada" : "Digite sua mensagem..."}
                disabled={conversa.status === "encerrada" || enviando}
                className="flex-1 px-4 py-2.5 rounded-full border border-[#ddd] bg-[#f8fafc] text-sm text-[#333] placeholder:text-[#bbb] outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                onClick={enviarMensagem}
                disabled={!inputMsg.trim() || enviando || conversa.status === "encerrada"}
                className="w-10 h-10 rounded-full bg-[#1e88e5] hover:bg-[#1565c0] flex items-center justify-center flex-shrink-0 border-none cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                {enviando
                    ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Send size={16} className="text-white" />
                }
                </button>
            </div>
            </div>

            <div className="hidden desktop:flex flex-col w-[280px] flex-shrink-0 bg-white rounded-xl shadow-sm p-4 overflow-y-auto">
            {isDentista ? (
                <PainelDentista conversa={conversa} />
            ) : (
                <PainelPaciente
                conversa={conversa}
                onAprovar={handleAprovar}
                aprovando={aprovando}
                mensagemAcao={mensagemAcao}
                />
            )}
            </div>
        </div>
        </div>
    );
}

export default OmnichannelDetalhe;