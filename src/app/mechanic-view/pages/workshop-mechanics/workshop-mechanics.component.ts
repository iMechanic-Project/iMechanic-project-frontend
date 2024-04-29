import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-workshop-mechanics',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './workshop-mechanics.component.html',
  styles: ''
})
export default class WorkshopMechanicsComponent {

  p: number = 1;


  mechanics: any[] = [
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },
    { nombre: 'Gaillermo', email: 'mamawebo@gmail.com', contrasena: '******', servicios: '' },


  ];

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
  showModal2 = false;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  openModal(): void {
    this.showModal = true;
  }

  saveVehicle(): void {
    this.showModal = false;
    this.showModal2 = true;
  }

  closeModal2(): void {
    this.showModal2 = false;
  }


}
