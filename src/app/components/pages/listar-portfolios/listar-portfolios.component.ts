import {Component, OnInit, PipeTransform} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {PortfolioService} from '../../../services/portfolio/portfolio.service';
import {Portfolio} from '../../../models/response/Portfolio';
import {NgClass, NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {PortolioComponent} from '../../shared/portolio/portolio.component';
import {PortfolioLinkedinComponent} from '../../shared/portfolio-linkedin/portfolio-linkedin.component';
import {AuthService} from '../../../services/autenticacao/auth.service';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from '../../shared/footer/footer.component';

@Component({
  selector: 'app-listar-portfolios',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    PortolioComponent,
    PortfolioLinkedinComponent,
    FormsModule,
    FooterComponent,
    NgClass
  ],
  templateUrl: './listar-portfolios.component.html',
  styleUrl: './listar-portfolios.component.scss'
})
export class ListarPortfoliosComponent implements OnInit{
  // public listaPortfolios: Portfolio[] = [];
  public listaPortfolioSemProprio: Portfolio[] = [];
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
  public portfolioGustavoksbr: Portfolio = {
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
  public carregando: boolean = true;
  public email: string | null = '';
  filtro: string = '';
  listaFiltrada: Portfolio[] = [];

  aplicarFiltro(): void {
    const f = this.filtro.trim().toLowerCase();
    if (!f) {
      this.listaFiltrada = [...this.listaPortfolioSemProprio];
      return;
    }

    this.listaFiltrada = this.listaPortfolioSemProprio.filter(p =>
      (p.nome && p.nome.toLowerCase().includes(f)) ||
      (p.username && p.username.toLowerCase().includes(f))
    );
  }

  public receberPortfolioProprio(portfolio: Portfolio) {
    // this.portfolioProprio = portfolio;
    this.ngOnInit();
  }

  public irParaCriarPortfolio(){
    this.router.navigate(['/criar-portfolio']);
  }
  constructor(private service: PortfolioService,
  private authService : AuthService,
  private router: Router
  ) {

  }
  ngOnInit(): void {
    this.carregando = true;
    this.email = localStorage.getItem('email');
    this.email = this.authService.getStorage('email');
    if(!this.email){
      this.portfolioProprio = {
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
    }
    this.service.mostrarPortfolioPorEmail("gustavosalesi@hotmail.com").subscribe((portfolio: Portfolio) => {
      this.portfolioGustavoksbr = portfolio;
    });

    this.service.listar().subscribe((portfolios: Portfolio[]) => {
      this.listaPortfolioSemProprio = [];
      this.carregando = false;
      portfolios.forEach(p => {
        if (p.email === this.email) {
          this.portfolioProprio = p;
        } else {
          this.listaPortfolioSemProprio.push(p);
        }
      });
      if(this.email=="gustavosalesi@hotmail.com"){
        this.portfolioProprio =  this.portfolioGustavoksbr;
      }else{
    this.listaPortfolioSemProprio.unshift(this.portfolioGustavoksbr);
      }
      this.aplicarFiltro();
    });
  }



}
