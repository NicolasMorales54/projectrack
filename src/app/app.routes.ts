import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'recover-password',
    loadComponent: () =>
      import('./auth/recover-password/recover-password.component').then(
        (m) => m.RecoverPasswordComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
    pathMatch: 'full',
  },
];
