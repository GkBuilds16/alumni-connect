import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const user = localStorage.getItem('userEmail');

  if (user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};