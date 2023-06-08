import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let currentUser: User;
    this.authService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    if (currentUser) {
      headers.append('Authorization', `Bearer ${currentUser.token}`);
    }

    const modifiedRequest = request.clone({
      headers: headers
    });

    return next.handle(modifiedRequest);
  }
}
