import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrdenDTORequest } from '../interfaces/CreateOrdenDTORequest';
import { Observable } from 'rxjs';
import { VehiculoSearchDTOResponse } from '../interfaces/VehiculoSearchDTOResponse';
import { OrdenTrabajoDTOList } from '../interfaces/OrdenTrabajoDTOList';
import { OrdenTrabajoMecanicoDTOList } from '../interfaces/OrdenTrabajoMecanicoDTOList';
import { OrdenTrabajoClienteDTOList } from '../interfaces/OrdenTrabajoClienteDTOList';
import { OrderDetailDTO } from '../interfaces/OrderDetailDTO';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(
    createOrdenDTORequest: CreateOrdenDTORequest
  ): Observable<VehiculoSearchDTOResponse> {
    return this.http.post<VehiculoSearchDTOResponse>(
      `${this.baseUrl}/orders/crear`,
      createOrdenDTORequest
    );
  }

  getAllOrdersByTaller(): Observable<OrdenTrabajoDTOList[]> {
    return this.http.get<OrdenTrabajoDTOList[]>(`${this.baseUrl}/orders/all`);
  }

  //
  orderDetailByTaller(orderId: string): Observable<OrderDetailDTO> {
    return this.http.get<OrderDetailDTO>(
      `${this.baseUrl}/orders/order-detail/${orderId}/workshop`
    );
  }

  getAllOrderByCliente(): Observable<OrdenTrabajoClienteDTOList[]> {
    return this.http.get<OrdenTrabajoClienteDTOList[]>(
      `${this.baseUrl}/orders/customer`
    );
  }

  //
  orderDetailByClient(orderId: string): Observable<OrderDetailDTO> {
    return this.http.get<OrderDetailDTO>(
      `${this.baseUrl}}/orders/order-detail/${orderId}/customer`
    );
  }

  getAllOrdersByMecanic(): Observable<OrdenTrabajoMecanicoDTOList[]> {
    return this.http.get<OrdenTrabajoMecanicoDTOList[]>(
      `${this.baseUrl}/orders/mechanic`
    );
  }
}
