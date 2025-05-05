import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {LoginComponent} from '../login/login.component';
import {CadastroComponent} from '../cadastro/cadastro.component';
import {RecuperarSenhaComponent} from '../recuperar-senha/recuperar-senha.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {PortfolioService} from '../../../services/portfolio/portfolio.service';
import {Portfolio} from '../../../models/response/Portfolio';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    ReactiveFormsModule,
    ModalComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router, private portfolioService: PortfolioService) {
  }
  ngOnInit(): void {
    this.email = localStorage.getItem('email')!;
    if(this.email) {
      this.portfolioService.mostrarPortfolioPorEmail(this.email).subscribe(
        (portfolioEncontrado: Portfolio) => {
          this.portfolioProprio = portfolioEncontrado;
          const url = this.router.url;
          if (url === '/criar-portfolio') {
            if (this.portfolioProprio.username != null || this.portfolioProprio.username !== '') {
              alert(this.portfolioProprio.username);
              this.irParaPortfolio();
            }
          }
        }
      )
      this.devolverPortfolio.emit(this.portfolioProprio);
    }
  }
  @Output() devolverEmail = new EventEmitter<string | null>();
  @Output() devolverPortfolio = new EventEmitter<Portfolio>();
  portfolioProprio: Portfolio = {
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

  email: string | null = '';

  isLoginOpen : boolean = false;
  isCadastroOpen: boolean = false;
  isRecuperarSenhaOpen: boolean = false;
  public irParaHome(): void {
    this.router.navigate(['/']);
  }
  abrirLogin(){
    this.isCadastroOpen = false;
    this.isRecuperarSenhaOpen = false;
    this.isLoginOpen = true;
  }
  abrirCadastro(){
    this.isLoginOpen = false;
    this.isRecuperarSenhaOpen = false;
    this.isCadastroOpen = true;
  }
  abrirRecuperarSenha(){
    this.isLoginOpen = false;
    this.isCadastroOpen = false;
    this.isRecuperarSenhaOpen = true;
  }

  fechar(){
    this.email = localStorage.getItem('email')!;

    this.portfolioProprio.email = this.email;
    if(this.email){
      this.portfolioService.mostrarPortfolioPorEmail(this.email).subscribe(
        (portfolioEncontrado: Portfolio) => {
          this.portfolioProprio = portfolioEncontrado;
        }
      )
    }
    this.devolverPortfolio.emit(this.portfolioProprio);
  }

  fecharLogin(){
    this.fechar();
    this.isLoginOpen = false;
  }
  fecharCadastro(){
    this.fechar();
    this.isCadastroOpen = false;
  }
  fecharRecuperarSenha(){
    this.fechar();
    this.isRecuperarSenhaOpen = false;
  }
  public modalDeslogarAberto: boolean = false;
  abrirModalDeslogar(){
    this.modalDeslogarAberto = true;
  }
  fecharModalDeslogar(){
    this.modalDeslogarAberto = false;
  }

  deslogar(){
    console.log("logout");
    this.fecharModalDeslogar();
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.email = '';
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
    this.devolverPortfolio.emit(this.portfolioProprio);
    console.log('email:', this.email);
    console.log('username:', this.portfolioProprio.username);

  }

  irParaPortfolio(){
    this.router.navigate(['/portfolios/', this.portfolioProprio.username]);
  }

  irParaCriarPortfolio(){
    this.router.navigate(['/criar-portfolio']);
  }

}
