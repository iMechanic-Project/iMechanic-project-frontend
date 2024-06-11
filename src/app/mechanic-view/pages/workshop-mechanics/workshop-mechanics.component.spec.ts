import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MechanicService } from '../../../services/mechanic.service';
import { TallerServiceService } from '../../../services/taller-service.service';
import { of, throwError } from 'rxjs';
import WorkshopMechanicsComponent from './workshop-mechanics.component';
import { ActivatedRoute } from "@angular/router";

describe('WorkshopMechanicsComponent', () => {
  let component: WorkshopMechanicsComponent;
  let fixture: ComponentFixture<WorkshopMechanicsComponent>;
  let mechanicService: jasmine.SpyObj<MechanicService>;
  let tallerService: jasmine.SpyObj<TallerServiceService>;

  beforeEach(async () => {
    // Crea un objeto Spy para el servicio de Mecánico con los métodos necesarios
    mechanicService = jasmine.createSpyObj('MechanicService', ['getAllMechanics', 'createMechanic', 'refresh$']);
    // Crea un objeto Spy para el servicio de Taller con el método necesario
    tallerService = jasmine.createSpyObj('TallerServiceService', ['getAllServices']);

    // Configura el módulo de prueba
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, NgxPaginationModule],
      providers: [
        { provide: MechanicService, useValue: mechanicService }, // Usa el objeto Spy del servicio de Mecánico
        { provide: TallerServiceService, useValue: tallerService }, // Usa el objeto Spy del servicio de Taller
        { provide: ActivatedRoute, useValue: {} } // Proveedor para ActivatedRoute
      ]
    }).compileComponents();

    // Crea el componente y su fixture
    fixture = TestBed.createComponent(WorkshopMechanicsComponent);
    component = fixture.componentInstance;
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que se agrega un nuevo mecánico correctamente
  it('should add a new mechanic', () => {
    const mockMechanic = { message: 'Mechanic created successfully' };
    // Configura el servicio de Mecánico para devolver un observable de éxito con el mecánico simulado
    mechanicService.createMechanic.and.returnValue(of(mockMechanic));
    // Configura el objeto newMechanic del componente con datos simulados
    component.newMechanic = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123', phone: '987654321', operationsIds: [1, 2, 3] };

    // Espía la función console.log para verificar que se llama correctamente
    spyOn(console, 'log');

    // Llama a la función createMechanic del componente
    component.createMechanic();

    // Verifica que se llamó a la función createMechanic del servicio de Mecánico con los datos correctos
    expect(mechanicService.createMechanic).toHaveBeenCalledWith(component.newMechanic);
    // Verifica que se llamó a console.log con el mensaje esperado
    expect(console.log).toHaveBeenCalledWith('Mechanic created successfully', mockMechanic);
  });

  // Prueba para verificar que se maneja correctamente un error al agregar un nuevo mecánico
  it('should handle error on createMechanic', () => {
    const errorResponse = { status: 500, message: 'Internal Server Error' };
    // Configura el servicio de Mecánico para devolver un observable de error con el error simulado
    mechanicService.createMechanic.and.returnValue(throwError(errorResponse));

    // Espía la función console.error para verificar que se llama correctamente
    spyOn(console, 'error');

    // Llama a la función createMechanic del componente
    component.createMechanic();

    // Verifica que se llamó a console.error con el mensaje de error esperado
    expect(console.error).toHaveBeenCalledWith('Error creating mechanic: ', errorResponse);
  });
});
