import {Component, EventEmitter, HostListener, input, Input, OnDestroy, Output} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {languages, langUrl} from '../../../models/others/languages';
import {query} from '@angular/animations';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

 @Input()  searchText: string = '';
 @Input() habilidadeInicial: string = '';
 @Input() indice: number = 0;
  filteredLanguages: string[] = [];
  selectedLanguage: string | null = null;
  url: string = langUrl;
  @Output() retornarHabilidadeInicialEPosterior = new EventEmitter<{ inicial: string; atual: string; indice: number }>();


  // urlELinguagem = {
  //   url: '',
  //   linguagem: ''
  // }

  onInputChange(): void {
    const query = this.searchText.toLowerCase();

    if (query.length === 0) {
      this.filteredLanguages = [];
      return;
    }

    this.filteredLanguages = languages.filter(lang =>
      lang.startsWith(query)
    );
  }

  highlightMatch(lang: string): string {
    const query = this.searchText.toLowerCase();
    const boldPart = `<strong>${lang.substring(0, query.length)}</strong>`;
    const rest = lang.substring(query.length);
    return boldPart + rest;
  }


  selectLanguage(lang: string): void {
    // if (languages.includes(lang)) {
    //   this.url = 'https://skillicons.dev/icons?i=' + lang;
    // }
    this.selectedLanguage = lang;
    this.searchText = lang;
    this.filteredLanguages = [];

    if(lang != this.habilidadeInicial) {
        this.retornarHabilidadeInicialEPosterior.emit({
          inicial: this.habilidadeInicial,
          atual: lang,
          indice : this.indice
        });
      this.habilidadeInicial = '';
      this.searchText = '';
    }

  }
  onEnterKey(): void {
    const query = this.searchText.toLowerCase();
    this.selectLanguage(query);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      const query = this.searchText.toLowerCase();
      this.selectLanguage(query);
    }
  }
}
