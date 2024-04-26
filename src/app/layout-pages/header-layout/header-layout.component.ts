import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './header-layout.component.html',
  styles: ''
})
export class HeaderLayoutComponent {

  isDropdownOpen: boolean = true;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
