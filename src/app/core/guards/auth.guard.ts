import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';

import { LoginService } from '../../auth/services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Ensure stored token is loaded (for page refresh)
  if (!loginService.isLoggedIn()) {
    // Try to load token from storage if not already loaded
    if (typeof loginService['loadStoredToken'] === 'function') {
      loginService['loadStoredToken']();
    }
    if (!loginService.isLoggedIn()) {
      return router.parseUrl('/login');
    }
  }

  // Get current user ID
  const currentUserId = loginService.getCurrentUserId();

  // For routes with userId param, validate it matches logged in user
  const requestedUserId = route.params['userid'];
  if (requestedUserId && requestedUserId !== currentUserId?.toString()) {
    console.warn('User ID mismatch, redirecting to correct path');
    if (currentUserId) {
      // Redirect to the same route but with correct user ID
      return router.parseUrl(
        `/${currentUserId}${state.url.substring(state.url.indexOf('/', 1))}`
      );
    }
    return router.parseUrl('/login');
  }

  return true;
};
