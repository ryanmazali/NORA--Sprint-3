import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { colaboradores } from "./colaboradoresData";
import { FaGithub, FaLinkedin, FaArrowLeft } from "react-icons/fa";
function ColaboradorDetalhe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const colaborador = colaboradores.find((c) => c.id === id);
    useEffect(() => {
    document.title = colaborador ? `${colaborador.nome} | NORA` : "NORA";
    }, [colaborador]);
    if (!colaborador) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        {" "}
        <p className="text-[1.2rem] text-[#555]">
            Colaborador não encontrado.
        </p>{" "}
        <button
            onClick={() => navigate("/colaboradores")}
            className="bg-[#0a3d62] text-white px-6 py-3 hover:bg-[rgb(226,122,31)] transition-colors duration-300"
        >
            {" "}
            Voltar{" "}
        </button>{" "}
        </div>
    );
    }
    return (
    <main className="w-[90%] mx-auto py-10 max-w-[800px]">
        {" "}
        <button
        onClick={() => navigate("/colaboradores")}
        className="flex items-center gap-2 text-[#0a3d62] font-medium mb-8 hover:text-[rgb(226,122,31)] transition-colors duration-300"
        >
        {" "}
        <FaArrowLeft size={20} /> Voltar para o time{" "}
        </button>{" "}
        <div className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-10 flex flex-col items-center text-center gap-4">
        {" "}
        <img
            src={colaborador.foto}
            alt={`Foto de ${colaborador.nome}`}
            className="w-[220px] h-[220px] rounded-full object-cover border-[3px] border-[#b0d6f5]"
        />{" "}
        <h1 className="text-[1.8rem] font-bold text-[#0a3d62]">
            {colaborador.nome}
        </h1>{" "}
        <p className="text-[#555]">RM: {colaborador.rm}</p>{" "}
        <p className="text-[#555]">Turma: {colaborador.turma}</p>{" "}
        <p className="text-[#444] text-[1rem] leading-relaxed max-w-[600px]">
            {colaborador.descricao}
        </p>{" "}
        <div className="flex gap-4 mt-2">
            {" "}
            <a
            href={colaborador.github}
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
            >
            {" "}
            <FaGithub size={40} className="text-[#222]" />{" "}
            </a>{" "}
            <a
            href={colaborador.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
            >
            {" "}
            <FaLinkedin size={40} className="text-[#0a66c2]" />{" "}
            </a>{" "}
        </div>{" "}
        </div>{" "}
    </main>
    );
}
export default ColaboradorDetalhe;
