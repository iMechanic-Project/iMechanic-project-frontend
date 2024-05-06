import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-employee-progress',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ProgressBarComponent,
  ],
  templateUrl: './employee-progress.component.html',
  styles: ''
})
export default class EmployeeProgressComponent {


  showChat = false;

  getColorClass(estado: string): string {
    switch (estado) {
      case 'En progreso':
        return 'text-green-600'; // Verde
      case 'EN_ESPERA':
        return 'text-red-600'; // Rojo
      case 'FINALIZADO':
        return 'text-black'; // Negro
      default:
        return estado; // Devuelve el estado tal cual si no coincide con ninguno de los casos anteriores
    }
  }

  datosOrden = {
    nombre: 'ralu carro malogrado',
    gmail: 'diegoguapo@gmail.com',
    telefono: '976345822',
    servicio: 'Cambio de aceite',
    mecanico: 'Daigo Campos',
    estado: 'En progreso',
  };



  openChat(): void {
    this.showChat = true;
  }

  closeChat(): void {
    this.showChat = false;
  }


}
