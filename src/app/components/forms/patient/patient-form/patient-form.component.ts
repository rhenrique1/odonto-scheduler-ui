import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() patientId = '';
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  public genders: string[] = ['Masculino', 'Feminino'];

  public isLoading = true;
  public patientForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm() {
    this.patientForm = this.isEditMode
      ? this.initializeUpdateForm()
      : this.initializeNewForm();
    this.isLoading = false;
  }

  public initializeNewForm(): FormGroup {
    return this.formBuilder.group({
      fullName: ['', Validators.required],
      document: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [new Date(), [Validators.required]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      notes: [''],
    });
  }

  public initializeUpdateForm(): FormGroup {
    this.isLoading = true;
    let patient: Patient;

    this.patientService.getPatient(this.patientId).subscribe({
      next: response => {
        patient = response;
      },
      error: error => {
        console.log(error);
      },
    });

    return this.formBuilder.group({
      fullName: [patient.fullName, Validators.required],
      document: [patient.document, Validators.required],
      telephone: [
        patient.telephone,
        [Validators.required, Validators.pattern('[- +()0-9]+')],
      ],
      email: [patient.email, [Validators.required, Validators.email]],
      birthDate: [patient.birthDate, Validators.required],
      address: [patient.address, Validators.required],
      gender: [patient.gender, Validators.required],
      notes: [patient.notes],
    });
  }

  public getEmailErrorMessage(): string {
    if (this.patientForm.get('email').hasError('required')) {
      return 'Insira um email';
    }

    return this.patientForm.get('email').hasError('email')
      ? 'Insira um email válido'
      : '';
  }

  public getTelephoneErrorMessage(): string {
    if (this.patientForm.get('telephone').hasError('required')) {
      return 'Insira um telefone';
    }

    return this.patientForm.get('telephone').hasError('pattern')
      ? 'Insira um telefone válido'
      : '';
  }

  public onSubmitPatient(): void {
    if (this.patientForm.valid) {
      this.onSubmit.emit(this.patientForm.value);
    }
  }
}
