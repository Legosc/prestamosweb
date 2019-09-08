import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prestamos-web';
  constructor(private authService: AuthService, 
    private router: Router) { }
  ngAfterViewInit() {
    // your code here
  }
  isAuthenticated() {
    return this.authService.authenticated;      
  }
}

