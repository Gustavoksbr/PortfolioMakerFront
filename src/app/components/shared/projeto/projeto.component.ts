import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Projeto} from '../../../models/response/Projeto';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {languages, langUrl} from '../../../models/others/languages';

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    AutocompleteComponent
  ],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent {
  @Input() projeto!: Projeto;
  @Input() editando = false;
  @Output() retornarProjeto = new EventEmitter<Projeto>();
  protected readonly languages = languages;
  protected readonly langUrl = langUrl;
}
