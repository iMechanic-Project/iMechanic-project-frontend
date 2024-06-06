import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MechanicDTORequest } from '../interfaces/MechanicDTORequest';
import { MechanicDTOResponse } from '../interfaces/MechanicDTOResponse';
import { MecanicoDTOList } from '../interfaces/MecanicoDTOList';
import { OrdenTrabajoMecanicoDTOList } from '../interfaces/OrdenTrabajoMecanicoDTOList';
import { OrderDetailMecanicoDTO } from '../interfaces/OrderDetailMecanicoDTO';
import { tap } from 'rxjs/operators';
import { MecanicoPasoDTO } from '../interfaces/MecanicoPasoDTO';
import { MechanicDetailsDTOResponse } from '../interfaces/MechanicDetailsDTOResponse';

@Injectable({
  providedIn: 'root',
})
export class MechanicService {
  public baseUrl: string = environment.apiUrl;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getAllMechanics(): Observable<MechanicDetailsDTOResponse[]> {
    return this.http.get<MechanicDetailsDTOResponse[]>(
      `${this.baseUrl}/api/mechanics/all`
    );
  }

  createMechanic(
    mecanico: MechanicDTORequest
  ): Observable<MechanicDTOResponse> {
    return this.http
      .post<MechanicDTOResponse>(
        `${this.baseUrl}/api/mechanics/crear`,
        mecanico
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getMechanicsByService(serviceId: number): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(
      `${this.baseUrl}/api/mechanics/service/${serviceId}`
    );
  }

  orderDetailByMecanic(orderId: number): Observable<OrderDetailMecanicoDTO> {
    return this.http
      .get<OrderDetailMecanicoDTO>(
        `${this.baseUrl}/api/mechanics/order-detail/${orderId}`
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getAllMechanicsForOrder(): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(
      `${this.baseUrl}/api/mechanics/all/order`
    );
  }

  initService(orderId: string, serviceId: number): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/api/mechanics/iniciar/${orderId}/servicio/${serviceId}`,
      {}
    );
  }

  completeStep(
    ordenId: string,
    servicioId: number,
    pasoId: number
  ): Observable<MecanicoPasoDTO> {
    return this.http.put<MecanicoPasoDTO>(
      `${this.baseUrl}/api/mechanics/orden/${ordenId}/service/${servicioId}/paso/${pasoId}/complete`,
      {}
    );
  }

  getStepComplete(ordenId: string, servicioId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/mechanics/orden/${ordenId}/service/${servicioId}/complete-list`,
      {}
    );
  }

  finalService(orderId: string, serviceId: number): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/api/mechanics/terminar/${orderId}/servicio/${serviceId}`,
      {}
    );
  }
}
