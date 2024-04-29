import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sidebar-client.component.html',
  styles: ''
})
export class SidebarClientComponent {

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
