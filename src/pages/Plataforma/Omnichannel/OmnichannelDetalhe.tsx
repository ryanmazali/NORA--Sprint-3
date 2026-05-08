import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
    ArrowLeft,
    Send,
    Mic,
    Activity,
    Phone,
    Mail,
    Stethoscope,
    CheckCircle,
    XCircle,
    User,
    Users,
} from "lucide-react";
import { conversas, type Mensagem } from "../../../data/omnichannelData";

// ─── Helpers ─────────────────────────────────────────────────

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

const labelRenda: Record<string, string> = {
    "Até 1 salário mínimo": "Até 1 SM",
    "1 a 3 salários mínimos": "1 a 3 SM",
    "Acima de 3 salários mínimos": "Acima de 3 SM",
};

// ─── Bolha de mensagem ────────────────────────────────────────

function BolhaMensagem({ msg }: { msg: Mensagem }) {
    const isNora = msg.remetente === "nora_ia";
    const isAtendente = msg.remetente === "usuario";

    return (
        <div className={`flex flex-col gap-1 ${isNora || isAtendente ? "items-end" : "items-start"}`}>

            {/* Nome do remetente */}
            {!isNora && !isAtendente && (
                <span className="text-[10px] text-[#bbb] px-1">{msg.nomeRemetente}</span>
            )}
            {isNora && (
                <span className="text-[10px] text-[#bbb] px-1">NORA IA</span>
            )}
            {isAtendente && (
                <span className="text-[10px] text-[#bbb] px-1">Você</span>
            )}

            {/* Bolha */}
            <div className={`
                max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                ${isNora
                ? "bg-[#0a3d62] text-white rounded-br-sm"
                : isAtendente
                ? "bg-[#1e88e5] text-white rounded-br-sm"
                : "bg-white text-[#333] rounded-bl-sm shadow-sm border border-[#f0f0f0]"
                }
            `}>
                {msg.conteudo}
            </div>

            {/* Transcrição do áudio — aparece abaixo da bolha de áudio */}
            {msg.tipo === "audio" && msg.transcricao && (
                <div className="max-w-[75%] bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mt-1">
                <div className="flex items-center gap-1.5 mb-2">
                    <Mic size={12} className="text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                    Transcrição — Gemini STT
                    </span>
                </div>
                <p className="text-sm text-[#444] italic leading-relaxed">
                    "{msg.transcricao}"
                </p>
                </div>
            )}

            {/* Horário */}
            <span className="text-[10px] text-[#bbb] px-1">{msg.horario}</span>
        </div>
    );
}

// ─── Painel lateral — Paciente ────────────────────────────────

function PainelPaciente({ conversa }: { conversa: (typeof conversas)[0] }) {
    const p = conversa.dadosPaciente;
    if (!p) return null;

    return (
        <div className="flex flex-col gap-4">

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
                    <p className="text-[#888] text-xs">{p.idade} anos • {p.bairro}</p>
                </div>
                </div>
                <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2 text-[#666]">
                    <Phone size={11} className="text-[#bbb] flex-shrink-0" />
                    {p.telefone}
                </div>
                <div className="flex items-center gap-2 text-[#666]">
                    <Mail size={11} className="text-[#bbb] flex-shrink-0" />
                    <span className="truncate">{p.email}</span>
                </div>
                </div>
            </div>

            {/* Sintomas */}
            <div className="pt-3 border-t border-[#f5f5f5]">
                <p className="text-xs text-[#888] uppercase tracking-wide font-semibold mb-2">
                Sintomas Relatados
                </p>
                <p className="text-sm text-[#333] bg-[#f8fafc] rounded-lg p-2.5">
                {p.problemaBucal}
                </p>
            </div>

            {/* Renda */}
            <div className="flex justify-between text-xs">
                <span className="text-[#888]">Renda familiar</span>
                <span className="text-[#333] font-medium">{labelRenda[p.rendaFamiliar] || p.rendaFamiliar}</span>
            </div>

            {/* Análise da IA */}
            {p.nivelUrgenciaIA !== undefined && (
                <div className="pt-3 border-t border-[#f5f5f5]">
                <div className="flex items-center gap-2 mb-2">
                    <Activity size={13} className="text-[#0a3d62]" />
                    <p className="text-xs text-[#888] uppercase tracking-wide font-semibold">
                    Análise da IA
                    </p>
                </div>
                <div className={`rounded-lg border p-3 ${corUrgencia(p.nivelUrgenciaIA)}`}>
                    <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wide">
                        {labelUrgencia(p.nivelUrgenciaIA)}
                    </span>
                    <span className="text-sm font-bold">{p.confIA}%</span>
                    </div>
                    <p className="text-xs opacity-70">Nível de urgência previsto</p>
                    <div className="mt-2 bg-white/50 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-current opacity-60"
                        style={{ width: `${p.confIA}%` }}
                    />
                    </div>
                </div>
                </div>
            )}

            {/* Ações */}
            <div className="pt-3 border-t border-[#f5f5f5] flex flex-col gap-2">
                <button className="
                w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white
                text-sm font-semibold py-2.5 rounded-lg
                transition-all duration-200 border-none cursor-pointer
                flex items-center justify-center gap-2
                ">
                <CheckCircle size={15} />
                Aprovar e Encaminhar
                </button>
                <button className="
                w-full bg-[#f0f4f8] hover:bg-[#e0e8f0] text-[#666]
                text-sm font-medium py-2.5 rounded-lg
                transition-all duration-200 border-none cursor-pointer
                flex items-center justify-center gap-2
                ">
                <XCircle size={15} />
                Descartar / Encerrar
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

// ─── Painel lateral — Dentista ────────────────────────────────

function PainelDentista({ conversa }: { conversa: (typeof conversas)[0] }) {
    const d = conversa.dadosDentista;
    if (!d) return null;

    return (
        <div className="flex flex-col gap-4">

            {/* Dados do dentista */}
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
                    <p className="text-[#888] text-xs">{d.cro}</p>
                </div>
                </div>
                <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2 text-[#666]">
                    <Phone size={11} className="text-[#bbb] flex-shrink-0" />
                    {d.telefone}
                </div>
                <div className="flex items-center gap-2 text-[#666]">
                    <Mail size={11} className="text-[#bbb] flex-shrink-0" />
                    <span className="truncate">{d.email}</span>
                </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                {d.especialidades.map((esp) => (
                    <span key={esp} className="text-[10px] bg-[#f0f4f8] text-[#555] px-2 py-0.5 rounded-full">
                    {esp}
                    </span>
                ))}
                </div>
            </div>

            {/* Pacientes ativos da Turma do Bem */}
            <div className="pt-3 border-t border-[#f5f5f5]">
                <div className="flex items-center gap-2 mb-3">
                <Users size={13} className="text-[#0a3d62]" />
                <p className="text-xs text-[#888] uppercase tracking-wide font-semibold">
                    Pacientes Ativos — Turma do Bem
                </p>
                </div>
                {d.pacientesAtivos.length === 0 ? (
                <p className="text-xs text-[#bbb]">Nenhum paciente ativo</p>
                ) : (
                <div className="flex flex-col gap-2">
                    {d.pacientesAtivos.map((pac) => (
                    <Link
                        key={pac.id}
                        to={`/plataforma/pacientes/${pac.id}`}
                        className="
                        flex items-start gap-2 p-2.5 rounded-lg bg-[#f8fafc]
                        border border-[#eee] no-underline
                        hover:border-[#1e88e5]/30 transition-colors duration-150
                        "
                    >
                        <div className="w-6 h-6 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#0a3d62] text-[10px] font-bold">
                            {pac.nome.charAt(0)}
                        </span>
                        </div>
                        <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#333] truncate">{pac.nome}</p>
                        <p className="text-[10px] text-[#888] truncate">{pac.problema}</p>
                        </div>
                    </Link>
                    ))}
                </div>
                )}
            </div>

            {/* Link para perfil */}
            <Link
                to={`/plataforma/dentistas/${d.id}`}
                className="text-center text-xs text-[#1e88e5] no-underline hover:underline"
            >
                Ver perfil completo →
            </Link>
        </div>
    );
}

// ─── OmnichannelDetalhe ───────────────────────────────────────

function OmnichannelDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [inputMsg, setInputMsg] = useState("");
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    const conversa = conversas.find((c) => c.id === Number(id));

    useEffect(() => {
        if (conversa) {
        setMensagens(conversa.mensagens);
        document.title = `Chat | NORA`;
        }
    }, [conversa]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagens]);

    const enviarMensagem = () => {
        if (!inputMsg.trim()) return;

        const nova: Mensagem = {
        id: mensagens.length + 1,
        remetente: "usuario",
        nomeRemetente: "Atendente",
        conteudo: inputMsg.trim(),
        tipo: "texto",
        horario: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        };

        setMensagens((prev) => [...prev, nova]);
        setInputMsg("");

        // Quando backend estiver pronto:
        // POST /mensagens { conversaId, conteudo, remetente: "usuario" }
        // N8N recebe webhook e envia a mensagem ao Telegram do usuário
    };

    if (!conversa) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <XCircle size={40} className="text-red-400" />
                <p className="text-[#333] font-medium">Conversa não encontrada</p>
                <button
                onClick={() => navigate(-1)}
                className="text-[#1e88e5] text-sm bg-transparent border-none cursor-pointer hover:underline"
                >
                    Voltar
                </button>
            </div>
        );
    }

    const nomeConversa =
        conversa.camada === "pretriagem"
        ? conversa.dadosPaciente?.nome ?? "Lead"
        : conversa.dadosDentista?.nome ?? "Dentista";

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] desktop:h-[calc(100vh-theme(spacing.12))]">

            {/* Cabeçalho */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-[#888] hover:text-[#0a3d62] transition-colors duration-200 bg-transparent border-none cursor-pointer text-sm"
                >
                <ArrowLeft size={16} />
                </button>
                <div>
                <h1 className="text-[#0a3d62] font-bold text-lg font-[Montserrat]">{nomeConversa}</h1>
                <p className="text-[#888] text-xs">
                    {conversa.camada === "pretriagem" ? "Pré-triagem via" : "Follow-up via"} {conversa.canal}
                </p>
                </div>
            </div>

            {/* Layout chat + painel */}
            <div className="flex gap-4 flex-1 min-h-0">

                {/* Área do chat */}
                <div className="flex flex-col flex-1 min-w-0 bg-white rounded-xl shadow-sm overflow-hidden">

                {/* Mensagens */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#f8fafc]">
                    {mensagens.map((msg) => (
                    <BolhaMensagem key={msg.id} msg={msg} />
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 px-4 py-3 border-t border-[#f0f0f0] bg-white">
                    <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                    placeholder="Digite sua mensagem..."
                    className="
                        flex-1 px-4 py-2.5 rounded-full border border-[#ddd]
                        bg-[#f8fafc] text-sm text-[#333] placeholder:text-[#bbb]
                        outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                        transition-all duration-200
                    "
                    />
                    <button
                    onClick={enviarMensagem}
                    disabled={!inputMsg.trim()}
                    className="
                        w-10 h-10 rounded-full bg-[#1e88e5] hover:bg-[#1565c0]
                        flex items-center justify-center flex-shrink-0
                        border-none cursor-pointer transition-all duration-200
                        disabled:opacity-40 disabled:cursor-not-allowed
                        shadow-sm
                    "
                    >
                    <Send size={16} className="text-white" />
                    </button>
                </div>
                </div>

                {/* Painel lateral — desktop only */}
                <div className="hidden desktop:flex flex-col w-[280px] flex-shrink-0 bg-white rounded-xl shadow-sm p-4 overflow-y-auto">
                {conversa.camada === "pretriagem" ? (
                    <PainelPaciente conversa={conversa} />
                ) : (
                    <PainelDentista conversa={conversa} />
                )}
                </div>
            </div>
        </div>
    );
}

export default OmnichannelDetalhe;