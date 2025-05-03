import {RouterModule, Routes} from '@angular/router';
import {ImagemComponent} from './components/imagem/imagem.component';
import {NgModule} from '@angular/core';
import {ListarPortfoliosComponent} from './components/pages/listar-portfolios/listar-portfolios.component';
import {MostrarPortfolioComponent} from './components/pages/mostrar-portfolio/mostrar-portfolio.component';
import {CadastroComponent} from './components/shared/cadastro/cadastro.component';
import {LoginComponent} from './components/shared/login/login.component';
import {TiltCardComponent} from './components/testes/tilt-card/tilt-card.component';
import {CriarPortfolioComponent} from './components/pages/criar-portfolio/criar-portfolio.component';

export const routes: Routes = [
  {path: 'imagens', component: ImagemComponent},

  {path: 'portfolios', component: ListarPortfoliosComponent},
  { path: '', redirectTo: 'portfolios', pathMatch: 'full' },
  {path: 'portfolios/:nomePortfolio', component: MostrarPortfolioComponent},
  {path:'testes/tilt-card', component: TiltCardComponent},
  {path:'criar-portfolio', component: CriarPortfolioComponent},
  {path:'**', redirectTo: 'portfolios', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
