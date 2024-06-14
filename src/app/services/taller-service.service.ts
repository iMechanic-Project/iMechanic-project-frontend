import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetailDTO } from '../interfaces/OrderDetailDTO';
import { OperationDTOResponse } from '../interfaces/ServicioDTO';

@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllServiceToMaintenance(): Observable<OperationDTOResponse[]> {
    return this.http.get<OperationDTOResponse[]>(`${this.baseUrl}/api/operations/mantenimiento`);
  }

  getAllServiceToRepair(): Observable<OperationDTOResponse[]> {
    return this.http.get<OperationDTOResponse[]>(`${this.baseUrl}/api/operations/reparacion`);
  }
  
  getAllServices(): Observable<OperationDTOResponse[]> {
    return this.http.get<OperationDTOResponse[]>(`${this.baseUrl}/api/operations/all`);
  }

  addServicioToTaller(serviciosIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/operations/add`, serviciosIds);
  }

}
