
import { Experiencia, Portfolio } from '../response/Portfolio';
import { Imagem } from '../response/Imagem';
import { Projeto } from '../response/Projeto';

export interface PortfolioRequest {
  username: string;
  nome: string;
  breveDescricao: string;
  descricao: string;
  foto: Imagem | null;
  habilidades: Set<string> | any;
  projetos: Projeto[];
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
    projetos: portfolio.projetos.map(p => ({ ...p, tecnologias: [...(p.tecnologias || [])] })), // Cópia profunda
    experiencias: portfolio.experiencias,
    background: portfolio.background ?? null,
    localizacao: portfolio.localizacao,
    links: portfolio.links.map(link => ({ ...link })), // Cópia profunda dos links
  };
}

export function isEqual(portfolio: PortfolioRequest, portfolio2: Portfolio): boolean {
  const areSetsEqual = (a: Set<string> | any, b: Set<string> | any): boolean => {
    const arrayA = Array.from(a).sort();
    const arrayB = Array.from(b).sort();
    if (arrayA.length !== arrayB.length) return false;
    return arrayA.every((value, index) => value === arrayB[index]);
  };

  const areLinksEqual = (a: { nome: string; url: string }[], b: { nome: string; url: string }[]): boolean => {
    if (a.length !== b.length) return false;

    return a.every((linkA, index) => {
      const linkB = b[index];
      return linkA.nome === linkB.nome && linkA.url === linkB.url;
    });
  };

  const areProjetosEqual = (a: any[], b: any[]): boolean => {
    if (a.length !== b.length) return false;

    return a.every((projetoA, index) => {
      const projetoB = b[index];
      return projetoA.ordem === projetoB.ordem &&
        projetoA.nome === projetoB.nome &&
        projetoA.descricao === projetoB.descricao &&
        projetoA.linkDoProjeto === projetoB.linkDoProjeto &&
        projetoA.linkDoRepositorio === projetoB.linkDoRepositorio &&
        projetoA.linkYoutube === projetoB.linkYoutube &&
        JSON.stringify(projetoA.tecnologias?.sort()) === JSON.stringify(projetoB.tecnologias?.sort()) &&
        projetoA.imagem === projetoB.imagem;
    });
  };

  const result = portfolio.username === portfolio2.username &&
    portfolio.nome === portfolio2.nome &&
    portfolio.breveDescricao === portfolio2.breveDescricao &&
    portfolio.descricao === portfolio2.descricao &&
    portfolio.foto === portfolio2.foto &&
    areSetsEqual(portfolio.habilidades, portfolio2.habilidades) &&
    areProjetosEqual(portfolio.projetos, portfolio2.projetos) &&
    portfolio.experiencias === portfolio2.experiencias &&
    portfolio.background === portfolio2.background &&
    portfolio.localizacao === portfolio2.localizacao &&
    areLinksEqual(portfolio.links, portfolio2.links);

  return result;
}
