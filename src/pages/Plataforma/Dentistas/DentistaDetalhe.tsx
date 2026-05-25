// src/pages/Plataforma/Dentistas/DentistaDetalhe.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
    ArrowLeft, Phone, Mail, MapPin, Calendar,
    CheckCircle, XCircle, Award, AlertCircle, X, Send,
} from "lucide-react";
import getDentistaById from "../../../api/getDentistaById";
import getPessoas from "../../../api/getPessoas";
import postEncaminhamento from "../../../api/postEncaminhamento";
import deleteDentista from "../../../api/deleteDentista";
import type { Dentista } from "../../../api/types/dentista.types";
import type { Pessoa } from "../../../api/types/pessoa.types";

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

// ─── Modal de Encaminhamento ──────────────────────────────────

type ModalEncaminhamentoProps = {
    dentistaId: number;
    dentistaVagas: number;
    onClose: () => void;
    onSucesso: () => void;
};

function ModalEncaminhamento({
    dentistaId,
    dentistaVagas,
    onClose,
    onSucesso,
}: ModalEncaminhamentoProps) {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [pessoaSelecionada, setPessoaSelecionada] = useState<number | null>(null);
    const [prioridade, setPrioridade] = useState<"baixa" | "media" | "alta" | "urgente">("media");
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        async function fetchPessoas() {
        try {
            const data = await getPessoas();
            // Filtra pessoas que estão em processo de triagem
            const comTriagem = data.filter((p) =>
            p.status === "triagem" ||
            p.status === "em_triagem" ||
            p.triagens.some((t) => t.status === "em_analise" || t.status === "aprovada")
            );
            setPessoas(comTriagem);
        } catch {
            setErro("Erro ao carregar pacientes.");
        } finally {
            setCarregando(false);
        }
        }
        fetchPessoas();
    }, []);

    const pessoasFiltradas = pessoas.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    async function handleEncaminhar() {
        if (!pessoaSelecionada) return;
        setEnviando(true);
        setErro(null);

        try {
        await postEncaminhamento({
            idPaciente: pessoaSelecionada,
            idDentista: dentistaId,
            prioridade,
            matchAuto: "N",
        });
        onSucesso();
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 422) {
            setErro("Regra de negócio: paciente já possui encaminhamento ativo.");
            } else if (parsedError.statusCode === 404) {
            setErro("Paciente ou dentista não encontrado.");
            } else {
            setErro(parsedError.erro ?? "Erro ao criar encaminhamento.");
            }
        }
        } finally {
        setEnviando(false);
        }
    }

    return (
        // Overlay
        <div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh]">

            {/* Header do modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
            <div>
                <h2 className="text-[#0a3d62] font-bold text-base font-[Montserrat]">
                Encaminhar Paciente
                </h2>
                <p className="text-[#888] text-xs mt-0.5">
                {dentistaVagas > 0
                    ? `${dentistaVagas} vaga${dentistaVagas > 1 ? "s" : ""} disponível${dentistaVagas > 1 ? "is" : ""}`
                    : "Sem vagas disponíveis"}
                </p>
            </div>
            <button
                onClick={onClose}
                className="text-[#999] hover:text-[#333] transition-colors bg-transparent border-none cursor-pointer p-1"
            >
                <X size={20} />
            </button>
            </div>

            {/* Corpo do modal */}
            <div className="flex flex-col gap-4 px-6 py-4 overflow-y-auto flex-1">

            {/* Sem vagas */}
            {dentistaVagas <= 0 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={15} className="text-red-500" />
                <p className="text-red-600 text-sm">
                    Este dentista não possui vagas disponíveis no momento.
                </p>
                </div>
            )}

            {/* Erro */}
            {erro && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={15} className="text-red-500" />
                <p className="text-red-600 text-sm">{erro}</p>
                </div>
            )}

            {/* Busca de paciente */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[#333] text-sm font-medium">
                Selecionar Paciente
                </label>
                <input
                type="text"
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#ddd] bg-[#fafafa] text-sm text-[#333] placeholder:text-[#bbb] outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20 transition-all duration-200"
                />
            </div>

            {/* Lista de pacientes */}
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto border border-[#eee] rounded-lg">
                {carregando ? (
                <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
                </div>
                ) : pessoasFiltradas.length === 0 ? (
                <div className="py-8 text-center text-[#bbb] text-sm">
                    Nenhum paciente com triagem pendente
                </div>
                ) : (
                pessoasFiltradas.map((p) => {
                    const triagem = p.triagens.find((t) => t.status === "em_analise");
                    const selecionado = pessoaSelecionada === p.id;

                    return (
                    <button
                        key={p.id}
                        onClick={() => setPessoaSelecionada(p.id)}
                        className={`
                        flex items-center justify-between px-4 py-3 text-left
                        border-none cursor-pointer transition-colors duration-150
                        ${selecionado
                            ? "bg-[#1e88e5]/10 border-l-2 border-l-[#1e88e5]"
                            : "bg-white hover:bg-[#f8fafc]"
                        }
                        `}
                    >
                        <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${selecionado ? "bg-[#1e88e5] text-white" : "bg-[#0a3d62]/10 text-[#0a3d62]"}`}>
                            <span className="text-sm font-bold">{p.nome.charAt(0)}</span>
                        </div>
                        <div>
                            <p className="text-[#333] text-sm font-medium">{p.nome}</p>
                            <p className="text-[#999] text-xs">
                            {p.idade != null ? `${p.idade} anos` : ""}
                            {p.bairro ? ` • ${p.bairro}` : ""}
                            </p>
                        </div>
                        </div>
                        {triagem && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${badgePrioridade[triagem.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                            {triagem.prioridade}
                        </span>
                        )}
                    </button>
                    );
                })
                )}
            </div>

            {/* Prioridade */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[#333] text-sm font-medium">Prioridade</label>
                <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value as typeof prioridade)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#ddd] bg-[#fafafa] text-sm text-[#333] outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20 transition-all duration-200 cursor-pointer"
                >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
                </select>
            </div>
            </div>

            {/* Footer do modal */}
            <div className="flex gap-3 px-6 py-4 border-t border-[#f0f0f0]">
            <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#ddd] bg-white text-[#555] text-sm font-medium hover:bg-[#f5f5f5] transition-colors duration-200 cursor-pointer"
            >
                Cancelar
            </button>
            <button
                onClick={handleEncaminhar}
                disabled={!pessoaSelecionada || enviando || dentistaVagas <= 0}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1e88e5] hover:bg-[#1565c0] text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
            >
                {enviando ? (
                <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Encaminhando...
                </>
                ) : (
                <>
                    <Send size={15} />
                    Confirmar
                </>
                )}
            </button>
            </div>
        </div>
        </div>
    );
}

// ─── Componente Principal ─────────────────────────────────────

function DentistaDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [dentista, setDentista] = useState<Dentista | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
    const [confirmandoDelete, setConfirmandoDelete] = useState(false);
    const [deletando, setDeletando] = useState(false);

    async function fetchDentista() {
        if (!id) return;
        setCarregando(true);

        try {
        const data = await getDentistaById(Number(id));
        setDentista(data);
        document.title = `${data.nome} | NORA`;
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);

            if (parsedError.statusCode === 401) {
            navigate("/login");
            } else if (parsedError.statusCode === 404) {
            setErro("Dentista não encontrado.");
            } else {
            setErro("Erro ao carregar dados do dentista.");
            }
        }
        document.title = "Dentista | NORA";
        } finally {
        setCarregando(false);
        }
    }

    useEffect(() => {
        fetchDentista();
    }, [id]);

    function handleSucesso() {
        setModalAberto(false);
        setMensagemSucesso("Encaminhamento criado com sucesso!");
        fetchDentista(); // Recarrega para atualizar vagas e lista
        setTimeout(() => setMensagemSucesso(null), 4000);
    }

    async function handleDeletar() {
        if (!dentista) return;
        setDeletando(true);
        try {
        await deleteDentista(dentista.id);
        navigate("/plataforma/dentistas");
        } catch (error) {
        if (error instanceof Error) {
            const parsedError = JSON.parse(error.message);
            setMensagemSucesso(`Erro: ${parsedError.erro ?? "Não foi possível excluir."}`);
            setConfirmandoDelete(false);
        }
        } finally {
        setDeletando(false);
        }
    }

    if (carregando) {
        return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#0a3d62] border-t-transparent rounded-full animate-spin" />
        </div>
        );
    }

    if (erro || !dentista) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <XCircle size={40} className="text-red-400" />
            <p className="text-[#333] font-medium">{erro ?? "Dentista não encontrado"}</p>
            <Link to="/plataforma/dentistas" className="text-[#1e88e5] text-sm no-underline hover:underline">
            Voltar para Dentistas
            </Link>
        </div>
        );
    }

    const vagas = (dentista.capMensal ?? 0) - (dentista.encaminhamentosAtivos ?? 0);
    const percentualOcupacao = dentista.capMensal
        ? Math.round(((dentista.encaminhamentosAtivos ?? 0) / dentista.capMensal) * 100)
        : 0;

    return (
        <>
        {/* Modal */}
        {modalAberto && (
            <ModalEncaminhamento
            dentistaId={dentista.id}
            dentistaVagas={vagas}
            onClose={() => setModalAberto(false)}
            onSucesso={handleSucesso}
            />
        )}

        {/* Modal de confirmação de exclusão */}
        {confirmandoDelete && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
                <h2 className="text-[#0a3d62] font-bold text-base font-[Montserrat]">
                Confirmar exclusão
                </h2>
                <p className="text-[#555] text-sm">
                Tem certeza que deseja excluir <strong>{dentista.nome}</strong>? Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                <button
                    onClick={() => setConfirmandoDelete(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[#ddd] bg-white text-[#555] text-sm font-medium hover:bg-[#f5f5f5] transition-colors duration-200 cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleDeletar}
                    disabled={deletando}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
                >
                    {deletando ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Excluindo...
                    </>
                    ) : (
                    "Confirmar exclusão"
                    )}
                </button>
                </div>
            </div>
            </div>
        )}

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
            {mensagemSucesso && (
            <div className={`px-4 py-3 rounded-lg text-sm border ${
                mensagemSucesso.startsWith("Erro")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}>
                {mensagemSucesso}
            </div>
            )}

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
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStatusDentista[dentista.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {dentista.status}
                    </span>
                    </div>
                    <p className="text-[#888] text-sm mt-0.5">{dentista.cro}</p>
                </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setModalAberto(true)}
                    disabled={dentista.status !== "ativo" || vagas <= 0}
                    className="flex items-center gap-2 bg-[#1e88e5] hover:bg-[#1565c0] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CheckCircle size={15} />
                    Encaminhar paciente
                </button>
                <button
                    onClick={() => setConfirmandoDelete(true)}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-red-200 cursor-pointer"
                >
                    <XCircle size={15} />
                    Excluir
                </button>
                </div>
            </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4 desktop:grid-cols-[1fr_300px]">

            {/* Coluna principal */}
            <div className="flex flex-col gap-4">

                {/* Contato */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Dados de Contato
                </h2>
                <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
                    {dentista.telefone && (
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Phone size={14} className="text-[#bbb] flex-shrink-0" />
                        {dentista.telefone}
                    </div>
                    )}
                    {dentista.email && (
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Mail size={14} className="text-[#bbb] flex-shrink-0" />
                        {dentista.email}
                    </div>
                    )}
                    {(dentista.bairro || dentista.cidade) && (
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <MapPin size={14} className="text-[#bbb] flex-shrink-0" />
                        {[dentista.bairro, dentista.cidade].filter(Boolean).join(", ")}
                        {dentista.cep ? ` — CEP ${dentista.cep}` : ""}
                    </div>
                    )}
                    {dentista.dataCredenciamento && (
                    <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Calendar size={14} className="text-[#bbb] flex-shrink-0" />
                        Credenciado em: {dentista.dataCredenciamento}
                    </div>
                    )}
                </div>
                </div>

                {/* Especialidades */}
                {dentista.especialidades && dentista.especialidades.length > 0 && (
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
                )}

                {/* Encaminhamentos */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-[#0a3d62] font-semibold text-sm font-[Montserrat] uppercase tracking-wide mb-4">
                    Encaminhamentos
                </h2>
                {!dentista.encaminhamentos || dentista.encaminhamentos.length === 0 ? (
                    <p className="text-[#bbb] text-sm">Nenhum encaminhamento registrado</p>
                ) : (
                    <div className="flex flex-col gap-3">
                    {dentista.encaminhamentos.map((enc) => (
                        <Link
                        key={enc.id}
                        to={`/plataforma/encaminhamentos/${enc.id}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#f8fafc] border border-[#eee] no-underline hover:bg-[#f0f6ff] transition-colors duration-150"
                        >
                        <div>
                            <p className="text-sm text-[#333] font-medium">
                            {enc.paciente?.nome ?? `Encaminhamento #${enc.id}`}
                            </p>
                            <p className="text-xs text-[#888]">
                            {enc.dataEncaminhamento ?? ""}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgePrioridade[enc.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                            {enc.prioridade}
                            </span>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeEncStatus[enc.status] ?? "bg-gray-100 text-gray-600"}`}>
                            {enc.status}
                            </span>
                        </div>
                        </Link>
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
                    <p className="text-xl font-bold text-[#0a3d62] font-[Montserrat]">{dentista.capMensal ?? "—"}</p>
                    <p className="text-xs text-[#888] mt-0.5">Capacidade</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                    <p className="text-xl font-bold text-orange-500 font-[Montserrat]">{dentista.encaminhamentosAtivos ?? 0}</p>
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
                    {vagas > 0
                        ? `${vagas} vaga${vagas > 1 ? "s" : ""} disponível${vagas > 1 ? "is" : ""}`
                        : "Sem vagas disponíveis"}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default DentistaDetalhe;