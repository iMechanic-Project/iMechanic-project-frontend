import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {SidebarMechanicComponent} from "./sidebar-mechanic/sidebar-mechanic.component";
import {MenuMechanicComponent} from "./menu-mechanic/menu-mechanic.component";

@Component({
  selector: 'app-mechanic-view',
  standalone: true,
  imports: [
    FooterComponent,
    RouterOutlet,
    SidebarMechanicComponent,
    MenuMechanicComponent,
  ],
  templateUrl: './mechanic-view.component.html',
  styles: ''
})
export default class MechanicViewComponent {

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
