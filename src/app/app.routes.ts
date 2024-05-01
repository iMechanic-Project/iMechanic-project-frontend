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
        path: 'login-users',
        title: 'Login Users',
        loadComponent: () => import('./layout-pages/pages/login-users/login-users.component')
      },
      {
        path: '',
        redirectTo: '/inicio/home-page',
        pathMatch: 'full'
      }


    ]
  },

  {
    path: 'workshop',
    loadComponent: () => import('./mechanic-view/mechanic-view.component'),
    children: [
      {
        path: 'workshop-info',
        title: 'Workshop Info',
        loadComponent: () => import('./mechanic-view/pages/workshop-info/workshop-info.component')
      },
      {
        path: 'workshop-services',
        title: 'Workshop Services',
        loadComponent: () => import('./mechanic-view/pages/workshop-services/workshop-services.component')
      },
      {
        path: 'workshop-mechanics',
        title: 'Workshop Services',
        loadComponent: () => import('./mechanic-view/pages/workshop-mechanics/workshop-mechanics.component')
      },
      {
        path: 'create-order',
        title: 'Create Order',
        loadComponent: () => import('./mechanic-view/pages/create-order/create-order.component')
      },
      {
        path: 'order-list',
        title: 'Order List',
        loadComponent: () => import('./mechanic-view/pages/order-list/order-list.component')
      },
      {
        path: '',
        redirectTo: '/workshop/workshop-info',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'client',
    loadComponent: () => import('./client-view/client-view.component'),
    children: [
      {
        path: 'edit-info',
        title: 'Edit Info',
        loadComponent: () => import('./client-view/pages/edit-info/edit-info.component')
      },
      {
        path: 'register-vehicles',
        title: 'Register Vehicles',
        loadComponent: () => import('./client-view/pages/register-vehicles/register-vehicles.component')
      },

      {
        path: '',
        redirectTo: '/client/edit-info',
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
