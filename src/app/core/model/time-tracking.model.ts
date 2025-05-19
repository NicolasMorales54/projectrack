export interface TimeTracking {
  id: number;
  tareaId: number;
  usuarioId: number;
  tiempoInicio: Date;
  tiempoFin?: Date;
  fechaRegistro: Date;
  notas?: string;
  fechaCreacion: Date;
  tarea?: any;
  usuario?: any;
}

export interface CreateTimeTrackingDto {
  tareaId: number;
  usuarioId: number;
  tiempoInicio: Date;
  tiempoFin?: Date;
  notas?: string;
}

export interface UpdateTimeTrackingDto extends Partial<CreateTimeTrackingDto> {}
