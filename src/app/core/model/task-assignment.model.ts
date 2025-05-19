export interface TaskAssignment {
  id: number;
  tareaId: number;
  usuarioId: number;
  tarea?: any;
  usuario?: any;
}

export interface CreateTaskAssignmentDto {
  tareaId: number;
  usuarioId: number;
}

export interface UpdateTaskAssignmentDto
  extends Partial<CreateTaskAssignmentDto> {}
