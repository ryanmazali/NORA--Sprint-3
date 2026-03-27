import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import heroBg from "../../assets/contato.png";
import { BackButton } from "../../components";

interface ContatoFormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

function Contato() {
  useEffect(() => {
    document.title = "Contato | NORA";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContatoFormData>();

  const onSubmit = (data: ContatoFormData) => {
    alert("Formulário enviado com sucesso!");
    console.log("Dados enviados:", data);
    reset();
  };

  return (
    <>
      <section
        className="h-[300px] flex items-center justify-center text-center text-white relative overflow-hidden mobile:h-[220px]"
        style={{ background: `url(${heroBg}) center/cover no-repeat` }}
      >
        <div className="absolute inset-0 bg-[rgba(16,19,24,0.625)]" />

        <div className="relative z-10 max-w-[800px] px-5">
          <h1 className="text-[2.8rem] font-bold mb-4 mobile:text-[2rem]">
            Conectando com a Turma do Bem
          </h1>

          <p className="text-[1.2rem] leading-relaxed mobile:text-[1rem]">
            Seja para dúvidas, sugestões ou apoio, a Turma do Bem está pronta para ouvir.
          </p>
        </div>
      </section>

      <main className="w-[90%] mx-auto max-w-[1300px]">
        <BackButton />
        <section className="bg-[#f9f9f9] p-8 my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-center">
          <h2 className="text-[2rem] font-bold text-[#222] mb-5">Contato</h2>

          <p className="text-[1rem] text-[#333] mb-8">
            Quer saber mais sobre a Turma do Bem? Aqui estão os canais de contato oficiais:
          </p>

          {/* Linha 1 — 3 itens */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {[
              { icon: <MapPin size={28} />, titulo: "Endereço", texto: "Rua Maurício Francisco Klabin, 449 – Vila Mariana, São Paulo – SP" },
              { icon: <Phone size={28} />, titulo: "Telefone", texto: "+55 11 5084-7276" },
              { icon: <Mail size={28} />, titulo: "Presidente", texto: "turmadobem@tdb.org.br", href: "mailto:turmadobem@tdb.org.br" },
            ].map((item) => (
              <div key={item.titulo} className="flex flex-col items-center w-[200px]">
                <div className="mb-2 text-[#0a3d62]">{item.icon}</div>
                <h3 className="text-[1.1rem] font-semibold text-[#222] mb-2">{item.titulo}</h3>
                {item.href
                  ? <a href={item.href} className="text-[#222] no-underline transition-colors duration-300 hover:text-[rgb(226,122,31)] hover:underline text-center">{item.texto}</a>
                  : <p className="text-[#333] text-center">{item.texto}</p>
                }
              </div>
            ))}
          </div>

          {/* Linha 2 — 2 itens centralizados */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { icon: <Mail size={28} />, titulo: "Comunicação", texto: "comunicacao@tdb.org.br", href: "mailto:comunicacao@tdb.org.br" },
              { icon: <Mail size={28} />, titulo: "Dúvidas, críticas ou sugestões", texto: "faleconosco@tdb.org.br", href: "mailto:faleconosco@tdb.org.br" },
            ].map((item) => (
              <div key={item.titulo} className="flex flex-col items-center w-[200px]">
                <div className="mb-2 text-[#0a3d62]">{item.icon}</div>
                <h3 className="text-[1.1rem] font-semibold text-[#222] mb-2">{item.titulo}</h3>
                <a href={item.href} className="text-[#222] no-underline transition-colors duration-300 hover:text-[rgb(226,122,31)] hover:underline text-center">{item.texto}</a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f9f9f9] p-8 my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-center">
          <h3 className="text-[1.5rem] font-semibold text-[#222] mb-5">
            Redes Sociais
          </h3>

          <div className="flex justify-center gap-5 flex-wrap">
            <a
              href="https://facebook.com/turmadobem"
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-300 hover:scale-[1.2] text-[#1877f2]"
            >
              <FaFacebook size={36} />
            </a>

            <a
              href="https://instagram.com/turmadobem"
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-300 hover:scale-[1.2] text-[#e1306c]"
            >
              <FaInstagram size={36} />
            </a>

            <a
              href="https://twitter.com/turmadobem"
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-300 hover:scale-[1.2] text-[#1da1f2]"
            >
              <FaTwitter size={36} />
            </a>
          </div>
        </section>

        <section className="bg-[#f9f9f9] p-8 my-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-[2rem] font-bold text-[#222] mb-6 text-center">
            Fale com o NORA
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[700px] mx-auto flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#222]">Nome</label>

              <input
                {...register("nome", { required: "Nome é obrigatório" })}
                className="border border-[#ddd] px-4 py-3 text-[1rem] outline-none focus:border-[#0a3d62] transition-colors"
                placeholder="Seu nome"
              />

              {errors.nome && (
                <span className="text-red-500 text-[0.85rem]">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#222]">E-mail</label>

              <input
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "E-mail inválido"
                  }
                })}
                className="border border-[#ddd] px-4 py-3 text-[1rem] outline-none focus:border-[#0a3d62] transition-colors"
                placeholder="seu@email.com"
              />

              {errors.email && (
                <span className="text-red-500 text-[0.85rem]">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#222]">Assunto</label>

              <input
                {...register("assunto", { required: "Assunto é obrigatório" })}
                className="border border-[#ddd] px-4 py-3 text-[1rem] outline-none focus:border-[#0a3d62] transition-colors"
                placeholder="Assunto da mensagem"
              />

              {errors.assunto && (
                <span className="text-red-500 text-[0.85rem]">
                  {errors.assunto.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#222]">Mensagem</label>

              <textarea
                {...register("mensagem", { required: "Mensagem é obrigatória" })}
                rows={5}
                className="border border-[#ddd] px-4 py-3 text-[1rem] outline-none focus:border-[#0a3d62] transition-colors resize-none"
                placeholder="Escreva sua mensagem..."
              />

              {errors.mensagem && (
                <span className="text-red-500 text-[0.85rem]">
                  {errors.mensagem.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#0a3d62] text-white py-4 text-[1rem] font-semibold cursor-pointer transition-colors duration-300 hover:bg-[rgb(226,122,31)]"
            >
              Enviar mensagem
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Contato;