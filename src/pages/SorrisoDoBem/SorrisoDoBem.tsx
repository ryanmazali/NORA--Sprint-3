import { useEffect } from "react";
import heroBg from "../../assets/sorrisodobem-bg.png";
import imgSorriso1 from "../../assets/sorriso-do-bem.jpg";
import imgSorriso2 from "../../assets/sorriso-do-bem-1.jpg";
import { BackButton } from "../../components";

function SorrisoDoBem() {
    useEffect(() => {
        document.title = "Sorriso do Bem | NORA";
    }, []);

    return (
        <>
            <section
                className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[250px]"
                style={{ background: `url(${heroBg}) center/cover no-repeat` }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.641)]">
                    <div className="relative z-10 max-w-[800px] px-5 text-center mx-auto">
                        <h1 className="text-[2.8rem] font-bold mobile:text-[2rem] pt-16">Sorriso do Bem</h1>
                    </div>
                </div>
            </section>
            <main className="w-[90%] mx-auto max-w-[1300px]">
                <BackButton />
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-[1.5rem] font-bold text-[#0a3d62] border-l-[6px] border-[#b0d6f5] pl-3 mb-4">Sorriso do Bem</h2>
                    <p className="text-[1rem] text-[#333] mb-4 leading-relaxed">
                        O <strong>Sorriso do Bem</strong> é o maior evento de saúde bucal e voluntariado do mundo, realizado
                        anualmente pela Turma do Bem desde 2006. O encontro reúne dentistas voluntários, estudantes, parceiros
                        e personalidades para discutir temas de odontologia, cidadania e impacto social.
                    </p>
                    <p className="text-[1rem] text-[#333] mb-4 leading-relaxed">
                        O evento combina <em>palestras, fóruns e debates</em> com uma grande premiação que reconhece dentistas,
                        coordenadores, empresas e imprensa que apoiam a causa. É nesse evento que ocorre também a entrega do
                        prêmio de <em>Melhor Dentista do Mundo</em>.
                    </p>
                    <p className="text-[1rem] text-[#333] mb-6 leading-relaxed">
                        Além do conhecimento, o evento é marcado por celebração: apresentações artísticas, música e uma
                        confraternização que une a maior rede de voluntariado odontológico especializado do planeta.
                    </p>
                    <div className="flex gap-5 mt-5 flex-wrap justify-center">
                        {[imgSorriso1, imgSorriso2].map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Sorriso do Bem ${i + 1}`}
                                className="w-[260px] h-auto shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105 mobile:w-[180px] tablet:w-[220px]"
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default SorrisoDoBem;
