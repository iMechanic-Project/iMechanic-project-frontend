import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { Subscription } from 'rxjs';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { OrderService } from '../../../services/order.service';
import { OperationDetailsDTOResponse } from '../../../interfaces/OperationDetailsDTOResponse';
import { StepOrderResponse } from '../../../interfaces/StepOrderResponse';

@Component({
  selector: 'app-multi-progress-bar',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './multi-progress-bar.component.html',
  styleUrl: './multi-progress-bar.component.css',
})
export class MultiProgressBarComponent implements OnInit, OnDestroy {
  @Input() mecanicoPaso: MecanicoPasoDTO = {
    workOrderId: '',
    mechanicId: 0,
    operationId: 0,
    operationName: '',
    stepId: 0,
    complete: false,
  };
  estadoServicio: string = '';

  @Input() orderServices: OrderDetailDTO = {
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

  currentServiceIndex = 0;
  showButtons = false;
  finishedOrder = false;
  showModal = false;
  suscription: Subscription | undefined;
  suscriptionNextStep: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = params['id'];
      if (!isNaN(orderId)) {
        this.orderService.orderDetailByTaller(orderId).subscribe(
          (orderDetail) => {
            this.orderServices = orderDetail;
            // this.estadoServicio = this.mapEstado(
            //   orderDetail.operationDetails.statusOperation
            // );
            console.log(orderDetail);

            this.orderServices.operationDetails.forEach((servicio) => {
              this.updateMecanicoPaso(servicio);
            });

            console.log('MecanicoPaso:', this.mecanicoPaso);
            this.estadoServicio = this.orderServices.operationDetails.map(
              (servicio) => this.mapEstado(servicio.statusOperation)
            ).join(', ');
          },
          (error) => {
            console.error('Error al obtener el detalle de la orden:', error);
          }
        );

        this.suscriptionNextStep = this.orderService.refreshNextStep$.subscribe(() => {
          this.orderService.orderDetailByTaller(orderId).subscribe((orderDetail) => {
            this.orderServices = orderDetail; // Aquí asigna los datos actualizados a la variable vehicles
          });
        });


        this.suscription = this.orderService.refresh$.subscribe(() => {
          this.orderService
            .orderDetailByTaller(orderId)
            .subscribe((orderDetail) => {
              this.orderServices = orderDetail;
            });
        });
      }
    });

    setTimeout(() => {
      this.orderService
        .getStepComplete(
          this.mecanicoPaso.workOrderId,
          this.mecanicoPaso.operationId
        )
        .subscribe((pasosCompletados: StepOrderResponse[]) => {
          this.orderServices.operationDetails[
            this.currentServiceIndex
          ].steps.forEach((paso: StepOrderResponse) => {
            const completado = pasosCompletados.find(
              (pasoCompletado: StepOrderResponse) => pasoCompletado.stepId === paso.stepId
            );
            if (completado) {
              paso.complete = true;
            }
          });

          const ultimoPasoCompletadoIndex = this.orderServices.operationDetails[
            this.currentServiceIndex
          ].steps.findIndex((paso: StepOrderResponse) => !paso.complete);
          this.currentServiceIndex =
            ultimoPasoCompletadoIndex === -1
              ? this.orderServices.operationDetails[this.currentServiceIndex]
                  .steps.length
              : ultimoPasoCompletadoIndex;
        });
    }, 500); // 500 milisegundos
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    this.suscriptionNextStep?.unsubscribe();
    console.log('Observable cerrado', this.suscription);
    console.log('Observable next step cerrado', this.suscriptionNextStep);
  }

  updateMecanicoPaso(servicioDetalle: OperationDetailsDTOResponse): void {
    this.mecanicoPaso.workOrderId = this.orderServices.workOrderId;
    this.mecanicoPaso.mechanicId = servicioDetalle.mechanic.id;
    this.mecanicoPaso.operationId = servicioDetalle.operation.id;
    this.mecanicoPaso.operationName = servicioDetalle.operation.name;

    if (servicioDetalle.steps.length > 0) {
      const paso = servicioDetalle.steps[0]; // Ejemplo, ajustar según sea necesario
      this.mecanicoPaso.stepId = paso.stepId;
      this.mecanicoPaso.complete = paso.complete; // Asegúrate de que el paso tiene la propiedad `completado`
    }

    console.log('Actualizado MecanicoPaso:', this.mecanicoPaso);
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
}
