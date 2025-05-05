import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, catchError, switchMap, throwError } from 'rxjs';
  import { TokenService } from '../services/token.service';
  import { AuthService } from '../services/auth.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
  
    constructor(
      private tokenService: TokenService,
      private authService: AuthService
    ) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenService.getAccessToken();
      let authReq = req;
  
      if (token) {
        authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
  
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && !this.isRefreshing) {
            this.isRefreshing = true;
  
            return this.authService.refreshToken().pipe(
              switchMap(newTokens => {
                this.isRefreshing = false;
  
                const cloned = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newTokens.accessToken}`)
                });
  
                return next.handle(cloned);
              }),
              catchError(err => {
                this.isRefreshing = false;
                this.authService.logout();
                return throwError(() => err);
              })
            );
          }
  
          return throwError(() => error);
        })
      );
    }
  }
  