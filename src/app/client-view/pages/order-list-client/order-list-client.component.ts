import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgForOf } from '@angular/common';
import { OrdenTrabajoClienteDTOList } from '../../../interfaces/OrdenTrabajoClienteDTOList';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list-client',
  standalone: true,
  imports: [FooterComponent, NgxPaginationModule, NgForOf],
  templateUrl: './order-list-client.component.html',
  styles: '',
})
export default class OrderListClientComponent implements OnInit {
  p: number = 1;
  orderListClient: OrdenTrabajoClienteDTOList[] = [];
  showModal = false;
  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getAllOrderByCliente().subscribe(
      (ordenes: OrdenTrabajoClienteDTOList[]) => {
        if (ordenes.length == 0) {
          console.log('No existen ordenes de trabajo.');
        } else {
          this.orderListClient = ordenes.map(
            (orden: OrdenTrabajoClienteDTOList) => ({
              ...orden,
              status: this.mapEstado(orden.status),
            })
          );
          console.log(ordenes);
        }
      },
      (error) => {
        console.error('Error al obtener las órdenes de trabajo:', error);
      }
    );
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

  detailOrder(id: string): void {
    console.log('ID', id);
    const url = this.router
      .createUrlTree(['/progress/client-progress/', id])
      .toString();
    console.log('URL', url);
    this.router.navigate(['/progress/client-progress/', id]);
  }
}
