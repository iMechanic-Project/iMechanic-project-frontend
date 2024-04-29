import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar-mechanic',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sidebar-mechanic.component.html',
  styles: ''
})
export class SidebarMechanicComponent {


  p: number = 1;

  showDropdown: boolean = false;
  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }


  toggleDropdown3() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
