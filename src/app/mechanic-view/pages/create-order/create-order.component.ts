import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { VehiculoDTORequest } from "../../../interfaces/VehiculoDTORequest";
import { Categoria } from "../../../interfaces/Categoria";
import { VehicleService } from '../../../services/vehicle.service';
import { VehiculoSearchDTOResponse } from '../../../interfaces/VehiculoSearchDTOResponse';
import { OrderService } from '../../../services/order.service';
import { CreateOrdenDTORequest } from '../../../interfaces/CreateOrdenDTORequest';
import { TipoServicio } from '../../../interfaces/TipoServicio';
import { ServicioDTO } from '../../../interfaces/ServicioDTO';
import { TallerServiceService } from '../../../services/taller-service.service';
import { MechanicDTO } from '../../../interfaces/MechanicDTO';
import { MecanicoDTOList } from '../../../interfaces/MecanicoDTOList';
import { MechanicService } from '../../../services/mechanic.service';
import { ServicioMecanicoDTO } from '../../../interfaces/ServicioMecanicoDTO';

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

  tipoServicio: TipoServicio[] = [TipoServicio.MANTENIMIENTO, TipoServicio.REPARACION];
  selectedTipoServicio: TipoServicio | null = null;
  serviciosMantenimiento: ServicioDTO[] = [];
  serviciosReparacion: ServicioDTO[] = [];
  selectedServiceId: number = 0;
  mecanicos: MecanicoDTOList[] = [];
  selectedMecanicId: number = 0;
  servicioMecanico: ServicioMecanicoDTO = {
    servicioId: 0,
    mecanicoId: 0
  };
  items: any[] = [{}]; // Inicialmente un array con un objeto vacío
  showModal: boolean = false;
  @ViewChild('placaInput') placaInput!: ElementRef;
  placa: string = '';

  // Propiedades para almacenar los datos del cliente y del vehículo
  cliente: any = {};
  vehiculo: any = {};

  constructor(private vehicleService: VehicleService, private orderService: OrderService, private tallerService: TallerServiceService, private mechanicService: MechanicService) { }

  agregarItem() {
    this.items.push({}); // Agrega un nuevo objeto vacío al final del array de items
  }

  eliminarItem(index: number) {
    this.items.splice(index, 1); // Elimina el objeto en la posición index
  }

  openModal(): void {
    // Crear el objeto CreateOrdenDTORequest con los datos del cliente, vehículo y servicios mecánicos seleccionados
    const serviciosMecanicos = this.items.map(item => item.servicioMecanico);
    const createOrdenDTORequest: CreateOrdenDTORequest = {
      nombreCliente: this.cliente.nombreCliente,
      direccion: this.cliente.direccion,
      telefono: this.cliente.telefono,
      placa: this.vehiculo.placa,
      marca: this.vehiculo.marca,
      modelo: this.vehiculo.modelo,
      categoria: this.vehiculo.categoria,
      serviciosMecanicos: serviciosMecanicos
    };

    console.log('Datos del cliente:', this.cliente);
    console.log('Datos del vehículo:', this.vehiculo);
    console.log('Servicios mecánicos seleccionados:', serviciosMecanicos);

    console.log(createOrdenDTORequest);

    // Llamar al servicio para crear la orden
    this.orderService.createOrder(createOrdenDTORequest).subscribe(response => {
      console.log('Orden creada correctamente:', response);
      this.showModal = true; // Mostrar el modal de éxito
    }, error => {
      console.error('Error al crear la orden:', error);
      // Aquí puedes manejar el error de creación de la orden
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    if (value.length === 3) {
      value += '-';
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
    this.placa = this.placaInput.nativeElement.value;
  }

  buscarPorPlaca(): void {
    this.vehicleService.getDataByPlaca({ placa: this.placa }).subscribe((response: VehiculoSearchDTOResponse) => {
      // Asigna los datos del cliente y del vehículo a las propiedades correspondientes
      this.cliente = {
        nombreCliente: response.nombreCliente,
        direccion: response.direccion,
        telefono: response.telefono
      };
      this.vehiculo = {
        placa: response.placa,
        marca: response.marca,
        modelo: response.modelo,
        categoria: response.categoria
      };

    }, error => {
      // Aquí puedes manejar el error si la solicitud de datos del vehículo falla
      console.error(error);
    });
  }

  getServiceMaintenance() {
    this.tallerService.getAllServiceToMaintenance().subscribe(servicios => {
      this.serviciosMantenimiento = servicios;
    });
  }

  getServiceRepair() {
    this.tallerService.getAllServiceToRepair().subscribe(servicios => {
      this.serviciosReparacion = servicios;
    });
  }

  onTypeOfService(tipoServicio: TipoServicio) {
    if (tipoServicio === TipoServicio.MANTENIMIENTO) {
      this.getServiceMaintenance()
    } else if (tipoServicio === TipoServicio.REPARACION) {
      this.getServiceRepair();
    }
  }

  getMechanicsByService(serviceId: number) {
    console.log('ID del servicio seleccionado:', serviceId);
    this.mechanicService.getMechanicsByService(serviceId).subscribe(mecanicos => {
      this.mecanicos = mecanicos;
    });
  }

  selectMechanic(mecanicId: number) {
    this.servicioMecanico.servicioId = this.selectedServiceId;
    this.servicioMecanico.mecanicoId = mecanicId;
    const index = this.items.length - 1; // Último ítem agregado
    this.items[index].servicioMecanico = this.servicioMecanico; // Agrega el servicio mecánico al ítem
    console.log('Servicio mecánico seleccionado:', this.servicioMecanico);
  }

}
