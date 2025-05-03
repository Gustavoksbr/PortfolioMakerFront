import {Imagem} from './Imagem';
import {Ordenavel} from '../Ordenavel';

export interface Projeto extends Ordenavel{
  ordem: number;
  nome: string;
  descricao: string;
  linkDoProjeto: string;
  linkDoRepositorio: string;
  linkYoutube: string;
  imagem: Imagem | null;
  tecnologias: string[] ;
}
