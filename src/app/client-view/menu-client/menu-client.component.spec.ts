import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MenuClientComponent } from './menu-client.component';
import { ActivatedRoute } from '@angular/router';

describe('MenuClientComponent', () => {
  let component: MenuClientComponent;
  let fixture: ComponentFixture<MenuClientComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} } // Provide a stub for ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuClientComponent);
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
  it('should close session and navigate to login', () => {
    spyOn(localStorage, 'removeItem');
    component.closeSesion();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(router.navigate).toHaveBeenCalledWith(['/inicio/login-users']);
  });
});
