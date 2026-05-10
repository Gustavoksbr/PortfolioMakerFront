import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Imagem } from '../../../models/response/Imagem';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-selecionar-imagem',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './selecionar-imagem.component.html',
  styleUrl: './selecionar-imagem.component.scss'
})
export class SelecionarImagemComponent implements OnInit, OnChanges {
  @Input() imagem: Imagem | null = null;
  @Input() somenteVisualizacao = false;

  @Output() imagemAlterada = new EventEmitter<Imagem>();
  @Output() imagemRemovida = new EventEmitter<void>();

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  imagePreviewUrl: string | null = null;
  labelText = 'Adicionar foto';
  public imagemRemoverPopUp = false;
  ngOnInit(): void {
    this.atualizarPreview();
  }

  ngOnChanges(): void {
    this.atualizarPreview();
  }

  private atualizarPreview(): void {
    if (this.imagem && this.imagem.url) {
      // Se a URL começa com "data:", é Base64 (preview local)
      // Se começa com "http", é URL do Cloudinary
      console.log('Atualizando preview com URL:', this.imagem.url);
      this.imagePreviewUrl = this.imagem.url;
    } else {
      console.log('Sem imagem para preview');
      this.imagePreviewUrl = null;
    }
  }

  onFileSelected(event: Event): void {
    if (this.somenteVisualizacao) return;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Full = reader.result as string; // "data:image/png;base64,iVBORw0KG..."

        const novaImagem: Imagem = {
          id: crypto.randomUUID(),
          name: file.name,
          url: base64Full // Envia o Base64 completo, o backend converte para URL
        };

        this.imagemAlterada.emit(novaImagem);
        this.imagePreviewUrl = base64Full;
      };

      reader.readAsDataURL(file);
    }
  }

  abrirPopUpRemoverImagem() {
    this.imagemRemoverPopUp = true;
  }
  fecharPopUpRemoverImagem() {
    this.imagemRemoverPopUp = false;
  }
  removerImagem(): void {
    this.imagemRemoverPopUp = false;
    if (this.somenteVisualizacao) return;

    this.imagePreviewUrl = null;
    this.imagemRemovida.emit();

    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }
}
