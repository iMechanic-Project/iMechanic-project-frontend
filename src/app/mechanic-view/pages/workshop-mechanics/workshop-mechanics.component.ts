import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { MechanicDTO } from '../../../interfaces/MechanicDTO';
import { MechanicService } from '../../../services/mechanic.service';
import { MechanicDTORequest } from '../../../interfaces/MechanicDTORequest';
import { ServicioDTO } from '../../../interfaces/ServicioDTO';
import { TallerServiceService } from '../../../services/taller-service.service';
import {Subscription} from "rxjs";
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-workshop-mechanics',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgxPaginationModule,
    NgIf,
    LoaderComponent
  ],
  templateUrl: './workshop-mechanics.component.html',
  styles: ''
})
export default class WorkshopMechanicsComponent implements OnInit, OnDestroy {

  p: number = 1;

  mechanics: MechanicDTO[] = [];
  suscription: Subscription| undefined;
  newMechanic: MechanicDTORequest = { nombre: '', correoElectronico: '', contrasenia: '', servicioIds: [] };
  servicios: ServicioDTO[] = [];
  selectedServicesMechanic: number[] = [];


  showModal = false;
  showModal2 = false;
  showModal3 = false;
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

    this.suscription = this.mechanicService.refresh$.subscribe(() =>{
      this.mechanicService.getAllMechanics().subscribe(mecanicos => {
        this.mechanics = mecanicos; // Aquí asigna los datos actualizados a la variable vehicles
      });
    });
  }

  ngOnDestroy():void{
    this.suscription?.unsubscribe();
    console.log("obserbable morido")
  }

  createMechanic(): void {
    this.showModal = false;
    this.mechanicService.createMechanic(this.newMechanic).subscribe(
      response => {
        console.log('Mechanic created successfully', response);
        // Restablece los valores de los campos de registro
        this.newMechanic.nombre = '';
        this.newMechanic.correoElectronico = '';
        this.newMechanic.contrasenia = '';
      },
      error => {
        console.error('Error creating mechanic: ', error);
      }
    );
    this.showModal2 = true;
    setTimeout(() => {
      this.showModal2 = false;
      this.showModal3 = true;
    }, 9000);
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

  closeModal():void {
    this.showModal = false;
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

  selectedMechanic: MechanicDTO | null = null;

  toggleServicios2(mechanic: MechanicDTO): void {
    this.showServices = !this.showServices;
    this.selectedMechanic = mechanic;
  }


  closeModal3(): void {
    this.showModal3 = false;
  }


}
