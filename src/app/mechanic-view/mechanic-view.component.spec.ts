import { ComponentFixture, TestBed } from '@angular/core/testing';
import MechanicViewComponent from './mechanic-view.component';
import {ActivatedRoute, Router} from '@angular/router';

describe('MechanicViewComponent', () => {
  let component: MechanicViewComponent;
  let fixture: ComponentFixture<MechanicViewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MechanicViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
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
