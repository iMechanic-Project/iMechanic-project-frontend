import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import WorkshopServicesComponent from './workshop-services.component';
import { TallerServiceService } from '../../../services/taller-service.service';
import { of, throwError } from 'rxjs';
import { OperationDTOResponse } from '../../../interfaces/ServicioDTO';

describe('WorkshopServicesComponent', () => {
  let component: WorkshopServicesComponent;
  let fixture: ComponentFixture<WorkshopServicesComponent>;
  let tallerService: jasmine.SpyObj<TallerServiceService>;

  beforeEach(async () => {
    // Crear espía (spy) para el servicio inyectado
    tallerService = jasmine.createSpyObj('TallerServiceService', ['getAllServiceToMaintenance', 'getAllServiceToRepair', 'addServicioToTaller']);

    // Configurar el módulo de prueba
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule],
      providers: [
        { provide: TallerServiceService, useValue: tallerService }
      ]
    }).compileComponents();

    // Configurar métodos espía antes de crear el componente
    const mockMaintenanceServices: OperationDTOResponse[] = [{ id: 1, name: 'Service1' }];
    const mockRepairServices: OperationDTOResponse[] = [{ id: 2, name: 'Service2' }];
    tallerService.getAllServiceToMaintenance.and.returnValue(of(mockMaintenanceServices));
    tallerService.getAllServiceToRepair.and.returnValue(of(mockRepairServices));

    // Crear una instancia del componente y su fixture
    fixture = TestBed.createComponent(WorkshopServicesComponent);
    component = fixture.componentInstance;

    // Detectar cambios para inicializar el componente
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para inicializar servicios de mantenimiento y reparación en ngOnInit
  it('should initialize accionesMantenimiento and accionesReparacion on ngOnInit', () => {
    const mockMaintenanceServices: OperationDTOResponse[] = [{ id: 1, name: 'Service1' }];
    const mockRepairServices: OperationDTOResponse[] = [{ id: 2, name: 'Service2' }];
    tallerService.getAllServiceToMaintenance.and.returnValue(of(mockMaintenanceServices));
    tallerService.getAllServiceToRepair.and.returnValue(of(mockRepairServices));

    // Ejecutar ngOnInit
    component.ngOnInit();

    // Verificar que los servicios se hayan inicializado correctamente
    expect(component.accionesMantenimiento).toEqual(mockMaintenanceServices);
    expect(component.accionesReparacion).toEqual(mockRepairServices);
  });

  // Prueba para manejar el error al obtener los servicios
  it('should handle error on fetch services', () => {
    const errorResponse = { status: 500, message: 'Internal Server Error' };
    tallerService.getAllServiceToMaintenance.and.returnValue(throwError(errorResponse));
    tallerService.getAllServiceToRepair.and.returnValue(throwError(errorResponse));

    // Espiar el método console.error
    spyOn(console, 'error');

    // Ejecutar ngOnInit
    component.ngOnInit();

    // Verificar que el error haya sido manejado correctamente
    expect(console.error).toHaveBeenCalledWith('Error fetching services: ', errorResponse);
  });
});
