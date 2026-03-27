import { useEffect } from "react";
import heroBg from "../../assets/melhordentista-bg.png";
import img1 from "../../assets/melhor-dentista-1.jpg";
import img2 from "../../assets/melhor-dentista-2.jpg";
import img3 from "../../assets/melhor-dentista-3.jpg";
import { BackButton } from "../../components";

function MelhorDentista() {
    useEffect(() => {
        document.title = "Melhor Dentista do Mundo | NORA";
    }, []);

    return (
        <>
            <section
                className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[250px]"
                style={{ background: `url(${heroBg}) center/cover no-repeat` }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.641)]">
                    <div className="relative z-10 max-w-[800px] px-5 text-center mx-auto">
                        <h1 className="text-[2.8rem] font-bold mobile:text-[2rem]">Melhor Dentista do Mundo</h1>
                    </div>
                </div>
            </section>
            <main className="w-[90%] mx-auto max-w-[1300px]">
                <BackButton />
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <p className="text-[1rem] text-[#333] mb-4 leading-relaxed">
                        Durante o evento anual <strong>Sorriso do Bem</strong>, os dentistas e coordenadores voluntários
                        são avaliados e premiados por seu impacto social. O título de <strong>Melhor Dentista do Mundo</strong>
                        é concedido àquele que, além de atender pacientes, conseguiu transformar sua cidade por meio de
                        parcerias, mudanças em políticas públicas, divulgação do projeto e mobilização comunitária.
                    </p>
                    <p className="text-[1rem] text-[#333] mb-6 leading-relaxed">
                        Esse reconhecimento valoriza os profissionais que vão além do consultório e fazem do voluntariado
                        um instrumento de transformação social e cidadania.
                    </p>
                    <div className="flex gap-5 mt-5 flex-wrap justify-center">
                        {[img1, img2, img3].map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Evento Melhor Dentista do Mundo ${i + 1}`}
                                className="w-[260px] h-auto shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105 mobile:w-[180px] tablet:w-[220px]"
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default MelhorDentista;
