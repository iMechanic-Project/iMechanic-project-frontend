import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import { MenuEmployeeComponent } from './menu-employee.component';

describe('MenuEmployeeComponent', () => {
  let component: MenuEmployeeComponent;
  let fixture: ComponentFixture<MenuEmployeeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEmployeeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que el dropdown se alterna correctamente
  it('should toggle dropdown', () => {
    component.isDropdownOpenxs = false;
    component.toggleDropdownxs();
    expect(component.isDropdownOpenxs).toBeTrue();

    component.toggleDropdownxs();
    expect(component.isDropdownOpenxs).toBeFalse();
  });

  // Verifica que la sesión se cierra correctamente y navega al login
  it('should close employee session and navigate to login', () => {
    spyOn(localStorage, 'removeItem');
    component.closeSesion();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(router.navigate).toHaveBeenCalledWith(['/inicio/login-users']);
  });
});
