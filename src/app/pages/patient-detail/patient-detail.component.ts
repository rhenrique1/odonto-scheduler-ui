import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { Address } from 'src/app/shared/interfaces/address';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent {
  public isLoading = true;
  public isEditModeOn = false;
  public patientId: string = '';
  public genders: string[] = ['MASCULINO', 'FEMININO'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['id'];
      this.isLoading = false;
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
        description: 'Tem certeza que deseja remover este paciente?',
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(this.patientId).subscribe({
          next: () => {
            this.router.navigateByUrl('/pacientes');
          },
          error: () => {
            this.router.navigateByUrl('/pacientes');
          },
        });
      }
    });
  }

  public submitPatient(editPatientData: any): void {
    const updatedPatient: Patient = {
      id: this.patientId,
      document: editPatientData.document,
      phoneNumber: editPatientData.phoneNumber,
      email: editPatientData.email,
      fullName: editPatientData.fullName,
      birthDate: editPatientData.birthDate,
      address: new Address(
        editPatientData.street,
        editPatientData.neighborhood,
        editPatientData.number,
        editPatientData.zipcode,
        editPatientData.city,
        editPatientData.state
      ),
      gender: editPatientData.gender,
      notes: editPatientData.notes
    }

    this.patientService.updatePatient(updatedPatient).subscribe({
      next: () => {
        this.goToPatients();
      },
      error: () => {
        this.openConfirmDialog(
          'Erro',
          'Ocorreu um problema ao atualizar o paciente, clique para retornar até a página de pacientes e tente novamente'
        );
      },
    });
  }

  public deletePatient(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Remover Paciente',
        description: `Tem certeza que deseja remover este paciente?`,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(this.patientId).subscribe({
          next: () => {
            this.goToPatients();
          },
          error: () => {
            this.openConfirmDialog(
              'Erro',
              'Ocorreu um problema ao remover o paciente, clique para retornar até a página de pacientes e tente novamente'
            );
          },
        });
      }
    });
  }

  public openConfirmDialog(title: string, description: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        description: description,
        confirmButtonText: 'OK',
        shouldShowCancelButton: false,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.goToPatients();
    });
  }

  public goToPatients(): void {
    this.router.navigate(['/pacientes']);
  }
}
