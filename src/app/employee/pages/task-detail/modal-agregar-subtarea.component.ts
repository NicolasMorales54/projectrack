import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SubtasksService } from '../../../core/services/subtasks.service';
import { Subtask } from '../../../core/model/subtask.model';

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
        <button (click)="add()" [disabled]="!titulo.trim() || loading">
          Agregar
        </button>
        <button (click)="close()">Cancelar</button>
      </div>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  `,
  styleUrls: ['./modal-agregar-subtarea.component.css'],
})
export class ModalAgregarSubtareaComponent {
  @Input() taskId!: number;
  @Output() subtareaAgregada = new EventEmitter<Subtask>();
  @Output() cerrar = new EventEmitter<void>();
  titulo = '';
  loading = false;
  error: string | null = null;

  constructor(private subtasksService: SubtasksService) {}
  add() {
    if (this.titulo.trim() && this.taskId) {
      this.loading = true;
      this.error = null;
      // Create DTO object that matches the interface defined in the app
      const createDto = {
        tareaId: this.taskId,
        titulo: this.titulo.trim(),
        texto: '', // Optional text field
        completada: false, // Set default to false as requested
      };

      this.subtasksService.createForTask(this.taskId, createDto).subscribe({
        next: (subtask) => {
          this.subtareaAgregada.emit(subtask);
          this.titulo = '';
          this.loading = false;
          this.close();
        },
        error: (err) => {
          console.error('Error creating subtask:', err);
          this.error = 'Error al agregar subtarea';
          this.loading = false;
        },
      });
    }
  }

  close() {
    this.cerrar.emit();
  }
}
