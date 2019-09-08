import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth.service';
import { async } from 'rxjs/internal/scheduler/async';
import { messaging } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) { }

   async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
    // reset login status
    try {
      await this.authenticationService.signOut();   
    } catch (error) {
      console.log(error);
    }
   
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
   /* if (this.loginForm.invalid) {
      return;
    }*/
    this.spinner.show();
      await this.authenticationService.googleLogin().then(resp =>{
        this.router.navigate([this.returnUrl]);
      }).finally( ()=>{
        this.error = this.authenticationService.errorMessage
      this.spinner.hide();

      });
      //await this.authenticationService.login(this.f.Email.value, this.f.Password.value);
  }
}
