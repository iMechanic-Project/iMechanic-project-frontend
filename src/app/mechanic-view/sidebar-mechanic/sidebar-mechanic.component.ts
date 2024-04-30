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
  showDropdown2: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdown2(): void {
    this.showDropdown2 = !this.showDropdown2;
  }

}
