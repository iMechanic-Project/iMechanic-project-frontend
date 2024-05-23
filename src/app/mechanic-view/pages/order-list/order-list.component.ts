import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxPaginationModule } from "ngx-pagination";
import { NgForOf } from "@angular/common";
import { OrderService } from '../../../services/order.service';
import { OrdenTrabajoDTOList } from '../../../interfaces/OrdenTrabajoDTOList';
import {Router, RouterLink} from "@angular/router";
import {OrdenTrabajoClienteDTOList} from "../../../interfaces/OrdenTrabajoClienteDTOList";
import {ClientService} from "../../../services/client.service";


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    NgxPaginationModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './order-list.component.html',
  styles: ''
})
export default class OrderListComponent implements OnInit {

  p: number = 1;

  vehicles: OrdenTrabajoDTOList[] = [];

  constructor (private orderService: OrderService, private router: Router) { }


  @ViewChild('placaInput') placaInput!: ElementRef;


  ngOnInit(): void {
    this.orderService.getAllOrdersByTaller().subscribe(ordenes => {
      this.vehicles = ordenes.map((orden: OrdenTrabajoDTOList) => ({
        ...orden,
        estado: this.mapEstado(orden.estado)
      }));
    });
  }

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

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Elimina caracteres no deseados
    if (value.length > 3) {
      value = value.substring(0, 3) + '-' + value.substring(3); // Agrega el guion después de los primeros 3 caracteres
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }

  detailOrder(id: number): void {
    this.router.navigate(['/progress/workshop-progress/', id]);
  }

}
