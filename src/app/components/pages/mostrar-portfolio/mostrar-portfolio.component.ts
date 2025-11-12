import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

import { Portfolio } from '../../../models/response/Portfolio';
import { Projeto } from '../../../models/response/Projeto';
import { Imagem } from '../../../models/response/Imagem';

import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { AuthService } from '../../../services/autenticacao/auth.service';

import { criarPortfolioRequest, isEqual, PortfolioRequest } from '../../../models/request/PortfolioRequest';
import { languages, langUrl, links } from '../../../models/others/languages';

import { ToastrService } from 'ngx-toastr';

// Shared Components
import { HeaderComponent } from '../../shared/header/header.component';
import { AutocompleteComponent } from '../../shared/autocomplete/autocomplete.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SelecionarImagemComponent } from '../../shared/selecionar-imagem/selecionar-imagem.component';
import {ListarProjetosComponent} from '../../shared/listar-projetos/listar-projetos.component';
import { LinksAutocompleteComponent } from '../../shared/links-autocomplete/links-autocomplete.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-mostrar-portfolio',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    FormsModule,
    AutocompleteComponent,
    ModalComponent,
    SelecionarImagemComponent,
    ListarProjetosComponent,
    LinksAutocompleteComponent,
    FooterComponent,
  ],
  templateUrl: './mostrar-portfolio.component.html',
  styleUrl: './mostrar-portfolio.component.scss'
})
export class MostrarPortfolioComponent implements OnInit {

  /** ==============================
   *        MODELOS PRINCIPAIS
   *  ============================== */
  private criarPortfolioVazio(): Portfolio {
    return {
      id: '',
      username: '',
      email: '',
      descricao: '',
      foto: null,
      habilidades: new Set<string>(),
      projetos: [],
      nome: '',
      breveDescricao: '',
      experiencias: [],
      background: null,
      localizacao: '',
      links: []
    };
  }
  public portfolio: Portfolio = this.criarPortfolioVazio();
  public portfolioProprio: Portfolio = this.criarPortfolioVazio();
  public portfolioNovo: PortfolioRequest = criarPortfolioRequest(this.criarPortfolioVazio());


  /** ==============================
   *        ESTADO DA UI
   *  ============================== */
  public editando = false;
  public carregando = true;
  public carregandoSalvamento = false;

  public modal = this.criarModalVazio();
  public mostrarTooltip = false;

  public username = '';

  public erroDeRequisicao: string[] = [];
  public projetosOrdenados: Projeto[] = [];

  /** ==============================
   *        INPUTS / BINDINGS
   *  ============================== */
  @Input() criarPortfolioPrimeiraVez = false;

  /** ==============================
   *        CONSTANTES
   *  ============================== */
  protected readonly langUrl = langUrl;
  protected readonly languages = languages;
  protected readonly links = links;

  /** ==============================
   *        GETTERS
   *  ============================== */
  public get podeSalvarSemErroDeRequisicao(): boolean {
    return !!this.portfolioNovo.username &&
      !!this.portfolioNovo.nome &&
      this.portfolioNovo.projetos.every(p => p.nome.trim() !== '');
  }

  /** ==============================
   *        CONSTRUTOR
   *  ============================== */
  constructor(
    private service: PortfolioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Define o e-mail do portfólio próprio com base no auth
    this.portfolioProprio.email = this.authService.getStorage('email') ?? '';
  }

  /** ==============================
   *        CICLO DE VIDA
   *  ============================== */
  ngOnInit(): void {
    this.carregando = true;

    if (this.criarPortfolioPrimeiraVez) {
      this.inicializarCriacaoPortfolio();
    } else {
      this.carregarPortfolioExistente();
    }
  }

  /** ==============================
   *        MÉTODOS DE INICIALIZAÇÃO
   *  ============================== */
  private inicializarCriacaoPortfolio(): void {
    this.carregando = false;
    this.portfolio = { ...this.portfolioProprio };
    this.portfolioNovo = criarPortfolioRequest(this.portfolioProprio);
    this.editando = true;
  }

  private carregarPortfolioExistente(): void {
    this.route.paramMap.subscribe(() => {
      const username = this.route.snapshot.url[1]?.path;

      if (!username) return;
      this.username = username;

      if (username === 'gustavoksbr') {
        this.service.listar();
      }

      this.service.mostrarPortfolioPorUsername(username).subscribe({
        next: (portfolio: Portfolio) => {
          this.carregando = false;
          this.portfolio = { ...portfolio };
          this.portfolioNovo = criarPortfolioRequest(portfolio);
        },
        error: () => {
          this.carregando = false;
        }
      });
    });
  }

  /** ==============================
   *        AÇÕES DE NAVEGAÇÃO
   *  ============================== */
  public irParaHome(): void {
    this.router.navigate(['/']);
  }

  /** ==============================
   *        TOOLTIP
   *  ============================== */
  public iniciarTooltip(): void {
    this.mostrarTooltip = true;
  }

  public cancelarTooltip(): void {
    setTimeout(() => this.mostrarTooltip = false, 400);
  }

  /** ==============================
   *        MODAL
   *  ============================== */
  private criarModalVazio() {
    return {
      isOpen: false,
      title: '',
      message: '',
      confirmButtonText: 'Confirmar',
      closeButtonText: 'Cancelar',
      danger: false,
      carregandoClose: false,
      carregandoConfirm: false,
      salvarAlteracoes: false
    };
  }

  public abrirModalNaoSalvar(): void {
    if (isEqual(this.portfolioNovo, this.portfolio)) {
      this.sairCancelandoOuSalvando(false);
      return;
    }

    this.modal = {
      ...this.modal,
      isOpen: true,
      title: 'Cancelar alterações',
      message: 'Todas as suas alterações serão perdidas. Deseja continuar?',
      confirmButtonText: 'Sim',
      closeButtonText: 'Não',
      danger: false
    };
  }

  public abrirModalSalvar(): void {
    this.modal.isOpen = true;
    this.modal.danger = false;

    if (isEqual(this.portfolioNovo, this.portfolio)) {
      this.modal = {
        ...this.modal,
        title: 'Nenhuma alteração',
        message: 'Você não alterou nada. Tem certeza que deseja sair?',
        confirmButtonText: 'Sair',
        closeButtonText: 'Cancelar',
        salvarAlteracoes: false
      };
    } else {
      this.modal = {
        ...this.modal,
        title: 'Salvar alterações',
        message: 'Você tem certeza que deseja salvar as alterações?',
        confirmButtonText: 'Salvar',
        closeButtonText: 'Cancelar',
        salvarAlteracoes: true
      };
    }
  }

  public cancelarModal(): void {
    this.modal = this.criarModalVazio();
  }

  /** ==============================
   *        SALVAR OU CANCELAR
   *  ============================== */

  public alterar(){ //botao de entrar/sair no modo edicao
    this.editando = true;
  }
  public sairCancelandoOuSalvando(salvarAlteracoes: boolean): void {
    this.cancelarModal();
    this.carregandoSalvamento = true;

    if (!salvarAlteracoes) {
      this.reverterAlteracoes();
    } else {
      this.salvarPortfolio();
    }
  }

  private reverterAlteracoes(): void {
    this.editando = false;
    this.portfolioNovo = criarPortfolioRequest(this.portfolio);
    this.carregandoSalvamento = false;
  }

  private salvarPortfolio(): void {
    this.portfolioNovo.habilidades = Array.from(this.portfolioNovo.habilidades);

    this.service.savePortfolio(this.portfolioNovo).subscribe({
      next: (portfolio: Portfolio) => {
        this.finalizarSalvamento(portfolio);
      },
      error: (err: any) => {
        this.carregandoSalvamento = false;
        console.error('Erro ao salvar o portfólio:', err);
        throw err;
      }
    });
  }

  private finalizarSalvamento(portfolio: Portfolio): void {
    this.carregandoSalvamento = false;
    this.editando = false;

    this.router.navigate(['/portfolios/', this.portfolioNovo.username]);
    this.portfolioProprio = portfolio;
    this.portfolioNovo = criarPortfolioRequest(portfolio);
    this.portfolio = { ...portfolio };

    this.toastr.success('Portfólio salvo com sucesso!', 'Sucesso', {
      closeButton: true,
      extendedTimeOut: 5000,
      progressBar: true,
      disableTimeOut: 'extendedTimeOut',
      tapToDismiss: false,
    });
  }

  /** ==============================
   *        ATUALIZAÇÕES DE CAMPOS
   *  ============================== */
  public atualizarProjetos(projetosAtualizados: Projeto[]): void {
    this.portfolioNovo.projetos = [...projetosAtualizados];
  }

  public atualizarFotoPortfolio(imagem: Imagem): void {
    this.portfolioNovo.foto = imagem;
  }

  public alterarHabilidades({ inicial, atual }: { inicial: string; atual: string }): void {
    if (atual !== inicial) {
      if (inicial) this.portfolioNovo.habilidades.delete(inicial);
      if (atual) this.portfolioNovo.habilidades.add(atual);
    }
  }

  public deleteHabilidade(habilidade: string): void {
    this.portfolioNovo.habilidades.delete(habilidade);
  }

  public alterarLinks({ inicial, atual }: { inicial: string; atual: string }): void {
    if (atual !== inicial) {
      const index = this.portfolioNovo.links.findIndex(l => l.nome === inicial);
      if (index !== -1) {
        this.portfolioNovo.links[index].nome = atual;
      }
    }
  }

  public deleteLink(link: string): void {
    const index = this.portfolioNovo.links.findIndex(l => l.nome === link);
    if (index !== -1) {
      this.portfolioNovo.links.splice(index, 1);
    }
  }

  public addLinkNovo(): void {
    this.portfolioNovo.links.push({ nome: '', url: '' });
  }

  /** ==============================
   *        OUTROS MÉTODOS
   *  ============================== */
  public receberPortfolioProprio(portfolio: Portfolio): void {
    this.portfolioProprio = { ...portfolio, email: this.authService.getStorage('email') ?? '' };
  }

  public permitirCaracteres(event: KeyboardEvent): void {
    const regex = /^[a-zA-Z0-9_-]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }


}
