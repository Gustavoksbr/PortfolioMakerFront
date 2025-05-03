import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../services/autenticacao/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  public tentandoCadastrar = false;
  user = {  email:'', senha: '' };
  @Output() devolverFecharCadastro = new EventEmitter();
  @Output() abrirLogin = new EventEmitter();

  fecharCadastro(){
    this.devolverFecharCadastro.emit();
  }
  logar(){
    this.abrirLogin.emit();
  }
  constructor(private authService: AuthService,  private router:Router) {}

  register() {
    this.tentandoCadastrar = true;
    this.authService.register(this.user).subscribe({
      next: (response: { token: any; }) => {
        this.authService.saveToken(response.token);
        this.authService.saveStorage("email",this.user.email);
        this.fecharCadastro();
       // this.router.navigate(['/salas']);
      },
      error: (err: any) => {
        this.tentandoCadastrar = false;
        throw err;
      },
    });
  }

}
