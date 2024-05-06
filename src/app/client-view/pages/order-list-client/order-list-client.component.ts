import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from "../../../footer/footer.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NgForOf } from "@angular/common";
import { OrdenTrabajoClienteDTOList } from '../../../interfaces/OrdenTrabajoClienteDTOList';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

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
export default class OrderListClientComponent implements OnInit {

  p: number = 1;
  vehicles: OrdenTrabajoClienteDTOList[] = [];
  showModal = false;
  @ViewChild('placaInput') placaInput!: ElementRef;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOrdersByCliente();
  }
  
  getColorClass(estado: string): string {
    switch (estado) {
      case 'EN_PROCESO':
        return 'text-green-600';
      case 'EN_ESPERA':
        return 'text-red-600';
      case 'FINALIZADO':
        return 'text-black';
      default:
        return '';
    }
  }

  getAllOrdersByCliente(): void {
    this.clientService.getAllOrderByCliente().subscribe(
      (ordenes: OrdenTrabajoClienteDTOList[]) => {
        this.vehicles = ordenes;
      },
      (error) => {
        console.error('Error al obtener las órdenes de trabajo:', error);
      }
    );
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
  }

  detailOrder(orderId: number): void {
    this.router.navigate(['/progress/client-progress/', orderId]);
  }


}
