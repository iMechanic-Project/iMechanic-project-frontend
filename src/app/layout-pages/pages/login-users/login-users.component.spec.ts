import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import LoginUsersComponent from './login-users.component';
import { AuthService } from '../../../services/auth.service';

describe('LoginUsersComponent', () => {
  let component: LoginUsersComponent;
  let fixture: ComponentFixture<LoginUsersComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crea un mock para AuthService
    authService = jasmine.createSpyObj('AuthService', ['login']);
    // Crea un mock para Router
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configura el módulo de prueba para el componente LoginUsersComponent
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(LoginUsersComponent);
    component = fixture.componentInstance;

    // Detecta cambios para inicializar el componente
    fixture.detectChanges();
  });

// Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });

  // Prueba para verificar el estado inicial de showPassword
  it('should have showPassword initially set to false', () => {
    // Verifica que showPassword esté inicialmente en false
    expect(component.showPassword).toBeFalse();
  });

  // Prueba para verificar que el método togglePassword cambia el estado de showPassword
  it('should toggle showPassword when togglePassword is called', () => {
    // Llama al método togglePassword
    component.togglePassword();
    // Verifica que showPassword sea true después de la llamada
    expect(component.showPassword).toBeTrue();

    // Llama nuevamente al método togglePassword
    component.togglePassword();
    // Verifica que showPassword sea false después de la segunda llamada
    expect(component.showPassword).toBeFalse();
  });

  // Prueba para verificar que onSubmit muestra showMSGdi cuando faltan datos
  it('should show showMSGdi when data is incomplete', () => {
    // Establece un loginDTORequest incompleto
    component.loginDTORequest = { email: '', password: '' };
    // Llama al método onSubmit
    component.onSubmit();
    // Verifica que showMSGdi sea true y showMSGne sea false
    expect(component.showMSGdi).toBeTrue();
    expect(component.showMSGne).toBeFalse();
  });

  // Prueba para verificar que onSubmit llama al servicio de autenticación y navega correctamente
  it('should call authService.login and navigate based on role when data is complete', () => {
    // Establece un loginDTORequest completo
    component.loginDTORequest = { email: 'test@test.com', password: 'password' };
    // Mock de respuesta del servicio de autenticación
    authService.login.and.returnValue(of({ token: '12345', role: 'CUSTOMER' }));

    // Llama al método onSubmit
    component.onSubmit();

    // Verifica que el método login del servicio de autenticación se haya llamado
    expect(authService.login).toHaveBeenCalled();
    // Verifica que localStorage tenga el token y role guardados
    expect(localStorage.getItem('token')).toBe('12345');
    expect(localStorage.getItem('role')).toBe('CUSTOMER');
    // Verifica que el método navigate del router se haya llamado con el argumento correcto
    expect(router.navigate).toHaveBeenCalledWith(['/client/register-vehicles']);
  });


  // Prueba para verificar que onSubmit maneja errores correctamente
  it('should handle error during login', () => {
    // Establece un loginDTORequest completo
    component.loginDTORequest = { email: 'test@test.com', password: 'password' };
    // Mock de error del servicio de autenticación
    authService.login.and.returnValue(throwError(() => new Error('Error during login')));

    // Llama al método onSubmit
    component.onSubmit();

    // Verifica los mensajes que se muestran
    expect(component.showMSGne).toBeTrue();
    expect(component.showMSGdi).toBeFalse();
  });




});
