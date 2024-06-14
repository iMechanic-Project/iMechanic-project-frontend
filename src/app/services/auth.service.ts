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

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): string {
    return localStorage.getItem('role') || '';
  }

  hasRole(role: string): boolean {
    return this.role === role;
  }

  isAuth(): boolean {
    return this.token.length > 0;
  }

  signUp(signUpDTORequest: AuthenticationSignUpDTORequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signup`, signUpDTORequest);
  }

  login(loginDtoRequest: AuthenticationLoginDTORequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, loginDtoRequest);
  }

  confirmation(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/confirmation/${token}`);
  }
}
