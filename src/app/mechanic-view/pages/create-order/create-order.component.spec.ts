import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import CreateOrderComponent from './create-order.component';
import { VehicleService } from '../../../services/vehicle.service';
import { OrderService } from '../../../services/order.service';
import { TallerServiceService } from '../../../services/taller-service.service';
import { MechanicService } from '../../../services/mechanic.service';
import { AssignmentService } from '../../../services/assignment.service';
import { of } from 'rxjs';
import { OperationDTOResponse } from '../../../interfaces/ServicioDTO';
import { CreateOrdenDTORequest } from '../../../interfaces/CreateOrdenDTORequest';
import { VehiculoSearchDTOResponse } from '../../../interfaces/VehiculoSearchDTOResponse';
import { HttpClientModule } from "@angular/common/http";

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  let orderService: jasmine.SpyObj<OrderService>;
  let tallerService: jasmine.SpyObj<TallerServiceService>;
  let mechanicService: jasmine.SpyObj<MechanicService>;
  let assignmentService: jasmine.SpyObj<AssignmentService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getDataByPlaca']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['createOrder']);
    const tallerServiceSpy = jasmine.createSpyObj('TallerServiceService', ['getAllServiceToMaintenance', 'getAllServiceToRepair']);
    const mechanicServiceSpy = jasmine.createSpyObj('MechanicService', ['getAllMechanicsForOrder']);
    const assignmentServiceSpy = jasmine.createSpyObj('AssignmentService', ['getAllWorkshopAssignments']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: TallerServiceService, useValue: tallerServiceSpy },
        { provide: MechanicService, useValue: mechanicServiceSpy },
        { provide: AssignmentService, useValue: assignmentServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;

    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    tallerService = TestBed.inject(TallerServiceService) as jasmine.SpyObj<TallerServiceService>;
    mechanicService = TestBed.inject(MechanicService) as jasmine.SpyObj<MechanicService>;
    assignmentService = TestBed.inject(AssignmentService) as jasmine.SpyObj<AssignmentService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock responses for services
    tallerService.getAllServiceToMaintenance.and.returnValue(of([]));
    tallerService.getAllServiceToRepair.and.returnValue(of([]));
    mechanicService.getAllMechanicsForOrder.and.returnValue(of([]));
    assignmentService.getAllWorkshopAssignments.and.returnValue(of([]));

    fixture.detectChanges();
  });


  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para inicializar servicios de mantenimiento y reparación en ngOnInit
  it('should initialize serviciosMantenimiento and serviciosReparacion on ngOnInit', () => {
    const mockMaintenanceServices: OperationDTOResponse[] = [{ id: 1, name: 'Service1' }];
    const mockRepairServices: OperationDTOResponse[] = [{ id: 2, name: 'Service2' }];

    // Configurar el comportamiento esperado de los servicios espías
    tallerService.getAllServiceToMaintenance.and.returnValue(of(mockMaintenanceServices));
    tallerService.getAllServiceToRepair.and.returnValue(of(mockRepairServices));

    // Ejecutar el ngOnInit
    component.ngOnInit();

    // Verificar que los servicios se hayan inicializado correctamente
    expect(component.serviciosMantenimiento).toEqual(mockMaintenanceServices);
    expect(component.serviciosReparacion).toEqual(mockRepairServices);
  });

  // Prueba para cerrar el modal y navegar a la lista de órdenes
  it('should close modal and navigate to order list', () => {
    // Ejecutar closeModal
    component.closeModal();

    // Verificar que la navegación haya sido realizada
    expect(router.navigate).toHaveBeenCalledWith(['/workshop/order-list']);
  });

  // Prueba para formatear correctamente la entrada de placa
  it('should format plate input correctly', () => {
    const mockEvent = { target: { value: 'abc123' } };

    // Ejecutar onInputChange
    component.onInputChange(mockEvent);

    // Verificar que la placa se haya formateado correctamente
    expect(component.placaInput.nativeElement.value).toBe('ABC-123');
  });

  // Prueba para obtener datos del vehículo por placa
  it('should fetch vehicle data by plate', () => {
    const mockResponse: VehiculoSearchDTOResponse = {
      nameCustomer: 'John Doe',
      emailCustomer: 'john@test.com',
      addressCustomer: '123 Street',
      phoneCustomer: '123456789',
      plate: 'ABC-123',
      brand: 'Brand',
      model: 'Model',
      category: 'Category'
    };
    vehicleService.getDataByPlaca.and.returnValue(of(mockResponse));
    component.plate = 'ABC-123';

    // Ejecutar buscarPorPlaca
    component.buscarPorPlaca();

    // Verificar que los datos del vehículo se hayan obtenido correctamente
    expect(vehicleService.getDataByPlaca).toHaveBeenCalledWith('ABC-123');
    expect(component.cliente.nameCustomer).toBe('John Doe');
    expect(component.emailCustomer).toBe('john@test.com');
  });

  // Prueba para verificar que se pueden agregar y eliminar filas correctamente
  it('should add and remove rows correctly', () => {
    component.addRow();
    expect(component.selectedServices.length).toBe(2);

    component.removeRow(1);
    expect(component.selectedServices.length).toBe(1);
  });
});
