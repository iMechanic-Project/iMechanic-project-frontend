import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PasoDTO } from '../../../interfaces/PasoDTO';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { MechanicService } from '../../../services/mechanic.service';
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  @Input() mecanicoPaso: MecanicoPasoDTO = {
    ordenTrabajoId: '',
    mecanicoId: 0,
    servicioId: 0,
    servicioNombre: '',
    pasoId: 0,
    complete: false,
  };
  @Input() pasos: PasoDTO[] = [];
  estadoServicio: string = '';

  datosOrden: OrderDetailMecanicoDTO = {
    id: '',
    nombre: '',
    direccion: '',
    telefonoTaller: '',
    operation: {
      id: 0,
      name: '',
    },
    estadoServicio: '',
    mecanico: {
      id: 0,
      name: '',
    },
    telefonoMecanico: '',
    pasos: [],
  };

  currentServiceIndex = 0;
  showButtons = false;
  finishedOrder = false;
  showModal = false;
  suscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private mechanicService: MechanicService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = +params['id'];
      if (!isNaN(orderId)) {
        this.mechanicService.orderDetailByMecanic(orderId).subscribe(
          (orderDetail) => {
            this.datosOrden = {
              ...orderDetail,
              estadoServicio: this.mapEstado(orderDetail.estadoServicio),
            };
            console.log(orderDetail.estadoServicio);
            this.estadoServicio = this.datosOrden.estadoServicio;

            console.log('MecanicoPaso:', this.mecanicoPaso);
          },
          (error) => {
            console.error('Error al obtener el detalle de la orden:', error);
          }
        );
        this.suscription = this.mechanicService.refresh$.subscribe(() => {
          this.mechanicService
            .orderDetailByMecanic(orderId)
            .subscribe((orderDetail) => {
              this.datosOrden = orderDetail; // Aquí asigna los datos actualizados a la variable vehicles
            });
        });
      }
    });

    console.log('botom comenzar 1:', this.showButtons);

    setTimeout(() => {
      this.mechanicService
        .getStepComplete(
          this.mecanicoPaso.ordenTrabajoId,
          this.mecanicoPaso.servicioId
        )
        .subscribe((pasosCompletados: PasoDTO[]) => {
          this.pasos.forEach((paso: PasoDTO) => {
            const completado = pasosCompletados.find(
              (pasoCompletado: PasoDTO) => pasoCompletado.id === paso.id
            );
            if (completado) {
              paso.completado = true;
            }
          });

          const ultimoPasoCompletadoIndex = this.pasos.findIndex(
            (paso: PasoDTO) => !paso.completado
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
    console.log('obserbable morido');
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
      this.mechanicService
        .completeStep(
          this.mecanicoPaso.ordenTrabajoId,
          this.mecanicoPaso.servicioId,
          paso.id
        )
        .subscribe(
          (response) => {
            console.log('Paso completado:', response);
            paso.completado = true;
            this.currentServiceIndex++;
            //Se muestra en que servicio se encuentra
            console.log(this.currentServiceIndex);
          },
          (error) => {
            console.error('Error al completar el paso:', error);
          }
        );
    }
  }

  startOrder() {
    this.mechanicService
      .initService(
        this.mecanicoPaso.ordenTrabajoId,
        this.mecanicoPaso.servicioId
      )
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
    this.mechanicService
      .finalService(
        this.mecanicoPaso.ordenTrabajoId,
        this.mecanicoPaso.servicioId
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
