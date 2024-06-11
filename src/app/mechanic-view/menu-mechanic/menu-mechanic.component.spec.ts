import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMechanicComponent } from './menu-mechanic.component';
import {ActivatedRoute, Router} from '@angular/router';
import { NgClass } from '@angular/common';

describe('MenuMechanicComponent', () => {
  let component: MenuMechanicComponent;
  let fixture: ComponentFixture<MenuMechanicComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crea un mock para Router
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configura el módulo de prueba para el componente MenuMechanicComponent
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [NgClass],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(MenuMechanicComponent);
    component = fixture.componentInstance;

    // Detecta cambios para inicializar el componente
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  // Prueba para verificar el estado inicial de isDropdownOpenxs
  it('should have isDropdownOpenxs initially set to false', () => {
    // Verifica que isDropdownOpenxs esté inicialmente en false
    expect(component.isDropdownOpenxs).toBeFalse();
  });

  // Prueba para verificar que el método toggleDropdownxs cambia el estado de isDropdownOpenxs
  it('should toggle isDropdownOpenxs when toggleDropdownxs is called', () => {
    // Llama al método toggleDropdownxs
    component.toggleDropdownxs();
    // Verifica que isDropdownOpenxs sea true después de la llamada
    expect(component.isDropdownOpenxs).toBeTrue();

    // Llama nuevamente al método toggleDropdownxs
    component.toggleDropdownxs();
    // Verifica que isDropdownOpenxs sea false después de la segunda llamada
    expect(component.isDropdownOpenxs).toBeFalse();
  });

  // Verifica que la sesión se cierra correctamente y navega al login
  it('should close mechanic session and navigate to login', () => {
    spyOn(localStorage, 'removeItem');
    component.closeSesion();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(router.navigate).toHaveBeenCalledWith(['/inicio/login-users']);
  });
});
