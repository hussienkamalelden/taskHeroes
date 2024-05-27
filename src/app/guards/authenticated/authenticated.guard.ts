import { Router } from '@angular/router';

export function authenticatedGuard(route: any, state: any): boolean {
  const router = new Router(); // Instantiate the Router
  const token = localStorage.getItem('heroData');

  if (token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
}