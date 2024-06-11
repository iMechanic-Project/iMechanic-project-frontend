import { Component } from '@angular/core';
import {SidebarClientComponent} from "./sidebar-client/sidebar-client.component";
import {MenuClientComponent} from "./menu-client/menu-client.component";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [
    SidebarClientComponent,
    MenuClientComponent,
    RouterModule,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './client-view.component.html',
  styles: ''
})
export default class ClientViewComponent {

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
