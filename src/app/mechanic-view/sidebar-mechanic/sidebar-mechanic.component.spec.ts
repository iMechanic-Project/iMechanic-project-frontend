import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarMechanicComponent } from './sidebar-mechanic.component';
import {ActivatedRoute, Router} from '@angular/router';

describe('SidebarMechanicComponent', () => {
  let component: SidebarMechanicComponent;
  let fixture: ComponentFixture<SidebarMechanicComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear espía (spy) para el servicio inyectado
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configurar el módulo de prueba
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    // Crear una instancia del componente y su fixture
    fixture = TestBed.createComponent(SidebarMechanicComponent);
    component = fixture.componentInstance;

    // Detectar cambios para inicializar el componente
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que el dropdown se alterna correctamente
  it('should toggle dropdown', () => {
    component.showDropdown = false;
    component.toggleDropdown();
    expect(component.showDropdown).toBeTrue();

    component.toggleDropdown();
    expect(component.showDropdown).toBeFalse();
  });

  // Verifica que el segundo dropdown se alterna correctamente
  it('should toggle second dropdown', () => {
    component.showDropdown2 = false;
    component.toggleDropdown2();
    expect(component.showDropdown2).toBeTrue();

    component.toggleDropdown2();
    expect(component.showDropdown2).toBeFalse();
  });
});
