import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';


@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.scss']
})

export class PatientsPageComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'email', 'telephone', 'address', 'gender', 'cpf', 'notes', 'actions'];
  public patients: Patient[] = [];
  public isLoading: boolean = true;
  public patientQuery: string = '';

  @ViewChild(MatTable) table!: MatTable<Patient[]>;

  constructor(public dialog: MatDialog, public patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    //TODO: remove previous url if a patient was deleted
    this.patients = this.patientService.getPatients();
    this.table.renderRows();
    this.isLoading = false;
  }

  public openDeleteDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: 'Remover Paciente',
        description: `Tem certeza que deseja remover ${patient.name}?`,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER'
      },
      position: { top: '10vh' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed with ${result} as the result`);
    });
  }

  public goToDetails(patient: Patient): void {
    this.router.navigate(['/editar-paciente', patient.id]);
  }

  public fetchPatientsByQuery(): Patient[] {
    return this.patientService.getPatients().filter(
      p => p.name.includes(this.patientQuery)
        || p.email.includes(this.patientQuery)
        || p.cpf.includes(this.patientQuery)
    );
  }

  public fetchPatients(): void {
    if (this.patientQuery === '') {
      this.patients = this.patientService.getPatients();
      return;
    }

    this.patients = this.fetchPatientsByQuery();
  }
}
