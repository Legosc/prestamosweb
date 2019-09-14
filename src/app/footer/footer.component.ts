import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { async } from '@angular/core/testing';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  valid: boolean;

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }
  isAuthenticated() {
    return this.authService.authenticated;      
  }
}
