import { Component } from '@angular/core';
import { HeaderOrderProgressComponent } from "../../../order-progress/header-order-progress/header-order-progress.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
  imports: [
    HeaderOrderProgressComponent,
    RouterLink
  ]
})
export default class PageNotFoundComponent {

}
