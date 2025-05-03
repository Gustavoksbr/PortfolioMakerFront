import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/autenticacao/auth.service';



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
  credentials = { email: '', senha  : '' };
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
  fecharLogin(){
    this.devolverFecharLogin.emit();
  }
  cadastrar(){
    this.abrirCadastro.emit();
  }

  esqueciSenha(){
    this.abrirRecuperarSenha.emit();
  }
  constructor(
    private authService: AuthService,
  private router:Router,) {}

  login() {
    this.tentandoLogar = true;
      this.authService.login(this.credentials).subscribe({
        next: (response: { token: any; }) => {
          this.authService.saveToken(response.token);
          this.authService.saveStorage("email",this.credentials.email);
          this.fecharLogin();
          //this.router.navigate(['/portfolios']);
        },
        error: (err: any) => {
          this.tentandoLogar = false;
          throw err;
        },
      });

  }


}
