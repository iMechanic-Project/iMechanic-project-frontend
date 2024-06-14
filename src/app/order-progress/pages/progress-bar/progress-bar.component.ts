import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import {Subject, Subscription} from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { MechanicService } from '../../../services/mechanic.service';
import { StepOrderResponse } from '../../../interfaces/StepOrderResponse';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  @Input() mecanicoPaso: MecanicoPasoDTO = {
    workOrderId: '',
    mechanicId: 0,
    operationId: 0,
    operationName: '',
    stepId: 0,
    complete: false,
  };

  @Input() pasos: StepOrderResponse[] = [];
  statusOperation: string = '';

  datosOrden: OrderDetailMecanicoDTO = {
    id: '',
    name: '',
    address: '',
    phoneWorkshop: '',
    operation: {
      id: 0,
      name: '',
    },
    statusOperation: '',
    mechanic: {
      id: 0,
      name: '',
    },
    phoneMechanic: '',
    steps: [],
  };

  currentServiceIndex = 0;
  showButtons = false;
  finishedOrder = false;
  showModal = false;
  suscription: Subscription | undefined;
  suscription2: Subscription | undefined;



  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private mechanicService: MechanicService
) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const orderId = params['id'];
      console.log(orderId);
      this.orderService.orderDetailByMecanic(orderId).subscribe(
        (orderDetail) => {
          this.datosOrden = {
            ...orderDetail,
            statusOperation: this.mapEstado(orderDetail.statusOperation),
          };
          console.log(orderDetail.statusOperation);
          this.statusOperation = this.datosOrden.statusOperation;

          console.log('MecanicoPaso:', this.mecanicoPaso);
        },
        (error) => {
          console.error('Error al obtener el detalle de la orden:', error);
        }
      );
      this.suscription = this.mechanicService.refresh$.subscribe(() => {
        this.orderService
          .orderDetailByMecanic(orderId)
          .subscribe((orderDetail) => {
            this.datosOrden = orderDetail; // Aquí asigna los datos actualizados a la variable vehicles
          });
      });
      this.suscription2 = this.orderService.refresh2$.subscribe(() => {
        this.orderService
          .orderDetailByMecanic(orderId)
          .subscribe((orderDetail) => {
            this.datosOrden = orderDetail; // Aquí asigna los datos actualizados a la variable vehicles
          });
      });
    });

    console.log('botom comenzar 1:', this.showButtons);

    setTimeout(() => {
      this.orderService
        .getStepComplete(
          this.mecanicoPaso.workOrderId,
          this.mecanicoPaso.operationId
        )
        .subscribe((pasosCompletados: StepOrderResponse[]) => {
          this.pasos.forEach((paso: StepOrderResponse) => {
            const completado = pasosCompletados.find(
              (pasoCompletado: StepOrderResponse) =>
                pasoCompletado.stepId === paso.stepId
            );
            if (completado) {
              paso.complete = true;
            }
          });

          const ultimoPasoCompletadoIndex = this.pasos.findIndex(
            (paso: StepOrderResponse) => !paso.complete
          );
          this.currentServiceIndex =
            ultimoPasoCompletadoIndex === -1
              ? this.pasos.length
              : ultimoPasoCompletadoIndex;
          // this.showButtons = this.currentServiceIndex < this.pasos.length;
          console.log('botom comenzar 2:', this.showButtons);
          console.log('current:', this.currentServiceIndex);
        });
    }, 500); // 4000 milisegundos = 4 segundos
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    this.suscription2?.unsubscribe();
    console.log('obserbable morido', this.suscription);
    console.log('obserbable morido2', this.suscription2);
  }

  private handleStepCompleted(ordenId: string): void {
    console.log('Paso completado para la orden:', ordenId);
    // Actualiza los datos según sea necesario
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }



  nextStep() {
    if (this.currentServiceIndex < this.pasos.length) {
      console.log('current:', this.currentServiceIndex);
      console.log('pasos:', this.pasos.length);

      const paso = this.pasos[this.currentServiceIndex];
      this.orderService
        .completeStep(
          this.mecanicoPaso.workOrderId,
          this.mecanicoPaso.operationId,
          paso.stepId
        )
        .subscribe(
          (response) => {
            console.log('Paso completado:', response);
            paso.complete = true;
            this.currentServiceIndex++;
            //Se muestra en que servicio se encuentra
            console.log(this.currentServiceIndex);
          },
          (error) => {
            console.error('Error al completar el paso:', error);
          }
        )
    }
  }

  startOrder() {
    this.orderService
      .initService(this.mecanicoPaso.workOrderId, this.mecanicoPaso.operationId)
      .subscribe(
        (response) => {
          console.log('Servicio iniciado:', response);
          this.nextStep();
          this.showButtons = true;
          this.finishedOrder = true;
        },
        (error) => {
          console.error('Error al iniciar el servicio:', error);
        }
      );
  }

  finishOrder() {
    this.orderService
      .finalService(
        this.mecanicoPaso.workOrderId,
        this.mecanicoPaso.operationId
      )
      .subscribe(
        (response) => {
          console.log('Servicio terminado:', response);
          this.nextStep();
          this.finishedOrder = false;
        },
        (error) => {
          console.error('Error al terminar el servicio:', error);
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
