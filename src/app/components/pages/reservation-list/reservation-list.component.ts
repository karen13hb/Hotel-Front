import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  
  public reservaciones:any=[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.obtenerReservaciones();
    
  }


  public obtenerReservaciones():void {
    this.reservationService.obtenerReservaciones().subscribe({
      next: (response) => {
        this.reservaciones =response;
        console.log(this.reservaciones)
      },
      error: (error) => {
        console.error('Error al crear la reserva', error);
      }
    });
  }

  public delete(reservationId: number):void {
    this.reservationService.eliminarReservacion(reservationId).subscribe({
      next: () => {
        console.log('Reserva eliminada con éxito');
        this.reservaciones = this.reservaciones.filter((reserva: any) => reserva.id !== reservationId);
      },
      error: (error) => {
        console.error('Error al eliminar la reserva', error);
      }
    });
  }

  public cancel(reservationId: number):void {
    this.reservationService.cancelarReservacion(reservationId).subscribe({
      next: () => {
        console.log('Reserva cancelada con éxito');

        const reserva = this.reservaciones.find((reserva: any) => reserva.id === reservationId);

        if (reserva) {
          reserva.isCancel = true;
        }
      },
      error: (error) => {
        console.error('Error al cancelar la reserva', error);
      }
    });
  }


}
