import {Injectable} from '@angular/core';
import {API_CONFIG} from '../config/api.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Portfolio} from '../../models/response/Portfolio';
import {AuthService} from '../autenticacao/auth.service';
import {PortfolioRequest} from '../../models/request/PortfolioRequest';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {
  private readonly API = API_CONFIG.BASE_URL + '/portfolio';
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  private getHeaders(): HttpHeaders {
    return  this.authService.getHeaders();
  }
  listar() : Observable<Portfolio[]>{
    console.log("fazendo http get em "+this.API);
    return this.http.get<Portfolio[]>(this.API);
  }
// http://localhost:8080/portfolio/get/username/teste9
  mostrarPortfolioPorUsername(username: string) : Observable<Portfolio>{
    console.log("fazendo http get em "+this.API+"/get/username/"+username);
    return this.http.get<Portfolio>(this.API+"/get/username/"+username);
  }
  mostrarPortfolioPorEmail(email: string) : Observable<Portfolio>{
    console.log("fazendo http get em "+this.API+"/get/email/"+email);
    return this.http.get<Portfolio>(this.API+"/get/email/"+email);
  }

  savePortfolio(portfolio: PortfolioRequest): Observable<Portfolio> {
    console.log("portfolioRequest",portfolio);
    return this.http.post<Portfolio>(this.API+"/save",portfolio,{ headers: this.getHeaders() } );
  }


}
