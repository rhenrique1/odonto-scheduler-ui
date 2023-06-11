import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/components/dialog/delete-dialog/delete-dialog.component';
import { PatientsDataSource } from 'src/app/components/tables/patients-data-source';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.scss'],
})
export class PatientsPageComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'name',
    'document',
    'telephone',
    'email',
    'address',
    'gender',
    'notes',
    'actions',
  ];

  public dataSource: PatientsDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') searchInput: ElementRef;

  public isLoading = true;
  public isLoadingPatients = true;
  public patientQuery = '';

  constructor(
    public dialog: MatDialog,
    public patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource = new PatientsDataSource(this.patientService);
    this.dataSource.loadPatients();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPatientsPage();
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.loadPatientsPage())).subscribe();
  }

  public openDeleteDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Remover Paciente',
        description: `Tem certeza que deseja remover ${patient.fullName}?`,
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'REMOVER',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(patient.id).subscribe({
          next: () => {
            this.loadPatientsPage();
          },
          error: () => {
          },
        });
      }
    });
  }

  public goToDetails(patient: Patient): void {
    this.router.navigate(['/editar-paciente', patient.id]);
  }

  public loadPatientsPage(): void {
    this.dataSource.loadPatients(
      this.searchInput.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
