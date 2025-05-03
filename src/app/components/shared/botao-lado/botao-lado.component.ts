import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-botao-lado',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './botao-lado.component.html',
  styleUrl: './botao-lado.component.scss'
})
export class BotaoLadoComponent {
  @Input() direction: 'cima' | 'baixo' | 'esquerda' | 'direita' = 'cima';

  getDirectionClass(): string {
    switch (this.direction) {
      case 'cima': return 'arrowbtn-up';
      case 'baixo': return 'arrowbtn-down';
      case 'esquerda': return 'arrowbtn-left';
      case 'direita': return 'arrowbtn-right';
      default: return 'arrowbtn-up';
    }
  }
}
