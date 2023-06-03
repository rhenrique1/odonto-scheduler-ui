import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthResponseData {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  username: string;
  email: string;
  password: string;
  name: string;
  document: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://ec2-54-84-29-231.compute-1.amazonaws.com:8080/odontoscheduler/api/auth/signup';

  constructor(private http: HttpClient) { }

  public signup(authUser: AuthUser): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.url, authUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  public login() {

  }

  
}
