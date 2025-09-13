import {
  Component,
  Input, OnInit,
} from '@angular/core';
import {Portfolio} from '../../../models/response/Portfolio';
import {PortfolioService} from '../../../services/portfolio/portfolio.service';
import {AuthService} from '../../../services/autenticacao/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '../../shared/header/header.component';
import {NgForOf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AutocompleteComponent} from '../../shared/autocomplete/autocomplete.component';
import {languages, langUrl, links} from '../../../models/others/languages';
import {criarPortfolioRequest, isEqual, PortfolioRequest} from '../../../models/request/PortfolioRequest';
import {ToastrService} from 'ngx-toastr';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Imagem} from '../../../models/response/Imagem';
import {SelecionarImagemComponent} from '../../shared/selecionar-imagem/selecionar-imagem.component';
import {Projeto} from '../../../models/response/Projeto';
import {ListarOrdenaveisComponent} from '../../shared/listar-ordenaveis/listar-ordenaveis.component';
import {LinksAutocompleteComponent} from '../../shared/links-autocomplete/links-autocomplete.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {PortolioComponent} from '../../shared/portolio/portolio.component';
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
    ListarOrdenaveisComponent,
    LinksAutocompleteComponent,
    FooterComponent,
    PortolioComponent
  ],
  templateUrl: './mostrar-portfolio.component.html',
  styleUrl: './mostrar-portfolio.component.scss'
})
export class MostrarPortfolioComponent implements OnInit{

  public portfolioProprio: Portfolio = {
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
  }
  public portfolio: Portfolio = {
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
  }
  public portfolioNovo: PortfolioRequest = {
    username: '',
    nome: '',
    breveDescricao: '',
    descricao: '',
    foto: null,

    habilidades: new Set<string>(),
    projetos: [],
    experiencias: [],

    background: null,
    localizacao: '',
    links: [],
  }
  public modal = {
    isOpen: false,
    title: '',
    message: '',
    confirmButtonText: 'Confirmar',
    closeButtonText: 'Cancelar',
    danger: false,
    carregandoClose: false,
    carregandoConfirm: false,
    salvarAlteracoes: false

  }
  mostrarTooltip = false;
  mouseNaDuvida = false;

  public editando = false;

  public carregando = true;
  public carregandoSalvamento = false;

  public projetosOrdenados : Projeto[]= [];

  public email: string | null = null;
  public irParaHome(): void {
    this.router.navigate(['/']);
  }
  public get podeSalvarSemErroDeRequisicao(): boolean {
    return !!this.portfolioNovo.username &&
      !!this.portfolioNovo.nome &&
      this.portfolioNovo.projetos.every(p => p.nome.trim() !== '');
  }

  public erroDeRequisicao = [];
  protected readonly langUrl = langUrl;

  protected readonly languages = languages;
  tooltipTimeout: any;

  iniciarTooltip() {
        this.mostrarTooltip = true;
  }

  cancelarTooltip() {
    setTimeout(() => {
      this.mostrarTooltip = false;
    }, 400);

  }
  public alterar(){
    this.editando = true;

  }
  imagemAtual: Imagem | null = null;

  atualizarFotoPortfolio(imagem: Imagem) {
    this.portfolioNovo.foto = imagem;
    //console.log('Imagem convertida e emitida:', imagem);
  }

  abrirModalNaoSalvar(){
    if(isEqual(this.portfolioNovo, this.portfolio)){
      this.sairCancelandoOuSalvando(false);
      return;
    }

    this.modal.isOpen = true;
    this.modal.title = 'Cancelar alterações';
    this.modal.message = 'Todas as suas alterações serão perdidas. Deseja continuar?';
    this.modal.confirmButtonText = 'Sim';
    this.modal.closeButtonText = 'Não';
    this.modal.danger = false;
  }
  cancelarModal(){
    this.modal = {
      isOpen: false,
      title: '',
      message: '',
      confirmButtonText: 'Confirmar',
      closeButtonText: 'Cancelar',
      danger: false,
      carregandoClose: false,
      carregandoConfirm: false,
      salvarAlteracoes: false
    }
  }

  abrirModalSalvar() {
    this.modal.title = 'Salvar alterações';
    this.modal.isOpen = true;
    this.modal.danger = false;


    if (isEqual(this.portfolioNovo, this.portfolio)) {

      this.modal.message = 'Você não alterou nada. Tem certeza que deseja sair?';
      this.modal.confirmButtonText = 'Sair';
      this.modal.closeButtonText = 'Cancelar';
      this.modal.salvarAlteracoes = false;
    }else{
      this.modal.title = 'Salvar alterações';
      this.modal.message = 'Você tem certeza que deseja salvar as alterações?';
      this.modal.confirmButtonText = 'Salvar';
      this.modal.closeButtonText = 'Cancelar';
      this.modal.salvarAlteracoes = true;
    }
  }



  sairCancelandoOuSalvando(salvarAlteracoes: boolean) {
    this.cancelarModal();
    this.carregandoSalvamento = true;
    if(!salvarAlteracoes){
      this.editando=false;
      this.portfolioNovo = criarPortfolioRequest(this.portfolio);
      this.carregandoSalvamento = false;
    }
    else{
        this.portfolioNovo.habilidades = Array.from(this.portfolioNovo.habilidades);
        this.service.savePortfolio(this.portfolioNovo).subscribe({
          next:(portfolio: Portfolio) => {
            this.carregandoSalvamento = false;
            this.editando=false;
            //this.router.navigate(['/portfolios/']);
            this.router.navigate(['/portfolios/',this.portfolioNovo.username]);
            this.portfolioProprio = portfolio;
            this.portfolioNovo = criarPortfolioRequest(portfolio);
            this.portfolio = { ...portfolio };
            this.toastr.success('Portfólio salvo com sucesso!', 'Sucesso', {
              closeButton: true,
              extendedTimeOut: 5000,
              progressBar: true,
              disableTimeOut: 'extendedTimeOut',
              tapToDismiss: false,
            })
          },error: (err: any) => {
            this.carregandoSalvamento = false;
            console.error('Erro ao salvar o portfólio:', err);
            throw err;
          }}
        );
    }
  }


  atualizarProjetos(projetosAtualizados: Projeto[]) {
    this.portfolioNovo.projetos = [...projetosAtualizados];
  }



  public alterarHabilidades({inicial, atual}: { inicial: string; atual: string }) {
    if(atual!=  inicial){
      if(inicial != ''){
        this.portfolioNovo.habilidades.delete(inicial);
      }
      if (atual != '') {
        this.portfolioNovo.habilidades.add(atual);
      }
    }

  }

  public deleteHabilidade(habilidade: string){
    this.portfolioNovo.habilidades.delete(habilidade);
  }
novoLink: { nome: string, url: string } = { nome: '', url: '' };

  public alterarLinks({inicial, atual}: { inicial: string; atual: string}) {
    if(atual!=  inicial){
      const index = this.portfolioNovo.links.findIndex(l => l.nome === inicial);
      if (index !== -1) {
        this.portfolioNovo.links[index].nome = atual;
      }
    }
  }
  public deleteLink(link: string){
    const index = this.portfolioNovo.links.findIndex(l => l.nome === link);
    if (index !== -1) {
      this.portfolioNovo.links.splice(index, 1);
    }
  }

  public addLinkNovo(){
    this.portfolioNovo.links.push({nome:'',url: ''});
  }

  @Input() criarPortfolioPrimeiraVez: boolean = false;
  public receberPortfolioProprio(portfolio: Portfolio) {
    this.portfolioProprio = portfolio;
    this.portfolioProprio.email  = this.authService.getStorage('email')!;
  }
  permitirCaracteres(event: KeyboardEvent): void {
    const regex = /^[a-zA-Z0-9_-]$/;
    const inputChar = event.key;

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  constructor(private service: PortfolioService,
              private authService: AuthService,
              private route: ActivatedRoute, private router: Router,
              private sanitizer: DomSanitizer,
              private toastr: ToastrService) {
    this.portfolioProprio.email = this.authService.getStorage('email')!;

  }

  ngOnInit(): void {

    this.carregando = true;
    if(this.criarPortfolioPrimeiraVez){
      this.carregando = false;
    this.portfolio = { ...this.portfolioProprio };
    this.portfolioNovo = criarPortfolioRequest(this.portfolioProprio);
    this.editando = true;

    }else{
      this.route.paramMap.subscribe(params => {
        const username = this.route.snapshot.url[1]?.path;
        if (username) {
          if(username=="gustavoksbr"){
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
        }
      });
    }

  }
  protected readonly links = links;
}
