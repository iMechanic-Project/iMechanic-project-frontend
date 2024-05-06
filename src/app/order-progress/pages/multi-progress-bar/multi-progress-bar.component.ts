import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ServicioDetalleDTO } from '../../../interfaces/ServicioDetalleDTO';

@Component({
  selector: 'app-multi-progress-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './multi-progress-bar.component.html',
  styleUrl: './multi-progress-bar.component.css'
})
export class MultiProgressBarComponent {

  @Input() orderServices: ServicioDetalleDTO[] = [];

  showModal = false;

  constructor() {
    this.addStartEndSteps();
  }

  getColorClass(estado: string): string {
    switch (estado) {
      case 'EN_PROCESO':
        return 'text-green-600'; // Verde
      case 'EN_ESPERA':
        return 'text-red-600'; // Rojo
      case 'FINALIZADO':
        return 'text-black'; // Negro
      default:
        return estado; // Devuelve el estado tal cual si no coincide con ninguno de los casos anteriores
    }
  }

  addStartEndSteps(): void {
    this.orderServices.forEach(order => {
      // Agregar el paso de inicio si no está presente
      if (!order.pasos.find(step => step.nombre === 'Inicio')) {
        order.pasos.unshift({ nombre: 'Inicio', completado: true });
      }
      // Agregar el paso de fin si no está presente
      if (!order.pasos.find(step => step.nombre === 'Fin')) {
        order.pasos.push({ nombre: 'Fin', completado: false });
      }
    });
  }

}
