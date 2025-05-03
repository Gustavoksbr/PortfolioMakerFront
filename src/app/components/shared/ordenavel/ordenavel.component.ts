import {Component, Input} from '@angular/core';
import {Ordenavel} from '../../../models/Ordenavel';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgSwitch} from '@angular/common';
import {Projeto} from '../../../models/response/Projeto';
import {Experiencia} from '../../../models/response/Portfolio';

@Component({
  selector: 'app-ordenavel',
  standalone: true,
  imports: [
    FormsModule,
    NgSwitch,
    CommonModule
  ],
  templateUrl: './ordenavel.component.html',
  styleUrl: './ordenavel.component.scss'
})
export class OrdenavelComponent {
  @Input() dado!: Projeto | Experiencia;
  @Input() editando = false;

  get tipo(): 'projeto' | 'experiencia' | 'desconhecido' {
    if ('linkDoProjeto' in this.dado) return 'projeto';
    if ('empresa' in this.dado) return 'experiencia';
    return 'desconhecido';
  }
}
