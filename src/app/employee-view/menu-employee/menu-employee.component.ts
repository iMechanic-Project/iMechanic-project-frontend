import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-menu-employee',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './menu-employee.component.html',
  styles: ''
})
export class MenuEmployeeComponent {

  isDropdownOpenxs: boolean = false;

  toggleDropdownxs(): void {
    this.isDropdownOpenxs = !this.isDropdownOpenxs;
  }

}
