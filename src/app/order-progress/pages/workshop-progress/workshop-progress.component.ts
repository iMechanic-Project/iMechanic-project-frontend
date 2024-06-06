import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { OrderService } from '../../../services/order.service';
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

  mecanicoPaso: MecanicoPasoDTO = {
    ordenTrabajoId: '',
    mecanicoId: 0,
    servicioId: 0,
    servicioNombre: '',
    pasoId: 0,
    complete: false,
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = params['id'];
      if (orderId) {
        this.orderService.orderDetailByTaller(orderId).subscribe(
          (orderDetail) => {
            this.orders = orderDetail;
            console.log(orderDetail);

            this.orders.operationDetails.forEach((servicioDetalle) => {
              this.mecanicoPaso.ordenTrabajoId = this.orders.id;
              this.mecanicoPaso.mecanicoId = servicioDetalle.mechanic.id;
              this.mecanicoPaso.servicioId = servicioDetalle.operation.id;
              this.mecanicoPaso.servicioNombre = servicioDetalle.operation.name;

              // Si hay steps, puedes también actualizar pasoId y complete
              if (servicioDetalle.steps.length > 0) {
                const paso = servicioDetalle.steps[1]; // Solo un ejemplo, ajustar según sea necesario
                this.mecanicoPaso.pasoId = paso.id;
                this.mecanicoPaso.complete = paso.completado; // Asegúrate de que el paso tiene la propiedad `complete`
              }

              console.log('Actualizado MecanicoPaso:', this.mecanicoPaso);
            });

            console.log('MecanicoPaso:', this.mecanicoPaso);
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

  goBack(): void {
    window.history.back();
  }
}
