import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    console.log('Login form submitted:', this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        const userId = response.userId;
        const rol = response.rol;
        console.log('Login successful, user ID:', userId, 'role:', rol);
        console.log('Role type:', typeof rol);

        if (userId && rol) {
          let route = '';
          switch (rol) {
            case 'Administrador':
              route = '/admin/main';
              console.log('Routing to admin main page');
              break;
            case 'Líder de Proyecto':
              route = '/leader/main';
              console.log('Routing to leader main page');
              break;
            case 'Empleado':
              route = '/employee/main';
              console.log('Routing to employee main page');
              break;
            case 'Cliente':
              route = '/client/main';
              console.log('Routing to client main page');
              break;
            default:
              console.log('Unknown role:', rol);
              route = `/${userId}/main`;
              console.log('Routing to default main page');
          }
          console.log('Navigating to route:', route);
          this.router.navigate([route]);
        }
      },
      error: (err) => {
        this.loading = false;

        if (
          err.message?.includes('Invalid token structure') ||
          err.message?.includes('Invalid token received')
        ) {
          alert(
            'Error de autenticación: El servidor devolvió una respuesta inválida. Por favor contacte al soporte técnico.'
          );
        } else {
          alert('Correo o contraseña incorrectos');
        }
      },
    });
  }
}
