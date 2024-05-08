import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrdenDTORequest } from '../interfaces/CreateOrdenDTORequest';
import { Observable } from 'rxjs';
import { VehiculoSearchDTOResponse } from '../interfaces/VehiculoSearchDTOResponse';
import { OrdenTrabajoDTOList } from '../interfaces/OrdenTrabajoDTOList';
import { ServicioMecanicoDTO } from '../interfaces/ServicioMecanicoDTO';

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

  getAllServicesMecanicsByTaller(): Observable<ServicioMecanicoDTO[]> {
    return this.http.get<ServicioMecanicoDTO[]>(`${this.baseUrl}/orden/todas/servicios-mecanico`)
  }

}
