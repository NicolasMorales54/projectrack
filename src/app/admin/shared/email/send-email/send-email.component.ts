import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NotificationsService } from '../../../../core/services/notifications.service';
import { EmailsService } from '../../../../core/services/emails.service';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/model/user.model';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css',
})
export class SendEmailComponent implements OnInit {
  @Input() userId!: number; // The sender's userId
  form!: FormGroup;
  loading = false;
  error: string | null = null;
  users: User[] = [];
  selectedUserId: number | null = null;

  private fb = inject(FormBuilder);
  private emailsService = inject(EmailsService);
  private notificationsService = inject(NotificationsService);
  private usersService = inject(UsersService);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      asunto: ['', [Validators.required, Validators.maxLength(100)]],
      cuerpo: ['', [Validators.required, Validators.maxLength(1000)]],
      destinatarioId: [null, Validators.required],
    });
    this.usersService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.error = 'Error cargando usuarios';
      },
    });
  }

  sendEmail() {
    if (this.form.invalid || !this.userId) return;
    this.loading = true;
    const { asunto, cuerpo, destinatarioId } = this.form.value;
    this.emailsService.sendEmail(destinatarioId, asunto, cuerpo).subscribe({
      next: (email: any) => {
        // Notificar al destinatario con el correo y la fecha/hora
        const fecha = new Date(email.fechaEnvio || Date.now());
        const fechaStr = fecha.toLocaleString('es-ES', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });
        const emisor =
          email.remitente?.correoElectronico || 'alguien de la plataforma';
        this.notificationsService
          .create({
            usuarioId: destinatarioId,
            mensaje: `Has recibido un correo de ${emisor} el ${fechaStr}`,
            tipo: 'email',
            leida: false,
          })
          .subscribe({
            next: () => {
              this.router.navigate(['/admin/inbox']);
            },
            error: () => {
              // Si la notificación falla, igual redirigimos
              this.router.navigate(['/admin/inbox']);
            },
          });
      },
      error: (_err: any) => {
        this.error = 'Error enviando el correo';
        this.loading = false;
      },
    });
  }
}
