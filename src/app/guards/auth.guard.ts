import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return isAuthenticated();
};

function isAuthenticated(): boolean {
  const heroData = localStorage.getItem("heroData");
  if (!heroData) {
    return false;
  }
  try {
    const parsedData = JSON.parse(heroData);
    return parsedData.token;
  } catch (error) {
    console.error('Error parsing heroData:', error);
    return false;
  }
}