import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/autenticacao/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector : Injector, private authService : AuthService) {
  }
  handleError(error: any): void {
    const toastr = this.injector.get(ToastrService)
    console.error('An error occurred:', error);
    console.log("erro é:"+JSON.stringify(error));
    if (error.error && error.status != null) {
      if(error.error instanceof ProgressEvent){
        toastr.error("status code: "+"500","Erro ao tentar se conectar com o servidor");
      }else {
        toastr.error(`Status code: ${error.status}`, error.error, {
          closeButton: true,
          extendedTimeOut: 5000,
          progressBar: true,
          disableTimeOut: 'extendedTimeOut',
          tapToDismiss: false,
        });
        if(error.status == 401){
          this.authService.logout();
        }
      }
    }
    else{
      if(error.status==404){
        // toastr.error("404","Página não encontrada");
      }else{
        toastr.error("Um erro inesperado ocorreu");

      }
    }
  }
}
