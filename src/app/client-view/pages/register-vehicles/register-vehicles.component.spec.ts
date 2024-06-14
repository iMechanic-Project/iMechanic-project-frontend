import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; // Importa 'of' desde rxjs
import RegisterVehiclesComponent from './register-vehicles.component';
import { VehicleService } from '../../../services/vehicle.service';
import { Categoria } from '../../../interfaces/Categoria';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

describe('RegisterVehiclesComponent', () => {
  let component: RegisterVehiclesComponent;
  let fixture: ComponentFixture<RegisterVehiclesComponent>;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} },
        VehicleService // Incluye VehicleService como proveedor
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterVehiclesComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Verifica que se cargan correctamente los modelos al seleccionar una marca
  it('should load modelos on marca selection', () => {
    const marcaId = 1;
    spyOn(vehicleService, 'getAllModelos').and.returnValue(of([]));
    component.onMarcaSelect(marcaId);
    expect(vehicleService.getAllModelos).toHaveBeenCalledWith(marcaId);
    expect(component.modelos.length).toBe(0);
  });

  // Verifica que se asigna correctamente la categoría al seleccionarla
  it('should set correct category on selection', () => {
    const categoria: Categoria = Categoria.CAMIONETA;
    component.onCategoriaSelect(categoria);
    expect(component.newVehicle.category).toBe(categoria);
  });

  // Verifica que se maneja correctamente el cambio de entrada en el input de placa
  it('should handle input change correctly', () => {
    component.placaInput = { nativeElement: { value: '' } };
    const event = {
      target: { value: 'abc123' }
    };
    component.onInputChange(event);
    expect(component.newVehicle.plate).toBe('ABC-123');
  });

  // Verifica que se guarda el vehículo correctamente
  it('should save vehicle successfully', () => {
    spyOn(component, 'closeModal');
    spyOn(component, 'openModal2');
    spyOn(vehicleService, 'createVehicle').and.returnValue(of());
    component.saveVehicle();
    expect(component.closeModal).toHaveBeenCalled();
    expect(component.openModal2).toHaveBeenCalled();
  });
});
