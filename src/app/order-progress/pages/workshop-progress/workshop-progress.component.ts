import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TallerServiceService } from '../../../services/taller-service.service';
@Component({
  selector: 'app-workshop-progress',
  standalone: true,
  imports: [
    ProgressBarComponent,
    NgForOf,
    NgIf,
    MultiProgressBarComponent,
    RouterLink,
  ],
  templateUrl: './workshop-progress.component.html',
  styles: '',
})
export default class WorkshopProgressComponent implements OnInit {
  orders: OrderDetailDTO = {
    nombreTaller: '',
    direccionTaller: '',
    telefonoTaller: '',
    servicios: [],
  };

  constructor(
    private route: ActivatedRoute,
    private tallerService: TallerServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = +params['id'];
      if (!isNaN(orderId)) {
        this.tallerService.orderDetailByTaller(orderId).subscribe(
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

  goBack(): void {
    window.history.back();
  }
}
