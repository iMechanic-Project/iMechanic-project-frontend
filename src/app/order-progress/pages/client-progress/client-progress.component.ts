import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';

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
    workOrderId: '',
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
    workOrderId: '',
    mechanicId: 0,
    operationId: 0,
    operationName: '',
    stepId: 0,
    complete: false,
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
            this.orders = orderDetail;
            console.log(orderDetail);
            console.log(orderDetail);

            this.orders.operationDetails.forEach((servicioDetalle) => {
              this.mecanicoPaso.workOrderId = this.orders.workOrderId;
              this.mecanicoPaso.mechanicId = servicioDetalle.mechanic.id;
              this.mecanicoPaso.operationId = servicioDetalle.operation.id;
              this.mecanicoPaso.operationName = servicioDetalle.operation.name;

              // Si hay steps, puedes también actualizar pasoId y complete
              if (servicioDetalle.steps.length > 0) {
                const paso = servicioDetalle.steps[1]; // Solo un ejemplo, ajustar según sea necesario
                this.mecanicoPaso.stepId = paso.stepId;
                this.mecanicoPaso.complete = paso.complete; // Asegúrate de que el paso tiene la propiedad `complete`
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
