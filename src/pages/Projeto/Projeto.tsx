import { useEffect } from "react";
import heroBg from "../../assets/bg-projeto.png";
import imgBancoDados from "../../assets/banco-de-dados.png";
import imgComunicacao from "../../assets/comunicacao.png";
import imgDashboard from "../../assets/dashboard-novo.png";
import imgIA from "../../assets/inteligencia-artificial.png";
import imgComunidade from "../../assets/comunidade.png";
import imgHtml from "../../assets/html5.svg";
import imgCss from "../../assets/css3.svg";
import imgJs from "../../assets/js.svg";
import imgDb from "../../assets/database.svg";
import imgDesktop from "../../assets/desktop.svg";
import imgMobile from "../../assets/mobile-screen.svg";
import imgInstagram from "../../assets/instagram.svg";
import imgEmail from "../../assets/email.svg";
import imgFacebook from "../../assets/facebook.svg";
import imgWhatsapp from "../../assets/whatsapp.svg";
import imgAI from "../../assets/ai.svg";

const roadmapItems = [
    { img: imgBancoDados, texto: "Criação do banco de dados relacional e PWA para cadastro inicial." },
    { img: imgComunicacao, texto: "Integração dos canais de comunicação no sistema." },
    { img: imgDashboard, texto: "Implementação de dashboards de métricas." },
    { img: imgIA, texto: "Adição da Inteligência Artificial de apoio às triagens." },
    { img: imgComunidade, texto: "Expansão para triagens em escolas e comunidades em maior escala." },
];

const tecnologias = [
    { texto: "Front-end com HTML5, CSS3 e Javascript.", icons: [{ src: imgHtml, alt: "HTML5" }, { src: imgCss, alt: "CSS3" }, { src: imgJs, alt: "Javascript" }] },
    { texto: "Banco de dados relacional em SQL (MySQL ou PostgreSQL).", icons: [{ src: imgDb, alt: "Banco de dados" }] },
    { texto: "PWA (Progressive Web App), garantindo acesso por celular, tablet ou computador.", icons: [{ src: imgDesktop, alt: "Desktop" }, { src: imgMobile, alt: "Mobile" }] },
    { texto: "Integrações via API para unificação de mensagens.", icons: [{ src: imgInstagram, alt: "Instagram" }, { src: imgEmail, alt: "Email" }, { src: imgFacebook, alt: "Facebook" }, { src: imgWhatsapp, alt: "WhatsApp" }] },
    { texto: "IA para automatizar parte das triagens e apoiar os voluntários.", icons: [{ src: imgAI, alt: "IA" }] },
];

function Projeto() {
    useEffect(() => {
        document.title = "Sobre o Projeto | NORA";
    }, []);

    return (
        <>
            <section
                className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[250px]"
                style={{ background: `url(${heroBg}) center/cover no-repeat` }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.641)]">
                    <div className="relative z-10 max-w-[800px] px-5 text-center mx-auto">
                        <h1 className="text-[2.8rem] font-bold mb-4 mobile:text-[2rem]">O que é o Projeto NORA</h1>
                        <p className="text-[1.1rem] leading-relaxed mobile:text-[1rem]">
                            O <strong>NORA</strong> é um sistema digital desenvolvido por alunos da FIAP em parceria com a <strong>ONG Turma do Bem</strong>,
                            com objetivo de modernizar e centralizar os processos da ONG.
                        </p>
                    </div>
                </div>
            </section>
            <main className="w-[90%] mx-auto max-w-[1300px]">
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">O problema que buscamos resolver</h2>
                    <p className="text-[1rem] text-[#333] mb-4">Apesar do impacto social da ONG Turma do Bem, sua operação ainda enfrenta grandes desafios:</p>
                    <ul className="list-disc pl-6 flex flex-col gap-2">
                        {["Perda de informações e documentos de pacientes e dentistas voluntários.", "Dificuldade em mensurar o impacto real por falta de dados consolidados.", "Comunicação descentralizada entre WhatsApp, Instagram e Facebook.", "Equipe reduzida para atender milhares de jovens em vulnerabilidade."].map((item) => (
                            <li key={item} className="text-[#333] font-medium">{item}</li>
                        ))}
                    </ul>
                </section>
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">Nossa solução</h2>
                    <p className="text-[1rem] text-[#333] mb-4">Para enfrentar esses desafios, o <strong>NORA</strong> foi projetado como um <strong>sistema integrado</strong>, acessível por PWA, que permite:</p>
                    <ul className="list-disc pl-6 flex flex-col gap-2">
                        {["Cadastro centralizado de pacientes e dentistas voluntários.", "Registro de documentos e histórico completo de atendimentos.", "Comunicação organizada em um único canal de entrada.", "Dashboards de métricas confiáveis para tomada de decisão.", "Uso de inteligência artificial de apoio em triagens iniciais."].map((item) => (
                            <li key={item} className="text-[#333] font-medium">{item}</li>
                        ))}
                    </ul>
                </section>
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">Tecnologias utilizadas</h2>
                    <ul className="list-none p-0 flex flex-col gap-5">
                        {tecnologias.map((tec) => (
                            <li key={tec.texto} className="flex flex-col gap-2">
                                <span className="font-medium text-[#333]">{tec.texto}</span>
                                <div className="flex gap-3 flex-wrap">
                                    {tec.icons.map((icon) => (
                                        <img key={icon.alt} src={icon.src} alt={icon.alt} className="w-[35px] h-[35px] object-contain transition-transform duration-300 hover:scale-110" />
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">Roadmap da solução</h2>
                    <div className="grid grid-cols-5 gap-5 mt-5 desktop:grid-cols-5 tablet:grid-cols-1 mobile:grid-cols-1">
                        {roadmapItems.map((item) => (
                            <div key={item.texto} className="bg-white p-5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:bg-[aliceblue]">
                                <img src={item.img} alt="" className="w-[80px] h-[80px] mx-auto mb-3" />
                                <p className="text-[0.95rem] text-[#333] leading-[1.4]">{item.texto}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">Impacto esperado</h2>
                    <p className="text-[1rem] text-[#333] leading-relaxed">
                        Com o <strong>NORA</strong>, a expectativa é reduzir a perda de dados, aumentar a eficiência da equipe da ONG
                        e garantir que mais jovens tenham acesso ao atendimento odontológico. Além disso, o sistema fornecerá métricas
                        precisas que permitirão mensurar o impacto social com transparência e orientar estratégias de expansão.
                    </p>
                </section>
            </main>
        </>
    );
}

export default Projeto;
