import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit-info.component.html',
  styles: ''
})
export default class EditInfoComponent {

  cliente = {
    nameCustomer: '',
    passwordCustomer:'',
    emailCustomer: '',
    addressCustomer: '',
    phoneCustomer: '',
  };

}
