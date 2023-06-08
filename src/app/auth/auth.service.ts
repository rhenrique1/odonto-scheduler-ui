import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  providedIn: 'root',
})
export class AuthService {
  private url =
    'http://ec2-54-84-29-231.compute-1.amazonaws.com:8080/odontoscheduler/api/auth';

  public user = new ReplaySubject<User>(1);
  public currentUser$: Observable<User> = this.user.asObservable();
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  public signup(
    authRequestData: AuthRequestData
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${this.url}/signup`, authRequestData)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response.username,
            response.userId,
            response.accessToken,
            response.accessTokenExpiresIn
          );
        })
      );
  }

  public login(
    username: string,
    password: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${this.url}/login`, { username, password })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response.username,
            response.userId,
            response.accessToken,
            response.accessTokenExpiresIn
          );
        })
      );
  }

  public autoLogin() {
    const userData: {
      username: string;
      userId: string;
      _token: string;
      expiresIn: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.userId,
      userData._token,
      new Date(userData.expiresIn)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData.expiresIn).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    userId: string,
    token: string,
    expiresIn: string
  ): void {
    const user = new User(username, userId, token, new Date(expiresIn));

    this.user.next(user);
    this.autoLogout(new Date(expiresIn).getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro.';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Esse email já está cadastrado.';
        break;

      //TODO: add more cases when the backend is actually finished
    }

    return throwError(() => new Error(errorMessage));
  }
}
