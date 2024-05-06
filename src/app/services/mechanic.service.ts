import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MechanicDTO } from '../interfaces/MechanicDTO';
import { MechanicDTORequest } from '../interfaces/MechanicDTORequest';
import { MechanicDTOResponse } from '../interfaces/MechanicDTOResponse';
import { MecanicoDTOList } from '../interfaces/MecanicoDTOList';
import { OrdenTrabajoMecanicoDTOList } from '../interfaces/OrdenTrabajoMecanicoDTOList';
import { OrderDetailMecanicoDTO } from '../interfaces/OrderDetailMecanicoDTO';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllMechanics(): Observable<MechanicDTO[]> {
    return this.http.get<MechanicDTO[]>(`${this.baseUrl}/mecanico/all`);
  }

  createMechanic(mecanico: MechanicDTORequest): Observable<MechanicDTOResponse> {
    return this.http.post<MechanicDTOResponse>(`${this.baseUrl}/mecanico/crear`, mecanico);
  }

  getMechanicsByService(serviceId: number): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(`${this.baseUrl}/mecanico/service/${serviceId}`);
  }

  getAllOrdersByMecanic(): Observable<OrdenTrabajoMecanicoDTOList[]> {
    return this.http.get<OrdenTrabajoMecanicoDTOList[]>(`${this.baseUrl}/mecanico/ordenes`);
  }

  orderDetailByMecanic(orderId: number):Observable<OrderDetailMecanicoDTO> {
    return this.http.get<OrderDetailMecanicoDTO>(`${this.baseUrl}/mecanico/order-detail/${orderId}`);
  }

}
