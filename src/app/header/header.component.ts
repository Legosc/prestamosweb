import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserAdmin: boolean;
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private authService: AuthService,
    private router: Router) {
    this.isAdmin()

  }

  ngOnInit() {

  }

  isAuthenticated() {
    return this.authService.authenticated;      
  }
  isAdmin() {
    console.log('user')
    console.log(this.authService.CurrentUser)
  }
  singout() {
    this.authService.signOut()
    this.router.navigate(['/login']);
  }
}
