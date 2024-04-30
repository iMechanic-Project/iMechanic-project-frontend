import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from "@angular/router";
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

@Component({
  selector: 'app-register-vehicles',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './register-vehicles.component.html',
  styles: ''
})
export default class RegisterVehiclesComponent implements OnInit {

  @ViewChild('placaInput') placaInput!: ElementRef;

  vehicles: VehiculoDTOResponse[] = [];
  newVehicle: VehiculoDTORequest = { placa: '', marcaId: 0, modeloId: 0, categoria: Categoria.AUTO };
  marcas: MarcaDTO[] = [];
  modelos: ModeloDTO[] = [];
  selectedMarcaId: number | null = null;
  selectedModeloId: number | null = null;
  categorias: Categoria[] = [Categoria.AUTO, Categoria.CAMIONETA];
  selectedCategoria: Categoria | null = null;
  p: number = 1;
  showModal = false;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehiclesByUser().subscribe(vehicle => {
      this.vehicles = vehicle;
    });
  }

  openModal(): void {
    this.showModal = true;
    this.vehicleService.getAllMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });
  }

  onMarcaSelect(marcaId: number): void {
    this.selectedMarcaId = marcaId;
    this.loadModelos(marcaId);
  }

  loadModelos(marcaId: number): void {
    this.vehicleService.getAllModelos(marcaId).subscribe(modelos => {
      this.modelos = modelos;
      console.log(marcaId);
    });
  }

  onModeloSelect(modeloId: number): void {
    this.selectedModeloId = modeloId;
    console.log(modeloId);
  }

  onCategoriaSelect(categoria: Categoria): void {
    this.newVehicle.categoria = categoria;
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
    this.newVehicle.placa = this.placaInput.nativeElement.value;
  }

  saveVehicle(): void {
    this.newVehicle.marcaId = this.selectedMarcaId || 0;
    this.newVehicle.modeloId = this.selectedModeloId || 0;

    this.vehicleService.createVehicle(this.newVehicle).subscribe(
      (response) => {
        console.log('Vehículo creado:', response);
        this.showModal = false;
        // Reinicia el objeto newVehicle para limpiar los campos del formulario
        this.newVehicle = { placa: '', marcaId: 0, modeloId: 0, categoria: Categoria.AUTO };
      },
      (error) => {
        console.error('Error al crear vehículo:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }
}