import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {VehiculoDTORequest} from "../../../interfaces/VehiculoDTORequest";
import {Categoria} from "../../../interfaces/Categoria";

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './create-order.component.html',
  styles: ''
})
export default class CreateOrderComponent {

  tipoServicio: string[] = ["Tipo1", "Tipo2", "Tipo3"]; // Ejemplo de datos para los select
  Servicio: string[] = ["Servicio1", "Servicio2", "Servicio3"]; // Ejemplo de datos para los select
  listaMecanico: string[] = ["Mecanico1", "Mecanico2", "Mecanico3"]; // Ejemplo de datos para los select
  items: any[] = [{}]; // Inicialmente un array con un objeto vacío
  showModal: boolean = false;


  agregarItem() {
    this.items.push({}); // Agrega un nuevo objeto vacío al final del array de items
  }

  eliminarItem(index: number) {
    this.items.splice(index, 1); // Elimina el objeto en la posición index
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }


  @ViewChild('placaInput') placaInput!: ElementRef;
  newVehicle: VehiculoDTORequest = { placa: '', marcaId: 0, modeloId: 0, categoria: Categoria.AUTO };

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
    this.newVehicle.placa = this.placaInput.nativeElement.value;
  }


}

