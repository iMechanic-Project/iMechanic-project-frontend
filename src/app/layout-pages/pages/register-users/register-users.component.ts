import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationSignUpDTORequest } from '../../../interfaces/AuthenticationSignUpDTORequest';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import {LoadingRegisterUserComponent} from "../loading-register-user/loading-register-user.component";

@Component({
  selector: 'app-register-users',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingRegisterUserComponent],
  templateUrl: './register-users.component.html',
  styles: '',
})
export default class RegisterUsersComponent {
  passwordsMatch: boolean = true;
  showModalLoading = false;
  showModal = false;
  showModal2 = false;
  confirmarContrasenia: String = '';
  showMSGdi = false;
  showMSGci = false;

  signUpDTORequest: AuthenticationSignUpDTORequest = {
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    role: '',
  };

  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  showDescripcion: boolean = false;
  rol: string = 'CUSTOMER';

  constructor(private authService: AuthService) {}

  openModal(): void {
    this.showModal = true;
  }

  openModalLoading(): void {
    this.showModalLoading = true;
  }

  closeModalLoading(): void {
    this.showModalLoading = false;
  }

  openModal2(): void {
    this.showModal2 = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  closeModal2(): void {
    this.showModal2 = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmation(): void {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  toogleRol(): void {
    this.showDescripcion = !this.showDescripcion;
    this.rol = this.showDescripcion ? 'WORKSHOP' : 'CUSTOMER';
    console.log('Estado de showDescripcion:', this.showDescripcion);
    console.log('Rol:', this.rol);
  }

  onSubmit() {
    // Verificar si las contraseñas coinciden
    if (this.signUpDTORequest.password !== this.confirmarContrasenia) {
      this.passwordsMatch = false;
      console.log('Contraseñas iguales:', this.passwordsMatch);
      this.showMSGdi = false;
      this.showMSGci = true;
      return; // Detener la función si las contraseñas no coinciden
    }
    console.log('Contraseñas iguales:', this.passwordsMatch);
    if (this.checkIncompleteData()) {
      this.showMSGci = false;
      this.showMSGdi = true;
      return; // Detener la función si hay algún dato incompleto
    }
    this.showMSGdi = false;
    this.showMSGci = false;
    console.log('Contraseñas iguales:', this.passwordsMatch);
    this.signUpDTORequest.role = this.rol;
    this.openModalLoading();
    this.authService.signUp(this.signUpDTORequest).subscribe(
      (response) => {
        // añadir pantalla de carga hasta que llegue correo de verificacion enviado por favor confirme su cuenta
        console.log('Registro exitoso:', response);
        this.closeModalLoading();
        this.openModal();
      },
      (error) => {
        console.error('Error al registrar:', error);
      }
    );
  }

  onKeyPress(event: any) {
    // Obtener el código de la tecla presionada
    const charCode = event.which ? event.which : event.keyCode;
    // Permitir solo números (del 0 al 9) y teclas de control como borrar y retroceso
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault(); // Cancelar el evento si no es un número
    }
  }

  checkIncompleteData(): boolean {
    if (
      !this.signUpDTORequest.email ||
      !this.confirmarContrasenia ||
      !this.signUpDTORequest.password ||
      !this.signUpDTORequest.name ||
      !this.signUpDTORequest.address ||
      !this.signUpDTORequest.phone
    ) {
      return true; // Hay datos incompletos
    }
    return false; // No hay datos incompletos
  }
}
