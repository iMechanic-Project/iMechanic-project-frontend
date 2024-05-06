import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import {FormsModule, NgModel} from "@angular/forms";
import {TipoServicio} from "../../../interfaces/TipoServicio";

interface Servicio {
  id: number;
  nombre: string;
}

interface Mecanico {
  id: number;
  nombre: string;
}

export interface ServicioMecanico{
  servicioId: number;
  mecanicoId: number;
}

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './services-list.component.html',
  styles: ''
})
export default class ServicesListComponent {

  tipoServicio: TipoServicio[] = [TipoServicio.MANTENIMIENTO, TipoServicio.REPARACION];

  serviciosMantenimiento: Servicio[] = [
    { id: 1, nombre: 'Servicio1' },
    { id: 2, nombre: 'Servicio2' },
    { id: 3, nombre: 'Servicio3' },
    { id: 4, nombre: 'Servicio4' },
    { id: 5, nombre: 'Servicio5' },
    { id: 6, nombre: 'Servicio6' },
    { id: 7, nombre: 'Servicio7' },
    { id: 8, nombre: 'Servicio8' },
    { id: 9, nombre: 'Servicio9' },
    { id: 10, nombre: 'Servicio10' }
  ];

  serviciosReparacion: Servicio[] = [
    { id: 11, nombre: 'Servicio11' },
    { id: 12, nombre: 'Servicio12' },
    { id: 13, nombre: 'Servicio13' },
    { id: 14, nombre: 'Servicio14' },
    { id: 15, nombre: 'Servicio15' },
    { id: 16, nombre: 'Servicio16' },
    { id: 17, nombre: 'Servicio17' },
    { id: 18, nombre: 'Servicio18' },
    { id: 19, nombre: 'Servicio19' },
    { id: 20, nombre: 'Servicio20' }
  ];

  mecanicos: Mecanico[] = [
    { id: 1, nombre: 'Mecanico1' },
    { id: 2, nombre: 'Mecanico2' },
    { id: 3, nombre: 'Mecanico3' },
    { id: 4, nombre: 'Mecanico4' },
    { id: 5, nombre: 'Mecanico5' },
    { id: 6, nombre: 'Mecanico6' }
  ];

  relacionMecanicoServicio: ServicioMecanico[] = [
    { servicioId: 1, mecanicoId: 1 },
    { servicioId: 1, mecanicoId: 5 },
    { servicioId: 2, mecanicoId: 3 },
    { servicioId: 15, mecanicoId: 2 },
  ];


  selectedServices: { tipo_servicio: string, servicio_id: number, mecanico_id: number }[] = [{ tipo_servicio: '', servicio_id: 0, mecanico_id: 0 }];

  addRow() {
    this.selectedServices.push({ tipo_servicio: '', servicio_id: 0, mecanico_id: 0 });
  }

  removeRow(index: number) {
    this.selectedServices.splice(index, 1);
  }

  registrar() {
    console.log("REGISTROOOOOOOOOOOOOOOOOOO:");
    console.log("REGISTROOOOOOOOOOOOOOOOOOO:");
    console.log("REGISTROOOOOOOOOOOOOOOOOOO:");
    console.log("REGISTROOOOOOOOOOOOOOOOOOO:");
    console.log("REGISTROOOOOOOOOOOOOOOOOOO:", this.selectedServices);
  }

  obtenerMecanicosPorServicio(servicioId: number): Mecanico[] {

    const servicioIdNumber = +servicioId; // Convertir a número

    //console.log("Servicio ID:", servicioId);
    //console.log("Relación Mecanico-Servicio:", this.relacionMecanicoServicio);

    const mecanicosAsociadosSinMapeo = this.relacionMecanicoServicio
      .filter(relacion => relacion.servicioId === servicioIdNumber);
    //console.log("Mecánicos asociados sin mapeo:", mecanicosAsociadosSinMapeo);

    const mecanicosMapeados = mecanicosAsociadosSinMapeo
      .map(relacion => this.mecanicos.find(mecanico => mecanico.id === relacion.mecanicoId));
    // console.log("Mecánicos mapeados:", mecanicosMapeados);

    const mecanicosFiltrados = mecanicosMapeados.filter(mecanico => mecanico !== undefined) as Mecanico[];
    //console.log("Mecánicos filtrados:", mecanicosFiltrados);

    //console.log("Mecánicos asociados final:", mecanicosFiltrados);

    return mecanicosFiltrados;
  }


}
