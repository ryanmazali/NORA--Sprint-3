// src/pages/Plataforma/Omnichannel/Omnichannel.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  MessageSquare,
  Send,
  Users,
  Stethoscope,
  Circle,
} from "lucide-react";
import { conversas, type CamadaConversa } from "../../../data/omnichannelData";

// ─── Helpers ─────────────────────────────────────────────────

const labelCanal: Record<string, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
};

// ─── Card de conversa ─────────────────────────────────────────

function CardConversa({ conversa }: { conversa: (typeof conversas)[0] }) {
    const nome =
        conversa.camada === "pretriagem"
        ? conversa.dadosPaciente?.nome ?? "Lead"
        : conversa.dadosDentista?.nome ?? "Dentista";

    const inicial = nome.replace("Dr. ", "").replace("Dra. ", "").charAt(0);

    const corAvatar =
        conversa.camada === "pretriagem"
        ? "bg-[#0a3d62]/10 text-[#0a3d62]"
        : "bg-[#1e88e5]/10 text-[#1e88e5]";

    return (
        <Link
            to={`/plataforma/omnichannel/${conversa.id}`}
            className="
                flex items-start gap-3 px-4 py-3 no-underline
                hover:bg-[#f4f7fa] transition-colors duration-150
                border-b border-[#f5f5f5] last:border-none
            "
        >
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${corAvatar}`}>
                <span className="font-bold text-sm">{inicial}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                <p className="text-[#333] text-sm font-semibold truncate">{nome}</p>
                <span className="text-[#bbb] text-xs flex-shrink-0">{conversa.ultimoHorario}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-[#999] text-xs truncate">{conversa.ultimaMensagem}</p>
                {conversa.naoLidas > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1e88e5] text-white text-[10px] font-bold flex items-center justify-center">
                    {conversa.naoLidas}
                    </span>
                )}
                </div>
                <span className="text-[10px] text-[#bbb] mt-0.5 block">{labelCanal[conversa.canal]}</span>
            </div>
        </Link>
    );
}

    // ─── Componente ───────────────────────────────────────────────

    function Omnichannel() {
        const [camada, setCamada] = useState<CamadaConversa>("pretriagem");

        useEffect(() => {
            document.title = "Omnichannel | NORA";
        }, []);

        const pretriagem = conversas.filter((c) => c.camada === "pretriagem");
        const followup = conversas.filter((c) => c.camada === "followup");
        const lista = camada === "pretriagem" ? pretriagem : followup;

        const totalNaoLidas = conversas.reduce((acc, c) => acc + c.naoLidas, 0);

    return (
        <div className="flex flex-col gap-6">

            {/* Cabeçalho */}
            <div>
                <div className="flex items-center gap-3">
                <h1 className="text-[#0a3d62] font-bold text-2xl font-[Montserrat]">
                    Omnichannel
                </h1>
                {totalNaoLidas > 0 && (
                    <span className="bg-[#1e88e5] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalNaoLidas} novas
                    </span>
                )}
                </div>
                <p className="text-[#888] text-sm mt-0.5">
                Conversas centralizadas do Telegram
                </p>
            </div>

            {/* Tabs de camadas */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex border-b border-[#f0f0f0]">
                <button
                    onClick={() => setCamada("pretriagem")}
                    className={`
                    flex items-center gap-2 flex-1 px-4 py-3 text-sm font-medium
                    border-none cursor-pointer transition-all duration-200
                    ${camada === "pretriagem"
                        ? "bg-white text-[#0a3d62] border-b-2 border-[#0a3d62]"
                        : "bg-[#fafafa] text-[#888] hover:text-[#555]"
                    }
                    `}
                >
                    <Users size={15} />
                    Leads em Pré-Triagem
                    {pretriagem.filter((c) => c.naoLidas > 0).length > 0 && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-[#1e88e5] text-white text-[10px] font-bold flex items-center justify-center">
                        {pretriagem.reduce((acc, c) => acc + c.naoLidas, 0)}
                    </span>
                    )}
                </button>

                <button
                    onClick={() => setCamada("followup")}
                    className={`
                    flex items-center gap-2 flex-1 px-4 py-3 text-sm font-medium
                    border-none cursor-pointer transition-all duration-200
                    ${camada === "followup"
                        ? "bg-white text-[#0a3d62] border-b-2 border-[#0a3d62]"
                        : "bg-[#fafafa] text-[#888] hover:text-[#555]"
                    }
                    `}
                >
                    <Stethoscope size={15} />
                    Follow-up Dentistas
                </button>
                </div>

                {/* Lista de conversas */}
                {lista.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                    <MessageSquare size={32} className="text-[#ddd] mb-3" />
                    <p className="text-[#999] text-sm">Nenhuma conversa nesta camada</p>
                </div>
                ) : (
                <div>
                    {lista.map((conversa) => (
                    <CardConversa key={conversa.id} conversa={conversa} />
                    ))}
                </div>
                )}
            </div>

            {/* Info sobre o bot */}
            <div className="bg-[#f0f4f8] rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0a3d62] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Send size={14} className="text-white" />
                </div>
                <div>
                <p className="text-[#0a3d62] text-sm font-semibold">Bot NORA ativo</p>
                <p className="text-[#666] text-xs mt-0.5 leading-relaxed">
                    As conversas são iniciadas automaticamente pelo bot no Telegram via N8N + Gemini.
                    Você pode acompanhar e intervir em qualquer conversa clicando nela.
                </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                <Circle size={8} className="text-emerald-500 fill-emerald-500" />
                <span className="text-emerald-600 text-xs font-medium">Online</span>
                </div>
            </div>
        </div>
    );
}

export default Omnichannel;