export interface FAQItemType {   id: number;   pergunta: string;   resposta: string; 
}  

export const faqItems: FAQItemType[] = [   
	{ id: 1, pergunta: "O que é o NORA?", resposta: "O NORA é um sistema digital desenvolvido por alunos da FIAP em parceria com a ONG Turma do Bem, centralizando processos, conectando dentistas voluntários e facilitando a gestão dos atendimentos odontológicos." },   
	{ id: 2, pergunta: "Quem pode acessar a plataforma?", resposta: "Somente dentistas voluntários e administradores/atendentes têm acesso ao NORA. Pacientes não acessam diretamente, mas se beneficiam da pré-triagem automatizada e do atendimento humanizado." },   
	{ id: 3, pergunta: "O que os dentistas podem fazer?", resposta: "Os dentistas acessam seus pacientes, visualizam exames e histórico de atendimentos, registram procedimentos e acompanham métricas de suas atividades." },   
	{ id: 4, pergunta: "O que os administradores/atendentes podem fazer?", resposta: "Administradores e atendentes podem cadastrar pacientes, registrar documentos, acessar o banco de dados, enviar mensagens via Omnichannel e acompanhar dashboards e métricas da ONG." },   
	{ id: 5, pergunta: "Como funciona o Omnichannel?", resposta: "O Omnichannel permite centralizar todas as conversas com pacientes em um único canal, integrando WhatsApp, Instagram e Facebook." },   
	{ id: 6, pergunta: "Como os pacientes se beneficiam?", resposta: "Embora não acessem a plataforma, os pacientes têm atendimento mais rápido e humanizado, com pré-triagem automatizada por IA, que organiza prioridades e agiliza atendimentos." },   
	{ id: 7, pergunta: "A plataforma funciona em celular e tablet?", resposta: "Sim! O NORA é um PWA (Progressive Web App), permitindo acesso por computador, celular ou tablet sem instalação." },   
	{ id: 8, pergunta: "Como a privacidade e segurança são garantidas?", resposta: "Todos os dados são protegidos com criptografia e acesso restrito por perfil. Dentistas só veem seus pacientes e administradores têm acesso aos registros necessários para gestão." },   
	{ id: 9, pergunta: "Como posso acompanhar o impacto do meu trabalho?", resposta: "A plataforma oferece dashboards e métricas detalhadas, permitindo que dentistas e administradores acompanhem o impacto social dos atendimentos realizados." }, ];