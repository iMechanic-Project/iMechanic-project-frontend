import {Component, ElementRef, ViewChild} from '@angular/core';
import {FooterComponent} from "../../../footer/footer.component";
import {NgxPaginationModule} from "ngx-pagination";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-order-list-client',
  standalone: true,
  imports: [
    FooterComponent,
    NgxPaginationModule,
    NgForOf
  ],
  templateUrl: './order-list-client.component.html',
  styles: ''
})
export default class OrderListClientComponent {

  p: number = 1;

  vehicles: any[] = [
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Taller pablo', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'En Proceso' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Auto Max', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'En Proceso' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Taller pablo', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'En Espera' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Taller pablo', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'En Espera' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Auto Max', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'En Espera' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Taller pablo', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'Finalizado' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Taller pablo', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'Finalizado' },
    { codigo: '00478AAA', placa: 'GHI-789', taller_m: 'Auto Max', fechaRegistro: '09/04/2024', horaRegistro: '10:31:03', estado: 'Finalizado' },
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





  showModal = false;





}
