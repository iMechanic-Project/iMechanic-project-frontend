import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import RegisterUsersComponent from './register-users.component';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RegisterUsersComponent', () => {
  let component: RegisterUsersComponent;
  let fixture: ComponentFixture<RegisterUsersComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    // Configura el entorno de prueba para el componente, incluyendo módulos y proveedores necesarios
    await TestBed.configureTestingModule({
      imports: [
        RegisterUsersComponent,
        HttpClientModule,
        FormsModule
      ],
      providers: [AuthService]
    }).compileComponents();

    // Crea la instancia del componente y el fixture para acceder a su DOM y estado
    fixture = TestBed.createComponent(RegisterUsersComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges(); // Detecta cambios para actualizar el estado inicial del componente
  });

  // Verifica que el componente se crea correctamente
  it('should create', () => {
    // Verifica que la instancia del componente sea correcta
    expect(component).toBeTruthy();
  });

  // Verifica que las contraseñas coinciden y no se muestra el mensaje de error
  it('should validate that passwords match', () => {
    // Establece las contraseñas de prueba iguales
    component.signUpDTORequest.password = 'password123';
    component.confirmarContrasenia = 'password123';

    // Llama al método onSubmit que contiene la lógica de validación
    component.onSubmit();

    // Verifica que las contraseñas coincidan
    expect(component.passwordsMatch).toBeTrue();
    // Verifica que no se muestra el mensaje de error de contraseñas no coincidentes
    expect(component.showMSGci).toBeFalse();
  });

  // Verifica que las contraseñas no coinciden y se muestra el mensaje de error
  it('should validate that passwords do not match', () => {
    // Establece las contraseñas de prueba diferentes
    component.signUpDTORequest.password = 'password143';
    component.confirmarContrasenia = 'password123';

    fixture.detectChanges(); // Detecta cambios antes de realizar la acción

    // Llama al método onSubmit que contiene la lógica de validación
    component.onSubmit();

    // Verifica que las contraseñas no coincidan
    expect(component.passwordsMatch).toBeFalse();
    // Verifica que se muestra el mensaje de error de contraseñas no coincidentes
    expect(component.showMSGci).toBeTrue();
  });

  // Verifica que los modales se abren y cierran correctamente
  it('should open and close modals correctly', () => {
    // Llama al método para abrir el modal principal y verifica su estado
    component.openModal();
    expect(component.showModal).toBeTrue();

    // Llama al método para cerrar el modal principal y verifica su estado
    component.closeModal();
    expect(component.showModal).toBeFalse();

    // Llama al método para abrir el modal de carga y verifica su estado
    component.openModalLoading();
    expect(component.showModalLoading).toBeTrue();

    // Llama al método para cerrar el modal de carga y verifica su estado
    component.closeModalLoading();
    expect(component.showModalLoading).toBeFalse();

    // Llama al método para abrir el segundo modal y verifica su estado
    component.openModal2();
    expect(component.showModal2).toBeTrue();

    // Llama al método para cerrar el segundo modal y verifica su estado
    component.closeModal2();
    expect(component.showModal2).toBeFalse();
  });

  // Verifica que la visibilidad de las contraseñas se alterna correctamente
  it('should toggle password visibility', () => {
    // Guarda el estado inicial de la visibilidad de la contraseña
    const initialShowPassword = component.showPassword;
    // Llama al método para alternar la visibilidad de la contraseña
    component.togglePassword();
    // Verifica que el estado de la visibilidad de la contraseña ha cambiado
    expect(component.showPassword).toBe(!initialShowPassword);

    // Guarda el estado inicial de la visibilidad de la confirmación de la contraseña
    const initialShowPasswordConfirmation = component.showPasswordConfirmation;
    // Llama al método para alternar la visibilidad de la confirmación de la contraseña
    component.togglePasswordConfirmation();
    // Verifica que el estado de la visibilidad de la confirmación de la contraseña ha cambiado
    expect(component.showPasswordConfirmation).toBe(!initialShowPasswordConfirmation);
  });

  // Verifica que el rol y la visibilidad de la descripción se alternan correctamente
  it('should toggle role and description visibility', () => {
    // Guarda el estado inicial de la visibilidad de la descripción y el rol
    const initialShowDescripcion = component.showDescripcion;
    const initialRol = component.rol;

    // Llama al método para alternar la visibilidad de la descripción y el rol
    component.toogleRol();

    // Verifica que el estado de la visibilidad de la descripción ha cambiado
    expect(component.showDescripcion).toBe(!initialShowDescripcion);
    // Verifica que el rol ha cambiado de acuerdo a la visibilidad de la descripción
    expect(component.rol).toBe(initialShowDescripcion ? 'CUSTOMER' : 'WORKSHOP');
  });

  // Verifica que se previene la entrada de caracteres no numéricos en el evento onKeyPress
  it('should prevent non-numeric input on onKeyPress', () => {
    // Crea un evento de teclado simulado con un carácter no numérico
    const event = {
      which: 65, // Código de carácter para 'A'
      preventDefault: jasmine.createSpy('preventDefault')
    };

    // Llama al método onKeyPress con el evento simulado
    component.onKeyPress(event);

    // Verifica que se haya llamado a preventDefault para evitar la entrada del carácter
    expect(event.preventDefault).toHaveBeenCalled();
  });

  // Verifica que se permite la entrada de caracteres numéricos en el evento onKeyPress
  it('should allow numeric input on onKeyPress', () => {
    // Crea un evento de teclado simulado con un carácter numérico
    const event = {
      which: 50, // Código de carácter para '2'
      preventDefault: jasmine.createSpy('preventDefault')
    };

    // Llama al método onKeyPress con el evento simulado
    component.onKeyPress(event);

    // Verifica que no se haya llamado a preventDefault para permitir la entrada del carácter
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  // Verifica que se detectan datos incompletos correctamente
  it('should detect incomplete data', () => {
    // Establece datos incompletos en el objeto signUpDTORequest
    component.signUpDTORequest = {
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      role: ''
    };

    // Verifica que checkIncompleteData devuelve true para datos incompletos
    expect(component.checkIncompleteData()).toBeTrue();

    // Establece datos completos en el objeto signUpDTORequest
    component.signUpDTORequest = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test St',
      role: 'CUSTOMER'
    };
    component.confirmarContrasenia = 'password';

    // Verifica que checkIncompleteData devuelve false para datos completos
    expect(component.checkIncompleteData()).toBeFalse();
  });

  // Verifica que se maneja correctamente el registro exitoso
  it('should handle successful registration', () => {
    // Simula una respuesta exitosa del método signUp del AuthService
    spyOn(authService, 'signUp').and.returnValue(of({ message: 'Success' }));
    // Espía los métodos relacionados con los modales para verificar que se llamen
    spyOn(component, 'openModalLoading').and.callThrough();
    spyOn(component, 'closeModalLoading').and.callThrough();
    spyOn(component, 'openModal').and.callThrough();

    // Establece datos completos en el objeto signUpDTORequest
    component.signUpDTORequest = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test St',
      role: 'CUSTOMER'
    };
    component.confirmarContrasenia = 'password';

    // Llama al método onSubmit que contiene la lógica de registro
    component.onSubmit();

    // Verifica que se haya llamado al método signUp del AuthService
    expect(authService.signUp).toHaveBeenCalled();
    // Verifica que se haya abierto y cerrado el modal de carga correctamente
    expect(component.openModalLoading).toHaveBeenCalled();
    expect(component.closeModalLoading).toHaveBeenCalled();
    // Verifica que se haya abierto el modal de éxito
    expect(component.openModal).toHaveBeenCalled();
  });

  // Verifica que se maneja correctamente el error en el registro
  it('should handle registration error', () => {
    // Simula una respuesta de error del método signUp del AuthService
    spyOn(authService, 'signUp').and.returnValue(throwError({ message: 'Error' }));
    // Espía la consola de errores para verificar que se registre el error
    spyOn(console, 'error');

    // Establece datos completos en el objeto signUpDTORequest
    component.signUpDTORequest = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test St',
      role: 'CUSTOMER'
    };
    component.confirmarContrasenia = 'password';

    // Llama al método onSubmit que contiene la lógica de registro
    component.onSubmit();

    // Verifica que se haya llamado al método signUp del AuthService
    expect(authService.signUp).toHaveBeenCalled();
    // Verifica que se haya registrado el error en la consola
    expect(console.error).toHaveBeenCalledWith('Error al registrar:', { message: 'Error' });
  });
});
