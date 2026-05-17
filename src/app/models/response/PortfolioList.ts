import { Imagem } from './Imagem';

/**
 * DTO simplificado para listagem de portfólios.
 * Contém apenas informações essenciais para exibição em cards/lista.
 */
export interface PortfolioList {
    username: string;
    nome: string;
    breveDescricao: string;
    foto: Imagem | null;
    habilidades: Set<string>;
    localizacao: string;
}
