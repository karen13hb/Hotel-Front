import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Reservacion } from '../interfaces/IReservacion';
import { calcularPrecioRequest } from '../interfaces/ICalcularPrecio';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private ApiURL;

  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

   calcularPrecio(data:calcularPrecioRequest){
    return this.http.post<number>(`${this.ApiURL}/Reservation/calculateprice`,data).pipe(
			retry(2)
		);
  }

  crearReserva(reservaData: Reservacion){ 
    return this.http.post<any>(`${this.ApiURL}/Reservation`, reservaData).pipe(
			retry(2)
		);
  }

  obtenerReservaciones(){
    return this.http.get<any>(`${this.ApiURL}/Reservation/`).pipe(
			retry(2)
		);
   }

   eliminarReservacion(reservationId: number) {
    return this.http.delete(`${this.ApiURL}/Reservation/${reservationId}`).pipe(
      retry(2)
    );
  }

  cancelarReservacion(reservationId: number){    
    return this.http.put(`${this.ApiURL}/Reservation/cancel/${reservationId}`, {}).pipe(
      retry(2)
    );
  }
  
}
