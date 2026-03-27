import { useEffect } from "react";
import { BackButton, FAQItem } from "../../components";
import { faqItems } from "./faqData";
import heroBg from "../../assets/faq-bg.png";

function FAQ() {
  useEffect(() => {
    document.title = "Dúvidas Frequentes | NORA";
  }, []);

  return (
    <>
      <section
        className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[220px]"
        style={{ background: `url(${heroBg}) center/cover no-repeat` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.641)]" />

        <div className="relative z-10 max-w-[800px] px-5">
          <h1 className="text-[2.8rem] font-bold mb-4 mobile:text-[2rem]">
            FAQ
          </h1>

          <p className="text-[1.2rem] leading-relaxed mobile:text-[1rem]">
            Confira as dúvidas mais recorrentes sobre como o NORA facilita a
            comunicação e o gerenciamento de recursos.
          </p>
        </div>
      </section>

      <main className="w-[90%] mx-auto">
        <BackButton />
        <section className="bg-[#f9f9f9] py-[50px] px-5 my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] tablet:px-8 desktop:px-10 desktop:py-[60px]">
          <h2 className="text-[2rem] text-center mb-5 text-[rgb(226,122,31)] mobile:text-[1.6rem] tablet:text-[1.8rem]">
            Dúvidas Frequentes
          </h2>

          <div className="max-w-[900px] mx-auto desktop:max-w-[900px]">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                pergunta={item.pergunta}
                resposta={item.resposta}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default FAQ;
