import { Portfolio } from '../models/response/Portfolio';

export const gustavoksbr: Portfolio = {
  id: "680ec87e2318bf0a21be9d4f",
  username: "gustavoksbr",
  email: "gustavosalesi@hotmail.com",
  nome: "Gustavo Kenzo Salesi",
  breveDescricao: "Desenvolvedor de software",
  descricao: "Formado em análise e desenvolvimento de sistemas na FATEC de Presidente Prudente",

  habilidades: new Set<string>([
    "java",
    "spring",
    "javascript",
    "typescript",
    "angular",
    "docker",
    "jest",
    "cypress",
    "cs",
    "dotnet",
    "python",
    "php",
    "laravel",
    "postgres",
    "mysql",
    "mongodb",
    "python",
    "react",
    "vue"


  ]),
  projetos: [
    {
      ordem: 0,
      nome: "PortfolioMaker",
      descricao: "Site para criacao, alteração de portfólios on-line e exportação para pdf\n\n",
      linkDoProjeto: "https://gustavoksbr-portfolio-maker.vercel.app/",
      linkDoRepositorio: 'https://github.com/Gustavoksbr/PortfolioMakerBack',
      linkYoutube: "",
      imagem: null,
      tecnologias: [
        "spring",
        "angular",
        "java",
        "typescript",
        "bootstrap"
      ]
    },
    {
      ordem: 1,
      nome: "RoomMaker",
      descricao: "Site para criacao de salas on-line\n\nUtiliza de Websockets para comunicação em tempo real\n\nCada sala pode tem um bate-papo ao vivo, e o dono pode configurá-la com limite de participantes, senha e categoria (com jogos multiplayer)",
      linkDoProjeto: "https://room-maker-front.vercel.app",
      linkDoRepositorio: 'https://github.com/Gustavoksbr/RoomMakerBack',
      linkYoutube: '',
      imagem: null,
      tecnologias: [
        "spring",
        "angular",
        "java",
        "typescript",
        "bootstrap"
      ]
    },
    {
      ordem: 2,
      nome: "ApiComparator",
      descricao: "Site que compara três tipos de API (REST, GRAPHQL e SOAP) fazendo um CRUD + procura com filtros de cursos",
      linkDoProjeto: "https://api-comparator.vercel.app/",
      linkDoRepositorio: "https://github.com/Gustavoksbr/api-comparator",
      linkYoutube: "",
      imagem: null,
      tecnologias: [
        "spring",
        "angular",
        "java",
        "typescript",
        "jest",
        "cypress"
      ]
    }

  ],
  experiencias: [],
  background: null,
  localizacao: "Presidente Prudente",
  emailPublico: "gustavosalesi@hotmail.com",
  links: [
    {
      nome: "linkedin",
      url: "https://www.linkedin.com/in/gustavosalesi"
    },
    {
      nome: "github",
      url: "https://github.com/Gustavoksbr"
    },
    {
      nome: "instagram",
      url: "https://www.instagram.com/gustavosalesi/"
    }
  ],
  foto: {
    id: "f0e2a6ba-0040-43e5-9671-97df6fe05d02",
    name: "gustavoksbr.jpeg",
    url: "/gustavoksbr/gustavoksbr.jpeg"
  }
};
