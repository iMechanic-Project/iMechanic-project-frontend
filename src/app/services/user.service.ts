import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InformationResponseDTO } from '../interfaces/InformationResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInformationByUser(): Observable<InformationResponseDTO> {
    return this.http.get<InformationResponseDTO>(`${this.baseUrl}/api/users/info`);
  }

}
