import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxPaginationModule } from "ngx-pagination";
import { NgForOf } from "@angular/common";
import { OrderService } from '../../../services/order.service';
import { OrdenTrabajoDTOList } from '../../../interfaces/OrdenTrabajoDTOList';


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
export default class OrderListComponent implements OnInit {

  p: number = 1;

  vehicles: OrdenTrabajoDTOList[] = [];

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

  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrdersByTaller().subscribe(ordenes => {
      this.vehicles = ordenes;
    });
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }



}
