import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationLoginDTORequest } from '../../../interfaces/AuthenticationLoginDTORequest ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-users.component.html',
  styles: '',
})
export default class LoginUsersComponent {
  showMSGdi: boolean = false;
  showMSGne: boolean = false;
  showPassword: boolean = false;
  loginDTORequest: AuthenticationLoginDTORequest = {
    email: '',
    password: '',
  };
  roleUser: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.checkIncompleteData()) {
      this.showMSGdi = true;
      this.showMSGne = false;

      return; // Detener la función si hay algún dato incompleto
    }
    this.showMSGdi = false;
    this.authService.login(this.loginDTORequest).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        // sessionStorage.setItem('token', response.token);
        console.log('Login successfully', response);
        if (response.role == 'WORKSHOP') {
          this.router.navigate(['/workshop/workshop-services']);
        } else if (response.role == 'CUSTOMER') {
          this.router.navigate(['/client/register-vehicles']);
        } else if (response.role == 'MECHANIC') {
          this.router.navigate(['/employee/order-list-employee']);
        }
      },
      (error) => {
        console.log('Error during login: ', error);
        this.showMSGne = true;
        this.showMSGdi = false;
      }
    );
  }

  checkIncompleteData(): boolean {
    if (
      !this.loginDTORequest.email ||
      !this.loginDTORequest.password
    ) {
      return true; // Hay datos incompletos
    }
    return false; // No hay datos incompletos
  }
}
