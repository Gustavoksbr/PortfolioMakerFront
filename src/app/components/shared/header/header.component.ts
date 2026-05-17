import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from "@angular/common";
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { RecuperarSenhaComponent } from '../recuperar-senha/recuperar-senha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { Portfolio } from '../../../models/response/Portfolio';
import { ModalComponent } from '../modal/modal.component';

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
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.carregando = true;
    this.email = localStorage.getItem('email');
    const username = localStorage.getItem('username');

    if (this.email && username) {
      // Usa o username salvo no login para buscar o portfólio (sem expor email)
      this.portfolioService.mostrarPortfolioPorUsername(username).subscribe({
        next: (portfolioEncontrado: Portfolio) => {
          this.carregando = false;
          this.portfolioProprio = { ...portfolioEncontrado, email: this.email! };
          if (this.router.url === '/criar-portfolio' && this.portfolioProprio.username) {
            this.irParaPortfolioProprio();
          }
          this.devolverPortfolio.emit(this.portfolioProprio);
        },
        error: () => {
          this.carregando = false;
          // Portfólio ainda não criado
          this.portfolioProprio.email = this.email!;
          this.devolverPortfolio.emit(this.portfolioProprio);
        }
      });
    } else if (this.email) {
      // Logado mas sem username salvo (sessão antiga) — emite com email apenas
      this.carregando = false;
      this.portfolioProprio.email = this.email;
      this.devolverPortfolio.emit(this.portfolioProprio);
    } else {
      this.carregando = false;
    }
  }

  @Input() usernamePortfolioDetalhado: string = '';
  @Input() criarPortfolioPelaPrimeiraVez: boolean = false;
  @Output() devolverEmail = new EventEmitter<string | null>();
  @Output() devolverPortfolio = new EventEmitter<Portfolio>();

  portfolioProprio: Portfolio = {
    id: '', username: '', email: '', descricao: '', foto: null,
    habilidades: new Set<string>(), projetos: [], nome: '',
    breveDescricao: '', experiencias: [], background: null,
    localizacao: '', links: [], emailPublico: null
  };

  email: string | null = '';
  isLoginOpen: boolean = false;
  isCadastroOpen: boolean = false;
  isRecuperarSenhaOpen: boolean = false;
  carregando: boolean = true;
  carregandoPortfolioProprio: boolean = true;

  public irParaHome(): void {
    this.usernamePortfolioDetalhado = '';
    this.router.navigate(['/']);
  }

  abrirLogin() {
    this.isCadastroOpen = false;
    this.isRecuperarSenhaOpen = false;
    this.isLoginOpen = true;
  }

  abrirCadastro() {
    this.isLoginOpen = false;
    this.isRecuperarSenhaOpen = false;
    this.isCadastroOpen = true;
  }

  abrirRecuperarSenha() {
    this.isLoginOpen = false;
    this.isCadastroOpen = false;
    this.isRecuperarSenhaOpen = true;
  }

  fechar() {
    this.email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    this.portfolioProprio.email = this.email ?? '';

    if (this.email && username) {
      this.carregando = true;
      this.portfolioService.mostrarPortfolioPorUsername(username).subscribe({
        next: (portfolioEncontrado: Portfolio) => {
          this.carregando = false;
          this.portfolioProprio = { ...portfolioEncontrado, email: this.email! };
          this.devolverPortfolio.emit(this.portfolioProprio);
        },
        error: () => {
          this.carregando = false;
          this.devolverPortfolio.emit(this.portfolioProprio);
        }
      });
    } else {
      this.devolverPortfolio.emit(this.portfolioProprio);
    }
  }

  fecharLogin() {
    this.fechar();
    this.isLoginOpen = false;
  }

  fecharCadastro() {
    this.fechar();
    this.isCadastroOpen = false;
  }

  fecharRecuperarSenha() {
    this.fechar();
    this.isRecuperarSenhaOpen = false;
  }

  public modalDeslogarAberto: boolean = false;

  abrirModalDeslogar() {
    this.modalDeslogarAberto = true;
  }

  fecharModalDeslogar() {
    this.modalDeslogarAberto = false;
  }

  deslogar() {
    this.fecharModalDeslogar();
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.email = '';
    this.portfolioProprio = {
      id: '', username: '', email: '', descricao: '', foto: null,
      habilidades: new Set<string>(), projetos: [], nome: '',
      breveDescricao: '', experiencias: [], background: null,
      localizacao: '', links: [], emailPublico: null
    };
    this.devolverPortfolio.emit(this.portfolioProprio);
  }

  irParaPortfolioProprio() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/portfolios', this.portfolioProprio.username]);
    });
  }

  irParaCriarPortfolio() {
    this.router.navigate(['/criar-portfolio']);
  }
}
