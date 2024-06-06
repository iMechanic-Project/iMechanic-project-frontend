import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { VehiculoDTOResponse } from '../interfaces/VehiculoDTOResponse';
import { MarcaDTO } from '../interfaces/MarcaDTO';
import { ModeloDTO } from '../interfaces/ModeloDTO';
import { VehiculoDTORequest } from '../interfaces/VehiculoDTORequest';
import { VehiculoSearchDTORequest } from '../interfaces/VehiculoSearchDTORequest';
import { VehiculoSearchDTOResponse } from '../interfaces/VehiculoSearchDTOResponse';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public baseUrl: string = environment.apiUrl;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getAllVehiclesByUser(): Observable<VehiculoDTOResponse[]> {
    return this.http.get<VehiculoDTOResponse[]>(`${this.baseUrl}/api/vehicles/all`);
  }

  getAllMarcas(): Observable<MarcaDTO[]> {
    return this.http.get<MarcaDTO[]>(`${this.baseUrl}/api/vehicles/marcas`);
  }

  getAllModelos(marcaId: number): Observable<ModeloDTO[]> {
    return this.http.get<ModeloDTO[]>(`${this.baseUrl}/api/vehicles/modelos/${marcaId}`);
  }

  createVehicle(vehiculoDTORequest: VehiculoDTORequest): Observable<VehiculoDTOResponse> {
    return this.http.post<VehiculoDTOResponse>(`${this.baseUrl}/api/vehicles/crear`, vehiculoDTORequest)
      .pipe(
        tap(()=>  {
          this._refresh$.next();
        })
      )
  }

  getDataByPlaca(plate: string): Observable<VehiculoSearchDTOResponse> {
    return this.http.get<VehiculoSearchDTOResponse>(`${this.baseUrl}/api/vehicles/placa/${plate}`);
  }

}
