import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { VehiculoDTOResponse } from '../../../interfaces/VehiculoDTOResponse';
import { VehicleService } from '../../../services/vehicle.service';
import { MarcaDTO } from '../../../interfaces/MarcaDTO';
import { ModeloDTO } from '../../../interfaces/ModeloDTO';
import { FormsModule } from '@angular/forms';
import { VehiculoDTORequest } from '../../../interfaces/VehiculoDTORequest';
import { Categoria } from '../../../interfaces/Categoria';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-vehicles',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './register-vehicles.component.html',
  styles: '',
})
export default class RegisterVehiclesComponent implements OnInit, OnDestroy {
  @ViewChild('placaInput') placaInput!: ElementRef;

  vehicles: VehiculoDTOResponse[] = [];
  suscription: Subscription | undefined;
  newVehicle: VehiculoDTORequest = {
    plate: '',
    brandId: 0,
    modelId: 0,
    category: Categoria.AUTO,
  };
  marcas: MarcaDTO[] = [];
  modelos: ModeloDTO[] = [];
  selectedMarcaId: number | null = null;
  selectedModeloId: number | null = null;
  categorias: Categoria[] = [Categoria.AUTO, Categoria.CAMIONETA];
  selectedCategoria: Categoria | null = null;
  p: number = 1;
  showModal = false;
  showModal2 = false;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehiclesByUser().subscribe((vehicle) => {
      this.vehicles = vehicle;
    });

    this.suscription = this.vehicleService.refresh$.subscribe(() => {
      this.vehicleService.getAllVehiclesByUser().subscribe((vehicles) => {
        this.vehicles = vehicles; // Aquí asigna los datos actualizados a la variable vehicles
      });
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('obserbable morido');
  }

  openModal(): void {
    this.showModal = true;
    this.vehicleService.getAllMarcas().subscribe((marcas) => {
      this.marcas = marcas;
    });
  }

  openModal2(): void {
    this.showModal2 = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  closeModal2(): void {
    this.showModal2 = false;
  }

  onMarcaSelect(marcaId: number): void {
    this.selectedMarcaId = marcaId;
    this.loadModelos(marcaId);
  }

  loadModelos(marcaId: number): void {
    this.vehicleService.getAllModelos(marcaId).subscribe((modelos) => {
      this.modelos = modelos;
      console.log(marcaId);
    });
  }

  onModeloSelect(modeloId: number): void {
    this.selectedModeloId = modeloId;
    console.log(modeloId);
  }

  onCategoriaSelect(categoria: Categoria): void {
    this.newVehicle.category = categoria;
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Elimina caracteres no deseados
    if (value.length > 3) {
      value = value.substring(0, 3) + '-' + value.substring(3); // Agrega el guion después de los primeros 3 caracteres
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
    this.newVehicle.plate = this.placaInput.nativeElement.value;
  }

  saveVehicle(): void {
    this.newVehicle.brandId = this.selectedMarcaId || 0;
    this.newVehicle.modelId = this.selectedModeloId || 0;

    this.vehicleService.createVehicle(this.newVehicle).subscribe(
      (response) => {
        console.log('Vehículo creado:', response);
        this.showModal = false;
        // Reinicia el objeto newVehicle para limpiar los campos del formulario
        this.newVehicle = {
          plate: '',
          brandId: 0,
          modelId: 0,
          category: Categoria.AUTO,
        };
        this.selectedMarcaId = null; // Restablece el campo de selección de marca
        this.selectedModeloId = null; // Restablece el campo de selección de modelo
        this.selectedCategoria = null; // Restablece el campo de selección de categoría
      },
      (error) => {
        console.error('Error al crear vehículo:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    );

    this.closeModal();
    this.openModal2();
  }
}
