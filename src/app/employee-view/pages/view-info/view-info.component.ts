import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-view-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './view-info.component.html',
  styles: ''
})
export default class ViewInfoComponent {
  employee = {
    nameEmployee: '',
    passwordEmployee:'',
    emailEmployee: '',
    addressEmpoyee: '',
    phoneEmployee: '',
  };
}
