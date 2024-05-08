import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrdenTrabajoClienteDTOList } from '../interfaces/OrdenTrabajoClienteDTOList';
import { Observable } from 'rxjs';
import { OrderDetailDTO } from '../interfaces/OrderDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllOrderByCliente(): Observable<OrdenTrabajoClienteDTOList[]> {
    return this.http.get<OrdenTrabajoClienteDTOList[]>(`${this.baseUrl}/cliente/ordenes`);
  }

  orderDetailByClient(orderId: number): Observable<OrderDetailDTO> {
    return this.http.get<OrderDetailDTO>(`${this.baseUrl}/cliente/order-detail/${orderId}`);
  }
}