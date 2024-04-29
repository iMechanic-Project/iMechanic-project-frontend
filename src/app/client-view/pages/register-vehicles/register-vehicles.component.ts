import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-vehicles',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './register-vehicles.component.html',
  styles: ''
})
export default class RegisterVehiclesComponent {

  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor() { }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }

  p: number = 1;


  vehicles: any[] = [
    { placa: 'GHI-789', marca: 'Ferrari', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },
    { placa: 'GHI-789', marca: 'Ford', modelo: 'Fiesta', categoria: 'Compacto' },

  ];

  marcas: string[] = ['Marca 1', 'Marca 2', 'Marca 333'];
  modelos: string[] = ['Modelo 1', 'Modelo 2', 'Modelo 33'];
  categorias: string[] = ['Categoría 1', 'Categoría 2', 'Categoría 3303'];


  showDropdown: boolean = false;
  showDropdown2: boolean = false;


  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdown2(): void {
    this.showDropdown2 = !this.showDropdown2;
  }


  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  saveVehicle(): void {
    // Aquí puedes agregar la lógica para guardar el vehículo, por ejemplo, enviarlo a través de un servicio
    // Una vez guardado, cierra el modal
    this.showModal = false;
    // También podrías reiniciar el objeto newVehicle para limpiar los campos del formulario
  }

}
