import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {PortfolioService} from '../../../services/portfolio/portfolio.service';
import {Portfolio} from '../../../models/response/Portfolio';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {PortolioComponent} from '../../shared/portolio/portolio.component';
import {PortfolioLinkedinComponent} from '../../shared/portfolio-linkedin/portfolio-linkedin.component';

@Component({
  selector: 'app-listar-portfolios',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    PortolioComponent,
    PortfolioLinkedinComponent
  ],
  templateUrl: './listar-portfolios.component.html',
  styleUrl: './listar-portfolios.component.scss'
})
export class ListarPortfoliosComponent implements OnInit{
  public listaPortfolios: Portfolio[] = [];
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

  public receberPortfolioProprio(portfolio: Portfolio) {
    this.portfolioProprio = portfolio;
  }

  constructor(private service: PortfolioService, private router: Router) {

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
    this.service.listar().subscribe((portfolios: any) => {
      this.listaPortfolios = portfolios;
console.log("ngOninit: " + JSON.stringify(this.listaPortfolios));    });
  }



}
