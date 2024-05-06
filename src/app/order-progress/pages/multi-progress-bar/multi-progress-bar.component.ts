import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

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

  showModal = false;

  orderServices = [
    {
      servicio: 'Cambio de aceite',
      mecanico: 'Daigo Campos111',
      estado: 'En espera',
      serviciospaso: [
        { name: 'Inicio', completed: true },
        { name: 'Inspeccion visual11111', completed: true },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: true },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: true },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: false },
        { name: 'Fin', completed: false }
      ],
    },
    {
      servicio: 'Revisión de frenos',
      mecanico: 'Juan Pérez1111',
      estado: 'En progreso',
      serviciospaso: [
        { name: 'Inicio', completed: true },
        { name: 'Inspeccion visual2222', completed: false },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: false },

        { name: 'Fin', completed: false }
      ],
    },
    {
      servicio: 'Limpieza total',
      mecanico: 'Gaillermo',
      estado: 'finalizado',
      serviciospaso: [
        { name: 'Inicio', completed: true },
        { name: 'Inspeccion visual2222', completed: true },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: true },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: true },
        { name: 'Revision y recarga del sistema del aire acondicionado', completed: true },
        { name: 'Fin', completed: false }
      ],
    },
  ];

  getColorClass(estado: string): string {
    switch (estado) {
      case 'En progreso':
        return 'text-green-600'; // Verde
      case 'En espera':
        return 'text-red-600'; // Rojo
      case 'finalizado':
        return 'text-black'; // Negro
      default:
        return estado; // Devuelve el estado tal cual si no coincide con ninguno de los casos anteriores
    }
  }

}
