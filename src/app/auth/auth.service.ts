import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  password: string;
  fullName: string;
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
  private url = 'https://odontoscheduler.onrender.com/odontoscheduler/api/auth';

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
            response.userId,
            response.username,
            response.accessTokenExpiresIn,
            response.accessToken
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
            response.userId,
            response.username,
            response.accessTokenExpiresIn,
            response.accessToken
          );
        })
      );
  }

  public autoLogin(): void {
    const userData: {
      userId: string;
      username: string;
      tokenExpirationDate: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.userId,
      userData.username,
      new Date(userData.tokenExpirationDate),
      userData._token,
    );

    if (userData._token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() -
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
    userId: string,
    username: string,
    expiresIn: string,
    token: string,
  ): void {
    const user = new User(userId, username, new Date(expiresIn), token);

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
    }

    return throwError(() => new Error(errorMessage));
  }
}
