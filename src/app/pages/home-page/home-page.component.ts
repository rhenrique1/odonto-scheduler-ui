import { Component } from '@angular/core';
import { OptionCardData } from 'src/app/components/home/home-option-card/home-option-card.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public appointmentsCardData: OptionCardData = {
    title: 'Consultas',
    subtitle: 'Agendar e visualizar consultas',
    imageSrc: 'assets/images/appointments-card-image.jpg',
    iconClass: 'doctor-icon',
    cardContent: 'Na seção de Consultas você pode visualizar, alterar, agendar e remover consultas.'
  }

  public patientsCardData: OptionCardData = {
    title: 'Pacientes',
    subtitle: 'Agendar e visualizar pacientes',
    imageSrc: 'assets/images/patients-card-image.jpg',
    iconClass: 'patient-icon',
    cardContent: 'Na seção de Pacientes você pode visualizar, alterar e remover pacientes.'
  }
}
