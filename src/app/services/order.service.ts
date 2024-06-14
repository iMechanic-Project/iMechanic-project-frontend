import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrdenDTORequest } from '../interfaces/CreateOrdenDTORequest';
import { Observable, Subject, tap } from 'rxjs';
import { VehiculoSearchDTOResponse } from '../interfaces/VehiculoSearchDTOResponse';
import { OrdenTrabajoDTOList } from '../interfaces/OrdenTrabajoDTOList';
import { OrdenTrabajoMecanicoDTOList } from '../interfaces/OrdenTrabajoMecanicoDTOList';
import { OrdenTrabajoClienteDTOList } from '../interfaces/OrdenTrabajoClienteDTOList';
import { OrderDetailDTO } from '../interfaces/OrderDetailDTO';
import { OrderDetailMecanicoDTO } from '../interfaces/OrderDetailMecanicoDTO';
import { MecanicoPasoDTO } from '../interfaces/MecanicoPasoDTO';
import { StepOrderResponse } from '../interfaces/StepOrderResponse';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public baseUrl: string = `${environment.apiUrl}/api/orders`;
  private _refresh$ = new Subject<void>();
  private _refresh2$ = new Subject<void>();
  private _refreshNextStep$ = new Subject<void>();

  private _stepCompletedSubject = new Subject<string>(); // Subject para paso completado


  constructor(private http: HttpClient) {}

  get stepCompletedSubject(): Subject<string> {
    return this._stepCompletedSubject;
  }

  get refresh$() {
    return this._refresh$;
  }

  get refresh2$() {
    return this._refresh2$;
  }

  get refreshNextStep$() {
    return this._refreshNextStep$;
  }

  // CREAR ORDEN DE TRABAJO
  createOrder(
    createOrdenDTORequest: CreateOrdenDTORequest
  ): Observable<VehiculoSearchDTOResponse> {
    return this.http.post<VehiculoSearchDTOResponse>(
      `${this.baseUrl}/crear`,
      createOrdenDTORequest
    );
  }

  // TRAER TODAS LAS ORDENES DE TRABAJO DE TALLER
  getAllOrdersByTaller(): Observable<OrdenTrabajoDTOList[]> {
    return this.http.get<OrdenTrabajoDTOList[]>(`${this.baseUrl}/all/workshop`);
  }

  // TRAER DETALLE DE ORDEN DEL TALLER
  orderDetailByTaller(orderId: string): Observable<OrderDetailDTO> {
    return this.http.get<OrderDetailDTO>(
      `${this.baseUrl}/order-detail/${orderId}/workshop`
    );
  }

  // TRAER TODAS LAS ORDENES DE CLIENTE
  getAllOrderByCliente(): Observable<OrdenTrabajoClienteDTOList[]> {
    return this.http.get<OrdenTrabajoClienteDTOList[]>(
      `${this.baseUrl}/all/customer`
    );
  }

  // TRAER DETALLE DE ORDEN DEL CLIENTE
  orderDetailByClient(orderId: string): Observable<OrderDetailDTO> {
    return this.http.get<OrderDetailDTO>(
      `${this.baseUrl}/order-detail/${orderId}/customer`
    );
  }

  // TRAER TODAS LAS ORDENES DE MECANICO
  getAllOrdersByMecanic(): Observable<OrdenTrabajoMecanicoDTOList[]> {
    return this.http.get<OrdenTrabajoMecanicoDTOList[]>(
      `${this.baseUrl}/all/mechanic`
    );
  }

  // TRAER DETALLE DE ORDEN DEL MECANICO
  orderDetailByMecanic(orderId: string): Observable<OrderDetailMecanicoDTO> {
    return this.http
      .get<OrderDetailMecanicoDTO>(
        `${this.baseUrl}/order-detail/${orderId}/mechanic`
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  // inicia la orden mechanic-view
  initService(orderId: string, serviceId: number): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/iniciar/${orderId}/servicio/${serviceId}`,
      {}
    )
      .pipe(
      tap(() => {
        this._refreshNextStep$.next();
        this._refresh2$.next();
        this._stepCompletedSubject.next(orderId); // Notifica que se completó un paso
        console.log("iniciandooo")
        console.log("id:", orderId)
      })
    );

  }

  completeStep(
    ordenId: string,
    servicioId: number,
    pasoId: number

  ): Observable<MecanicoPasoDTO> {
    return this.http.put<MecanicoPasoDTO>(
      `${this.baseUrl}/${ordenId}/service/${servicioId}/paso/${pasoId}/complete`,
      {}
    )
      .pipe(
      tap(() => {
        this._stepCompletedSubject.next(ordenId); // Notifica que se completó un paso
        this._refreshNextStep$.next();
        console.log("siguienteeee")
        console.log("id:", ordenId)
      })
    );

  }


  getStepComplete(
    ordenId: string,
    servicioId: number
  ): Observable<StepOrderResponse[]> {
    return this.http.get<StepOrderResponse[]>(
      `${this.baseUrl}/${ordenId}/service/${servicioId}/complete-list`,
      {}
    );
  }

  finalService(orderId: string, serviceId: number): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/terminar/${orderId}/servicio/${serviceId}`,
      {}
    );
  }

  getStepCompleteByUser(ordenId: string): Observable<StepOrderResponse[]> {
    return this.http.get<StepOrderResponse[]>(
      `${this.baseUrl}/order-detail/${ordenId}/operations`,
      {}
    );
  }
}
