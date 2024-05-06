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
        path: 'services-list',
        title: 'Services List',
        loadComponent: () => import('./mechanic-view/pages/services-list/services-list.component')
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
        path: 'order-list-client',
        title: 'Order List Client',
        loadComponent: () => import('./client-view/pages/order-list-client/order-list-client.component')
      },
      {
        path: '',
        redirectTo: '/client/edit-info',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'employee',
    loadComponent: () => import('./employee-view/employee-view.component'),
    children: [
      {
        path: 'order-list-employee',
        title: 'Order List Employee',
        loadComponent: () => import('./employee-view/pages/order-list-employee/order-list-employee.component')
      },
      {
        path: 'view-info',
        title: 'View Info',
        loadComponent: () => import('./employee-view/pages/view-info/view-info.component')
      },

      {
        path: '',
        redirectTo: '/employee/view-info',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'progress',
    loadComponent: () => import('./order-progress/order-progress.component'),
    children: [
      {
        path: 'employee-progress/:id',
        title: 'Employee Progress',
        loadComponent: () => import('./order-progress/pages/employee-progress/employee-progress.component')
      },
      {
        path: 'client-progress/:id',
        title: 'Client Progress',
        loadComponent: () => import('./order-progress/pages/client-progress/client-progress.component')
      },
      {
        path: '',
        redirectTo: '/progress/employee-progress/:id',
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
