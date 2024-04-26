import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationLoginDTORequest } from '../interfaces/AuthenticationLoginDTORequest ';
import { AuthenticationSignUpDTORequest } from '../interfaces/AuthenticationSignUpDTORequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signUp(signUpDTORequest: AuthenticationSignUpDTORequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/cuenta/signup`, signUpDTORequest);
  }

  login(loginDtoRequest: AuthenticationLoginDTORequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/cuenta/login`, loginDtoRequest);
  }

  confirmation(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cuenta/confirmation/${token}`);
  }
}
