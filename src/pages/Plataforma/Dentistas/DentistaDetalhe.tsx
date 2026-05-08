// src/pages/Plataforma/Dentistas/DentistaDetalhe.tsx

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    Award,
} from "lucide-react";
import { dentistas } from "../../../data/dentistasData";

// ─── Helpers ─────────────────────────────────────────────────

const badgePrioridade: Record<string, string> = {
    baixa: "bg-gray-100 text-gray-600",
    media: "bg-blue-100 text-blue-700",
    alta: "bg-orange-100 text-orange-700",
    urgente: "bg-red-100 text-red-700",
};

const badgeEncStatus: Record<string, string> = {
    ativo: "bg-blue-100 text-blue-700",
    concluido: "bg-emerald-100 text-emerald-700",
    cancelado: "bg-gray-100 text-gray-600",
    reencaminhado: "bg-orange-100 text-orange-700",
};

const badgeStatusDentista: Record<string, string> = {
    ativo: "bg-emerald-100 text-emerald-700",
    inativo: "bg-gray-100 text-gray-600",
    suspenso: "bg-red-100 text-red-700",
};

// ─── Componente ───────────────────────────────────────────────

function DentistaDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const dentista = dentistas.find((d) => d.id === Number(id));

    useEffect(() => {
        document.title = dentista ? `${dentista.nome} | NORA` : "Dentista | NORA";
    }, [dentista]);

    if (!dentista) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <XCircle size={40} className="text-red-400" />
                <p className="text-[#333] font-medium">Dentista não encontrado</p>
                <button
                onClick={() => navigate(-1)}
                className="text-[#1e88e5] text-sm bg-transparent border-none cursor-pointer hover:underline"
                >
                Voltar para Dentistas
                </button>
            </div>
        );
    }

    const vagas = dentista.capMensal - dentista.encaminhamentosAtivos;
    const percentualOcupacao = Math.round((dentista.encaminhamentosAtivos / dentista.capMensal) * 100);

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
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#1e88e5]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1e88e5] text-xl font-bold font-[Montserrat]">
                        {dentista.nome.replace("Dr. ", "").replace("Dra. ", "").charAt(0)}
                    </span>
                    </div>
                    <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-[#0a3d62] font-bold text-xl font-[Montserrat]">
                        {dentista.nome}
                        </h1>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatusDentista[dentista.status]}`}>
                        {dentista.status}
                        </span>
                    </div>
                    <p className="text-[#888] text-sm mt-0.5">{dentista.cro}</p>
                    </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2 flex-wrap">
                    <button className="
                    flex items-center gap-2 bg-[#f0f4f8] hover:bg-[#e0e8f0]
                    text-[#0a3d62] text-sm font-medium px-4 py-2 rounded-lg
                    transition-all duration-200 border-none cursor-pointer
                    ">
                    Editar cadastro
                    </button>
                    <button className="
                    flex items-center gap-2 bg-[#1e88e5] hover:bg-[#1565c0]
                    text-white text-sm font-semibold px-4 py-2 rounded-lg
                    transition-all duration-200 border-none cursor-pointer
                    ">
                    <CheckCircle size={15} />
                    Encaminhar paciente
                    </button>
                </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4 desktop:grid-cols-[1fr_300px]">

                {/* Coluna principal */}
                <div className="flex flex-col gap-4">

                {/* Dados */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Dados de Contato
                    </h2>
                    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Phone size={14} className="text-[#bbb] flex-shrink-0" />
                        {dentista.telefone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Mail size={14} className="text-[#bbb] flex-shrink-0" />
                        {dentista.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <MapPin size={14} className="text-[#bbb] flex-shrink-0" />
                        {dentista.bairro}, {dentista.cidade} — CEP {dentista.cep}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Calendar size={14} className="text-[#bbb] flex-shrink-0" />
                        Credenciado em: {dentista.dataCredenciamento}
                    </div>
                    </div>
                </div>

                {/* Especialidades */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                    <Award size={15} className="text-[#0a3d62]" />
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide">
                        Especialidades
                    </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {dentista.especialidades.map((esp) => (
                        <span key={esp} className="text-sm bg-[#f0f4f8] text-[#0a3d62] font-medium px-3 py-1.5 rounded-lg">
                        {esp}
                        </span>
                    ))}
                    </div>
                </div>

                {/* Encaminhamentos ativos */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Encaminhamentos
                    </h2>
                    {dentista.encaminhamentos.length === 0 ? (
                    <p className="text-[#bbb] text-sm">Nenhum encaminhamento registrado</p>
                    ) : (
                    <div className="flex flex-col gap-3">
                        {dentista.encaminhamentos.map((enc) => (
                        <div
                            key={enc.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-[#f8fafc] border border-[#eee]"
                        >
                            <div>
                            <p className="text-sm text-[#333] font-medium">{enc.paciente}</p>
                            <p className="text-xs text-[#888]">{enc.data}</p>
                            </div>
                            <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[enc.prioridade]}`}>
                                {enc.prioridade}
                            </span>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeEncStatus[enc.status]}`}>
                                {enc.status}
                            </span>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>

                {/* Coluna lateral — capacidade */}
                <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Capacidade Mensal
                    </h2>

                    {/* Barra de ocupação */}
                    <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#888] mb-2">
                        <span>Ocupação</span>
                        <span>{percentualOcupacao}%</span>
                    </div>
                    <div className="w-full bg-[#f0f0f0] rounded-full h-2.5 overflow-hidden">
                        <div
                        className={`h-full rounded-full transition-all duration-500 ${
                            percentualOcupacao >= 100 ? "bg-red-500" :
                            percentualOcupacao >= 75 ? "bg-orange-400" :
                            "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(percentualOcupacao, 100)}%` }}
                        />
                    </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                        <p className="text-xl font-bold text-[#0a3d62] font-[Montserrat]">{dentista.capMensal}</p>
                        <p className="text-xs text-[#888] mt-0.5">Capacidade</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                        <p className="text-xl font-bold text-orange-500 font-[Montserrat]">{dentista.encaminhamentosAtivos}</p>
                        <p className="text-xs text-[#888] mt-0.5">Ativos</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                        <p className={`text-xl font-bold font-[Montserrat] ${vagas > 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {vagas}
                        </p>
                        <p className="text-xs text-[#888] mt-0.5">Vagas</p>
                    </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#f5f5f5] flex items-center gap-2">
                    {vagas > 0 ? (
                        <CheckCircle size={15} className="text-emerald-500" />
                    ) : (
                        <XCircle size={15} className="text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${vagas > 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {vagas > 0 ? `${vagas} vaga${vagas > 1 ? "s" : ""} disponível${vagas > 1 ? "is" : ""}` : "Sem vagas disponíveis"}
                    </span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default DentistaDetalhe;