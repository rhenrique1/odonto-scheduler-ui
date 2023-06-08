import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public isAuthenticated: boolean = false;
  public welcomeMessage: string = 'Por favor entre na sua conta.';

  //TODO: remove if implemented
  // public appointmentsCardData: OptionCardData = new OptionCardData(
  //   'Consultas',
  //   'Agendar e visualizar consultas',
  //   'assets/images/appointments-card-image.jpg',
  //   'doctor-icon',
  //   'Na seção de Consultas você pode visualizar, alterar, agendar e remover consultas.'
  // );

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      user => {
        // this.welcomeMessage = `Olá ${user.username}, bem-vindo(a) ao Odonto Scheduler!`;
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
