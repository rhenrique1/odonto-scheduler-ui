import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUser, AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public hide: boolean = true;
  public isLoginMode: boolean = true;
  public isLoading: boolean = false;

  //TODO: should start as null
  public error: string = 'PLACEHOLDER TESTING MESSAGE';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const auth: AuthUser = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      name: form.value.fullName,
      document: form.value.document,
      phoneNumber: form.value.phoneNumber,
    }

    this.isLoading = true;

    if (this.isLoginMode) {
      this.openSnackBar();
      //TODO: add login request

    } else {
      this.authService.signup(auth).subscribe({
        next: (response) => {
          console.log(response);

          //TODO: login new user
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Ocorreu um erro!';
          this.isLoading = false;
          this.openSnackBar();
        }
      });
    }

    form.reset();
  }

  public openSnackBar(): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: this.error,
        className: 'toast-error',
      },
      panelClass: ['error-snackbar']
    });
  }
}
