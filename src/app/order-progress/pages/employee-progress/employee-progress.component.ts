import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import { MechanicService } from '../../../services/mechanic.service';
import { MecanicoPasoDTO } from '../../../interfaces/MecanicoPasoDTO';
import { OrderService } from '../../../services/order.service';

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
      this.orderService.orderDetailByMecanic(orderId).subscribe(
        (orderDetail) => {
          this.datosOrden = {
            ...orderDetail,
            statusOperation: this.mapEstado(orderDetail.statusOperation),
          };
          console.log(orderDetail);

          this.mecanicoPaso.workOrderId = this.datosOrden.id;
          this.mecanicoPaso.mechanicId = this.datosOrden.mechanic.id;
          this.mecanicoPaso.operationId = this.datosOrden.operation.id;
          this.mecanicoPaso.operationName = this.datosOrden.operation.name;

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



  goBack(): void {
    window.history.back();
  }
}
