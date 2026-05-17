import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio } from '../../models/response/Portfolio';
import { PortfolioList } from '../../models/response/PortfolioList';
import { AuthService } from '../autenticacao/auth.service';
import { PortfolioRequest } from '../../models/request/PortfolioRequest';
import { gustavoksbr } from '../../backup/db';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly API = API_CONFIG.BASE_URL + '/portfolios';
  private readonly gu = gustavoksbr;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return this.authService.getHeaders();
  }

  listar(): Observable<PortfolioList[]> {
    return this.http.get<PortfolioList[]>(this.API + '?without=gustavoksbr');
  }

  listarTodos(): Observable<PortfolioList[]> {
    return this.http.get<PortfolioList[]>(this.API);
  }

  mostrarPortfolioPorUsername(username: string): Observable<Portfolio> {
    if (username === 'gustavoksbr') {
      return new Observable(observer => {
        observer.next(this.gu);
        observer.complete();
      });
    }
    return this.http.get<Portfolio>(this.API + '/username/' + username);
  }

  savePortfolio(portfolio: PortfolioRequest): Observable<Portfolio> {
    const portfolioParaEnviar = {
      ...portfolio,
      foto: portfolio.foto ? {
        id: portfolio.foto.id,
        name: portfolio.foto.name,
        data: portfolio.foto.url
      } : null,
      background: portfolio.background ? {
        id: portfolio.background.id,
        name: portfolio.background.name,
        data: portfolio.background.url
      } : null
    };

    return this.http.post<Portfolio>(this.API + '/save', portfolioParaEnviar, { headers: this.getHeaders() });
  }
}
