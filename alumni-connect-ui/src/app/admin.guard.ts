import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { getRoleFromToken } from './jwt.util';   // 🔥 IMPORTANT

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const role = getRoleFromToken();   // 🔥 from JWT

  if (role === 'ADMIN') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};