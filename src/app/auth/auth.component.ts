import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRequestData, AuthService, AuthResponseData } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public hidePassword = true;
  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const auth: AuthRequestData = {
      username: form.value.username,
      password: form.value.password,
      fullName: form.value.fullName,
    };

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(auth.username, auth.password);
    } else {
      authObs = this.authService.signup(auth);
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.error = error.message;
        this.openSnackBar();
        this.isLoading = false;
      },
    });

    form.reset();
  }

  public openSnackBar(): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: this.error,
        className: 'toast-error',
      },
      panelClass: ['error-snackbar'],
    });
  }
}
