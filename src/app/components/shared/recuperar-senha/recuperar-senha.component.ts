import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../services/autenticacao/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss'
})
export class RecuperarSenhaComponent {
  tentandoEnviar = false;
  enviadoPelaPrimeiraVez = false;
  enviado = false;

  tentandoRedefinir = false;

  emailParaRecuperarRequest = { email: '' };
  redefinirSenhaRequest  = {
    email: '',
    novaSenha: '',
    codigo: '' ,
    // confirmacao: ''
  };

  @Output() devolverFecharRecuperarSenha = new EventEmitter();

  fecharRecuperarSenha(){
    this.devolverFecharRecuperarSenha.emit();
  }

  constructor(
    private authService: AuthService
  ) {}

  forget() {
    this.tentandoEnviar = true;
    this.enviado = false;
    this.authService.forget(this.emailParaRecuperarRequest).subscribe({
      // next: () => {
      //   this.router.navigate(['/login']);
      // },
      next:()=>{
        this.tentandoEnviar = false;
        this.enviadoPelaPrimeiraVez = true;
        this.enviado = true;
        this.redefinirSenhaRequest.email = this.emailParaRecuperarRequest.email;

      },
      error: (err: any) => {
        this.tentandoEnviar = false;
        throw err;
      },
    });
  }

  redefinirSenha(){
    // if(this.redefinirSenhaRequest.password != this.redefinirSenhaRequest.confirmacao){
    //   throw new Error()
    // }
    this.tentandoRedefinir = true;
    this.authService.redefinirSenha(this.redefinirSenhaRequest).subscribe({
      next: (response: { token: any; }) => {
        this.authService.saveToken(response.token);
        this.authService.saveStorage("email",this.redefinirSenhaRequest.email);
        this.fecharRecuperarSenha();
      },
      error: (err: any) => {
        this.tentandoRedefinir = false;
        throw err;
      }
    });
  }
}
