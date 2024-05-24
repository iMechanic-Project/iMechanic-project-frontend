import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NgForOf, NgIf } from '@angular/common';
import { MultiProgressBarComponent } from '../multi-progress-bar/multi-progress-bar.component';
import { OrderDetailDTO } from '../../../interfaces/OrderDetailDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TallerServiceService } from '../../../services/taller-service.service';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { ServicioDetalleDTO } from '../../../interfaces/ServicioDetalleDTO';
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
    id: 0,
    nombreTaller: '',
    direccionTaller: '',
    telefonoTaller: '',
    servicios: [
      {
        servicio: {
          id: 0,
          nombre: '',
        },
        mecanico: {
          id: 0,
          nombre: '',
        },
        estadoServicio: '',
        pasos: [],
      },
    ],
  };

  mecanicoPaso: MecanicoPasoDTO = {
    ordenTrabajoId: 0,
    mecanicoId: 0,
    servicioId: 0,
    servicioNombre: '',
    pasoId: 0,
    complete: false,
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

            this.orders.servicios.forEach((servicioDetalle) => {
              this.mecanicoPaso.ordenTrabajoId = this.orders.id;
              this.mecanicoPaso.mecanicoId = servicioDetalle.mecanico.id;
              this.mecanicoPaso.servicioId = servicioDetalle.servicio.id;
              this.mecanicoPaso.servicioNombre =
                servicioDetalle.servicio.nombre;

              // Si hay pasos, puedes también actualizar pasoId y complete
              if (servicioDetalle.pasos.length > 0) {
                const paso = servicioDetalle.pasos[1]; // Solo un ejemplo, ajustar según sea necesario
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
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
