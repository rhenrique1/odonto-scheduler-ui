import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddPatientPageComponent } from './pages/add-patient-page/add-patient-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pacientes',
    component: PatientsPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'novo-paciente',
    component: AddPatientPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'editar-paciente/:id',
    component: PatientDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
