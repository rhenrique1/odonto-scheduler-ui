import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-add-patient-page',
  templateUrl: './add-patient-page.component.html',
  styleUrls: ['./add-patient-page.component.scss']
})
export class AddPatientPageComponent {
  constructor(public dialog: MatDialog, private patientService: PatientService, private router: Router) { }

  public submitPatient(newPatientData: Patient): void {
    const newPatient: Patient = {
      id: 0,
      name: newPatientData.name,
      email: newPatientData.email,
      telephone: newPatientData.telephone,
      address: newPatientData.address,
      gender: newPatientData.gender,
      cpf: newPatientData.cpf,
      notes: newPatientData.notes
    }

    if (this.patientService.createPatient(newPatient)) {
      this.openConfirmDialog('Paciente Adicionado com Sucesso', 'O paciente foi adicionado com sucesso, clique para retornar à página de pacientes');
      return;
    }

    this.openConfirmDialog('Ocorreu um Erro', 'Ocorreu um erro ao adicionar o paciente, por favor, tente novamente');
    return;
  }

  public openConfirmDialog(title: string, description: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: title,
        description: description,
        confirmButtonText: 'OK',
        shouldShowCancelButton: false
      },
      position: { top: '10vh' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.goToPatients();
    });
  }

  public goToPatients(): void {
    this.router.navigate(['/pacientes']);
  }
}
