import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/register/register.component').then(m => m.RegisterComponent),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'profile/:id',
        loadComponent: () =>
            import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    },
    {
        path: 'myprofile',
        loadComponent: () =>
            import('./pages/myprofile/myprofile.component').then(m => m.MyProfileComponent),
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];