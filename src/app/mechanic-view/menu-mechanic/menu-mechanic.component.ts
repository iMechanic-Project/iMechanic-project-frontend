import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-mechanic',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './menu-mechanic.component.html',
  styles: ''
})
export class MenuMechanicComponent {

  isDropdownOpenxs: boolean = false;

  toggleDropdownxs(): void {
    this.isDropdownOpenxs = !this.isDropdownOpenxs;
  }

  constructor(private router: Router) {}

  closeSesion(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      const navigationPromise = this.router.navigate(['/inicio/login-users']);
      if (navigationPromise) {
        navigationPromise.then(success => {
          if (!success) {
            console.error('Navigation failed!');
          }
        }).catch(error => {
          console.error('Navigation error:', error);
        });
      } else {
        console.error('Navigation did not return a promise.');
      }
    } else {
      console.error('LocalStorage is not available.');
    }
  }


}
