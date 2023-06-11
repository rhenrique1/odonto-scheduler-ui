import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { Patient } from "src/app/shared/interfaces/patient";
import { PatientService } from "src/app/shared/services/patient.service";

export class PatientsDataSource implements DataSource<Patient>{
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private patientService: PatientService) { }

  connect(collectionViewer: CollectionViewer): Observable<Patient[]> {
    return this.patientsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.patientsSubject.complete();
    this.loadingSubject.complete();
  }

  loadPatients(filter = '', pageIndex = 0, pageSize = 10): void {
    this.loadingSubject.next(true);

    const patientObs = filter != ''
      ? this.patientService.getPatientsQuery(filter, pageIndex, pageSize)
      : this.patientService.getPatients(pageIndex, pageSize);

    patientObs.pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(patients => this.patientsSubject.next(patients));
  }
}
