import {Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Portfolio} from '../../../models/response/Portfolio';
import {PortfolioService} from '../../../services/portfolio/portfolio.service';
import {AuthService} from '../../../services/autenticacao/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '../../shared/header/header.component';
import {NgClass, NgForOf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AutocompleteComponent} from '../../shared/autocomplete/autocomplete.component';
import {languages, langUrl, links} from '../../../models/others/languages';
import {criarPortfolioRequest, PortfolioRequest} from '../../../models/request/PortfolioRequest';
import {ToastrService} from 'ngx-toastr';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Imagem} from '../../../models/response/Imagem';
import {SelecionarImagemComponent} from '../../shared/selecionar-imagem/selecionar-imagem.component';
import {Projeto} from '../../../models/response/Projeto';
import {ListarOrdenaveisComponent} from '../../shared/listar-ordenaveis/listar-ordenaveis.component';
import {LinksAutocompleteComponent} from '../../shared/links-autocomplete/links-autocomplete.component';

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
    LinksAutocompleteComponent
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
  public editando = false;

  public projetosOrdenados : Projeto[]= [];

  public email: string | null = null;

  public get podeSalvarSemErroDeRequisicao(): boolean {
    return !!this.portfolioNovo.username &&
      this.portfolioNovo.projetos.every(p => p.nome.trim() !== '');
  }

  public erroDeRequisicao = [];
  protected readonly langUrl = langUrl;

  protected readonly languages = languages;
  public alterar(){
    this.editando = true;
    console.log("this.portfolio.email: "+this.portfolio.email);
    console.log("this.portfolioProprio.email: "+this.portfolioProprio.email);
    console.log("criarPelaimeiraVez: "+this.criarPortfolioPrimeiraVez);

    // this.toastr.error("blablabla")
  }

  // @Output() closeModal = new EventEmitter<void>();
  // @Output() confirmModal = new EventEmitter<void>();
  // @Input() public title: string = '';
  // @Input() public message: string = '';
  // @Input() public confirmButtonText: string = 'Confirmar';
  // @Input() public closeButtonText: string = 'Cancelar';
  // @Input() public warning: boolean = false;
  // @Input() public success: boolean = false;

  //imagem
  imagemAtual: Imagem | null = null;

  atualizarFotoPortfolio(imagem: Imagem) {
    this.portfolioNovo.foto = imagem;
    console.log('Imagem convertida e emitida:', imagem);
  }

  abrirCancelarModal(){
    console.log("portfolioNovo.username: "+JSON.stringify(this.portfolioNovo.username) + "\n portfolioNovo.projetos" + JSON.stringify(this.portfolioNovo.projetos));
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

  cancelar() {
    this.portfolioNovo = criarPortfolioRequest(this.portfolio);
    this.editando = false;
  }

  abrirModalSalvar(){
        this.modal.isOpen = true;
        this.modal.title = 'Salvar alterações';
        this.modal.message = 'Você tem certeza que deseja salvar as alterações?';
        this.modal.confirmButtonText = 'Salvar';
        this.modal.closeButtonText = 'Cancelar';
        this.modal.danger = false;
        this.modal.salvarAlteracoes = true;
    // }
}


  salvar(salvarAlteracoes: boolean) {
    this.cancelarModal();
    if(!salvarAlteracoes){
      this.editando=false;
    }
    else{
        this.portfolioNovo.habilidades = Array.from(this.portfolioNovo.habilidades);
        this.service.savePortfolio(this.portfolioNovo).subscribe({
          next:(portfolio: Portfolio) => {
            this.editando=false;
            //this.router.navigate(['/portfolios/']);
            this.router.navigate(['/portfolios/',this.portfolioNovo.username]);
            this.portfolioProprio = portfolio;
            this.portfolioNovo = criarPortfolioRequest(portfolio);
            this.portfolio = { ...portfolio };
          },error: (err: any) => {
            console.error('Erro ao salvar o portfólio:', err);

            // const toastr = this.injector.get(ToastrService);
            // toastr.error(`Status code: ${err.status}`, err.error, {
            //   closeButton: true,
            //   extendedTimeOut: 5000,
            //   progressBar: true,
            //   disableTimeOut: 'extendedTimeOut',
            //   tapToDismiss: false,
            // });
            throw err;
          }}
        );
    }
  }


  atualizarProjetos(projetosAtualizados: Projeto[]) {
    this.portfolioNovo.projetos = [...projetosAtualizados];
  }



  public alterarHabilidades({inicial, atual}: { inicial: string; atual: string, indice: number | null }) {
    console.log("this.portfolioNovo.habilidades"+this.portfolioNovo.habilidades);
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
  linkss: { nome: string, url: string }[] = [];

  public alterarPrimeiroLink({inicial, atual}: { inicial: string; atual: string}) {
    this.novoLink.nome = atual;
  }
  public alterarLinks({inicial, atual}: { inicial: string; atual: string}) {
    console.log("this.portfolioNovo.links"+this.portfolioNovo.links);
    if(atual!=  inicial){
      const index = this.portfolioNovo.links.findIndex(l => l.nome === inicial);
      if (index !== -1) {
        this.portfolioNovo.links[index].nome = atual;
      }
    }
  }
  goToExternalPage(link: string) {
    window.location.href = link;
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
  public receberEmail(email: string | null) {
    this.portfolioProprio.email  = email!;
    console.log("abc");
  }

  @Input() criarPortfolioPrimeiraVez: boolean = false;
 public removerLinguagem(l: string){

 }
  public receberPortfolioProprio(portfolio: Portfolio) {
    this.portfolioProprio = portfolio;
    this.portfolioProprio.email  = this.authService.getStorage('email')!;
  }

  getEmbedYoutubeUrl(youtubeUrl: string): SafeResourceUrl {
    const videoId = this.extractYoutubeVideoId(youtubeUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extractYoutubeVideoId(url: string): string {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }

  constructor(private service: PortfolioService,
              private authService: AuthService,
              private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,private el: ElementRef,
              private injector : Injector,
              private toastr: ToastrService) {
    this.portfolioProprio.email = this.authService.getStorage('email')!;

    console.log("zthis.portfolioProprio.email: "+this.portfolioProprio.email);
    console.log("zthis.portfolio.email: "+this.portfolio.email);
  }

  ngOnInit(): void {
    // this.portfolioProprio.email = localStorage.getItem('email')!;
    // if(this.portfolioProprio.email != null){
    //   this.service.mostrarPortfolioPorEmail(this.portfolioProprio.email ).subscribe((portfolio: Portfolio) => {
    //     if(portfolio != null){
    //       this.portfolioProprio = portfolio;
    //     }
    //   });
    // }
    // this.email = this.authService.getStorage('email');
    // console.log("email: " + this.email);
    console.log("ngOnInit");
    if(this.criarPortfolioPrimeiraVez){
    this.portfolio = { ...this.portfolioProprio };
    this.portfolioNovo = criarPortfolioRequest(this.portfolioProprio);
    this.linkss = this.portfolioNovo.links;
    this.editando = true;

    }else{
      this.route.paramMap.subscribe(params => {
        const username = this.route.snapshot.url[1]?.path;
        if (username) {
          this.service.mostrarPortfolioPorUsername(username).subscribe((portfolio: Portfolio) => {
            this.portfolio = { ...portfolio };
            this.portfolioNovo = criarPortfolioRequest(portfolio);
            console.log("aaaaaaathis.portfolioProprio.email: "+this.portfolioProprio.email);
            console.log("this.portfolio.email: "+this.portfolio.email);
          });
        }
      });
    }
console.log("this.portfolioProprio.email: "+this.portfolioProprio.email);
    console.log("this.portfolio.email: "+this.portfolio.email);

  }

  protected readonly links = links;
}
