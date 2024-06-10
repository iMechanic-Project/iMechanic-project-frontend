import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Router, RouterOutlet} from "@angular/router";
import {SidebarEmployeeComponent} from "./sidebar-employee/sidebar-employee.component";
import {MenuEmployeeComponent} from "./menu-employee/menu-employee.component";

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [
    FooterComponent,
    RouterOutlet,
    SidebarEmployeeComponent,
    MenuEmployeeComponent
  ],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export default class EmployeeViewComponent {

  constructor(private router: Router) {}

  closeSesion(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
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
