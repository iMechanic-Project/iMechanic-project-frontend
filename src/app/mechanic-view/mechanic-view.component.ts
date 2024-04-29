import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {SidebarMechanicComponent} from "./sidebar-mechanic/sidebar-mechanic.component";
import {MenuMechanicComponent} from "./menu-mechanic/menu-mechanic.component";

@Component({
  selector: 'app-mechanic-view',
  standalone: true,
  imports: [
    FooterComponent,
    RouterModule,
    RouterOutlet,
    FooterComponent,
    SidebarMechanicComponent,
    MenuMechanicComponent,
  ],
  templateUrl: './mechanic-view.component.html',
  styles: ''
})
export default class MechanicViewComponent {

  isDropdownOpenxs: boolean = false;


  toggleDropdownxs(): void {
    this.isDropdownOpenxs = !this.isDropdownOpenxs;
  }



}
