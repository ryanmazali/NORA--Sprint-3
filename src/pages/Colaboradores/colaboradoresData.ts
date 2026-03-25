import fotoDiego from "../../assets/foto-diego.jpg";
import fotoGuilherme from "../../assets/foto-guilherme.jpg";
import fotoRyan from "../../assets/foto-ryan.jpeg";
export interface Colaborador {
    id: string;
    nome: string;
    rm: string;
    turma: string;
    foto: string;
    github: string;
    linkedin: string;
    descricao: string;
}
export const colaboradores: Colaborador[] = [
    {
    id: "diego",
    nome: "Diego Paulino",
    rm: "566841",
    turma: "1TDSPR",
    foto: fotoDiego,
    github: "https://github.com/DiegoCPaulino",
    linkedin: "https://www.linkedin.com/in/diego-paulino-9bb31b36a/",
    descricao:
        "Desenvolvedor focado em back-end e banco de dados, responsável pela arquitetura do sistema NORA.",
    },
    {
    id: "guilherme",
    nome: "Guilherme Dabul",
    rm: "559901",
    turma: "1TDSPR",
    foto: fotoGuilherme,
    github: "https://github.com/guidabuul",
    linkedin: "https://www.linkedin.com/in/guilhermedabul/",
    descricao:
        "Desenvolvedor front-end com foco em experiência do usuário e acessibilidade.",
    },
    {
    id: "ryan",
    nome: "Ryan Mazali",
    rm: "567168",
    turma: "1TDSPR",
    foto: fotoRyan,
    github: "https://github.com/ryanmazali",
    linkedin: "https://linkedin.com/in/ryanmazali/",
    descricao:
        "Desenvolvedor front-end responsável pela migração do projeto para React e Tailwind.",
    },
];
