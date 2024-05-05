import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {HeaderOrderProgressComponent} from "./header-order-progress/header-order-progress.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-order-progress',
  standalone: true,
  imports: [
    RouterLink,
    HeaderOrderProgressComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './order-progress.component.html',
  styleUrl: './order-progress.component.css'
})
export default class OrderProgressComponent {

}
