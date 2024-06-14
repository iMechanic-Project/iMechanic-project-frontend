import { ComponentFixture, TestBed } from '@angular/core/testing';
import EmployeeViewComponent from './employee-view.component';
import {ActivatedRoute, Router} from '@angular/router';

describe('EmployeeViewComponent', () => {
  let component: EmployeeViewComponent;
  let fixture: ComponentFixture<EmployeeViewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
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
