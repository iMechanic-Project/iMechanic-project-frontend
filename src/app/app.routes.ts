import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./layout-pages/layout-pages.component'),
    children: [
      {
        path: 'home-page',
        title: 'Home Page',
        loadComponent: () => import('./layout-pages/pages/home-page/home-page.component')
      },
      {
        path: 'register-users',
        title: 'Register Users',
        loadComponent: () => import('./layout-pages/pages/register-users/register-users.component')
      },
      {
        path: '',
        redirectTo: '/inicio/home-page',
        pathMatch: 'full'
      }


    ]
  },
  {
    path: 'verificar/:token',
    loadComponent: () => import('./layout-pages/pages/verify-account/verify-account.component'),
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }

];
