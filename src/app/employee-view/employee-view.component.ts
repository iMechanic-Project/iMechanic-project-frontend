import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {RouterOutlet} from "@angular/router";
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

}
