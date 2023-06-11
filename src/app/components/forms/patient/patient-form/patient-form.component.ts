import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() patientId: string = '';
  @Output() onSubmit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  public genders: string[] = ['MASCULINO', 'FEMININO'];

  public maxBirthDate: Date = new Date();
  public isLoading: boolean = true;
  public patientForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.isEditMode
      ? this.initializeUpdateForm()
      : this.initializeNewForm();
  }

  public initializeNewForm(): void {
    this.patientForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      document: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [new Date(), [Validators.required]],
      gender: ['', Validators.required],
      notes: [''],
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.isLoading = false;
  }

  public initializeUpdateForm(): void {
    this.isLoading = true;

    this.patientService.getPatient(this.patientId).subscribe({
      next: response => {
        this.patientForm = this.formBuilder.group({
          fullName: [response.fullName, Validators.required],
          document: [response.document, Validators.required],
          phoneNumber: [
            response.phoneNumber,
            [Validators.required, Validators.pattern('[- +()0-9]+')],
          ],
          email: [response.email, [Validators.required, Validators.email]],
          birthDate: [response.birthDate, Validators.required],
          gender: [response.gender, Validators.required],
          notes: [response.notes],
          zipcode: [response.address.zipcode, Validators.required],
          street: [response.address.street, Validators.required],
          neighborhood: [response.address.neighborhood, Validators.required],
          number: [response.address.number, Validators.required],
          city: [response.address.city, Validators.required],
          state: [response.address.state, Validators.required],
        });
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
      },
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
    if (this.patientForm.get('phoneNumber').hasError('required')) {
      return 'Insira um telefone';
    }

    return this.patientForm.get('phoneNumber').hasError('pattern')
      ? 'Insira um telefone válido'
      : '';
  }

  public onSubmitPatient(): void {
    if (this.patientForm.valid) {
      this.onSubmit.emit(this.patientForm.value);
    }
  }

  public onDeletePatient(): void {
    this.onDelete.emit();
  }
}
