import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MechanicService } from '../../../services/mechanic.service';
import { MechanicDTORequest } from '../../../interfaces/MechanicDTORequest';
import { TallerServiceService } from '../../../services/taller-service.service';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { OperationDTOResponse } from '../../../interfaces/ServicioDTO';
import { MechanicDetailsDTOResponse } from '../../../interfaces/MechanicDetailsDTOResponse';

@Component({
  selector: 'app-workshop-mechanics',
  standalone: true,
  imports: [NgForOf, FormsModule, NgxPaginationModule, NgIf, LoaderComponent],
  templateUrl: './workshop-mechanics.component.html',
  styles: '',
})
export default class WorkshopMechanicsComponent implements OnInit, OnDestroy {
  p: number = 1;

  mechanics: MechanicDetailsDTOResponse[] = [];
  suscription: Subscription | undefined;
  newMechanic: MechanicDTORequest = {
    name: '',
    email: '',
    password: '',
    phone: '',
    operationsIds: [],
  };
  servicios: OperationDTOResponse[] = [];
  selectedServicesMechanic: number[] = [];

  showModal = false;
  showModal2 = false;
  showModal3 = false;
  showPassword: boolean = false;
  showServices: boolean = false;

  constructor(
    private mechanicService: MechanicService,
    private tallerService: TallerServiceService
  ) {
    this.newMechanic.operationsIds = [];
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.mechanicService.getAllMechanics().subscribe((mecanicos) => {
      this.mechanics = mecanicos;
    });

    this.suscription = this.mechanicService.refresh$.subscribe(() => {
      this.mechanicService.getAllMechanics().subscribe((mecanicos) => {
        this.mechanics = mecanicos; // Aquí asigna los datos actualizados a la variable vehicles
      });
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('obserbable morido');
  }

  createMechanic(): void {
    this.showModal = false;
    this.showModal2 = true;
    this.mechanicService.createMechanic(this.newMechanic).subscribe(
      (response) => {
        console.log('Mechanic created successfully', response);
        this.showModal2 = false;
        this.showModal3 = true;
        // Restablece los valores de los campos de registro
        this.newMechanic.name = '';
        this.newMechanic.email = '';
        this.newMechanic.password = '';
        this.newMechanic.phone = '';
        this.newMechanic.operationsIds = [];
      },
      (error) => {
        console.error('Error creating mechanic: ', error);
      }
    );
    this.showModal2 = true;
  }

  toggleServicios(): void {
    this.showServices = !this.showServices;
  }

  openModal(): void {
    this.showModal = true;
    this.tallerService.getAllServices().subscribe((servicios) => {
      this.servicios = servicios;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  toggleServicio(servicioId: number): void {
    if (this.newMechanic.operationsIds.includes(servicioId)) {
      console.log(`Removing servicioId ${servicioId}`);
      this.newMechanic.operationsIds = this.newMechanic.operationsIds.filter(
        (id) => id !== servicioId
      );
    } else {
      console.log('servicioId', servicioId);
      this.newMechanic.operationsIds.push(servicioId);
    }
  }

  selectedMechanic: MechanicDetailsDTOResponse | null = null;

  toggleServicios2(mechanic: MechanicDetailsDTOResponse): void {
    this.showServices = !this.showServices;
    this.selectedMechanic = mechanic;
  }

  closeModal3(): void {
    this.showModal3 = false;
  }

  onKeyPress(event: any) {
    // Obtener el código de la tecla presionada
    const charCode = event.which ? event.which : event.keyCode;
    // Permitir solo números (del 0 al 9) y teclas de control como borrar y retroceso
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault(); // Cancelar el evento si no es un número
    }
  }
}
