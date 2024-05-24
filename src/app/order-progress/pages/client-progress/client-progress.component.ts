import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-progress',
  standalone: true,
  imports: [
    ProgressBarComponent,
    NgForOf,
    NgIf,
    MultiProgressBarComponent,
    RouterLink,
  ],
  templateUrl: './client-progress.component.html',
  styles: '',
})
export default class ClientProgressComponent implements OnInit {
  showChat = false;

  orders: OrderDetailDTO = {
    id: 0,
    nombreTaller: '',
    direccionTaller: '',
    telefonoTaller: '',
    servicios: []
  };

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = +params['id'];
      if (!isNaN(orderId)) {
        this.clientService.orderDetailByClient(orderId).subscribe(
          (orderDetail) => {
            this.orders = orderDetail;
            console.log(orderDetail);
          },
          (error) => {
            console.error('Error al obtener el detalle de la orden:', error);
          }
        );
      }
    });
  }

  openChat(): void {
    this.showChat = true;
  }

  closeChat(): void {
    this.showChat = false;
  }

  goBack(): void {
    window.history.back();
  }
}
