import { useEffect } from "react";
import heroBg from "../../assets/dentistas-voluntarios.jpg";
import imgBanner from "../../assets/dentistas-voluntarios.jpg";
import { BackButton } from "../../components";

function Megatriagens() {
    useEffect(() => {
        document.title = "Megatriagens | NORA";
    }, []);

    return (
        <>
            <section
                className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[250px]"
                style={{ background: `url(${heroBg}) center/cover no-repeat` }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.641)]">
                    <div className="relative z-10 max-w-[800px] px-5 text-center mx-auto">
                        <h1 className="text-[2.8rem] font-bold mobile:text-[2rem] pt-16">Megatriagens</h1>
                    </div>
                </div>
            </section>
            <main className="w-[90%] mx-auto max-w-[1300px]">
                <BackButton />
                <section className="bg-white p-[30px] my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <p className="text-[1rem] text-[#333] mb-4 leading-relaxed">
                        As Megatriagens são eventos em grande escala promovidos pela Turma do Bem, onde milhares de jovens
                        em situação de vulnerabilidade passam por triagens odontológicas em estádios e ginásios de todo o Brasil.
                    </p>
                    <p className="text-[1rem] text-[#333] mb-4 leading-relaxed">
                        Em um único dia, centenas de dentistas voluntários se mobilizam para realizar atendimentos iniciais
                        e identificar jovens que poderão receber acompanhamento odontológico completo.
                    </p>
                    <p className="text-[1rem] text-[#333] mb-6 leading-relaxed">
                        Até hoje, mais de <strong>1 milhão de crianças e adolescentes</strong> já foram impactados por
                        essas iniciativas, reforçando o compromisso da ONG em democratizar o acesso à saúde bucal.
                    </p>
                    <div className="mt-6 text-center">
                        <img src={imgBanner} alt="Dentistas voluntários nas Megatriagens" className="max-w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.15)] mx-auto" />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Megatriagens;
