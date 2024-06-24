import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationDTOResponse } from '../interfaces/ServicioDTO';

@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {

  public baseUrl: string = `${environment.apiUrl}/api/operations`;

  constructor(private http: HttpClient) { }

  getAllServiceToMaintenance(): Observable<OperationDTOResponse[]> {
    return this.http.get<OperationDTOResponse[]>(`${this.baseUrl}/mantenimiento`);
  }

  getAllServiceToRepair(): Observable<OperationDTOResponse[]> {
    return this.http.get<OperationDTOResponse[]>(`${this.baseUrl}/reparacion`);
  }
  
  getAllServices(): Observable<OperationDTOResponse[]> {
    return this.http.get<OperationDTOResponse[]>(`${this.baseUrl}/all`);
  }

  addServicioToTaller(serviciosIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/add`, serviciosIds);
  }

}
