export interface SubtaskAssignment {
  id: number;
  subtareaId: number;
  usuarioId: number;
  subtarea?: any;
  usuario?: any;
}

export interface CreateSubtaskAssignmentDto {
  subtareaId: number;
  usuarioId: number;
}

export interface UpdateSubtaskAssignmentDto
  extends Partial<CreateSubtaskAssignmentDto> {}
