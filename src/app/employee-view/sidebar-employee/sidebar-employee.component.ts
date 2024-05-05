import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar-employee',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar-employee.component.html',
  styles: ''
})
export class SidebarEmployeeComponent {

  p: number = 1;

  showDropdown: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

}
