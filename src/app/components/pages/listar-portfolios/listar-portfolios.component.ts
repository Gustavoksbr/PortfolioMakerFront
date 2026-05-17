import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { Portfolio } from '../../../models/response/Portfolio';
import { PortfolioList } from '../../../models/response/PortfolioList';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { PortolioComponent } from '../../shared/portolio/portolio.component';
import { AuthService } from '../../../services/autenticacao/auth.service';
import { FormsModule } from '@angular/forms';
import { gustavoksbr } from '../../../backup/db';

const PORTFOLIO_VAZIO: Portfolio = {
  id: '', username: '', email: '', descricao: '', foto: null,
  habilidades: new Set<string>(), projetos: [], nome: '',
  breveDescricao: '', experiencias: [], background: null,
  localizacao: '', links: [], emailPublico: null
};

const PORTFOLIO_LIST_VAZIO: PortfolioList = {
  username: '', nome: '', breveDescricao: '', foto: null,
  habilidades: new Set<string>(), localizacao: ''
};

@Component({
  selector: 'app-listar-portfolios',
  standalone: true,
  imports: [HeaderComponent, PortolioComponent, FormsModule, NgClass],
  templateUrl: './listar-portfolios.component.html',
  styleUrl: './listar-portfolios.component.scss'
})
export class ListarPortfoliosComponent implements OnInit {
  public listaPortfolioSemProprio: PortfolioList[] = [];
  public portfolioProprio: PortfolioList = { ...PORTFOLIO_LIST_VAZIO };
  public portfolioGustavoksbr: PortfolioList = {
    username: gustavoksbr.username,
    nome: gustavoksbr.nome,
    breveDescricao: gustavoksbr.breveDescricao,
    foto: gustavoksbr.foto,
    habilidades: gustavoksbr.habilidades,
    localizacao: gustavoksbr.localizacao
  };
  public carregando: boolean = true;
  public username: string | null = '';
  public email: string | null = ''; // mantido para compatibilidade com o template HTML
  public temPortfolioProprio: boolean = false; // indica se o usuário tem portfólio
  filtro: string = '';
  listaFiltrada: PortfolioList[] = [];

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
    this.ngOnInit();
  }

  public irParaCriarPortfolio() {
    this.router.navigate(['/criar-portfolio']);
  }

  constructor(
    private service: PortfolioService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregando = true;
    this.username = this.authService.getStorage('username');
    this.email = this.authService.getStorage('email');

    if (!this.email) {
      this.portfolioProprio = { ...PORTFOLIO_LIST_VAZIO };
      this.temPortfolioProprio = false;
    }

    this.service.listar().subscribe({
      next: (portfolios: PortfolioList[]) => {
        this.listaPortfolioSemProprio = [];
        this.carregando = false;

        portfolios.forEach(p => {
          if (this.username && p.username === this.username) {
            this.portfolioProprio = { ...p };
            this.temPortfolioProprio = true;
          } else {
            this.listaPortfolioSemProprio.push(p);
          }
        });

        // Gustavoksbr sempre aparece primeiro na lista
        if (this.username !== 'gustavoksbr') {
          this.listaPortfolioSemProprio.unshift(this.portfolioGustavoksbr);
        } else {
          this.portfolioProprio = this.portfolioGustavoksbr;
          this.temPortfolioProprio = true;
        }

        this.aplicarFiltro();
      },
      error: () => {
        this.carregando = false;
        this.listaPortfolioSemProprio.unshift(this.portfolioGustavoksbr);
        this.aplicarFiltro();
      }
    });
  }
}
