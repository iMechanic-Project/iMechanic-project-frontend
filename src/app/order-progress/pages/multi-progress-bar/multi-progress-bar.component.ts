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
  }


  getColorClass(estado: string): string {
    switch (estado) {
      case 'En Proceso':
        return 'text-green-600';
      case 'En Espera':
        return 'text-red-600';
      case 'Finalizado':
        return 'text-black';
      default:
        return '';
    }
  }

  mapEstado(estado: string): string {
    switch (estado) {
      case 'EN_PROCESO':
        return 'En Proceso';
      case 'EN_ESPERA':
        return 'En Espera';
      case 'FINALIZADO':
        return 'Finalizado';
      default:
        return estado;
    }
  }

}
