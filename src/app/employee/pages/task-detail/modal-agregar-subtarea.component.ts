import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-agregar-subtarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()"></div>
    <div class="modal-content">
      <h3>Agregar subtarea</h3>
      <input
        type="text"
        [(ngModel)]="titulo"
        placeholder="Título de la subtarea"
      />
      <div class="modal-actions">
        <button (click)="add()" [disabled]="!titulo.trim()">Agregar</button>
        <button (click)="close()">Cancelar</button>
      </div>
    </div>
  `,
  styleUrls: ['./modal-agregar-subtarea.component.css'],
})
export class ModalAgregarSubtareaComponent {
  @Output() subtareaAgregada = new EventEmitter<string>();
  @Output() cerrar = new EventEmitter<void>();
  titulo = '';

  add() {
    if (this.titulo.trim()) {
      this.subtareaAgregada.emit(this.titulo.trim());
      this.titulo = '';
    }
  }

  close() {
    this.cerrar.emit();
  }
}
