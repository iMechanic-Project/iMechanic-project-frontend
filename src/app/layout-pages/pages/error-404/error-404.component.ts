import { Component } from '@angular/core';
import {HeaderLayoutComponent} from "../../header-layout/header-layout.component";
import {
  HeaderOrderProgressComponent
} from "../../../order-progress/header-order-progress/header-order-progress.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../../footer/footer.component";

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    HeaderOrderProgressComponent,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './error-404.component.html',
  styles: ''
})
export default class Error404Component {

}
