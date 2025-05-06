import {
  Component,
  Input,
  ViewChild,
  signal,
  effect, Output, EventEmitter, ElementRef, ViewChildren, QueryList, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import {Ordenavel} from '../../../models/Ordenavel';
import {ProjetoComponent} from '../projeto/projeto.component';
import {Projeto} from '../../../models/response/Projeto';
import {FormsModule} from '@angular/forms';
import VanillaTilt from 'vanilla-tilt';
import {Router} from '@angular/router';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {languages, langUrl} from '../../../models/others/languages';
import {SelecionarImagemComponent} from '../selecionar-imagem/selecionar-imagem.component';
import {BotaoLadoComponent} from '../botao-lado/botao-lado.component';

@Component({
  standalone: true,
  selector: 'app-listar-ordenaveis',
  imports: [CommonModule, DragDropModule, ProjetoComponent, FormsModule, AutocompleteComponent, BotaoLadoComponent],
  templateUrl: './listar-ordenaveis.component.html',
  styleUrl: './listar-ordenaveis.component.scss'
})
export class ListarOrdenaveisComponent {
  @Input() listaEmQuestao: Projeto[] = [];
  @Input() editando: boolean = false;
  @Output() retornar = new EventEmitter<Projeto[]>();

  projetos: Projeto[] = [];

  ngOnChanges() {
    if (this.listaEmQuestao) {
      this.projetos = this.listaEmQuestao.map(p => ({ ...p })).sort((a, b) => a.ordem - b.ordem);
    }
  }

  moverProjeto(indice: number, direcao: 'esquerda' | 'direita') {
    const lista = [...this.projetos];
    const alvoIndex = this.calcularNovoIndice(indice, direcao);

    if (alvoIndex < 0 || alvoIndex >= lista.length) return;

    // Troca os itens
    [lista[indice], lista[alvoIndex]] = [lista[alvoIndex], lista[indice]];

    // Atualiza as ordens
    lista.forEach((projeto, index) => projeto.ordem = index);

    this.projetos = lista.sort((a, b) => a.ordem - b.ordem);
    this.retornar.emit(this.projetos);
  }

  calcularNovoIndice(indice: number, direcao: 'esquerda' | 'direita'): number {
    const itensPorLinha = 3;
    const total = this.projetos.length;

    const linha = Math.floor(indice / itensPorLinha);
    const posNaLinha = indice % itensPorLinha;

    if (direcao === 'esquerda') {
      if (posNaLinha > 0) return indice - 1;
      const novo = (linha - 1) * itensPorLinha + 2;
      return novo >= 0 ? novo : -1;
    } else {
      if (posNaLinha < itensPorLinha - 1 && indice + 1 < total) return indice + 1;
      const novo = (linha + 1) * itensPorLinha;
      return novo < total ? novo : -1;
    }
  }

  atualizarCampo(indice: number, campo: keyof Projeto, valor: string) {
    (this.projetos[indice][campo] as  string) = valor;
    this.retornar.emit(this.projetos);
  }

  public alterarHabilidades({
                              indice,
                              inicial,
                              atual,
                            }: {
    indice: number;
    inicial: string;
    atual: string;
  }) {
    const projeto = this.projetos.find(p => p.ordem == indice);
    if (!projeto) {
      console.log("Projeto não encontrado");
      return;
    }
    if(atual!=  inicial){
      if(inicial != ''){
        const index = projeto.tecnologias.indexOf(inicial);
        if (index > -1) {
          projeto.tecnologias.splice(index, 1);
        }
      }
      if(atual != '') {
        projeto.tecnologias.push(atual);
      }
    }

  }
  public deleteHabilidade(indice: number, habilidade: string){
    // console.log("chegou acola")
    const projeto = this.projetos.find(p => p.ordem == indice);
    if (!projeto) return;

    const index = projeto.tecnologias.indexOf(habilidade);
    if (index > -1) {
      // console.log("chegou aqui")
      projeto.tecnologias.splice(index, 1);
    }
    this.retornar.emit(this.projetos);
  }

  public addProjetoNovo(){
    const novoProjeto: Projeto = {
      nome: '',
      descricao: '',
      tecnologias: [],
      imagem: null,
      ordem: this.projetos.length+1,
      linkDoProjeto: '',
      linkDoRepositorio: '',
      linkYoutube: '',
    };
    this.projetos.push(novoProjeto);
    this.retornar.emit(this.projetos);
  }

  public confirmarIndex: number | null = null;

  public mostrarConfirmacao(index: number) {
    this.confirmarIndex = index;
  }

  public cancelarConfirmacao() {
    this.confirmarIndex = null;
  }

  public confirmarExclusao(index: number) {
    this.projetos.splice(index, 1);
    this.retornar.emit(this.projetos);
    this.confirmarIndex = null;
  }


  protected readonly languages = languages;
  protected readonly langUrl = langUrl;
}
