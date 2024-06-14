import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderLayoutComponent } from './header-layout.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { NgClass } from '@angular/common';

describe('HeaderLayoutComponent', () => {
  let component: HeaderLayoutComponent;
  let fixture: ComponentFixture<HeaderLayoutComponent>;

  beforeEach(async () => {
    // Configura el módulo de prueba para el componente HeaderLayoutComponent
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [NgClass, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(HeaderLayoutComponent);
    component = fixture.componentInstance;

    // Detecta cambios para inicializar el componente
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  // Prueba para verificar el estado inicial de isDropdownOpen
  it('should have isDropdownOpen initially set to true', () => {
    // Verifica que isDropdownOpen esté inicialmente en true
    expect(component.isDropdownOpen).toBeTrue();
  });

  // Prueba para verificar que el método toggleDropdown cambia el estado de isDropdownOpen
  it('should toggle isDropdownOpen when toggleDropdown is called', () => {
    // Llama al método toggleDropdown
    component.toggleDropdown();
    // Verifica que isDropdownOpen sea false después de la llamada
    expect(component.isDropdownOpen).toBeFalse();

    // Llama nuevamente al método toggleDropdown
    component.toggleDropdown();
    // Verifica que isDropdownOpen sea true después de la segunda llamada
    expect(component.isDropdownOpen).toBeTrue();
  });
});
