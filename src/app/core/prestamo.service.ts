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
    var PrestCollection : any={}
   PrestCollection= this.db.collection('prestamos').valueChanges()
    return PrestCollection
  }
  all_prestamos(id) {
    var PrestCollection : any={}
    PrestCollection = this.db.collection(`prestamos`,ref => ref.where('user_id', '==', id)).valueChanges();
    return PrestCollection
  }
  calculaCuota(monto, interes, plazo): number {
    var resultado =(monto * (((interes / 100) * Math.pow((1 + (interes / 100)), plazo)) / (Math.pow((1 + (interes / 100)), plazo) - 1)))
    console.log(resultado)
    if (resultado < 1){
      resultado = 0
    }
    return resultado;
  }
  realiza_pago(prestamo,monto) {
        var saldo_ante = prestamo.saldo
        prestamo.saldo = prestamo.saldo - (monto -(prestamo.saldo * (prestamo.interes/100)))
        if(prestamo.saldo < 1){
          prestamo.saldo = 0
          monto = saldo_ante
        }
        
        if (prestamo.pagos == undefined){
          prestamo.cuota = this.calculaCuota(prestamo.saldo,prestamo.interes,(prestamo.plazo))        
          prestamo.pagos=[{pago : monto,
            sal_ante: saldo_ante,
            intereses : (prestamo.saldo * (prestamo.interes/100)),
            aporte : monto -(prestamo.saldo * (prestamo.interes/100)),
            saldo : prestamo.saldo,
            fecha_pago : Date.now()}]
        } else {
          prestamo.cuota = this.calculaCuota(prestamo.saldo,prestamo.interes,(prestamo.plazo -(prestamo.pagos.length)))        
          prestamo.pagos.push({pago : monto,
            sal_ante: prestamo.saldo,
            intereses : (prestamo.saldo * (prestamo.interes/100)),
            aporte : monto -(prestamo.saldo * (prestamo.interes/100)),
            saldo : prestamo.saldo,
            fecha_pago : Date.now()})  
        }
        this.db.doc('prestamos/' + prestamo.id).update(prestamo);
  }

}
