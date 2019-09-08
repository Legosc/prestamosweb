import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import {
    
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,MatTabsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),AngularFireAuthModule,
    BrowserModule, FormsModule,BrowserAnimationsModule, 
    NgxSpinnerModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,AngularFirestoreModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
