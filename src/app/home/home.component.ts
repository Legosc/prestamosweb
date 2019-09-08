import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../core/prestamo.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserPrestamo: any =[];
  Pagos:any =[];
  //public UserPagos: Observable<Pagos>;
  authuser: any ={};

  constructor(private PrestamoService: PrestamoService, private auth: AuthService) {
    this.auth.user$.subscribe(user =>{
      this.authuser = user;
      //this.UserPrestamo= 
      this.UserPrestamo = []
      if (this.authuser){
        if ( this.authuser.roles.admin){
          this.PrestamoService.admin_prestamos().subscribe(d =>{
            return this.UserPrestamo = d
          })
        }
        else {
          this.PrestamoService.all_prestamos(this.authuser.uid).subscribe(d =>{
            return this.UserPrestamo = d
          })
        }
      }
      });    
  }
  ngOnInit() {
    
  }
  pagar(prestamo){
    this.PrestamoService.realiza_pago(prestamo,prestamo.cuota);
  }

}
