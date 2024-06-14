import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../services/vehicle.service';
import { VehiculoSearchDTOResponse } from '../../../interfaces/VehiculoSearchDTOResponse';
import { OrderService } from '../../../services/order.service';
import { CreateOrdenDTORequest } from '../../../interfaces/CreateOrdenDTORequest';
import { TipoServicio } from '../../../interfaces/TipoServicio';
import { TallerServiceService } from '../../../services/taller-service.service';
import { MecanicoDTOList } from '../../../interfaces/MecanicoDTOList';
import { MechanicService } from '../../../services/mechanic.service';
import { ServicioMecanicoDTO } from '../../../interfaces/ServicioMecanicoDTO';
import OrderListComponent from '../order-list/order-list.component';
import { LoaderComponent } from '../loader/loader.component';
import { OperationDTOResponse } from '../../../interfaces/ServicioDTO';
import { AssignmentService } from '../../../services/assignment.service';

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
  styles: '',
})
export default class CreateOrderComponent implements OnInit {
  tipoServicio: TipoServicio[] = [
    TipoServicio.MANTENIMIENTO,
    TipoServicio.REPARACION,
  ];
  selectedTipoServicio: TipoServicio | null = null;
  serviciosMantenimiento: OperationDTOResponse[] = [];
  serviciosReparacion: OperationDTOResponse[] = [];
  selectedServiceId: number = 0;
  mecanicos: MecanicoDTOList[] = [];
  selectedMecanicId: number = 0;
  relacionMecanicoServicio: ServicioMecanicoDTO[] = [];
  emailCustomer: string = '';

  selectedServices: {
    tipo_servicio: string;
    servicioMecanico: ServicioMecanicoDTO;
  }[] = [
    {
      tipo_servicio: '',
      servicioMecanico: {
        operationId: 0,
        mechanicId: 0,
      },
    },
  ];

  showModal: boolean = false;
  @ViewChild('placaInput') placaInput!: ElementRef;
  plate: string = '';

  cliente = {
    nameCustomer: '',
    emailCustomer: '',
    addressCustomer: '',
    phoneCustomer: '',
  };
  vehiculo = {
    plate: '',
    brand: '',
    model: '',
    category: '',
  };
  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private orderService: OrderService,
    private tallerService: TallerServiceService,
    private mechanicService: MechanicService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.tallerService.getAllServiceToMaintenance().subscribe((servicios) => {
      this.serviciosMantenimiento = servicios;
      console.log(this.serviciosMantenimiento);
    });

    this.tallerService.getAllServiceToRepair().subscribe((servicios) => {
      this.serviciosReparacion = servicios;
      console.log(this.serviciosReparacion);
    });

    this.mechanicService.getAllMechanicsForOrder().subscribe((mecanicos) => {
      this.mecanicos = mecanicos;
      console.log('Mecánicos del taller:', this.mecanicos);
    });

    this.assignmentService
      .getAllWorkshopAssignments()
      .subscribe((serviciosMecanicos) => {
        this.relacionMecanicoServicio = serviciosMecanicos;
        console.log(
          'Relación Assignacion(mecanico-servicio):',
          this.relacionMecanicoServicio
        );
      });
  }

  openModal(): void {
    console.log('Selected services:', this.selectedServices);

    const serviciosMecanicos = this.selectedServices.map(
      (item) => item.servicioMecanico
    );

    const createOrdenDTORequest: CreateOrdenDTORequest = {
      emailCustomer: this.emailCustomer,
      plate: this.vehiculo.plate,
      assignmentDTORequests: serviciosMecanicos,
    };

    console.log('Servicios mecánicos seleccionados:', serviciosMecanicos);
    console.log('Crear orden DTO request:', createOrdenDTORequest);

    // Llamar al servicio para crear la orden
    this.orderService.createOrder(createOrdenDTORequest).subscribe(
      (response) => {
        console.log('Orden creada correctamente:', response);
        this.showModal = true; // Mostrar el modal de éxito
      },
      (error) => {
        console.error('Error al crear la orden:', error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/workshop/order-list']);
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Elimina caracteres no deseados
    if (value.length > 3) {
      value = value.substring(0, 3) + '-' + value.substring(3); // Agrega el guion después de los primeros 3 caracteres
    }
    this.placaInput.nativeElement.value = value.substring(0, 7); // Limita la longitud a 7 caracteres
    this.plate = this.placaInput.nativeElement.value;
  }

  buscarPorPlaca(): void {
    this.vehicleService.getDataByPlaca(this.plate).subscribe(
      (response: VehiculoSearchDTOResponse) => {
        this.cliente.nameCustomer = response.nameCustomer;
        this.emailCustomer = response.emailCustomer; // Asigna el email del cliente
        this.cliente.addressCustomer = response.addressCustomer;
        this.cliente.phoneCustomer = response.phoneCustomer;
        this.vehiculo.plate = response.plate;
        this.vehiculo.brand = response.brand;
        this.vehiculo.model = response.model;
        this.vehiculo.category = response.category;

        console.log('Respuesta de búsqueda por placa:', response);
      },
      (error) => {
        console.error('Error al buscar por placa:', error);
      }
    );
  }

  addRow() {
    this.selectedServices.push({
      tipo_servicio: '',
      servicioMecanico: {
        operationId: 0,
        mechanicId: 0,
      },
    });
  }

  removeRow(index: number) {
    this.selectedServices.splice(index, 1);
  }

  registrar() {
    console.log(this.selectedServices);
  }

  obtenerMecanicosPorServicio(operationId: number): MecanicoDTOList[] {
    const operationIdNumber = +operationId;

    const mecanicosAsociadosSinMapeo = this.relacionMecanicoServicio.filter(
      (relacion) => relacion.operationId === operationIdNumber
    );

    const mecanicosMapeados = mecanicosAsociadosSinMapeo.map((relacion) =>
      this.mecanicos.find((mecanico) => mecanico.id === relacion.mechanicId)
    );

    const mecanicosFiltrados = mecanicosMapeados.filter(
      (mecanico) => mecanico !== undefined
    ) as MecanicoDTOList[];

    return mecanicosFiltrados;
  }
}
