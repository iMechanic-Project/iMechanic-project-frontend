import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { OrdenTrabajoDTOList } from "../../../interfaces/OrdenTrabajoDTOList";
import { OrderService } from "../../../services/order.service";
import { Router, RouterLink } from "@angular/router";
import { MechanicService } from '../../../services/mechanic.service';
import { OrdenTrabajoMecanicoDTOList } from '../../../interfaces/OrdenTrabajoMecanicoDTOList';

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
export default class OrderListEmployeeComponent implements OnInit {

  p: number = 1;

  orderList: OrdenTrabajoMecanicoDTOList[] = [];

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

  constructor(private mecanicService: MechanicService, private router: Router) { }

  ngOnInit(): void {
    this.mecanicService.getAllOrdersByMecanic().subscribe(ordenes => {
      this.orderList = ordenes;
    })
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }


  detailOrder(orderId: number) {
    this.router.navigate(['/progress/employee-progress/', orderId]);
  }

}
