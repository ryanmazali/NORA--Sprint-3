import { useEffect } from "react";
import { useNavigate } from "react-router";
import { TeamCard } from "../../components";
import { colaboradores } from "./colaboradoresData";
import heroBg from "../../assets/desenvolvedores.jpg";
function Colaboradores() {
    useEffect(() => {
    document.title = "Quem Somos | NORA";
    }, []);
    const navigate = useNavigate();
    return (
    <>
        {" "}
        <section
        className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden"
        style={{ background: `url(${heroBg}) center/cover no-repeat` }}
        >
        {" "}
        <div className="absolute inset-0 bg-[rgba(16,19,24,0.648)]" />{" "}
        <div className="relative z-10 max-w-[800px] px-5">
            {" "}
            <h1 className="text-[2.8rem] font-bold mb-4 mobile:text-[2rem]">
            Nosso time
            </h1>{" "}
            <p className="text-[1.2rem] leading-relaxed mobile:text-[1rem]">
            {" "}
            Três estudantes, uma missão: transformar ideias em soluções reais.{" "}
            </p>{" "}
        </div>{" "}
        </section>{" "}
        <main className="w-[90%] mx-auto">
        {" "}
        <section className="grid grid-cols-3 gap-[30px] my-10 max-w-[1100px] mx-auto desktop:grid-cols-3 tablet:grid-cols-1 mobile:grid-cols-1">
            {" "}
            {colaboradores.map((colaborador) => (
            <div
                key={colaborador.id}
                onClick={() => navigate(`/colaboradores/${colaborador.id}`)}
                className="cursor-pointer"
            >
                {" "}
                <TeamCard
                nome={colaborador.nome}
                rm={colaborador.rm}
                turma={colaborador.turma}
                foto={colaborador.foto}
                github={colaborador.github}
                linkedin={colaborador.linkedin}
                />{" "}
            </div>
            ))}{" "}
        </section>{" "}
        </main>{" "}
    </>
    );
}
export default Colaboradores;
