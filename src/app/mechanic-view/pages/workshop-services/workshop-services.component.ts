import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from '@angular/router';
import { TallerServiceService } from '../../../services/taller-service.service';
import { OperationDTOResponse } from '../../../interfaces/ServicioDTO';


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

  accionesMantenimiento: OperationDTOResponse[] = [];
  accionesReparacion: OperationDTOResponse[] = [];
  selectedServices: number[] = [];
  showModal = false;

  constructor(private tallerService: TallerServiceService) { }

  ngOnInit(): void {
    this.tallerService.getAllServiceToMaintenance().subscribe(
      servicios => {
        this.accionesMantenimiento = servicios;
      },
      error => {
        console.error('Error fetching services: ', error);
      }
    );

    this.tallerService.getAllServiceToRepair().subscribe(
      servicios => {
        this.accionesReparacion = servicios;
      },
      error => {
        console.error('Error fetching services: ', error);
      }
    );
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
      console.log(this.selectedServices);
    }, error => {
      console.log('Error saving services: ', error);
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

}
