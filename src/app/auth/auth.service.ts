import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthRequestData {
  username: string;
  email: string;
  password: string;
  name: string;
  document: string;
  phoneNumber: string;
}
export interface AuthResponseData {
  userId: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  accessTokenExpiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://ec2-54-84-29-231.compute-1.amazonaws.com:8080/odontoscheduler/api/auth';

  public user: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) { }

  public signup(authRequestData: AuthRequestData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.url}/signup`, authRequestData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.username, response.userId, response.accessToken, response.accessTokenExpiresIn);
    }));
  }

  public login(username: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.url}/login`, { username, password }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.username, response.userId, response.accessToken, response.accessTokenExpiresIn)
    }));
  }

  private handleAuthentication(username: string, userId: string, token: string, expiresIn: string): void {
    //TODO: implement following line when we have the expiresIn as a response parameter: const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(
      username,
      userId,
      token,
      new Date(expiresIn)
    );

    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro.';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage))
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Esse email já está cadastrado.';
        break;

      //TODO: add more cases when the backend is actually finished
    }

    return throwError(() => new Error(errorMessage))
  }
}
