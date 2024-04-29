import { Component } from '@angular/core';
import {SidebarClientComponent} from "./sidebar-client/sidebar-client.component";
import {MenuClientComponent} from "./menu-client/menu-client.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [
    SidebarClientComponent,
    MenuClientComponent,
    RouterModule,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './client-view.component.html',
  styles: ''
})
export default class ClientViewComponent {

}
