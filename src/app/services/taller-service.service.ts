import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioDTO } from '../interfaces/ServicioDTO';
import { OrderDetailDTO } from '../interfaces/OrderDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllServiceToMaintenance(): Observable<ServicioDTO[]> {
    return this.http.get<ServicioDTO[]>(`${this.baseUrl}/servicio/mantenimiento`);
  }

  getAllServiceToRepair(): Observable<ServicioDTO[]> {
    return this.http.get<ServicioDTO[]>(`${this.baseUrl}/servicio/reparacion`);
  }
  
  getAllServices(): Observable<ServicioDTO[]> {
    return this.http.get<ServicioDTO[]>(`${this.baseUrl}/servicio/all`);
  }

  addServicioToTaller(serviciosIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/servicio/add`, serviciosIds);
  }

  orderDetailByTaller(orderId: number): Observable<OrderDetailDTO> {
    return this.http.get<OrderDetailDTO>(`${this.baseUrl}/taller/order-detail/${orderId}`);
  }

}
