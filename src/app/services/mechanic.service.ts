import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { MechanicDTO } from '../interfaces/MechanicDTO';
import { MechanicDTORequest } from '../interfaces/MechanicDTORequest';
import { MechanicDTOResponse } from '../interfaces/MechanicDTOResponse';
import { MecanicoDTOList } from '../interfaces/MecanicoDTOList';
import { OrdenTrabajoMecanicoDTOList } from '../interfaces/OrdenTrabajoMecanicoDTOList';
import { OrderDetailMecanicoDTO } from '../interfaces/OrderDetailMecanicoDTO';
import {tap} from "rxjs/operators";
import { MecanicoPasoDTO } from '../interfaces/MecanicoPasoDTO';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  public baseUrl: string = environment.apiUrl;
  private _refresh$ = new Subject<void>();


  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getAllMechanics(): Observable<MechanicDTO[]> {
    return this.http.get<MechanicDTO[]>(`${this.baseUrl}/mecanico/all`);
  }

  createMechanic(mecanico: MechanicDTORequest): Observable<MechanicDTOResponse> {
    return this.http.post<MechanicDTOResponse>(`${this.baseUrl}/mecanico/crear`, mecanico)
      .pipe(
        tap(()=>  {
          this._refresh$.next();
        })
      )
  }

  getMechanicsByService(serviceId: number): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(`${this.baseUrl}/mecanico/service/${serviceId}`);
  }

  getAllOrdersByMecanic(): Observable<OrdenTrabajoMecanicoDTOList[]> {
    return this.http.get<OrdenTrabajoMecanicoDTOList[]>(`${this.baseUrl}/mecanico/ordenes`);
  }

  orderDetailByMecanic(orderId: number): Observable<OrderDetailMecanicoDTO> {
    return this.http.get<OrderDetailMecanicoDTO>(`${this.baseUrl}/mecanico/order-detail/${orderId}`);
  }

  getAllMechanicsForOrder(): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(`${this.baseUrl}/mecanico/all/order`);
  }

  initService(orderId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/mecanico/iniciar-servicio/${orderId}`, {});
  }

  completeStep(ordenId: number, servicioId: number, pasoId: number): Observable<MecanicoPasoDTO> {
    return this.http.put<MecanicoPasoDTO>(`${this.baseUrl}/mecanico/orden/${ordenId}/service/${servicioId}/paso/${pasoId}/complete`, {});
  }

  getStepComplete(ordenId: number, servicioId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/mecanico/orden/${ordenId}/service/${servicioId}/complete-list`, {});
  }

}