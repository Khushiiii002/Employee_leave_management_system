import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isHR = localStorage.getItem('isHR') === 'true';
  if (isHR) {
    return true;
  }
  router.navigate(['/dashboard']);
  return false;
};
