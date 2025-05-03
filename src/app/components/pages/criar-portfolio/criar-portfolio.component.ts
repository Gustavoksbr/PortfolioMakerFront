import { Component } from '@angular/core';
import {MostrarPortfolioComponent} from '../mostrar-portfolio/mostrar-portfolio.component';

@Component({
  selector: 'app-criar-portfolio',
  standalone: true,
  imports: [
    MostrarPortfolioComponent
  ],
  templateUrl: './criar-portfolio.component.html',
  styleUrl: './criar-portfolio.component.scss'
})
export class CriarPortfolioComponent {

}
