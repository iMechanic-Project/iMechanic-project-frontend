import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import RegisterUsersComponent from './register-users.component';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterUsersComponent', () => {
  let component: RegisterUsersComponent;
  let fixture: ComponentFixture<RegisterUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUsersComponent, HttpClientModule, FormsModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate that passwords match', () => {
    component.signUpDTORequest.contrasenia = 'password123';
    component.confirmarContrasenia = 'password123';

    component.onSubmit();

    // contrase単as iguales = true
    expect(component.passwordsMatch).toBeTrue();
    // Mensaje de "contrase単as no coinciden" = false
    expect(component.showMSGci).toBeFalse();
  });

  it('should validate that passwords do not match', () => {
    const passwordInput = fixture.debugElement.query(
      By.css('input[name="contrasenia"]')
    ).nativeElement;
    const confirmPasswordInput = fixture.debugElement.query(
      By.css('input[name="confirmarContrasenia"]')
    ).nativeElement;

    component.signUpDTORequest.contrasenia = 'password143';
    component.confirmarContrasenia = 'password123';

    fixture.detectChanges();

    component.onSubmit();

    // contrase単as iguales = false
    expect(component.passwordsMatch).toBeFalse();
    // Mensaje de "contrase単as no coinciden" = true
    expect(component.showMSGci).toBeTrue();
  });
});
