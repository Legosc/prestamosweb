import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { User } from './user';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PrestamoService } from '../core/prestamo.service';

@Injectable()
export class AuthService {
  auth = firebase.auth()
  user$: any;
  currentUser : any ;
  authState: any = null;
  error: string;
  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router,private PrestamoService: PrestamoService) {
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
    this.user$.subscribe(data =>{
      console.log(data)
    })

    this.authState = this.firebaseAuth.authState
    
  }
  get authenticated(): boolean {

    return this.authState !== null;
    
  }
  get CurrentUser() : any {
    console.log(this.user$)
    return this.currentUser
  }
  
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return await this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    return await this.firebaseAuth.auth.signInWithPopup(provider).then(value => {
      console.log('Nice, it worked!');

       this.updateUserData(value.user)
    })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        localStorage.setItem('errorService', JSON.stringify(err.message));

      });
  }
  private updateUserData(user) {
    
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
     var localUser : User; 
     userRef.valueChanges().subscribe(data=>{
       localUser = data as User;
    
        const updateUser: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          cedula: 0,
          roles: {
            subscriber: true
          }
        }
        return userRef.set(updateUser, { merge: true })
     
     });
    
    //localStorage.setItem('prestamos', JSON.stringify(presRef));
    
  }

  // Returns true if user is logged in
    
    
  get errorMessage(): string {
    const error = JSON.parse(localStorage.getItem('errorService'));
    return error;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  async login(email: string, password: string) {
    return await this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  async signOut() {
    await this.firebaseAuth
      .auth
      .signOut();
      localStorage.clear();
  }

}