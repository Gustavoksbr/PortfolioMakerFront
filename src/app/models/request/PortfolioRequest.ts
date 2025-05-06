
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

export function isEqual(portfolio: PortfolioRequest, portfolio2: Portfolio): boolean {
  const areSetsEqual = (a: Set<string> | any, b: Set<string> | any): boolean => {
    const arrayA = Array.from(a).sort();
    const arrayB = Array.from(b).sort();
    if (arrayA.length !== arrayB.length) return false;
    return arrayA.every((value, index) => value === arrayB[index]);
  };

  return portfolio.username === portfolio2.username &&
    portfolio.nome === portfolio2.nome &&
    portfolio.breveDescricao === portfolio2.breveDescricao &&
    portfolio.descricao === portfolio2.descricao &&
    portfolio.foto === portfolio2.foto &&
    areSetsEqual(portfolio.habilidades, portfolio2.habilidades) &&
    portfolio.projetos === portfolio2.projetos &&
    portfolio.experiencias === portfolio2.experiencias &&
    portfolio.background === portfolio2.background &&
    portfolio.localizacao === portfolio2.localizacao &&
    portfolio.links === portfolio2.links;
}
