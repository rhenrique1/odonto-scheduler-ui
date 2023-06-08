import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly url: string = 'http://ec2-54-84-29-231.compute-1.amazonaws.com:8080/odontoscheduler/api/patient';

  constructor(private http: HttpClient) { }

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }

  public getPatient(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(this.url + '/' + patientId);
  }

  public createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.url, patient);
  }

  public updatePatient(patient: Patient): Observable<any> {
    return this.http.put<Patient>(this.url + '/' + patient.id, patient);
  }

  public deletePatient(patientId: string): Observable<any> {
    return this.http.delete(this.url + '/' + patientId);
  }
}
