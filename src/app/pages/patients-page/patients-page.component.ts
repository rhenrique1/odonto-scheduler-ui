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
  public displayedColumns: string[] = ['name', 'document', 'telephone', 'email', 'address', 'gender', 'notes', 'actions'];
  public patients: Patient[];
  public isLoading: boolean = true;
  public isLoadingPatients: boolean = true;
  public patientQuery: string = '';

  // @ViewChild(MatTable) table: MatTable<Patient[]>;

  constructor(
    public dialog: MatDialog,
    public patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPatients();
    // this.table.renderRows();
  }

  public openDeleteDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Remover Paciente',
        description: `Tem certeza que deseja remover ${patient.fullName}?`,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(patient.id).subscribe({
          next: () => {
            this.fetchPatients();
          },
          error: () => {
            console.log('Ocorreu um erro ao deletar o paciente');
          }
        })
      }
    });
  }

  public goToDetails(patient: Patient): void {
    this.router.navigate(['/editar-paciente', patient.id]);
  }

  // public fetchPatientsByQuery(): Patient[] {
  //   this.patientService.getPatients().filter(
  //     p => p.name.includes(this.patientQuery)
  //       || p.email.includes(this.patientQuery)
  //       || p.cpf.includes(this.patientQuery)
  //   );
  // }

  public fetchPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (response) => {
        if (this.patientQuery != '') {
          this.patients = response.filter(p => p.fullName.includes(this.patientQuery)
            || p.email.includes(this.patientQuery)
            || p.document.includes(this.patientQuery));
        } else {
          this.patients = response;
        }

        this.isLoadingPatients = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoadingPatients = false;
        this.isLoading = false;
      }
    });
  }
}
