import { Projeto } from './Projeto';
import { Imagem } from './Imagem';
import { Ordenavel } from '../Ordenavel';

export interface Portfolio {
  id: string;
  username: string;
  email: string; // interno, não vem mais da API - mantido para compatibilidade local
  nome: string;
  breveDescricao: string;
  descricao: string;
  foto: Imagem | null;
  habilidades: Set<string>;
  projetos: Projeto[];
  experiencias: Experiencia[];
  background: Imagem | null;
  localizacao: string;
  links: { nome: string, url: string }[];
  emailPublico: string | null; // email visível publicamente
}


export interface Experiencia extends Ordenavel {
  ordem: number;
  nome: string;
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string | null;
  atual: boolean;
}


// não tem o campo senha
// possui campo publica
