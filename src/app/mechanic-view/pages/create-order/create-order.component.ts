import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import OrderListComponent from "../order-list/order-list.component";
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    OrderListComponent,
    LoaderComponent,
  ],
  templateUrl: './create-order.component.html',
  styles: ''
})
export default class CreateOrderComponent implements OnInit {

  tipoServicio: TipoServicio[] = [TipoServicio.MANTENIMIENTO, TipoServicio.REPARACION];
  selectedTipoServicio: TipoServicio | null = null;
  serviciosMantenimiento: ServicioDTO[] = [];
  serviciosReparacion: ServicioDTO[] = [];
  selectedServiceId: number = 0;
  mecanicos: MecanicoDTOList[] = [];
  selectedMecanicId: number = 0;
  relacionMecanicoServicio: ServicioMecanicoDTO[] = [];

  selectedServices: { tipo_servicio: string, servicioMecanico: ServicioMecanicoDTO }[] = [{ tipo_servicio: '', servicioMecanico: {
    servicioId: 0,
    mecanicoId: 0
  } }];

  showModal: boolean = false;
  @ViewChild('placaInput') placaInput!: ElementRef;
  placa: string = '';

  cliente: any = {};
  vehiculo: any = {};

  constructor(private vehicleService: VehicleService, private orderService: OrderService, private tallerService: TallerServiceService, private mechanicService: MechanicService) { }

  ngOnInit(): void {
    this.tallerService.getAllServiceToMaintenance().subscribe(servicios => {
      this.serviciosMantenimiento = servicios;

      console.log(this.serviciosMantenimiento);
    });

    this.tallerService.getAllServiceToRepair().subscribe(servicios => {
      this.serviciosReparacion = servicios;
      console.log(this.serviciosReparacion);
    });

    this.mechanicService.getAllMechanicsForOrder().subscribe(mecanicos => {
      this.mecanicos = mecanicos;
      console.log(this.mecanicos);
    });

    this.orderService.getAllServicesMecanicsByTaller().subscribe(serviciosMecanicos => {
      this.relacionMecanicoServicio = serviciosMecanicos;
      console.log(this.relacionMecanicoServicio);
    });
  }

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
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Elimina caracteres no deseados
    if (value.length > 3) {
      value = value.substring(0, 3) + '-' + value.substring(3); // Agrega el guion después de los primeros 3 caracteres
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
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

  addRow() {
    this.selectedServices.push({ tipo_servicio: '', servicioMecanico: {
      servicioId: 0,
      mecanicoId: 0
    } });
  }

  removeRow(index: number) {
    this.selectedServices.splice(index, 1);
  }

  registrar() {
    console.log(this.selectedServices);
  }

  obtenerMecanicosPorServicio(servicioId: number): MecanicoDTOList[] {


    const servicioIdNumber = +servicioId;

    const mecanicosAsociadosSinMapeo = this.relacionMecanicoServicio
      .filter(relacion => relacion.servicioId === servicioIdNumber);

    const mecanicosMapeados = mecanicosAsociadosSinMapeo
      .map(relacion => this.mecanicos.find(mecanico => mecanico.id === relacion.mecanicoId));

    const mecanicosFiltrados = mecanicosMapeados.filter(mecanico => mecanico !== undefined) as MecanicoDTOList[];

    return mecanicosFiltrados;
  }

}
