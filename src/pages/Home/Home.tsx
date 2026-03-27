import { useEffect, useState } from "react";
import { Link } from "react-router";
import imgProjeto from "../../assets/projeto.png";
import imgDoacao from "../../assets/doacao.png";
import imgVoluntario from "../../assets/voluntario.png";
import heroBg from "../../assets/dentistas-voluntarios.jpg";

interface ButtonCardItem {
    id: number;
    img: string;
    alt: string;
    label: string;
    href: string;
    externo: boolean;
}

const buttonCards: ButtonCardItem[] = [
    { id: 1, img: imgProjeto, alt: "Projeto", label: "Conheça o nosso projeto", href: "/projeto", externo: false },
    { id: 2, img: imgDoacao, alt: "Faça sua doação", label: "Faça sua doação", href: "https://paybox.doare.org/paybox?payboxId=83fed202-df0f-4665-9c74-688a834028d4", externo: true },
    { id: 3, img: imgVoluntario, alt: "Seja voluntário", label: "Seja um voluntário", href: "https://docs.google.com/forms/d/e/1FAIpQLSfOjEutYfxdiFEgtOQ-j1lnJB7lMWpf41-7ONg27nbtfdSl3A/viewform", externo: true },
];

const listaResumo = [
    "📌 Cadastro seguro e centralizado de pacientes e voluntários.",
    "📌 Histórico completo de atendimentos e documentos.",
    "📌 Comunicação integrada em um só lugar.",
    "📌 Painéis de métricas confiáveis para medir impacto social.",
    "📌 Inteligência Artificial de apoio para triagens iniciais.",
];

function Home() {
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        document.title = "NORA | Network of Resources Aid";
        const timer = setTimeout(() => setCarregando(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (carregando) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-[1.2rem] text-[#0a3d62] font-medium animate-pulse">Carregando...</p>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section
                className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[250px]"
                style={{ background: `url(${heroBg}) center/cover no-repeat` }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.641)]">
                    <div className="relative z-10 max-w-[800px] px-5 text-center mx-auto">
                        <h1 className="text-[2.8rem] font-bold mb-5 mobile:text-[2rem] pt-4">Bem-vindo ao NORA</h1>
                        <p className="text-[1.2rem] leading-[1.6] mobile:text-[1rem]">
                            Transformando vidas com tecnologia e solidariedade. O NORA centraliza informações,
                            conecta pacientes e voluntários e fortalece o impacto da ONG.
                        </p>
                    </div>
                </div>
            </section>

            <main className="w-[90%] mx-auto max-w-[1300px]">

                {/* Seção sobre */}
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] mb-4">Um sistema digital inovador</h2>
                    <p className="text-[1rem] text-[#333] leading-relaxed">
                        O <strong>NORA</strong> nasce da parceria entre a ONG Turma do Bem e a FIAP, unindo tecnologia
                        e propósito social para transformar a vida de adolescentes e mulheres em situação de
                        vulnerabilidade. Nosso objetivo é oferecer um acesso mais eficiente e organizado aos
                        tratamentos odontológicos, ajudando a reduzir barreiras e garantindo que quem precisa
                        receba o cuidado adequado.
                    </p>
                </section>

                {/* Botões */}
                <section className="flex gap-[30px] justify-center my-10 flex-wrap">
                    {buttonCards.map((card) =>
                        card.externo ? (
                            <a
                                key={card.id}
                                href={card.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center no-underline bg-white p-[25px_20px] w-[240px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[8px] hover:bg-gradient-to-br hover:from-[#b6dbf7] hover:to-[#e3f2fd]"
                            >
                                <img src={card.img} alt={card.alt} className="w-[120px] h-[120px] object-contain mb-4" />
                                <span className="text-[1rem] font-semibold text-[#222] text-center">{card.label}</span>
                            </a>
                        ) : (
                            <Link
                                key={card.id}
                                to={card.href}
                                className="flex flex-col items-center no-underline bg-white p-[25px_20px] w-[240px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[8px] hover:bg-gradient-to-br hover:from-[#b6dbf7] hover:to-[#e3f2fd]"
                            >
                                <img src={card.img} alt={card.alt} className="w-[120px] h-[120px] object-contain mb-4" />
                                <span className="text-[1rem] font-semibold text-[#222] text-center">{card.label}</span>
                            </Link>
                        )
                    )}
                </section>
                {/* Resumo */}
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <p className="text-[1rem] text-[#333] mb-4 leading-relaxed">
                        Na Turma do Bem, milhares de jovens entre 11 e 17 anos precisam de atendimento odontológico,
                        mas a ONG enfrenta grandes desafios: perda de informações, falta de métricas e comunicação descentralizada.
                    </p>
                    <ul className="list-none p-0 mb-6">
                        {listaResumo.map((item) => (
                            <li key={item} className="mb-2 font-bold text-[#333]">{item}</li>
                        ))}
                    </ul>
                    <p className="text-[1.5rem] text-[#333] leading-relaxed">
                        <strong>Tudo isso sem abrir mão do mais importante: o{" "}
                            <span className="text-[rgb(226,122,31)]">atendimento humano</span> e{" "}
                            <span className="text-[rgb(226,122,31)]">acolhedor</span>, que é a essência da ONG.
                        </strong>
                    </p>
                </section>
            </main>
        </>
    );
}

export default Home;
