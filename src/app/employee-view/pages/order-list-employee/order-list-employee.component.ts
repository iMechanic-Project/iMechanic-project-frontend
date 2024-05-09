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
      case 'En Proceso':
        return 'text-green-600';
      case 'En Espera':
        return 'text-red-600';
      case 'Finalizado':
        return 'text-black';
      default:
        return '';
    }
  }

  mapEstado(estado: string): string {
    switch (estado) {
      case 'EN_PROCESO':
        return 'En Proceso';
      case 'EN_ESPERA':
        return 'En Espera';
      case 'FINALIZADO':
        return 'Finalizado';
      default:
        return estado;
    }
  }

  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor(private mecanicService: MechanicService, private router: Router) { }

  ngOnInit(): void {
    this.mecanicService.getAllOrdersByMecanic().subscribe(ordenes => {
      this.orderList = ordenes.map((orden: OrdenTrabajoMecanicoDTOList) => ({
        ...orden,
        estado: this.mapEstado(orden.estado)
      }));
    })
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Elimina caracteres no deseados
    if (value.length > 3) {
      value = value.substring(0, 3) + '-' + value.substring(3); // Agrega el guion después de los primeros 3 caracteres
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }


  detailOrder(orderId: number) {
    this.router.navigate(['/progress/employee-progress/', orderId]);
  }

}
