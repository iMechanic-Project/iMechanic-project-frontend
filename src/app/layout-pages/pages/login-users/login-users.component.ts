import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationLoginDTORequest } from '../../../interfaces/AuthenticationLoginDTORequest ';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-users',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-users.component.html',
  styles: ''
})
export default class LoginUsersComponent {
  showPassword: boolean = false;
  loginDTORequest: AuthenticationLoginDTORequest = { correoElectronico: '', contrasenia: '' };
  roleUser: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.authService.login(this.loginDTORequest).subscribe(response => {
      localStorage.setItem('token', response.token);
      console.log('Login successfully', response);
      if (response.role == 'ROLE_TALLER') {
        this.router.navigate(['/workshop/workshop-services']);
      } else if (response.role == 'ROLE_CLIENTE') {
        this.router.navigate(['/client/register-vehicles']);
      } else if (response.role == 'ROLE_MECANICO') {
        this.router.navigate(['/employee/view-info']);
      }
    }, error => {
      console.log('Error during login: ', error)
    });
  }
}
