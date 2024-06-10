import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-workshop-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './workshop-info.component.html',
  styles: ''
})
export default class WorkshopInfoComponent {
  workshop = {
    nameWorkshop: '',
    passwordWorkshop:'',
    emailWorkshop: '',
    addressWorkshop: '',
    phoneWorkshop: '',
  };
}
