import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';

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
    id: '',
    nameWorkshop: '',
    addressWorkshop: '',
    phoneWorkShop: '',
    operationDetails: [
      {
        operation: {
          id: 0,
          name: '',
        },
        mechanic: {
          id: 0,
          name: '',
        },
        statusOperation: '',
        steps: [],
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = params['id'];
      console.log(orderId);
      if (orderId) {
        console.log("hola1");
        this.orderService.orderDetailByClient(orderId).subscribe(
          (orderDetail) => {
            console.log(orderDetail.id);
            this.orders = orderDetail;
            console.log("Orders", this.orders);
            console.log(orderDetail);
            console.log("hola3");
          },
          (error) => {
            console.error('Error al obtener el detalle de la orden:', error);
          }
        );
      } else {
        console.log('No se proporcionó el ID en la ruta');
      }
    });
  }

  openChat(): void {
    // this.showChat = true;
  }

  closeChat(): void {
    this.showChat = false;
  }

  goBack(): void {
    window.history.back();
  }
}
