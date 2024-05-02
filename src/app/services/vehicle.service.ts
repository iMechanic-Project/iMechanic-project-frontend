import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculoDTOResponse } from '../interfaces/VehiculoDTOResponse';
import { MarcaDTO } from '../interfaces/MarcaDTO';
import { ModeloDTO } from '../interfaces/ModeloDTO';
import { VehiculoDTORequest } from '../interfaces/VehiculoDTORequest';
import { VehiculoSearchDTORequest } from '../interfaces/VehiculoSearchDTORequest';
import { VehiculoSearchDTOResponse } from '../interfaces/VehiculoSearchDTOResponse';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllVehiclesByUser(): Observable<VehiculoDTOResponse[]> {
    return this.http.get<VehiculoDTOResponse[]>(`${this.baseUrl}/vehiculo/all`);
  }

  getAllMarcas(): Observable<MarcaDTO[]> {
    return this.http.get<MarcaDTO[]>(`${this.baseUrl}/vehiculo/marcas`);
  }

  getAllModelos(marcaId: number): Observable<ModeloDTO[]> {
    return this.http.get<ModeloDTO[]>(`${this.baseUrl}/vehiculo/modelos/${marcaId}`);
  }

  createVehicle(vehiculoDTORequest: VehiculoDTORequest): Observable<VehiculoDTOResponse> {
    return this.http.post<VehiculoDTOResponse>(`${this.baseUrl}/vehiculo/crear`, vehiculoDTORequest);
  }

  getDataByPlaca(vehiculoSearchDTORequest: VehiculoSearchDTORequest): Observable<VehiculoSearchDTOResponse> {
    return this.http.post<VehiculoSearchDTOResponse>(`${this.baseUrl}/vehiculo/placa`, vehiculoSearchDTORequest);
  }

}
