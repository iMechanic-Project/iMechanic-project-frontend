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
    RouterModule,
    RouterOutlet,
    FooterComponent,
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
      // sessionStorage.removeItem('token');
      this.router.navigate(['/inicio/login-users']).then(success => {
        if (!success) {
          console.error('Navigation failed!');
        }
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    } else {
      console.error('LocalStorage is not available.');
    }
  }
}
