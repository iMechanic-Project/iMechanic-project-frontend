import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {OrdenTrabajoDTOList} from "../../../interfaces/OrdenTrabajoDTOList";
import {OrderService} from "../../../services/order.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-list-employee',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './order-list-employee.component.html',
  styleUrl: './order-list-employee.component.css'
})
export default class OrderListEmployeeComponent implements OnInit{

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
