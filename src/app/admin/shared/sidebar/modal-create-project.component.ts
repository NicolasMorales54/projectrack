import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  EstadoProyecto,
  CreateProjectDto,
  Project,
} from '../../../core/model/project.model';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-modal-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()"></div>
    <div class="modal-content">
      <h3>Crear proyecto</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input
          formControlName="nombre"
          placeholder="Nombre de proyecto"
          class="mb-2"
        />
        <textarea
          formControlName="descripcion"
          placeholder="Descripción (opcional)"
          rows="3"
          class="mb-2"
        ></textarea>
        <input
          type="date"
          formControlName="fechaInicio"
          placeholder="Fecha inicio"
          class="mb-2"
        />
        <input
          type="date"
          formControlName="fechaFin"
          placeholder="Fecha fin (opcional)"
          class="mb-2"
        />
        <select formControlName="estado" class="mb-4">
          <option *ngFor="let s of estados" [value]="s">{{ s }}</option>
        </select>
        <div class="actions">
          <button type="submit" [disabled]="form.invalid || loading">
            {{ loading ? 'Creando...' : 'Crear proyecto' }}
          </button>
          <button type="button" (click)="close()">Cancelar</button>
        </div>
      </form>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  `,
  styleUrls: ['./modal-create-project.component.css'],
})
export class ModalCreateProjectComponent {
  @Output() projectCreated = new EventEmitter<Project>();
  @Output() closeModal = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  error: string | null = null;

  estados = Object.values(EstadoProyecto);

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {
    this.form = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      descripcion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      estado: [EstadoProyecto.ABIERTO, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const dto: CreateProjectDto = this.form.value;
    // if selecting 'En Progreso' without fechaInicio, set to now
    if (dto.estado === EstadoProyecto.EN_PROGRESO && !dto.fechaInicio) {
      dto.fechaInicio = new Date().toISOString();
    }
    this.projectsService.create(dto).subscribe({
      next: (project: Project) => {
        this.projectCreated.emit(project);
        this.reset();
        this.close();
      },
      error: (err: any) => {
        this.error = 'Error al crear proyecto';
        this.loading = false;
      },
    });
  }

  close() {
    this.closeModal.emit();
  }

  private reset() {
    this.form.reset({
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      estado: EstadoProyecto.ABIERTO,
    });
    this.loading = false;
    this.error = null;
  }
}
