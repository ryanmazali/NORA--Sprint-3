// src/pages/Plataforma/Omnichannel/Omnichannel.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MessageSquare, Users, Stethoscope, AlertCircle } from "lucide-react";
import getConversas, { type FiltroCamada } from "../../../api/getConversas";
import type { Conversa } from "../../../api/types/conversa.types";

const labelCanal: Record<string, string> = {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
};

const abas: { label: string; camada: FiltroCamada | "todos" }[] = [
    { label: "Todos", camada: "todos" },
    { label: "Pré-triagem", camada: "pretriagem" },
    { label: "Follow-up", camada: "followup" },
];

function CardConversa({ conversa }: { conversa: Conversa }) {
    const nome =
        conversa.dadosPaciente?.nome ??
        conversa.dadosDentista?.nome ??
        `Conversa #${conversa.id}`;

    const inicial = nome.replace("Dr. ", "").replace("Dra. ", "").charAt(0);
    const isDentista = !!conversa.dadosDentista;
    const corAvatar = isDentista
        ? "bg-[#1e88e5]/10 text-[#1e88e5]"
        : "bg-[#0a3d62]/10 text-[#0a3d62]";

    return (
        <Link
        to={`/plataforma/omnichannel/${conversa.id}`}
        className="flex items-start gap-3 px-4 py-3 no-underline hover:bg-[#f4f7fa] transition-colors duration-150 border-b border-[#f5f5f5] last:border-none"
        >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${corAvatar}`}>
            <span className="font-bold text-sm">{inicial}</span>
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
            <p className="text-[#333] text-sm font-semibold truncate">{nome}</p>
            <span className="text-[#bbb] text-xs flex-shrink-0">{conversa.ultimoHorario ?? ""}</span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-0.5">
            <p className="text-[#999] text-xs truncate">
                {conversa.ultimaMensagem ?? "Sem mensagens"}
            </p>
            {conversa.naoLidas > 0 && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1e88e5] text-white text-[10px] font-bold flex items-center justify-center">
                {conversa.naoLidas}
                </span>
            )}
            </div>
            <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-[#aaa] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                {labelCanal[conversa.canal] ?? conversa.canal}
            </span>
            <span className="text-[10px] text-[#aaa] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                {conversa.camada}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                conversa.status === "aberta"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-500"
            }`}>
                {conversa.status}
            </span>
            </div>
        </div>
        </Link>
    );
}

function Omnichannel() {
    const navigate = useNavigate();
    const [conversas, setConversas] = useState<Conversa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [abaAtiva, setAbaAtiva] = useState<FiltroCamada | "todos">("todos");

    async function fetchConversas(camada?: FiltroCamada) {
        setCarregando(true);
        setErro(null);

        try {
        const response = await getConversas(camada);
        setConversas(response);
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            if (parsedError.statusCode === 401) navigate("/login");
            else setErro(parsedError.erro ?? "Erro ao carregar conversas.");
        }
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        document.title = "Omnichannel | NORA";
    }, []);

    useEffect(() => {
        const camada = abaAtiva === "todos" ? undefined : abaAtiva;
        fetchConversas(camada);
    }, [abaAtiva]);

    const pretriagem = conversas.filter((c) => c.camada === "pretriagem");
    const followup = conversas.filter((c) => c.camada === "followup");

    return (
        <div className="flex flex-col gap-6">

        <div>
            <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">Omnichannel</h1>
            <p className="text-[#888] text-sm mt-0.5">Central de conversas e acompanhamento</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
            {[
            { label: "Pré-triagem", valor: pretriagem.length, icon: <Users size={16} />, cor: "text-[#0a3d62]" },
            { label: "Pacientes", valor: conversas.filter(c => c.camada === "pretriagem" && c.dadosPaciente).length, icon: <MessageSquare size={16} />, cor: "text-[#1e88e5]" },
            { label: "Dentistas", valor: conversas.filter(c => c.dadosDentista).length, icon: <Stethoscope size={16} />, cor: "text-emerald-500" },
            ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-1 items-center text-center">
                <span className={s.cor}>{s.icon}</span>
                <span className="font-bold text-lg font-[Montserrat] text-[#333]">{s.valor}</span>
                <span className="text-[#999] text-xs">{s.label}</span>
            </div>
            ))}
        </div>

        <div className="flex gap-1 bg-[#f0f0f0] p-1 rounded-lg w-fit">
            {abas.map((aba) => (
            <button
                key={aba.camada}
                onClick={() => setAbaAtiva(aba.camada)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                abaAtiva === aba.camada
                    ? "bg-white text-[#0a3d62] shadow-sm"
                    : "text-[#888] hover:text-[#555]"
                }`}
            >
                {aba.label}
            </button>
            ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {carregando ? (
            <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
            </div>
            ) : erro ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
                <AlertCircle size={32} className="text-red-400" />
                <p className="text-[#888] text-sm">{erro}</p>
            </div>
            ) : conversas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
                <MessageSquare size={32} className="text-[#ddd] mb-3" />
                <p className="text-[#999] text-sm">Nenhuma conversa encontrada</p>
            </div>
            ) : (
            <div>
                {conversas.map((c) => (
                <CardConversa key={c.id} conversa={c} />
                ))}
            </div>
            )}
        </div>
        </div>
    );
}

export default Omnichannel;