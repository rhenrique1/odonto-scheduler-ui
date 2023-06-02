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
  public patient!: Patient;
  public patientId!: number;
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

    this.patient = this.patientService.getPatient(this.patientId);
  }

  public toggleEditMode(): void {
    this.isEditModeOn = !this.isEditModeOn;
  }

  public setEditButtonClass(): string {
    return this.isEditModeOn ? 'cancel-grey' : 'material-green';
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: 'Remover Paciente',
        description: `Tem certeza que deseja remover ${this.patient.name}?`,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER'
      },
      position: { top: '10vh' }
    });

    dialogRef.afterClosed().subscribe(result => {
      //TODO: Add remove patient logic
      if (result) {
        this.router.navigateByUrl('/pacientes');
      }
    });
  }

  public submitPatient(editPatientData: Patient): void {
    const patientToUpdate: Patient = {
      id: this.patient.id,
      name: editPatientData.name,
      address: editPatientData.address,
      cpf: editPatientData.cpf,
      email: editPatientData.email,
      gender: editPatientData.gender,
      notes: editPatientData.notes,
      telephone: editPatientData.telephone
    }

    if (this.patientService.updatePatient(patientToUpdate)) {
      this.openConfirmDialog('Paciente Adicionado com Sucesso', 'O paciente foi adicionado com sucesso, clique para retornar à página de pacientes');
      return;
    }

    // this.openConfirmDialog('Ocorreu um Erro', 'Ocorreu um erro ao adicionar o paciente, por favor, tente novamente');
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
