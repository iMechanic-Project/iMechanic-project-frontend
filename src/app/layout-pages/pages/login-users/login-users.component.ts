import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationLoginDTORequest } from '../../../interfaces/AuthenticationLoginDTORequest ';


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

  constructor(private authService: AuthService) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.authService.login(this.loginDTORequest).subscribe(response => {
      console.log('Login successfully', response);
    }, error => {
      console.log('Error during login: ', error)
    });
  }
}
