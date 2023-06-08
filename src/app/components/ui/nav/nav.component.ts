import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public isAuthenticated: boolean = false;

  constructor(public authService: AuthService) { }

  public onLogout(): void {
    this.authService.logout();
  }
}
