import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../core/prestamo.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userPrestamo: any =[];
  Pagos:any =[];
  //public UserPagos: Observable<Pagos>;
  authuser: any ={};

  constructor(private prestamoService: PrestamoService, private auth: AuthService) {
    this.auth.user$.subscribe(user =>{
      this.authuser = user;
      //this.userPrestamo= 
      this.userPrestamo = [];
      if (this.authuser){
        if ( this.authuser.roles.admin){
          this.prestamoService.admin_prestamos().subscribe(d =>{
            return this.userPrestamo = d;
          });
        }
        else {
          this.prestamoService.all_prestamos(this.authuser.uid).subscribe(d =>{
            return this.userPrestamo = d;
          })
        }
      }
      });    
  }
  ngOnInit() {
    
  }
  pagar(prestamo){
    this.prestamoService.realiza_pago(prestamo,prestamo.cuota);
  }

}
