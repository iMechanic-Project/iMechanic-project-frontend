import {Component, ElementRef} from '@angular/core';
import { ViewChild } from '@angular/core';
import {NgxPaginationModule} from "ngx-pagination";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    NgxPaginationModule,
    NgForOf
  ],
  templateUrl: './order-list.component.html',
  styles: ''
})
export default class OrderListComponent {

  p: number = 1;

  vehicles: any[] = [
    { placa: 'GHI-789',  fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'En Proceso' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'En Proceso' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'En Espera' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'En Espera' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'En Espera' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'Finalizado' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'Finalizado' },
    { placa: 'GHI-789', fecha_r: '09/04/2024', hora_r: '10:31:03', estado: 'Finalizado' },
  ];

  getColorClass(estado: string): string {
    switch (estado) {
      case 'En Proceso':
        return 'text-green-600'; // Verde
      case 'En Espera':
        return 'text-red-600'; // Rojo
      case 'Finalizado':
        return 'text-black'; // Negro
      default:
        return ''; // Si el estado no coincide, no se aplica ningún color específico
    }
  }

  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor() { }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }


}
