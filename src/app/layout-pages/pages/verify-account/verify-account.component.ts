import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './verify-account.component.html',
  styles: ''
})
export default class VerifyAccountComponent implements OnInit {

  public nombre: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];

      this.authService.confirmation(token)
        .subscribe(
          response => {
            console.log('Cuenta confirmada exitosamente:', response);
            // Aquí puedes redirigir a una página de éxito o mostrar un mensaje al usuario
          },
          error => {
            console.error('Error al confirmar cuenta:', error);
            // Aquí puedes redirigir a una página de error o mostrar un mensaje al usuario
          }
        );
    });
  }

}

