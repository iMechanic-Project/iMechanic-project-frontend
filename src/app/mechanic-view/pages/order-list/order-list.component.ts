import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgForOf } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { OrdenTrabajoDTOList } from '../../../interfaces/OrdenTrabajoDTOList';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NgxPaginationModule, NgForOf, RouterLink],
  templateUrl: './order-list.component.html',
  styles: '',
})
export default class OrderListComponent implements OnInit {
  p: number = 1;
  orderList: OrdenTrabajoDTOList[] = [];
  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getAllOrdersByTaller().subscribe((ordenes) => {
      if (ordenes.length == 0) {
        console.log("No existen ordenes actualmente");
      } else {
        this.orderList = ordenes.map((orden: OrdenTrabajoDTOList) => ({
          ...orden,
          status: this.mapEstado(orden.status),
        }));
        console.log(ordenes);
      }
    },
    (error) => {
      console.error('Error al obtener las órdenes de trabajo:', error);
    }
  );
  }

  getColorClass(status: string): string {
    switch (status) {
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

  mapEstado(status: string): string {
    switch (status) {
      case 'EN_PROCESO':
        return 'En Proceso';
      case 'EN_ESPERA':
        return 'En Espera';
      case 'FINALIZADO':
        return 'Finalizado';
      default:
        return status;
    }
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Elimina caracteres no deseados
    if (value.length > 3) {
      value = value.substring(0, 3) + '-' + value.substring(3); // Agrega el guion después de los primeros 3 caracteres
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }

  detailOrder(id: string): void {
    console.log('ID', id);
    const url = this.router
      .createUrlTree(['/progress/workshop-progress/', id])
      .toString();
    console.log('URL', url);
    this.router.navigate(['/progress/workshop-progress/', id]);
  }
}
