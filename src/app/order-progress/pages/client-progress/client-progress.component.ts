import { Component } from '@angular/core';
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {NgForOf, NgIf} from "@angular/common";
import {MultiProgressBarComponent} from "../multi-progress-bar/multi-progress-bar.component";

@Component({
  selector: 'app-client-progress',
  standalone: true,
  imports: [
    ProgressBarComponent,
    NgForOf,
    NgIf,
    MultiProgressBarComponent
  ],
  templateUrl: './client-progress.component.html',
  styles: ''
})
export default class ClientProgressComponent {

  showChat = false;



  orders = [
    {
      nombre: 'El Taller de David',
      direccion: 'Las Camelias 450 - Santa Inés',
      telefono: '976345822',
      codigo: '0010AAAB',
      servicios: [
        { servicio: 'Cambio de aceite', mecanico: 'Daigo Campos', estado: 'En progreso' },
        { servicio: 'Revisión de frenos', mecanico: 'Juan Pérez', estado: 'EN_ESPERA' },
        { servicio: 'Limpieza total', mecanico: 'Gaillermo', estado: 'EN_ESPERA' }

      ]
    },
  ];




  openChat(): void {
    this.showChat = true;
  }

  closeChat(): void {
    this.showChat = false;
  }
}
