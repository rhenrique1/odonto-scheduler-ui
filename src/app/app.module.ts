//ANGULAR MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//ANGULAR MATERIAL MODULES
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//PATIENT RELATED COMPONENTS
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientFormComponent } from './components/forms/patient/patient-form/patient-form.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { AddPatientPageComponent } from './pages/add-patient-page/add-patient-page.component';

//UI COMPONENTS
import { PageHeaderComponent } from './components/ui/page-header/page-header.component';
import { NavComponent } from './components/ui/nav/nav.component';
import { HomeOptionCardComponent } from './components/home/home-option-card/home-option-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

//SHARED COMPONENTS
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

//AUTHENTICATION COMPONENTS
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthComponent } from './auth/auth.component';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PatientsPageComponent,
    PageHeaderComponent,
    NavComponent,
    PatientDetailComponent,
    HomePageComponent,
    HomeOptionCardComponent,
    AddPatientPageComponent,
    DeleteDialogComponent,
    ConfirmDialogComponent,
    PatientFormComponent,
    AuthComponent,
    AuthCardComponent,
    LoadingSpinnerComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers:
    [
      HttpClientModule,
      {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' },
      },
      {
        provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: true, width: '500px', position: { top: '10vh' } }
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
