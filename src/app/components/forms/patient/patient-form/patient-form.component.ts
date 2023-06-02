import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})

export class PatientFormComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() patientId: number = 0;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  public genders: string[] = [
    "Masculino", "Feminino"
  ]

  public isLoading: boolean = true;
  public patientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm() {
    this.patientForm = this.isEditMode ? this.initializeUpdateForm() : this.initializeNewForm();
    this.isLoading = false;
  }

  public initializeNewForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      cpf: ['', Validators.required],
      notes: ['']
    });
  }

  public initializeUpdateForm(): FormGroup {
    const patientData = this.patientService.getPatient(this.patientId);

    return this.formBuilder.group({
      name: [patientData.name, Validators.required],
      email: [patientData.email, [Validators.required, Validators.email]],
      telephone: [patientData.telephone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      address: [patientData.address, Validators.required],
      gender: [patientData.gender, Validators.required],
      cpf: [patientData.cpf, Validators.required],
      notes: [patientData.notes]
    });
  }

  public getEmailErrorMessage(): string {
    if (this.patientForm.get('email').hasError('required')) {
      return 'Insira um email';
    }

    return this.patientForm.get('email').hasError('email') ? 'Insira um email válido' : '';
  }

  public getTelephoneErrorMessage(): string {
    if (this.patientForm.get('telephone').hasError('required')) {
      return 'Insira um telefone';
    }

    return this.patientForm.get('telephone').hasError('pattern') ? 'Insira um telefone válido' : '';
  }

  public onSubmitPatient(): void {
    if (this.patientForm.valid) {
      this.onSubmit.emit(this.patientForm.value)
    }
  }
}
