import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AuthenticationSignUpDTORequest } from '../../../interfaces/AuthenticationSignUpDTORequest';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register-users',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register-users.component.html',
  styles: ''
})
export default class RegisterUsersComponent {

  signUpDTORequest: AuthenticationSignUpDTORequest = {
    correoElectronico: '',
    contrasenia: '',
    nombre: '',
    telefono: '',
    direccion: '',
    role: ''
  };

  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  showDescripcion: boolean = false;
  rol: string = 'CLIENTE';

  constructor(private authService: AuthService) { }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  togglePasswordConfirmation(): void {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  toogleRol(): void {
    this.showDescripcion = !this.showDescripcion;
    this.rol = this.showDescripcion ? 'TALLER' : 'CLIENTE';
    console.log('Estado de showDescripcion:', this.showDescripcion);
    console.log('Rol:', this.rol);
  }

  onSubmit() {
    this.signUpDTORequest.role = this.rol;
    this.authService.signUp(this.signUpDTORequest)
      .subscribe(
        response => {
          console.log('Registro exitoso:', response);
        },
        error => {
          console.error('Error al registrar:', error);
        }
      );
  }
}
