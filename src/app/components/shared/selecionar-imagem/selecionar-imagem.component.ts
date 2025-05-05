import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Imagem} from '../../../models/response/Imagem';
import {NgIf} from '@angular/common';

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
    if (this.imagem) {
      this.imagePreviewUrl = `data:${this.imagem.contentType};base64,${this.imagem.data}`;
    } else {
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
        const base64Data = (reader.result as string).split(',')[1];

        const novaImagem: Imagem = {
          id: crypto.randomUUID(), // ou null, se preferir
          name: file.name,
          contentType: file.type,
          data: base64Data
        };

        this.imagemAlterada.emit(novaImagem);
        this.imagePreviewUrl = `data:${novaImagem.contentType};base64,${novaImagem.data}`;
      };

      reader.readAsDataURL(file);
    }
  }

  abrirPopUpRemoverImagem(){
    this.imagemRemoverPopUp = true;
  }
  fecharPopUpRemoverImagem(){
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
