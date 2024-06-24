import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MechanicDTORequest } from '../interfaces/MechanicDTORequest';
import { MechanicDTOResponse } from '../interfaces/MechanicDTOResponse';
import { MecanicoDTOList } from '../interfaces/MecanicoDTOList';
import { tap } from 'rxjs/operators';
import { MechanicDetailsDTOResponse } from '../interfaces/MechanicDetailsDTOResponse';

@Injectable({
  providedIn: 'root',
})
export class MechanicService {
  public baseUrl: string = `${environment.apiUrl}/api/mechanics`;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getAllMechanics(): Observable<MechanicDetailsDTOResponse[]> {
    return this.http.get<MechanicDetailsDTOResponse[]>(
      `${this.baseUrl}/all`
    );
  }

  createMechanic(
    mecanico: MechanicDTORequest
  ): Observable<MechanicDTOResponse> {
    return this.http
      .post<MechanicDTOResponse>(
        `${this.baseUrl}/crear`,
        mecanico
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getMechanicsByService(serviceId: number): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(
      `${this.baseUrl}/service/${serviceId}`
    );
  }

  getAllMechanicsForOrder(): Observable<MecanicoDTOList[]> {
    return this.http.get<MecanicoDTOList[]>(
      `${this.baseUrl}/all/order`
    );
  }
}
