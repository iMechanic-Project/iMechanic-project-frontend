import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { TallerServiceService } from '../../../services/taller-service.service';
import { ServicioDTO } from '../../../interfaces/ServicioDTO';


@Component({
  selector: 'app-workshop-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './workshop-services.component.html',
  styles: ''
})
export default class WorkshopServicesComponent implements OnInit {

  accionesMantenimiento: ServicioDTO[] = [];
  accionesReparacion: ServicioDTO[] = [];
  selectedServices: number[] = [];
  showModal = false;

  constructor(private tallerService: TallerServiceService) { }

  ngOnInit(): void {
    this.tallerService.getAllServiceToMaintenance().subscribe(servicios => {
      this.accionesMantenimiento = servicios;
    });

    this.tallerService.getAllServiceToRepair().subscribe(servicios => {
      this.accionesReparacion = servicios;
    });
  }

  toggleService(servicioId: number): void {
    if (this.selectedServices.includes(servicioId)) {
      this.selectedServices = this.selectedServices.filter(id => id !== servicioId);
    } else {
      this.selectedServices.push(servicioId);
    }
  }

  openModal(): void {
    this.showModal = true;
    this.tallerService.addServicioToTaller(this.selectedServices).subscribe(() => {
      this.showModal = false;
      console.log(this.selectedServices);
    }, error => {
      console.log('Error saving services: ', error);
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

}
