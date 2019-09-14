import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Prestamos, Pagos } from './user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  pagos :any = {};
  constructor(private db: AngularFirestore) { }
  admin_prestamos() {
    let prestCollection : any={};
   prestCollection= this.db.collection('prestamos').valueChanges();
    return prestCollection
  }
  all_prestamos(id) {
    let prestCollection : any={};
    prestCollection = this.db.collection(`prestamos`,ref => ref.where('user_id', '==', id)).valueChanges();
    return prestCollection
  }
  calculaCuota(monto, interes, plazo): number {
    let resultado =(monto * (((interes / 100) * Math.pow((1 + (interes / 100)), plazo)) / (Math.pow((1 + (interes / 100)), plazo) - 1)));
    if (resultado < 1){
      resultado = 0
    }
    return resultado;
  }
  realiza_pago(prestamo,monto) {
        let saldoAnte = prestamo.saldo;
        prestamo.saldo = prestamo.saldo - (monto -(prestamo.saldo * (prestamo.interes/100)));
        if(prestamo.saldo < 1){
          prestamo.saldo = 0;
          monto = saldoAnte;
        }
        
        if (prestamo.pagos === ''){
          prestamo.cuota = this.calculaCuota(prestamo.saldo,prestamo.interes,(prestamo.plazo));
          prestamo.pagos.push({pago : monto,
            sal_ante: saldoAnte,
            intereses : (prestamo.saldo * (prestamo.interes/100)),
            aporte : monto -(prestamo.saldo * (prestamo.interes/100)),
            saldo : prestamo.saldo,
            fecha_pago : Date.now()});
            prestamo.pagos.shift();
        } else {
          prestamo.cuota = this.calculaCuota(prestamo.saldo,prestamo.interes,(prestamo.plazo -(prestamo.pagos.length)));        
          prestamo.pagos.push({pago : monto,
            sal_ante: prestamo.saldo,
            intereses : (prestamo.saldo * (prestamo.interes/100)),
            aporte : monto -(prestamo.saldo * (prestamo.interes/100)),
            saldo : prestamo.saldo,
            fecha_pago : Date.now()});
            prestamo.pagos.shift();  
        }
        this.db.doc('prestamos/' + prestamo.id).update(prestamo);
  }

}
