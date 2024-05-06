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
  selectedServices: { tipo_servicio: string, servicio: number, mecanico: number, servicioMecanico: ServicioMecanicoDTO }[] = [{
    tipo_servicio: '', servicio: 0, mecanico: 0, servicioMecanico: {
      servicioId: 0,
      mecanicoId: 0
    }
  }];

  showModal: boolean = false;
  @ViewChild('placaInput') placaInput!: ElementRef;
  placa: string = '';

  cliente: any = {};
  vehiculo: any = {};


  selectedRowIndex: number = 0;

  constructor(private vehicleService: VehicleService, private orderService: OrderService, private tallerService: TallerServiceService, private mechanicService: MechanicService) { }

  openModal(): void {
    console.log("resultado mmwbeo");

    console.log(this.selectedServices);

    const serviciosMecanicos = this.selectedServices.map(item => item.servicioMecanico);
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
    this.placaInput.nativeElement.value = value.substring(0, 7);
    this.placa = this.placaInput.nativeElement.value;
  }

  buscarPorPlaca(): void {
    this.vehicleService.getDataByPlaca({ placa: this.placa }).subscribe((response: VehiculoSearchDTOResponse) => {
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
      this.getServiceMaintenance();
      console.log(tipoServicio);
    } else if (tipoServicio === TipoServicio.REPARACION) {
      this.getServiceRepair();
      console.log(tipoServicio);
    }
  }

  getMechanicsByService(serviceId: number) {
    console.log('ID del servicio seleccionado:', serviceId);
    this.mechanicService.getMechanicsByService(serviceId).subscribe(mecanicos => {
      this.mecanicos = mecanicos;
    });
  }

  // selectMechanic(mecanicId: number) {
  //   this.selectedServices[this.selectedServices.length - 1].servicioMecanico.servicioId = this.selectedServices[this.selectedServices.length - 1].servicio;
  //   this.selectedServices[this.selectedServices.length - 1].servicioMecanico.mecanicoId = this.selectedServices[this.selectedServices.length - 1].mecanico;
  //   console.log('Servicio mecánico seleccionado:', this.selectedServices[this.selectedServices.length - 1].servicioMecanico);
  // }

  selectRow(index: number) {
  this.selectedRowIndex = index;
}

selectMechanic(mecanicId: number) {
  this.selectedServices[this.selectedRowIndex].servicioMecanico.servicioId = this.selectedServices[this.selectedRowIndex].servicio;
  this.selectedServices[this.selectedRowIndex].servicioMecanico.mecanicoId = this.selectedServices[this.selectedRowIndex].mecanico;
  console.log('Servicio mecánico seleccionado:', this.selectedServices[this.selectedRowIndex].servicioMecanico);
}

  addRow() {
    this.selectedServices.push({
      tipo_servicio: '', servicio: 0, mecanico: 0, servicioMecanico: {
        servicioId: 0,
        mecanicoId: 0
      }
    });
    this.selectRow(this.selectedServices.length - 1); // Selecciona el nuevo servicio
  }
  
  removeRow(index: number) {
    this.selectedServices.splice(index, 1);
    if (index === this.selectedRowIndex) {
      this.selectRow(Math.max(0, index - 1)); // Selecciona el servicio anterior si se eliminó el seleccionado
    }
  }

  registrar() {
    console.log(this.selectedServices);
  }


}
