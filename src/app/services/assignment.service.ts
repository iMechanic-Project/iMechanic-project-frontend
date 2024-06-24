import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ServicioMecanicoDTO } from '../interfaces/ServicioMecanicoDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  public baseUrl: string = `${environment.apiUrl}/api/assignments`;

  constructor(private http: HttpClient) { }

  getAllWorkshopAssignments(): Observable<ServicioMecanicoDTO[]> {
    return this.http.get<ServicioMecanicoDTO[]>(`${this.baseUrl}/todas`)
  }

}
