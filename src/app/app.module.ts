import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginPageComponent } from './pages/login-page/login-page.component';

import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientFormComponent } from './components/forms/patient/patient-form/patient-form.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { AddPatientPageComponent } from './pages/add-patient-page/add-patient-page.component';

import { PageHeaderComponent } from './components/ui/page-header/page-header.component';
import { HomeOptionCardComponent } from './components/home/home-option-card/home-option-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PatientsPageComponent,
    PageHeaderComponent,
    PatientDetailComponent,
    HomePageComponent,
    HomeOptionCardComponent,
    AddPatientPageComponent,
    DeleteDialogComponent,
    ConfirmDialogComponent,
    PatientFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
