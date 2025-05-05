import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { environment } from '@env/environment';
import { environment } from '../../../environments/environment';


import { TokenService } from './token.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


interface LoginDto {
  email: string;
  password: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // register(arg0: { email: any; password: any; }) {
  //   throw new Error('Method not implemented.');
  // }

  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  
  private apiUrl = `${environment.apiUrl}/auth`; 

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(data: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(tokens => this.tokenService.saveTokens(tokens))
    );
  }

  refreshToken(): Observable<TokenResponse> {
    const refresh = this.tokenService.getRefreshToken();
    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, { refreshToken: refresh }).pipe(
      tap(tokens => this.tokenService.saveTokens(tokens))
    );
  }

  logout(): void {
    this.tokenService.clearTokens();
    this.router.navigate(['/login']);
  }
}

