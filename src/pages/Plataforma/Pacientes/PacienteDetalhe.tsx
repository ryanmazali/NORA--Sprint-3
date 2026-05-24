// src/pages/Plataforma/Pacientes/PacienteDetalhe.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
    ArrowLeft, Phone, Mail, MapPin, MessageSquare,
    Calendar, Activity, CheckCircle, XCircle, Clock, AlertCircle,
} from "lucide-react";
import getPessoaById from "../../../api/getPessoaById";
import postAprovarTriagem from "../../../api/postAprovarTriagem";
import type { Pessoa } from "../../../api/types/pessoa.types";

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

function PacienteDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pessoa, setPessoa] = useState<Pessoa | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [aprovando, setAprovando] = useState<number | null>(null);
    const [mensagemAprovacao, setMensagemAprovacao] = useState<string | null>(null);
    const [aprovacaoSucesso, setAprovacaoSucesso] = useState(false);

    async function fetchPessoa() {
        if (!id) return;
        setCarregando(true);

        try {
        const response = await getPessoaById(Number(id));
        setPessoa(response);
        document.title = `${response.nome} | NORA`;
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 401) {
            navigate("/login");
            } else if (parsedError.statusCode === 404) {
            setErro("Paciente não encontrado.");
            } else {
            setErro("Ocorreu um erro ao carregar os dados.");
            }
        }
        document.title = "Paciente | NORA";
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        fetchPessoa();
    }, [id]);

    async function handleAprovar(triagemId: number) {
        setAprovando(triagemId);
        setMensagemAprovacao(null);

        try {
        await postAprovarTriagem(triagemId);
        setAprovacaoSucesso(true);
        setMensagemAprovacao("Triagem aprovada com sucesso! Encaminhamento criado.");
        await fetchPessoa();
        } catch (error) {
        setAprovacaoSucesso(false);
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 409) {
            setMensagemAprovacao("Esta triagem já foi aprovada.");
            } else if (parsedError.statusCode === 422) {
            setMensagemAprovacao("Nenhum dentista disponível para encaminhamento.");
            } else {
            setMensagemAprovacao(parsedError.erro ?? "Erro ao aprovar triagem.");
            }
        }
        } finally {
        setAprovando(null);
        }
    }

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    if (erro || !pessoa) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <XCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">{erro ?? "Paciente não encontrado"}</p>
            <Link to="/plataforma/pacientes" className="text-[#1e88e5] text-sm no-underline hover:underline">
            Voltar para Pacientes
            </Link>
        </div>
        );
    }

    const triagensAtivas = pessoa.triagens.filter((t) => t.status === "em_analise");

    return (
        <div className="flex flex-col gap-6">

        <Link to="/plataforma/pacientes" className="flex items-center gap-2 text-[#1e88e5] text-sm no-underline hover:underline w-fit">
            <ArrowLeft size={16} />
            Voltar para Pacientes
        </Link>

        {mensagemAprovacao && (
            <div className={`px-4 py-3 rounded-lg text-sm border ${
            aprovacaoSucesso
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
            {mensagemAprovacao}
            </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
            <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0a3d62]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#0a3d62] text-xl font-bold">{pessoa.nome.charAt(0)}</span>
            </div>
            <div>
                <h1 className="text-[#0a3d62] font-bold text-xl font-[Montserrat]">{pessoa.nome}</h1>
                <p className="text-[#888] text-sm">
                {pessoa.idade != null ? `${pessoa.idade} anos` : ""}
                {pessoa.sexo ? ` • ${pessoa.sexo === "M" ? "Masculino" : "Feminino"}` : ""}
                </p>
                {pessoa.problemaBucal && (
                <p className="text-[#555] text-sm mt-1 italic">"{pessoa.problemaBucal}"</p>
                )}
            </div>
            </div>

            {pessoa.nivelUrgenciaIA != null && (
            <div className={`px-4 py-3 rounded-xl border flex flex-col items-center gap-1 ${corUrgencia(pessoa.nivelUrgenciaIA)}`}>
                <Activity size={20} />
                <span className="font-bold text-lg font-[Montserrat]">{pessoa.nivelUrgenciaIA.toFixed(1)}</span>
                <span className="text-xs font-medium">{labelUrgencia(pessoa.nivelUrgenciaIA)}</span>
                {pessoa.confIA != null && (
                <span className="text-xs opacity-70">
                    Conf. {(pessoa.confIA * (pessoa.confIA <= 1 ? 100 : 1)).toFixed(0)}%
                </span>
                )}
            </div>
            )}
        </div>

        {/* Grid de detalhes */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">

            {/* Contato */}
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
            <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Contato</h2>
            {pessoa.telefone && (
                <div className="flex items-center gap-2 text-[#555] text-sm">
                <Phone size={15} className="text-[#1e88e5] flex-shrink-0" />
                {pessoa.telefone}
                </div>
            )}
            {pessoa.email && (
                <div className="flex items-center gap-2 text-[#555] text-sm">
                <Mail size={15} className="text-[#1e88e5] flex-shrink-0" />
                {pessoa.email}
                </div>
            )}
            {(pessoa.bairro || pessoa.cidade) && (
                <div className="flex items-center gap-2 text-[#555] text-sm">
                <MapPin size={15} className="text-[#1e88e5] flex-shrink-0" />
                {[pessoa.bairro, pessoa.cidade, pessoa.uf].filter(Boolean).join(", ")}
                </div>
            )}
            {pessoa.canalOrigem && (
                <div className="flex items-center gap-2 text-[#555] text-sm">
                <MessageSquare size={15} className="text-[#1e88e5] flex-shrink-0" />
                Canal: {pessoa.canalOrigem}
                </div>
            )}
            {pessoa.dataCadastro && (
                <div className="flex items-center gap-2 text-[#555] text-sm">
                <Calendar size={15} className="text-[#1e88e5] flex-shrink-0" />
                Cadastrado em {pessoa.dataCadastro}
                </div>
            )}
            {pessoa.rendaFamiliar && (
                <div className="flex items-center gap-2 text-[#555] text-sm">
                <span className="text-[#1e88e5] flex-shrink-0 text-xs font-bold">R$</span>
                {labelRenda[pessoa.rendaFamiliar] ?? pessoa.rendaFamiliar}
                </div>
            )}
            </div>

            {/* Triagens */}
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
            <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Triagens</h2>

            {pessoa.triagens.length === 0 ? (
                <p className="text-[#bbb] text-sm">Nenhuma triagem registrada</p>
            ) : (
                <div className="flex flex-col gap-2">
                {pessoa.triagens.map((t) => (
                    <div key={t.id} className="flex items-center justify-between gap-2 py-2 border-b border-[#f5f5f5] last:border-none">
                    <div className="flex items-center gap-2">
                        {t.status === "aprovada" ? (
                        <CheckCircle size={14} className="text-emerald-500" />
                        ) : t.status === "em_analise" ? (
                        <Clock size={14} className="text-orange-500" />
                        ) : (
                        <XCircle size={14} className="text-gray-400" />
                        )}
                        <span className="text-[#555] text-sm">#{t.id}</span>
                        {t.dataTriagem && (
                        <span className="text-[#999] text-xs">{t.dataTriagem}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgePrioridade[t.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                        {t.prioridade}
                        </span>
                        {t.status === "em_analise" && (
                        <button
                            onClick={() => handleAprovar(t.id)}
                            disabled={aprovando === t.id}
                            className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            {aprovando === t.id ? (
                            <>
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Aprovando...
                            </>
                            ) : (
                            "Aprovar"
                            )}
                        </button>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            )}

            {triagensAtivas.length > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 border border-orange-200">
                <AlertCircle size={14} className="text-orange-600" />
                <span className="text-orange-700 text-xs">
                    {triagensAtivas.length} triagem(ns) aguardando aprovação
                </span>
                </div>
            )}
            </div>
        </div>

        {/* Encaminhamentos */}
        {pessoa.encaminhamentos.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
            <h2 className="text-[#0a3d62] font-semibold text-sm uppercase tracking-wide">Encaminhamentos</h2>
            <div className="flex flex-col gap-2">
                {pessoa.encaminhamentos.map((enc) => (
                <Link
                    key={enc.id}
                    to={`/plataforma/encaminhamentos/${enc.id}`}
                    className="flex items-center justify-between gap-3 py-3 border-b border-[#f5f5f5] last:border-none no-underline hover:bg-[#f8fafc] px-2 rounded-lg transition-colors duration-150"
                >
                    <div>
                    <p className="text-[#333] text-sm font-medium">
                        {enc.dentista ? enc.dentista.nome : `Encaminhamento #${enc.id}`}
                    </p>
                    {enc.dataEncaminhamento && (
                        <p className="text-[#999] text-xs">{enc.dataEncaminhamento}</p>
                    )}
                    </div>
                    <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgePrioridade[enc.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                        {enc.prioridade}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeEncStatus[enc.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {enc.status}
                    </span>
                    </div>
                </Link>
                ))}
            </div>
            </div>
        )}
        </div>
    );
}

export default PacienteDetalhe;
