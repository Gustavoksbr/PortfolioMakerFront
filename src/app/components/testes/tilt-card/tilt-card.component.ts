import {AfterViewInit, Component, ElementRef} from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-tilt-card',
  standalone: true,
  imports: [],
  templateUrl: './tilt-card.component.html',
  styleUrl: './tilt-card.component.scss'
})
export class TiltCardComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const tiltElement = this.el.nativeElement.querySelector('.tilt-card');

    VanillaTilt.init(tiltElement, {
      max: 15, // ângulo máximo de inclinação (em graus)
      speed: 400, // velocidade da animação
      glare: true, // se deve ter efeito de brilho
      'max-glare': 0.2, // intensidade máxima do brilho (0 a 1)
      scale: 1.05, // escala no hover
      perspective: 1000 // perspectiva 3D
    });
  }
}
