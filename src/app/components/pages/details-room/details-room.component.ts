import { Component,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  parametros from 'src/assets/parametros.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { Habitacion } from 'src/app/interfaces/IHabitaciones';
import {  Reservacion } from 'src/app/interfaces/IReservacion';
import { calcularPrecioRequest } from 'src/app/interfaces/ICalcularPrecio';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-details-room',
  templateUrl: './details-room.component.html',
  styleUrls: ['./details-room.component.css']
})
export class DetailsRoomComponent {
  private id =0;
  public habitacion_select: Habitacion = { id: 0, type: '', precio_noche: '', capacidad: 0 };
  public habitaciones_servicios = parametros.habitaciones;
  public checkin = parametros.checkin;
  public checkout = parametros.checkout;
  public total_price:number = 0;
  public showInfo :boolean = false;
  public showButton :boolean = true;
  public formReserva: FormGroup;
  public total_days: number =0;
  visible: boolean = false;
  message: string = '';

  @ViewChild('toastReserva') toastReserva!: ElementRef;


  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router) {
    
    this.formReserva = this.formBuilder.group({
      fechaCheckin: ['', Validators.required],
      fechaCheckout: ['', Validators.required],
      numCelular: ['', Validators.required],
      name: ['', Validators.required]
    });

    
   }

  ngOnInit(): void {
    this.habitacion_select = history.state.habitacion;
    this.id = this.habitacion_select.id
  }

  public mostrarServicio(servicio: string): boolean {
     const habitacion = this.habitaciones_servicios.find((h: any) => h.id === this.id);
     if (!habitacion) {
      return false;
    }
    return habitacion.servicios.includes(servicio);
  }

  public obtenerForm():Reservacion{

    const tipo_habitacion_Id = this.id;

    const fechaCheckin = this.formReserva.get('fechaCheckin')?.value;
    const fechaCheckout = this.formReserva.get('fechaCheckout')?.value;
    const dateCheckin = new Date(fechaCheckin);
    const dateCheckout = new Date(fechaCheckout);
    const formattedCheckin = dateCheckin.toISOString();
    const formattedCheckout = dateCheckout.toISOString();

    const reservaData:Reservacion= {
      tipo_habitacion_Id: tipo_habitacion_Id,
      checkInDate: formattedCheckin,
      checkOutDate: formattedCheckout,
      precio_total: this.total_price,
      isCancel: false,
      nombre: this.formReserva.get('name')?.value,
      celular: this.formReserva.get('numCelular')?.value
     
    };    
    return reservaData;
  }

  public crearReserva():void{

    this.reservationService.crearReserva(this.obtenerForm()).subscribe({
      next: (response) => {
        console.log(' reserva', response);
        this.message = "¡Reserva creada con éxito!";
        this.visible = true;
    
        setTimeout(() => {
          this.visible = false;
          this.router.navigate(['']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al crear la reserva', error);
      }
    });
    
  }

  

  public calcularTotal():void {

    this.showButton=false;

    const fechaCheckin = this.formReserva.get('fechaCheckin')?.value;
    const fechaCheckout = this.formReserva.get('fechaCheckout')?.value;
    const dateCheckin = new Date(fechaCheckin);
    const dateCheckout = new Date(fechaCheckout);

    this.total_days = Math.ceil((dateCheckout.getDate() - dateCheckin.getDate()) + 1);

    const data:calcularPrecioRequest ={
      idHabitacion : this.id,
      totalDias : this.total_days

    }

    this.reservationService.calcularPrecio(data).subscribe({
        next: (response) => {
    	  this.total_price = response;
        this.showInfo=true;
        },
        error: (error) => {
          console.error('Error al calcular total', error);
        }
    });
    
  }
}
