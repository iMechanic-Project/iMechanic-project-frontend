import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-client',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './menu-client.component.html',
  styles: ''
})
export class MenuClientComponent {

  isDropdownOpenxs: boolean = false;

  toggleDropdownxs(): void {
    this.isDropdownOpenxs = !this.isDropdownOpenxs;
  }

}
