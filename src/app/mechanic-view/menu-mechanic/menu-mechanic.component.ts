import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-mechanic',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './menu-mechanic.component.html',
  styles: ''
})
export class MenuMechanicComponent {

  isDropdownOpenxs: boolean = false;

  toggleDropdownxs(): void {
    this.isDropdownOpenxs = !this.isDropdownOpenxs;
  }


}
