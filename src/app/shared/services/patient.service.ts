import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getPaginationHeaders } from '../helpers/paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly url: string = 'https://odontoscheduler.onrender.com/odontoscheduler/api/patient';

  constructor(private http: HttpClient) { }

  public getPatients(pageNumber: number = 0, pageSize: number = 10) {
    const params = getPaginationHeaders(pageNumber, pageSize);

    return this.http.get<Patient[]>(this.url, { params });
  }

  public getPatientsQuery(query: string, pageNumber: number = 0, pageSize: number = 10): Observable<Patient[]> {
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('find', query);

    return this.http.get<Patient[]>(this.url, { params });
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
