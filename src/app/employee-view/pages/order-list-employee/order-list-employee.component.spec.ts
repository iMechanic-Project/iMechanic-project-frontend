import { ComponentFixture, TestBed } from '@angular/core/testing';
import OrderListEmployeeComponent from './order-list-employee.component';
import { OrderService } from '../../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import { of, throwError } from 'rxjs';

describe('OrderListEmployeeComponent', () => {
  let component: OrderListEmployeeComponent;
  let fixture: ComponentFixture<OrderListEmployeeComponent>;
  let orderService: OrderService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: OrderService, useValue: { getAllOrdersByMecanic: jasmine.createSpy('getAllOrdersByMecanic').and.returnValue(of([])) } },
        { provide: Router, useValue: {
          navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListEmployeeComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que se obtienen las órdenes de trabajo correctamente al iniciar
  it('should fetch orders on init', () => {
    expect(orderService.getAllOrdersByMecanic).toHaveBeenCalled();
  });

  // Verifica que el estado se mapea correctamente
  it('should map estado correctly', () => {
    expect(component.mapEstado('EN_PROCESO')).toBe('En Proceso');
    expect(component.mapEstado('EN_ESPERA')).toBe('En Espera');
    expect(component.mapEstado('FINALIZADO')).toBe('Finalizado');
  });

  // Verifica que se asigna la clase de color correcta según el estado
  it('should return correct color class based on estado', () => {
    expect(component.getColorClass('En Proceso')).toBe('text-green-600');
    expect(component.getColorClass('En Espera')).toBe('text-red-600');
    expect(component.getColorClass('Finalizado')).toBe('text-black');
  });

  // Verifica que se maneja correctamente el cambio de entrada en el input
  it('should handle input change correctly', () => {
    const event = {
      target: { value: 'abc123' }
    };
    spyOn(component.placaInput.nativeElement, 'value');
    component.onInputChange(event);
    expect(component.placaInput.nativeElement.value).toBe('ABC-123');
  });

  // Verifica que la navegación al detalle de la orden se realiza correctamente
  it('should navigate to order detail', () => {
    const id = '123';
    component.detailOrder(id);
    expect(router.navigate).toHaveBeenCalledWith(['/progress/employee-progress/', id]);
  });
});
