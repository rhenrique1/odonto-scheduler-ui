import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public location: Location, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
