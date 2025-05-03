import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmModal = new EventEmitter<boolean>();
  @Input() public title: string = '';
  @Input() public message: string = '';
  @Input() public confirmButtonText: string = 'Confirmar';
  @Input() public closeButtonText: string = 'Cancelar';
  @Input() public danger: boolean = false;
  @Input() public carregandoClose: boolean = false;
  @Input() public carregandoConfirm: boolean = false;
  @Input() public salvarAlteracoes: boolean = false;

  onClose() {
    this.carregandoClose = true;
    this.closeModal.emit();
  }
  onConfirm() {
    this.carregandoConfirm = true;
    this.confirmModal.emit(this.salvarAlteracoes);
  }
}
