import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ServicioDetalleDTO } from '../../../interfaces/ServicioDetalleDTO';
import { ActivatedRoute } from '@angular/router';
import { MechanicService } from '../../../services/mechanic.service';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { PasoDTO } from '../../../interfaces/PasoDTO';
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import { Subscription } from 'rxjs';
import { TallerServiceService } from '../../../services/taller-service.service';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';

@Component({
  selector: 'app-multi-progress-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './multi-progress-bar.component.html',
  styleUrl: './multi-progress-bar.component.css'
})
export class MultiProgressBarComponent {
// export class MultiProgressBarComponent implements OnInit, OnDestroy {
  // @Input() mecanicoPaso: MecanicoPasoDTO = {
  //   ordenTrabajoId: 0,
  //   mecanicoId: 0,
  //   servicioId: 0,
  //   servicioNombre: '',
  //   pasoId: 0,
  //   complete: false,
  // };
  // estadoServicio: string = '';

  // @Input() orderServices: OrderDetailDTO = {
  //   id: 0,
  //   nombreTaller: '',
  //   direccionTaller: '',
  //   telefonoTaller: '',
  //   servicios: [
  //     {
  //       servicio: {
  //         id: 0,
  //         nombre: ''
  //       },
  //       mecanico: {
  //         id: 0,
  //         nombre: ''
  //       },
  //       estadoServicio: '',
  //       pasos: []
  //     }
  //   ]
  // };

  // currentServiceIndex = 0;
  // showButtons = false;
  // finishedOrder = false;
  // showModal = false;
  // suscription: Subscription | undefined;

  // constructor(private route: ActivatedRoute, private tallerService: TallerServiceService) {
  // }

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     const orderId = +params['id'];
  //     if (!isNaN(orderId)) {
  //       this.tallerService.orderDetailByTaller(orderId).subscribe(
  //         (orderDetail) => {
  //           this.orderServices = orderDetail;
  //           this.estadoServicio = this.mapEstado(orderDetail.servicios[0].estadoServicio);
  //           console.log(orderDetail);

  //           this.orderServices.servicios.forEach(servicio => {
  //             this.updateMecanicoPaso(servicio);
  //           });

  //           console.log('MecanicoPaso:', this.mecanicoPaso);
  //         },
  //         (error) => {
  //           console.error('Error al obtener el detalle de la orden:', error);
  //         }
  //       );

  //       this.suscription = this.tallerService.refresh$.subscribe(() => {
  //         this.tallerService.orderDetailByTaller(orderId).subscribe((orderDetail) => {
  //           this.orderServices = orderDetail;
  //         });
  //       });
  //     }
  //   });

  //   setTimeout(() => {
  //     this.mechanicService.getStepComplete(this.mecanicoPaso.ordenTrabajoId, this.mecanicoPaso.servicioId).subscribe((pasosCompletados: PasoDTO[]) => {
  //       this.orderServices.servicios[this.currentServiceIndex].pasos.forEach((paso: PasoDTO) => {
  //         const completado = pasosCompletados.find((pasoCompletado: PasoDTO) => pasoCompletado.id === paso.id);
  //         if (completado) {
  //           paso.completado = true;
  //         }
  //       });

  //       const ultimoPasoCompletadoIndex = this.orderServices.servicios[this.currentServiceIndex].pasos.findIndex((paso: PasoDTO) => !paso.completado);
  //       this.currentServiceIndex = ultimoPasoCompletadoIndex === -1 ? this.orderServices.servicios[this.currentServiceIndex].pasos.length : ultimoPasoCompletadoIndex;
  //     });
  //   }, 500); // 500 milisegundos
  // }

  // ngOnDestroy(): void {
  //   this.suscription?.unsubscribe();
  //   console.log('Observable cerrado');
  // }

  // updateMecanicoPaso(servicioDetalle: ServicioDetalleDTO): void {
  //   this.mecanicoPaso.ordenTrabajoId = this.orderServices.id;
  //   this.mecanicoPaso.mecanicoId = servicioDetalle.mecanico.id;
  //   this.mecanicoPaso.servicioId = servicioDetalle.servicio.id;
  //   this.mecanicoPaso.servicioNombre = servicioDetalle.servicio.nombre;

  //   if (servicioDetalle.pasos.length > 0) {
  //     const paso = servicioDetalle.pasos[0]; // Ejemplo, ajustar según sea necesario
  //     this.mecanicoPaso.pasoId = paso.id;
  //     this.mecanicoPaso.complete = paso.completado; // Asegúrate de que el paso tiene la propiedad `completado`
  //   }

  //   console.log('Actualizado MecanicoPaso:', this.mecanicoPaso);
  // }

  // getColorClass(estado: string): string {
  //   switch (estado) {
  //     case 'En Proceso':
  //       return 'text-green-600';
  //     case 'En Espera':
  //       return 'text-red-600';
  //     case 'Finalizado':
  //       return 'text-black';
  //     default:
  //       return '';
  //   }
  // }

  // mapEstado(estado: string): string {
  //   switch (estado) {
  //     case 'EN_PROCESO':
  //       return 'En Proceso';
  //     case 'EN_ESPERA':
  //       return 'En Espera';
  //     case 'FINALIZADO':
  //       return 'Finalizado';
  //     default:
  //       return estado;
  //   }
  // }

}
