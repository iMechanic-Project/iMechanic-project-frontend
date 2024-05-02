import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateOrdenDTORequest } from '../interfaces/CreateOrdenDTORequest';
import { Observable } from 'rxjs';
import { VehiculoSearchDTOResponse } from '../interfaces/VehiculoSearchDTOResponse';
import { OrdenTrabajoDTOList } from '../interfaces/OrdenTrabajoDTOList';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(createOrdenDTORequest: CreateOrdenDTORequest): Observable<VehiculoSearchDTOResponse> {
    return this.http.post<VehiculoSearchDTOResponse>(`${this.baseUrl}/orden/crear`, createOrdenDTORequest);
  }

  getAllOrdersByTaller(): Observable<OrdenTrabajoDTOList[]> {
    return this.http.get<OrdenTrabajoDTOList[]>(`${this.baseUrl}/orden/todas`);
  }

}
