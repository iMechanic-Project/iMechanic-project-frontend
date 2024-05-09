import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import { MechanicService } from '../../../services/mechanic.service';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';

@Component({
  selector: 'app-employee-progress',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ProgressBarComponent,
  ],
  templateUrl: './employee-progress.component.html',
  styles: ''
})
export default class EmployeeProgressComponent implements OnInit {


  showChat = false;

  datosOrden: OrderDetailMecanicoDTO = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    servicio: {
      id: 0,
      nombre: ''
    },
    estadoServicio: '',
    mecanico: {
      id: 0,
      nombre: ''
    },
    pasos: []
  };

  mecanicoPaso: MecanicoPasoDTO = {
    ordenTrabajoId: 0,
    mecanicoId: 0,
    servicioId: 0,
    servicioNombre: '',
    pasoId: 0,
    complete: false
  }

  constructor(private route: ActivatedRoute, private mecanicService: MechanicService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = +params['id'];
      if (!isNaN(orderId)) {
        this.mecanicService.orderDetailByMecanic(orderId).subscribe(
          (orderDetail) => {
            this.datosOrden = {
              ...orderDetail,
              estadoServicio: this.mapEstado(orderDetail.estadoServicio)
            };
            console.log(orderDetail);

            this.mecanicoPaso.ordenTrabajoId = this.datosOrden.id;
            this.mecanicoPaso.mecanicoId = this.datosOrden.mecanico.id;
            this.mecanicoPaso.servicioId = this.datosOrden.servicio.id;
            this.mecanicoPaso.servicioNombre = this.datosOrden.servicio.nombre;

            console.log('MecanicoPaso:', this.mecanicoPaso);
          },
          (error) => {
            console.error('Error al obtener el detalle de la orden:', error);
          }
        );
      }
    });
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

  openChat(): void {
    this.showChat = true;
  }

  closeChat(): void {
    this.showChat = false;
  }

}