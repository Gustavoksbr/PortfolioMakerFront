import {
  Component,
  Input,
 Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import {ProjetoComponent} from '../projeto/projeto.component';
import {Projeto} from '../../../models/response/Projeto';
import {FormsModule} from '@angular/forms';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {languages, langUrl} from '../../../models/others/languages';
import {BotaoLadoComponent} from '../botao-lado/botao-lado.component';

@Component({
  standalone: true,
  selector: 'app-listar-projetos',
  imports: [CommonModule, DragDropModule, ProjetoComponent, FormsModule, AutocompleteComponent, BotaoLadoComponent],
  templateUrl: './listar-projetos-component.html',
  styleUrl: './listar-projetos.component.scss'
})
export class ListarProjetosComponent {
  // --- Inputs e Outputs ---
  @Input() listaEmQuestao: Projeto[] = [];
  @Input() editando: boolean = false;
  @Output() retornar = new EventEmitter<Projeto[]>();

  // --- Estados internos ---
  projetos: Projeto[] = [];

  // Índice do projeto em exclusão aguardando confirmação */
  confirmarIndex: number | null = null;

  // --- Lifecycle Hooks ---
  ngOnChanges(): void {
    if (!this.listaEmQuestao) return;

    // Clona os projetos e os ordena pela propriedade "ordem"
    this.projetos = this.listaEmQuestao
      .map(p => ({ ...p }))
      .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));

    this.atualizarOrdem();
  }

  // --- Métodos de manipulação de ordem ---

  // Move um projeto para a esquerda ou direita

  moverProjeto(indice: number, direcao: 'esquerda' | 'direita'): void {
    const lista = [...this.projetos];
    const alvoIndex = this.calcularNovoIndice(indice, direcao);

    if (alvoIndex < 0 || alvoIndex >= lista.length) return;

    // Troca os itens de posição
    [lista[indice], lista[alvoIndex]] = [lista[alvoIndex], lista[indice]];

    this.projetos = lista;
    this.atualizarLista();
  }


  //Calcula o novo índice de um projeto com base na direção

  private calcularNovoIndice(indice: number, direcao: 'esquerda' | 'direita'): number {
    const itensPorLinha = 3;
    const total = this.projetos.length;

    const linha = Math.floor(indice / itensPorLinha);
    const posNaLinha = indice % itensPorLinha;

    if (direcao === 'esquerda') {
      if (posNaLinha > 0) return indice - 1;
      const novo = (linha - 1) * itensPorLinha + (itensPorLinha - 1); // último da linha anterior
      return novo >= 0 && novo < total ? novo : -1;
    }

    if (posNaLinha < itensPorLinha - 1 && indice + 1 < total) return indice + 1;
    const novo = (linha + 1) * itensPorLinha; // primeiro da próxima linha
    return novo >= 0 && novo < total ? novo : -1;
  }

  // --- Métodos de edição ---

  atualizarCampo(indice: number, campo: keyof Projeto, valor: string): void {
    const projeto = this.projetos[indice];
    if (!projeto) return;

    (projeto[campo] as unknown as string) = valor;
    this.atualizarLista();
  }

  alterarHabilidades({ indice, inicial, atual }: { indice: number; inicial: string; atual: string }): void {
    const projeto = this.projetos[indice];
    if (!projeto) {
      console.warn("Projeto não encontrado");
      return;
    }

    if (atual !== inicial) {
      if (inicial) {
        const index = projeto.tecnologias.indexOf(inicial);
        if (index > -1) projeto.tecnologias.splice(index, 1);
      }
      if (atual) projeto.tecnologias.push(atual);

      this.atualizarLista();
    }
  }

  deleteHabilidade(indice: number, habilidade: string): void {
    const projeto = this.projetos[indice];
    if (!projeto) return;

    const index = projeto.tecnologias.indexOf(habilidade);
    if (index > -1) projeto.tecnologias.splice(index, 1);

    this.atualizarLista();
  }

  // --- Métodos de criação e exclusão ---

  addProjetoNovo(): void {
    const novoProjeto: Projeto = {
      nome: '',
      descricao: '',
      tecnologias: [],
      imagem: null,
      ordem: this.projetos.length,
      linkDoProjeto: '',
      linkDoRepositorio: '',
      linkYoutube: '',
    };

    this.projetos.push(novoProjeto);
    this.atualizarLista();
  }

  /**
   * Mostra a confirmação de exclusão para um projeto
   */
  mostrarConfirmacao(index: number): void {
    this.confirmarIndex = index;
  }


  cancelarConfirmacao(): void {
    this.confirmarIndex = null;
  }

  confirmarExclusao(index: number): void {
    this.projetos.splice(index, 1);
    this.atualizarLista();
    this.confirmarIndex = null;
  }

  // --- Métodos auxiliares ---

   // Atualiza a ordem dos projetos e emite a lista para o componente pai

  private atualizarLista(): void {
    this.atualizarOrdem();
    this.retornar.emit(this.projetos.map(p => ({ ...p })));
  }


   // Reatribui o índice (ordem) dos projetos

  private atualizarOrdem(): void {
    this.projetos.forEach((p, i) => p.ordem = i);
  }

  // --- Constantes auxiliares ---
  protected readonly languages = languages;
  protected readonly langUrl = langUrl;
}
