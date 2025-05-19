export interface Subtask {
  id: number;
  tareaId: number;
  titulo: string;
  texto?: string;
  completada: boolean;
  tarea?: any;
}

export interface CreateSubtaskDto {
  tareaId: number;
  titulo: string;
  texto?: string;
  completada?: boolean;
}

export interface UpdateSubtaskDto extends Partial<CreateSubtaskDto> {}
