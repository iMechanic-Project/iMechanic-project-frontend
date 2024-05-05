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
  showDropdown2: boolean = false;


  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdown2(): void {
    this.showDropdown2 = !this.showDropdown2;
  }


}
