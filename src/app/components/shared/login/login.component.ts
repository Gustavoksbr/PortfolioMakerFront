import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/autenticacao/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
  ],
  standalone: true
})
export class LoginComponent {
  tentandoLogar = false;
  credentials = { email: '', senha: '' };
  // @Input() isLoginOpen = false;
  @Output() devolverFecharLogin = new EventEmitter();
  @Output() abrirCadastro = new EventEmitter();
  @Output() abrirRecuperarSenha = new EventEmitter();
  public modal = {
    isOpen: false,
    title: '',
    message: '',
    confirmButtonText: 'Confirmar',
    closeButtonText: 'Cancelar',
    danger: false,
    carregandoClose: false,
    carregandoConfirm: false

  }
  fecharLogin() {
    this.devolverFecharLogin.emit();
  }
  cadastrar() {
    this.abrirCadastro.emit();
  }

  esqueciSenha() {
    this.abrirRecuperarSenha.emit();
  }
  constructor(
    private authService: AuthService,
    private router: Router,) { }

  login() {
    this.tentandoLogar = true;
    this.authService.login(this.credentials).subscribe({
      next: (response: { token: string; email: string; username: string | null }) => {
        this.authService.saveToken(response.token);
        this.authService.saveStorage('email', response.email ?? this.credentials.email);
        if (response.username) {
          this.authService.saveStorage('username', response.username);
        }
        this.fecharLogin();
      },
      error: (err: any) => {
        this.tentandoLogar = false;
        throw err;
      },
    });
  }


}
