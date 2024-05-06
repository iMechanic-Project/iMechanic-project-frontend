import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { OrderDetailMecanicoDTO } from '../../../interfaces/OrderDetailMecanicoDTO';
import { MechanicService } from '../../../services/mechanic.service';

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
    nombre: '',
    direccion: '',
    telefono: '',
    servicio: '',
    estadoServicio: '',
    nombreMecanico: '',
    pasos: []
  };

  constructor(private route: ActivatedRoute, private mecanicService: MechanicService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = +params['id'];
      if (!isNaN(orderId)) {
        this.mecanicService.orderDetailByMecanic(orderId).subscribe(
          (orderDetail) => {
            this.datosOrden = orderDetail;
            console.log(orderDetail);
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
      case 'En progreso':
        return 'text-green-600'; // Verde
      case 'EN_ESPERA':
        return 'text-red-600'; // Rojo
      case 'FINALIZADO':
        return 'text-black'; // Negro
      default:
        return estado; // Devuelve el estado tal cual si no coincide con ninguno de los casos anteriores
    }
  }

  openChat(): void {
    this.showChat = true;
  }

  closeChat(): void {
    this.showChat = false;
  }


}
