import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListarPortfoliosComponent} from './components/pages/listar-portfolios/listar-portfolios.component';
import {MostrarPortfolioComponent} from './components/pages/mostrar-portfolio/mostrar-portfolio.component';
import {CriarPortfolioComponent} from './components/pages/criar-portfolio/criar-portfolio.component';

export const routes: Routes = [
  {path: 'portfolios', component: ListarPortfoliosComponent},
  { path: '', redirectTo: 'portfolios', pathMatch: 'full' },
  {path: 'portfolios/:nomePortfolio', component: MostrarPortfolioComponent},
  {path:'criar-portfolio', component: CriarPortfolioComponent},
  {path:'**', redirectTo: 'portfolios', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
