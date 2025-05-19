import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  TimeTracking,
  CreateTimeTrackingDto,
  UpdateTimeTrackingDto,
} from '../model/time-tracking.model';
import { LoginService } from '../../auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  private readonly apiUrl = 'http://localhost:3000/time-register';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  create(dto: CreateTimeTrackingDto): Observable<TimeTracking> {
    // Map frontend fields to backend fields
    const userId = this.loginService.getCurrentUserId();
    const payload: any = {
      ...dto,
      userId: dto.usuarioId || userId,
      taskId: dto.tareaId,
      tiempoInicio: dto.tiempoInicio,
      tiempoFin: dto.tiempoFin,
      notas: dto.notas,
    };
    delete payload.usuarioId;
    delete payload.tareaId;
    return this.http.post<TimeTracking>(this.apiUrl, payload);
  }

  findAll(): Observable<TimeTracking[]> {
    return this.http.get<TimeTracking[]>(this.apiUrl);
  }

  findOne(id: number): Observable<TimeTracking> {
    return this.http.get<TimeTracking>(`${this.apiUrl}/${id}`);
  }

  update(id: number, dto: UpdateTimeTrackingDto): Observable<TimeTracking> {
    return this.http.patch<TimeTracking>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: number): Observable<TimeTracking> {
    return this.http.delete<TimeTracking>(`${this.apiUrl}/${id}`);
  }

  // No /time-register/task/:id endpoint in backend, so filter client-side
  findByTaskId(taskId: number): Observable<TimeTracking[]> {
    return this.findAll().pipe(
      map((records) => records.filter((r) => r.tareaId === taskId))
    );
  }

  findByUserId(userId: number): Observable<TimeTracking[]> {
    return this.findAll().pipe(
      map((records) => records.filter((r) => r.usuarioId === userId))
    );
  }

  findMyTracking(): Observable<TimeTracking[]> {
    const userId = this.loginService.getCurrentUserId();
    if (userId) {
      return this.findByUserId(userId);
    }
    return this.findAll();
  }

  startTracking(taskId: number, notes?: string): Observable<TimeTracking> {
    const dto: CreateTimeTrackingDto = {
      tareaId: taskId,
      usuarioId: this.loginService.getCurrentUserId() || 0,
      tiempoInicio: new Date(),
      notas: notes,
    };
    return this.create(dto);
  }

  stopTracking(id: number): Observable<TimeTracking> {
    const dto: UpdateTimeTrackingDto = {
      tiempoFin: new Date(),
    };
    return this.update(id, dto);
  }
}
