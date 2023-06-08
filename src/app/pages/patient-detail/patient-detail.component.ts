import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})

export class PatientDetailComponent {
  public isEditModeOn: boolean = false;
  public patient: Patient;
  public patientId: string = null;
  public genders: string[] = [
    "Masculino", "Feminino"
  ]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    //TODO: redirect user if patient no longer exists
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['id'];
    });

    this.patientService.getPatient(this.patientId).subscribe({
      next: (response) => {
        this.patient = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public toggleEditMode(): void {
    this.isEditModeOn = !this.isEditModeOn;
  }

  public setEditButtonClass(): string {
    return this.isEditModeOn ? 'cancel-grey' : 'material-green';
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Remover Paciente',
        description: `Tem certeza que deseja remover ${this.patient.fullName}?`,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(this.patientId).subscribe({
          next: () => {
            this.router.navigateByUrl('/pacientes');
          },
          error: () => {
            console.log('Ocorreu um erro ao deletar o paciente');
            this.router.navigateByUrl('/pacientes');
          }
        });
      }
    });
  }

  public submitPatient(editPatientData: Patient): void {
    editPatientData.id = this.patientId;

    this.patientService.updatePatient(editPatientData).subscribe({
      next: () => {
        this.openConfirmDialog('Paciente Atualizado com Sucesso', 'O paciente foi atualizado com sucesso, clique para retornar à página de pacientes');
      },
      error: () => {
        this.openConfirmDialog('Erro', 'Ocorreu um problema ao atualizar o paciente, clique para retornar à página de pacientes e tente novamente');
      }
    });
  }

  public openConfirmDialog(title: string, description: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        description: description,
        confirmButtonText: 'OK',
        shouldShowCancelButton: false
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.goToPatients();
    });
  }

  public goToPatients(): void {
    this.router.navigate(['/pacientes']);
  }
}
