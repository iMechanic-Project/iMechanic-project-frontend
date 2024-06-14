import { ComponentFixture, TestBed } from '@angular/core/testing';
import OrderListComponent from './order-list.component';
import { OrderService } from '../../../services/order.service';
import { of, throwError } from 'rxjs';
import { OrdenTrabajoDTOList } from "../../../interfaces/OrdenTrabajoDTOList";
import { ActivatedRoute } from "@angular/router";

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    // Crea un objeto Spy para el servicio de Orden con los métodos necesarios
    orderService = jasmine.createSpyObj('OrderService', ['getAllOrdersByTaller']);

    // Configura el módulo de prueba
    await TestBed.configureTestingModule({
      declarations: [], // No hay declaraciones en este componente de prueba
      providers: [
        { provide: OrderService, useValue: orderService }, // Usa el objeto Spy del servicio de Orden
        { provide: ActivatedRoute, useValue: {} } // Proveedor para ActivatedRoute
      ]
    }).compileComponents();

    // Crea el componente y su fixture
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que se obtienen todas las órdenes al inicializar el componente
  it('should fetch all orders on init', () => {
    const mockOrders: OrdenTrabajoDTOList[] = [
      {
        id: '1',
        status: 'EN_PROCESO',
        plate: 'ABC123',
        orderDate: new Date().toISOString(),
        hourDate: '09:00'
      }
    ];
    // Configura el servicio de Orden para devolver un observable con las órdenes simuladas
    orderService.getAllOrdersByTaller.and.returnValue(of(mockOrders));

    // Llama al método ngOnInit del componente
    component.ngOnInit();

    // Verifica que se llamó al método getAllOrdersByTaller del servicio de Orden
    expect(orderService.getAllOrdersByTaller).toHaveBeenCalled();
    // Verifica que la lista de órdenes del componente tenga la longitud esperada
    expect(component.orderList.length).toBe(1);
    // Verifica que el estado de la primera orden en la lista sea el esperado
    expect(component.orderList[0].status).toBe('En Proceso');
  });

  // Prueba para verificar que se devuelve la clase de color correcta para cada estado
  it('should return the correct color class for each status', () => {
    expect(component.getColorClass('En Proceso')).toBe('text-green-600');
    expect(component.getColorClass('En Espera')).toBe('text-red-600');
    expect(component.getColorClass('Finalizado')).toBe('text-black');
  });

  // Prueba para verificar que se mapea el estado correctamente
  it('should map estado correctly', () => {
    expect(component.mapEstado('EN_PROCESO')).toBe('En Proceso');
    expect(component.mapEstado('EN_ESPERA')).toBe('En Espera');
    expect(component.mapEstado('FINALIZADO')).toBe('Finalizado');
  });

  // Prueba para verificar que se formatea correctamente la placa de entrada
  it('should format plate input correctly', () => {
    // Configura el valor de la placa de entrada del componente
    component.placaInput = { nativeElement: { value: '' } };
    // Simula un evento de cambio de entrada
    const mockEvent = { target: { value: 'abc123' } };
    // Llama al método onInputChange del componente
    component.onInputChange(mockEvent);
    // Verifica que el valor de la placa de entrada se haya formateado correctamente
    expect(component.placaInput.nativeElement.value).toBe('ABC-123');
  });

  // Prueba para verificar que se maneja correctamente un error al obtener las órdenes de trabajo
  it('should handle error on fetch orders', () => {
    const errorResponse = { status: 500, message: 'Internal Server Error' };
    // Configura el servicio de Orden para devolver un observable de error con el error simulado
    orderService.getAllOrdersByTaller.and.returnValue(throwError(errorResponse));
    // Espía la función console.error para verificar que se llama correctamente
    spyOn(console, 'error');

    // Llama al método ngOnInit del componente
    component.ngOnInit();

    // Verifica que se llamó a console.error con el mensaje de error esperado
    expect(console.error).toHaveBeenCalledWith('Error al obtener las órdenes de trabajo:', errorResponse);
  });
});
