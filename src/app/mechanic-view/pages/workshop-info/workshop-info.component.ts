import {Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformationResponseDTO } from '../../../interfaces/InformationResponseDTO';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-workshop-info',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './workshop-info.component.html',
  styles: '',
})
export default class WorkshopInfoComponent implements OnInit{
  userInformation: InformationResponseDTO = {
    email: '',
    name: '',
    address: '',
    phone: '',
  };

  password = '*********';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getInformationByUser().subscribe(
      (response) => {
        this.userInformation = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
