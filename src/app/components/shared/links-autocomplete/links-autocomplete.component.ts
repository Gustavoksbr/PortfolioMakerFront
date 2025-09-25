import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-links-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './links-autocomplete.component.html',
  styleUrl: './links-autocomplete.component.scss'
})
export class LinksAutocompleteComponent {

  links: string[] = [
    'linkedin', 'github', 'gitlab', 'behance', 'dribbble',
    'instagram', 'twitter', 'facebook', 'medium', 'devto',
    'stackoverflow', 'email', 'website', 'youtube', 'twitch'
  ];

 @Input() searchText: string = '';
 @Input() linkInicial: string = '';
   filteredLinks: string[] = [];
   selectedLink: string | null = null;
  @Output() retornarLinkInicialEPosterior = new EventEmitter<{ inicial: string; atual: string }>();

  onInputChange(): void {
    const query = this.searchText.toLowerCase();

    if (query.length === 0) {
      this.filteredLinks = [];
      return;
    }

    this.filteredLinks = this.links.filter(link =>
      link.startsWith(query)
    );
  }

  highlightMatch(link: string): string {
    const query = this.searchText.toLowerCase();
    const boldPart = `<strong>${link.substring(0, query.length)}</strong>`;
    const rest = link.substring(query.length);
    return boldPart + rest;
  }

  selectLink(link: string): void {
    this.selectedLink = link;
    this.searchText = link;
    this.filteredLinks = [];
    if(link !== this.linkInicial) {
      this.retornarLinkInicialEPosterior.emit({ inicial: this.linkInicial, atual: link});
      this.linkInicial = '';
      this.searchText = '';
    }
  }

  onEnterKey(): void {
    const query = this.searchText.toLowerCase();
    this.selectLink(query);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      const query = this.searchText.toLowerCase();
      this.selectLink(query);
    }
  }

}
