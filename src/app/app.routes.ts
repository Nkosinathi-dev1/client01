import { Routes } from '@angular/router';


import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },{
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }      
      ,{
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        canActivate: [authGuard]
      },
      {
        path: 'check-in',
        loadComponent: () =>
          import('./features/visitors/check-in/check-in.component').then(m => m.CheckInComponent),
        canActivate: [authGuard]
      },
      {
        path: 'check-out',
        loadComponent: () =>
          import('./features/visitors/check-out/check-out.component').then(m => m.CheckOutComponent),
        canActivate: [authGuard]
      },      
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
];
