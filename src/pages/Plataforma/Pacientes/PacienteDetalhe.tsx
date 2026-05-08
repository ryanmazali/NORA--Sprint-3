// src/pages/Plataforma/Pacientes/PacienteDetalhe.tsx

import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    MessageSquare,
    Calendar,
    Activity,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";
import { pacientes } from "../../../data/pacientesData";

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

const labelRenda: Record<string, string> = {
    ate_1sm: "Até 1 salário mínimo",
    "1_3sm": "1 a 3 salários mínimos",
    acima_3sm: "Acima de 3 salários mínimos",
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

function PacienteDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const paciente = pacientes.find((p) => p.id === Number(id));

    useEffect(() => {
        document.title = paciente ? `${paciente.nome} | NORA` : "Paciente | NORA";
    }, [paciente]);

    if (!paciente) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <XCircle size={40} className="text-red-400" />
                <p className="text-[#333] font-medium">Paciente não encontrado</p>
                <Link
                to="/plataforma/pacientes"
                className="text-[#1e88e5] text-sm no-underline hover:underline"
                >
                Voltar para Pacientes
                </Link>
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

            {/* Header do paciente */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">

                {/* Identidade */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0a3d62] text-xl font-bold font-[Montserrat]">
                        {paciente.nome.charAt(0)}
                    </span>
                    </div>
                    <div>
                    <h1 className="text-[#0a3d62] font-bold text-xl font-[Montserrat]">
                        {paciente.nome}
                    </h1>
                    <p className="text-[#888] text-sm">
                        {paciente.idade} anos • {paciente.sexo === "F" ? "Feminino" : "Masculino"} • {paciente.bairro}, {paciente.uf}
                    </p>
                    </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2 flex-wrap">
                    <Link
                    to={`/plataforma/omnichannel`}
                    className="
                        flex items-center gap-2 no-underline
                        bg-[#f0f4f8] hover:bg-[#e0e8f0] text-[#0a3d62]
                        text-sm font-medium px-4 py-2 rounded-lg
                        transition-all duration-200
                    "
                    >
                    <MessageSquare size={15} />
                    Ver conversa
                    </Link>
                    <button className="
                    flex items-center gap-2
                    bg-[#1e88e5] hover:bg-[#1565c0] text-white
                    text-sm font-semibold px-4 py-2 rounded-lg
                    transition-all duration-200 border-none cursor-pointer
                    ">
                    <CheckCircle size={15} />
                    Aprovar e Encaminhar
                    </button>
                </div>
                </div>
            </div>

            {/* Grid de informações */}
            <div className="grid grid-cols-1 gap-4 desktop:grid-cols-[1fr_320px]">

                {/* Coluna principal */}
                <div className="flex flex-col gap-4">

                {/* Dados pessoais */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Dados Pessoais
                    </h2>
                    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Phone size={14} className="text-[#bbb] flex-shrink-0" />
                        {paciente.telefone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Mail size={14} className="text-[#bbb] flex-shrink-0" />
                        {paciente.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <MapPin size={14} className="text-[#bbb] flex-shrink-0" />
                        {paciente.bairro}, {paciente.cidade} — CEP {paciente.cep}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Calendar size={14} className="text-[#bbb] flex-shrink-0" />
                        Nascimento: {paciente.dataNascimento}
                    </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#f5f5f5]">
                    <p className="text-xs text-[#888] mb-1 uppercase tracking-wide font-semibold">Problema Relatado</p>
                    <p className="text-sm text-[#333]">{paciente.problemaBucal}</p>
                    </div>
                    <div className="mt-3">
                    <p className="text-xs text-[#888] mb-1 uppercase tracking-wide font-semibold">Renda Familiar</p>
                    <p className="text-sm text-[#333]">{labelRenda[paciente.rendaFamiliar]}</p>
                    </div>
                </div>

                {/* Triagens */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Histórico de Triagens
                    </h2>
                    {paciente.triagens.length === 0 ? (
                    <p className="text-[#bbb] text-sm">Nenhuma triagem registrada</p>
                    ) : (
                    <div className="flex flex-col gap-3">
                        {paciente.triagens.map((triagem) => (
                        <div key={triagem.id} className="flex items-center justify-between p-3 rounded-lg bg-[#f8fafc] border border-[#eee]">
                            <div className="flex items-center gap-3">
                            <Clock size={15} className="text-[#bbb]" />
                            <div>
                                <p className="text-sm text-[#333] font-medium">{triagem.data}</p>
                                <p className="text-xs text-[#888]">Elegibilidade: {triagem.elegibilidade}</p>
                            </div>
                            </div>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[triagem.prioridade]}`}>
                            {triagem.prioridade}
                            </span>
                        </div>
                        ))}
                    </div>
                    )}
                </div>

                {/* Encaminhamentos */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Encaminhamentos
                    </h2>
                    {paciente.encaminhamentos.length === 0 ? (
                    <p className="text-[#bbb] text-sm">Nenhum encaminhamento realizado</p>
                    ) : (
                    <div className="flex flex-col gap-3">
                        {paciente.encaminhamentos.map((enc) => (
                        <div key={enc.id} className="flex items-center justify-between p-3 rounded-lg bg-[#f8fafc] border border-[#eee]">
                            <div>
                            <p className="text-sm text-[#333] font-medium">{enc.dentista}</p>
                            <p className="text-xs text-[#888]">{enc.data}</p>
                            </div>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeEncStatus[enc.status]}`}>
                            {enc.status}
                            </span>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>

                {/* Coluna lateral — Análise da IA */}
                <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                    <Activity size={16} className="text-[#0a3d62]" />
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide">
                        Análise da IA
                    </h2>
                    </div>

                    {paciente.nivelUrgenciaIA !== undefined ? (
                    <>
                        <div className={`rounded-lg border p-4 mb-4 ${corUrgencia(paciente.nivelUrgenciaIA)}`}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold uppercase tracking-wide">
                            {labelUrgencia(paciente.nivelUrgenciaIA)}
                            </span>
                            <span className="text-sm font-bold">
                            {paciente.confIA}%
                            </span>
                        </div>
                        <p className="text-xs opacity-80">
                            Nível de urgência previsto pelo modelo
                        </p>
                        {/* Barra de confiança */}
                        <div className="mt-3 bg-white/50 rounded-full h-1.5 overflow-hidden">
                            <div
                            className="h-full rounded-full bg-current opacity-70 transition-all duration-500"
                            style={{ width: `${paciente.confIA}%` }}
                            />
                        </div>
                        </div>
                        <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#888]">Problema relatado</span>
                            <span className="text-[#333] font-medium text-right max-w-[160px] truncate">{paciente.problemaBucal}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[#888]">Idade</span>
                            <span className="text-[#333] font-medium">{paciente.idade} anos</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[#888]">Renda</span>
                            <span className="text-[#333] font-medium">{labelRenda[paciente.rendaFamiliar]}</span>
                        </div>
                        </div>
                    </>
                    ) : (
                    <p className="text-[#bbb] text-sm">Análise ainda não disponível</p>
                    )}
                </div>

                {/* Info adicional */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-3">
                    Informações
                    </h2>
                    <div className="flex flex-col gap-2 text-xs">
                    <div className="flex justify-between">
                        <span className="text-[#888]">Canal de origem</span>
                        <span className="text-[#333] font-medium capitalize">{paciente.canalOrigem}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#888]">Data de cadastro</span>
                        <span className="text-[#333] font-medium">{paciente.dataCadastro}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#888]">CPF</span>
                        <span className="text-[#333] font-medium">{paciente.cpf}</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default PacienteDetalhe;