import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const workshopGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth() && authService.hasRole('WORKSHOP')) {
    return true;
  }
  else {
    return router.createUrlTree(['/inicio/login-users']);
  }
};

export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth() && authService.hasRole('CUSTOMER')) {
    return true;
  }
  else {
    return router.createUrlTree(['/inicio/login-users']);
  }
};

export const mechanicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuth() && authService.hasRole('MECHANIC')) {
    return true;
  }
  else {
    return router.createUrlTree(['/inicio/login-users']);
  }
};
