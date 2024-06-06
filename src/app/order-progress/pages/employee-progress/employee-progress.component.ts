import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import { MechanicService } from '../../../services/mechanic.service';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';

@Component({
  selector: 'app-employee-progress',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink, ProgressBarComponent],
  templateUrl: './employee-progress.component.html',
  styles: '',
})
export default class EmployeeProgressComponent implements OnInit {
  showChat = false;

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
    private mecanicService: MechanicService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const orderId = params['id'];
      this.mecanicService.orderDetailByMecanic(orderId).subscribe(
        (orderDetail) => {
          this.datosOrden = {
            ...orderDetail,
            estadoServicio: this.mapEstado(orderDetail.estadoServicio),
          };
          console.log(orderDetail);

          this.mecanicoPaso.ordenTrabajoId = this.datosOrden.id;
          this.mecanicoPaso.mecanicoId = this.datosOrden.mecanico.id;
          this.mecanicoPaso.servicioId = this.datosOrden.operation.id;
          this.mecanicoPaso.servicioNombre = this.datosOrden.operation.name;

          console.log('MecanicoPaso:', this.mecanicoPaso);
        },
        (error) => {
          console.error('Error al obtener el detalle de la orden:', error);
        }
      );
    });
  }

  mapEstado(estado: string): string {
    switch (estado) {
      default:
        return estado;
    }
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
