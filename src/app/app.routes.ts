import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { authenticatedGuard } from './guards/authenticated/authenticated.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile/:id',
        loadComponent: () =>
            import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'myprofile',
        loadComponent: () =>
            import('./pages/myprofile/myprofile.component').then(m => m.MyProfileComponent),
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];