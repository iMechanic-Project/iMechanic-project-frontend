import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-workshop-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './workshop-services.component.html',
  styles: ''
})
export default class WorkshopServicesComponent {

  accionesMantenimiento: string[] = [
    'Cambio de aceite y filtro',
    'Inspección y reemplazo de frenos',
    'Alineación y balanceo de ruedas',
    'Cambio de neumáticos',
    'Inspección y reemplazo de batería',
    'Cambio de bujías y cables de encendido',
    'Revisión y reemplazo de correas',
    'Servicio de transmisión',
    'Revisión y reemplazo de líquidos',
    'Cambio de aceite y filtro',
    'Inspección y reemplazo de frenos',
    'Alineación y balanceo de ruedas',
    'Cambio de neumáticos'
  ];

  accionesReparacion: string[] = [
    'Rep-1',
    'Rep-2',
    'Rep-3',
    'Rep-1',
    'Rep-2',
    'Rep-3',
    'Rep-1',
    'Rep-2',
    'Rep-3',
    'Rep-1',
    'Rep-2',
    'Rep-3',
  ];

  showModal = false;


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

}
