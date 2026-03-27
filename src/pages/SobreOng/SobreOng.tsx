import { useEffect } from "react";
import { Link } from "react-router";
import heroBg from "../../assets/sobreaong-bg.png";
import { BackButton } from "../../components";
function SobreOng() {
    useEffect(() => {
    document.title = "Sobre a Turma do Bem | NORA";
    }, []);
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
            {" "}
            Sobre a ONG <span className="text-[#b0d6f5]">
                Turma do Bem
            </span>{" "}
            </h1>{" "}
            <p className="text-[1.2rem] leading-relaxed mobile:text-[1rem]">
            {" "}
            A <strong>Turma do Bem</strong> é a maior rede de voluntariado
            odontológico especializado do mundo, reunindo mais de{" "}
            <strong>18 mil dentistas em 12 países</strong>.{" "}
            </p>{" "}
        </div>{" "}
        </section>{" "}
        <main className="w-[90%] mx-auto py-12 leading-[1.7] max-w-[1300px]">
            <BackButton />
            {" "}
            <section className="bg-white p-8 mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {" "}
                <h2 className="text-[1.6rem] font-bold text-[#1a4a75] border-l-[6px] border-[#b0d6f5] pl-3 mb-6">
                Missão e Valores
                </h2>{" "}
                <div className="grid grid-cols-1 gap-5 tablet:grid-cols-3">
                {" "}
                {[
                    {
                    titulo: "Empatia",
                    texto:
                        "Fazer pelo outro o que faríamos por nosso próprio filho.",
                    },
                    {
                    titulo: "Qualidade",
                    texto: "Oferecer tratamentos com estética e alegria.",
                    },
                    {
                    titulo: "Transparência",
                    texto: "Gestão eficaz e clara em todas as ações.",
                    },
                ].map((item) => (
                    <div
                    key={item.titulo}
                    className="bg-[aliceblue] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-[6px]"
                    >
                    {" "}
                    <h3 className="text-[#2266a8] font-semibold mb-2">
                        {item.titulo}
                    </h3>{" "}
                    <p className="text-[#444] text-[0.95rem]">{item.texto}</p>{" "}
                    </div>
                ))}{" "}
                </div>{" "}
            </section>{" "}
            <section className="bg-white p-8 mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {" "}
                <h2 className="text-[1.6rem] font-bold text-[#1a4a75] border-l-[6px] border-[#b0d6f5] pl-3 mb-6">
                Programas em Destaque
                </h2>{" "}
                <div className="grid grid-cols-1 gap-8 tablet:grid-cols-3">
                {" "}
                {[
                    {
                    titulo: "Melhor Dentista do Mundo",
                    texto:
                        "Reconhecimento dado ao dentista voluntário que mais impacta sua comunidade.",
                    link: "/melhor-dentista",
                    btn: "Saiba mais",
                    },
                    {
                    titulo: "Megatriagens",
                    texto:
                        "Grandes mutirões que reúnem milhares de jovens para triagens odontológicas.",
                    link: "/megatriagens",
                    btn: "Conheça",
                    },
                    {
                    titulo: "Sorriso do Bem",
                    texto: "O maior evento de saúde bucal e voluntariado do mundo.",
                    link: "/sorriso-do-bem",
                    btn: "Ver detalhes",
                    },
                ].map((item) => (
                    <div
                    key={item.titulo}
                    className="bg-white p-8 shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[6px]"
                    >
                    {" "}
                    <h3 className="text-[#1a4a75] font-bold text-[1.4rem] mb-4">
                        {item.titulo}
                    </h3>{" "}
                    <p className="text-[#444] leading-relaxed mb-6">{item.texto}</p>{" "}
                    <Link
                        to={item.link}
                        className="inline-block no-underline px-5 py-3 font-semibold text-[0.95rem] bg-[rgb(186,217,244)] text-[#1a4a75] transition-all duration-300 hover:bg-[rgb(226,122,31)] hover:text-white"
                    >
                        {" "}
                        {item.btn}{" "}
                    </Link>{" "}
                    </div>
                ))}{" "}
                </div>{" "}
            </section>{" "}
            <section className="bg-white p-8 mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {" "}
                <h2 className="text-[1.6rem] font-bold text-[#1a4a75] border-l-[6px] border-[#b0d6f5] pl-3 mb-6">
                Reconhecimento e Prêmios
                </h2>{" "}
                <ul className="list-none p-0">
                {" "}
                {[
                    {
                    premio: "Schwab Foundation & Ashoka",
                    descricao: "Empreendedor Social.",
                    },
                    {
                    premio: "Fundación Mapfre (2018)",
                    descricao: "Melhor Ação Social na Espanha.",
                    },
                    {
                    premio: "the dotgood",
                    descricao: "Entre as 50 melhores ONGs do Brasil.",
                    },
                ].map((item) => (
                    <li
                    key={item.premio}
                    className="bg-[#f0f7ff] px-4 py-3 mb-2 text-[1rem]"
                    >
                    {" "}
                    <strong>{item.premio}:</strong> {item.descricao}{" "}
                    </li>
                ))}{" "}
                </ul>{" "}
            </section>{" "}
            <section className="bg-white p-8 mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {" "}
                <h2 className="text-[1.6rem] font-bold text-[#1a4a75] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">
                Sustentabilidade e Parcerias
                </h2>{" "}
                <p className="text-[#444] text-[1rem]">
                {" "}
                A TdB se mantém através de{" "}
                <strong>parcerias com empresas, doações e voluntários</strong>. A
                ONG recusa verbas públicas para preservar sua{" "}
                <strong>independência</strong> e garantir total{" "}
                <strong>transparência</strong>.{" "}
                </p>{" "}
            </section>{" "}
        </main>{" "}
    </>
    );
}
export default SobreOng;
