import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // 🔐 JWT HEADER
  private getAuthHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  // 🔥 GET ALL USERS (ADMIN)
  getUsers(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.baseUrl}/users`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // 🔥 GET ALL ALUMNI
  getAlumni(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.baseUrl}/alumni`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // 🔥 GET APPROVED ALUMNI
  getApprovedAlumni(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.baseUrl}/alumni/approved`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // 🔥 ADD ALUMNI
  addAlumni(alumni: any) {

    return this.http.post(
      `${this.baseUrl}/alumni`,
      alumni,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // 🔥 DELETE ALUMNI
  deleteAlumni(id: number) {

    return this.http.delete(
      `${this.baseUrl}/alumni/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // 🔥 APPROVE USER
  approveAlumni(id: number) {

    return this.http.put(
      `${this.baseUrl}/approve/${id}`,
      {},
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}