import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface CheckInDto {
  fullName: string;
  email: string;
  phone: string;
  reason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = `${environment.visitorApi}/visitors`;

  constructor(private http: HttpClient) {}

  checkInVisitor(data: CheckInDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkin`, data);
  }
}
