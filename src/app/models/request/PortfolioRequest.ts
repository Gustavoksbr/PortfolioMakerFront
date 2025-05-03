
import {Experiencia, Portfolio} from '../response/Portfolio';
import {Imagem} from '../response/Imagem';
import {Projeto} from '../response/Projeto';

export interface PortfolioRequest {
  username: string;
  nome: string;
  breveDescricao: string;
  descricao: string;
  foto: Imagem | null;
  habilidades: Set<string> | any ;
  projetos : Projeto[];
  experiencias: Experiencia[];
  background: Imagem | null;
  localizacao: string;
  links: { nome: string, url: string }[]

}

export function criarPortfolioRequest(portfolio: Portfolio): PortfolioRequest {
  return {
    username: portfolio.username,
    nome: portfolio.nome,
    breveDescricao: portfolio.breveDescricao,
    descricao: portfolio.descricao ?? "",
    foto: portfolio.foto ?? null,
    habilidades: new Set(portfolio.habilidades),
    projetos: portfolio.projetos,
    experiencias: portfolio.experiencias,
    background: portfolio.background ?? null,
    localizacao: portfolio.localizacao,
    links: portfolio.links,
  };
}
