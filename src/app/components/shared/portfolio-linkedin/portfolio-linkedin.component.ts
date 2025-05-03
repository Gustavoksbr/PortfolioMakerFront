import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Portfolio} from '../../../models/response/Portfolio';
import {Router} from '@angular/router';
import VanillaTilt from 'vanilla-tilt';
import {SelecionarImagemComponent} from '../selecionar-imagem/selecionar-imagem.component';

@Component({
  selector: 'app-portfolio-linkedin',
  standalone: true,
  imports: [
    SelecionarImagemComponent
  ],
  templateUrl: './portfolio-linkedin.component.html',
  styleUrl: './portfolio-linkedin.component.scss'
})
export class PortfolioLinkedinComponent implements AfterViewInit, OnInit {
  @ViewChild('tiltCard', { static: false }) tiltCard!: ElementRef;


  @Input() public portfolio: Portfolio = {
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
  constructor(private router:Router) {
  }



  public irParaPortfolio(username: string): void {
    this.router.navigate(['/portfolios/', username]);
  }
  ngAfterViewInit(): void {
    VanillaTilt.init(this.tiltCard.nativeElement, {
      max: 8,
      speed: 150,
      glare: false,
      // 'max-glare': 0.2,
      scale: 1.05
    });
  }
  ngOnInit(): void {
  }

  protected readonly Array = Array;
}
