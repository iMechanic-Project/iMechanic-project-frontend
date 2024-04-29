import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {HeaderLayoutComponent} from "./header-layout/header-layout.component";


@Component({
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FooterComponent,
    HeaderLayoutComponent,
  ],
  templateUrl: './layout-pages.component.html',
  styles: ``
})
export default class LayoutPagesComponent {

}
