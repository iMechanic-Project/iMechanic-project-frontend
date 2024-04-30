import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { MechanicDTO } from '../../../interfaces/MechanicDTO';
import { MechanicService } from '../../../services/mechanic.service';
import { MechanicDTORequest } from '../../../interfaces/MechanicDTORequest';
import { ServicioDTO } from '../../../interfaces/ServicioDTO';
import { TallerServiceService } from '../../../services/taller-service.service';

@Component({
  selector: 'app-workshop-mechanics',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './workshop-mechanics.component.html',
  styles: ''
})
export default class WorkshopMechanicsComponent implements OnInit {

  p: number = 1;

  mechanics: MechanicDTO[] = [];
  newMechanic: MechanicDTORequest = { nombre: '', correoElectronico: '', contrasenia: '', servicioIds: [] };
  servicios: ServicioDTO[] = [];
  selectedServicesMechanic: number[] = [];


  showModal = false;
  showModal2 = false;
  showPassword: boolean = false;
  showServices: boolean = false;

  constructor(private mechanicService: MechanicService, private tallerService: TallerServiceService) {
    this.newMechanic.servicioIds = [];
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.mechanicService.getAllMechanics().subscribe(mecanicos => {
      this.mechanics = mecanicos;
    })
  }

  createMechanic(): void {
    this.showModal = false;
    this.showModal2 = true;
    this.mechanicService.createMechanic(this.newMechanic).subscribe(
      response => {
        console.log('Mechanic created successfully', response);
      },
      error => {
        console.log(this.newMechanic);
        console.error('Error creating mechanic: ', error);
      }
    );
  }

  toggleServicios(): void {
    this.showServices = !this.showServices;
  }

  openModal(): void {
    this.showModal = true;
    this.tallerService.getAllServices().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  toggleServicio(servicioId: number): void {
    if (this.newMechanic.servicioIds.includes(servicioId)) {
      console.log(`Removing servicioId ${servicioId}`);
      this.newMechanic.servicioIds = this.newMechanic.servicioIds.filter(id => id !== servicioId);
    } else {
      console.log('servicioId', servicioId);
      this.newMechanic.servicioIds.push(servicioId);
    }
  }

  report(): void {
    console.log(this.newMechanic.servicioIds);
  }

  closeModal2(): void {
    this.showModal2 = false;
  }


}
