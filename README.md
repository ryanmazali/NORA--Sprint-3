# NORA – Network of Resources Aid

![NORA Logo](./src/assets/nora-1.png)

> Projeto acadêmico desenvolvido na FIAP em parceria com a ONG Turma do Bem, com o objetivo de modernizar e centralizar os processos da ONG por meio de uma plataforma digital moderna.

---

## 📋 Descrição do Projeto

O **NORA (Network of Resources Aid)** é um sistema digital que centraliza informações, conecta pacientes e dentistas voluntários e fortalece o impacto da ONG Turma do Bem. A plataforma foi desenvolvida como uma SPA (Single Page Application) utilizando React, permitindo navegação fluida e experiência moderna ao usuário.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | Biblioteca para construção de interfaces |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build tool e servidor de desenvolvimento |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Tipagem estática para JavaScript |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Framework de estilização utilitária |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | Navegação entre páginas (SPA) |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white) | Gerenciamento e validação de formulários |

---

## 📁 Estrutura de Pastas
```
src/
├── assets/                          # Imagens, ícones e mídias
├── components/
│   ├── BackButton/                  # Botão de voltar reutilizável
│   ├── FAQItem/                     # Item do accordion de FAQ
│   ├── Footer/                      # Rodapé da aplicação
│   ├── Layouts/
│   │   └── MainLayout/              # Layout principal com Navbar e Footer
│   ├── Navbar/                      # Barra de navegação responsiva
│   ├── Plataforma/
│   │   ├── PlataformaLayout/        # Layout da plataforma interna
│   │   ├── Sidebar/                 # Menu lateral responsivo com NavLinks
│   │   └── TopBar/                  # Barra superior com hambúrguer (mobile)
│   ├── TeamCard/                    # Card de integrante da equipe
│   └── index.ts                     # Exportações centralizadas
├── data/
│   ├── dashboardData.ts             # KPIs, casos recentes e atividade da IA
│   ├── dentistasData.ts             # Dentistas voluntários e especialidades
│   ├── encaminhamentosData.ts       # Encaminhamentos e histórico de follow-ups
│   ├── metricasData.ts              # Indicadores e dados para gráficos
│   ├── omnichannelData.ts           # Conversas, mensagens e dados do chat
│   └── pacientesData.ts             # Pacientes, triagens e análise da IA
├── pages/
│   ├── Colaboradores/               # Página do time + detalhe individual
│   ├── Contato/                     # Página de contato com formulário
│   ├── FAQ/                         # Dúvidas frequentes
│   ├── Home/                        # Página inicial
│   ├── Login/                       # Tela de autenticação JWT
│   ├── MelhorDentista/              # Programa Melhor Dentista do Mundo
│   ├── Megatriagens/                # Programa Megatriagens
│   ├── Plataforma/
│   │   ├── Dashboard/               # Painel principal com KPIs e atividade da IA
│   │   ├── Dentistas/
│   │   │   ├── Dentistas.tsx        # Listagem com filtros e disponibilidade
│   │   │   └── DentistaDetalhe.tsx  # Detalhe com capacidade e encaminhamentos
│   │   ├── Encaminhamentos/
│   │   │   ├── Encaminhamentos.tsx        # Listagem com match automático e prioridade
│   │   │   └── EncaminhamentoDetalhe.tsx  # Detalhe com timeline de follow-ups
│   │   ├── Metricas/                # Indicadores, gráficos e impacto da ONG
│   │   ├── Omnichannel/
│   │   │   ├── Omnichannel.tsx        # Lista de conversas em duas camadas
│   │   │   └── OmnichannelDetalhe.tsx # Chat com painel lateral de análise da IA
│   │   └── Pacientes/
│   │       ├── Pacientes.tsx        # Listagem com busca e filtros
│   │       └── PacienteDetalhe.tsx  # Detalhe com triagens e análise da IA
│   ├── Projeto/                     # Sobre o Projeto NORA
│   ├── SobreOng/                    # Sobre a ONG Turma do Bem
│   └── SorrisoDoBem/                # Programa Sorriso do Bem
├── styles/
│   ├── global.css                   # Estilos globais e importação do Tailwind
│   └── variables.css                # Variáveis CSS e breakpoints customizados
├── App.tsx                          # Configuração das rotas (institucional + plataforma)
└── main.tsx                         # Ponto de entrada da aplicação
```

---

## ⚙️ Como Executar Localmente

**Pré-requisitos:** Node.js instalado na máquina.
```bash
# 1. Clone o repositório
git clone https://github.com/ryanmazali/NORA--Sprint-3.git

# 2. Acesse a pasta do projeto
cd NORA--Sprint-3

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse no navegador
http://localhost:5173
```

---

## 🔗 Links

- 🔗 **Repositório GitHub:** [https://github.com/ryanmazali/NORA--Sprint-3](https://github.com/ryanmazali/NORA--Sprint-3)
- 📹 **Vídeo de apresentação:** [https://youtu.be/zCdwB-BRVhg](https://youtu.be/zCdwB-BRVhg)

---

## 👥 Integrantes do Grupo

<table>
  <tr>
    <td align="center">
      <img src="./src/assets/foto-diego.jpg" width="120px" style="border-radius: 50%" alt="Diego Paulino"/><br/>
      <strong>Diego Paulino</strong><br/>
      RM: 566841 | Turma: 1TDSPR<br/>
      <a href="https://github.com/DiegoCPaulino">
        <img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white"/>
      </a>
      <a href="https://www.linkedin.com/in/diego-paulino-9bb31b36a/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white"/>
      </a>
    </td>
    <td align="center">
      <img src="./src/assets/foto-guilherme.jpg" width="120px" style="border-radius: 50%" alt="Guilherme Dabul"/><br/>
      <strong>Guilherme Dabul</strong><br/>
      RM: 559901 | Turma: 1TDSPR<br/>
      <a href="https://github.com/guidabuul">
        <img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white"/>
      </a>
      <a href="https://www.linkedin.com/in/guilhermedabul/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white"/>
      </a>
    </td>
    <td align="center">
      <img src="./src/assets/foto-ryan.jpeg" width="120px" style="border-radius: 50%" alt="Ryan Mazali"/><br/>
      <strong>Ryan Mazali</strong><br/>
      RM: 567168 | Turma: 1TDSPR<br/>
      <a href="https://github.com/ryanmazali">
        <img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white"/>
      </a>
      <a href="https://linkedin.com/in/ryanmazali/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white"/>
      </a>
    </td>
  </tr>
</table>

---

<p align="center">
  Desenvolvido com 💙 por Ryan Mazali, Diego Paulino e Guilherme Dabul — FIAP 2025
</p>
