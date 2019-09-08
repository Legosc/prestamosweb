import { Timestamp } from '@firebase/firestore-types';
export interface Roles { 
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }
  
export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName: string;
    cedula? : number;
    roles: Roles;
}
export interface Prestamos {
    id : string;
    aprobado:number;
    saldo:number;
    cuota: number;
    dia_pago: number;
    proximo_pago : Timestamp;
    plazo: number;	
    pagos_realizados: number;
    interes: number;
    pagos: Pagos;

}
export interface Pagos {
    sal_ante:number;
    saldo:number;
    pago: number;
    intereses: number;
    aporte: number;	
    fecha_pago : Timestamp;
}